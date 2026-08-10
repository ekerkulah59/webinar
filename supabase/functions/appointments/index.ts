// appointments — the booking API for the site's scheduler.
//
// Called from the browser via supabase.functions.invoke("appointments", { body }),
// which attaches the anon JWT automatically. Unlike webinar-sms (machine-to-machine,
// guarded by x-webhook-secret) this endpoint is public by design, so every action
// re-validates its inputs server-side and `book` is rate limited.
//
// Actions: slots | book | manage | cancel | reschedule

import { createClient, type SupabaseClient } from "npm:@supabase/supabase-js@2";
import { BOOKING } from "./config.ts";
import { computeSlots, type Interval, type Rule } from "./slots.ts";
import { createEvent, deleteEvent, getBusy } from "./google.ts";
import {
  sendCancellation,
  sendConfirmation,
  sendOwnerNotification,
  type Appointment,
} from "./email.ts";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const JSON_HEADERS = { ...CORS, "Content-Type": "application/json" };

const MS_PER_DAY = 86_400_000;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

function fail(error: string, status = 400): Response {
  return json({ error }, status);
}

function serviceClient(): SupabaseClient {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
}

/** Everything needed to decide whether a given instant is bookable. */
async function loadAvailability(
  supabase: SupabaseClient,
  from: Date,
  to: Date
) {
  const [rulesRes, blackoutsRes, bookedRes] = await Promise.all([
    supabase
      .from("availability_rules")
      .select("weekday, start_time, end_time")
      .eq("active", true),
    supabase
      .from("availability_blackouts")
      .select("starts_at, ends_at")
      .lt("starts_at", to.toISOString())
      .gt("ends_at", from.toISOString()),
    supabase
      .from("appointments")
      .select("starts_at, ends_at")
      .eq("status", "confirmed")
      .lt("starts_at", to.toISOString())
      .gt("ends_at", from.toISOString()),
  ]);

  if (rulesRes.error) throw new Error(rulesRes.error.message);
  if (blackoutsRes.error) throw new Error(blackoutsRes.error.message);
  if (bookedRes.error) throw new Error(bookedRes.error.message);

  const toInterval = (r: { starts_at: string; ends_at: string }): Interval => ({
    start: new Date(r.starts_at).getTime(),
    end: new Date(r.ends_at).getTime(),
  });

  return {
    rules: (rulesRes.data ?? []) as Rule[],
    blackouts: (blackoutsRes.data ?? []).map(toInterval),
    booked: (bookedRes.data ?? []).map(toInterval),
    busy: await getBusy(supabase, from, to),
  };
}

async function availableSlots(supabase: SupabaseClient, from: Date, to: Date) {
  const { rules, blackouts, booked, busy } = await loadAvailability(
    supabase,
    from,
    to
  );

  return computeSlots({
    rules,
    busy,
    blackouts,
    booked,
    from,
    to,
    now: new Date(),
    timeZone: BOOKING.ownerTimeZone,
    slotMinutes: BOOKING.slotMinutes,
    bufferMinutes: BOOKING.bufferMinutes,
    minNoticeHours: BOOKING.minNoticeHours,
    maxAdvanceDays: BOOKING.maxAdvanceDays,
  });
}

/** Clamps a requested window to something sane so nobody asks for 10 years of slots. */
function parseRange(body: Record<string, unknown>) {
  const now = Date.now();
  const from = body.from ? new Date(String(body.from)) : new Date(now);
  const to = body.to
    ? new Date(String(body.to))
    : new Date(now + BOOKING.maxAdvanceDays * MS_PER_DAY);

  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) return null;
  if (to <= from) return null;

  const maxTo = new Date(now + (BOOKING.maxAdvanceDays + 1) * MS_PER_DAY);
  return { from, to: to > maxTo ? maxTo : to };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function handleSlots(supabase: SupabaseClient, body: Record<string, unknown>) {
  const range = parseRange(body);
  if (!range) return fail("invalid_range");

  const slots = await availableSlots(supabase, range.from, range.to);
  return json({
    slots,
    slotMinutes: BOOKING.slotMinutes,
    timeZone: BOOKING.ownerTimeZone,
    videoMeetingUrl: BOOKING.videoMeetingUrl,
    appointmentTitle: BOOKING.appointmentTitle,
  });
}

async function handleBook(supabase: SupabaseClient, body: Record<string, unknown>) {
  // 1. Validate. The honeypot mirrors the trick in LeadForm.tsx — a real person
  //    never sees this field, so anything in it is a bot. Return success so the
  //    bot doesn't learn it was caught.
  if (typeof body.website === "string" && body.website.trim()) {
    return json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const phone = String(body.phone ?? "").trim();
  const topic = String(body.topic ?? "").trim();
  const meetingMode = String(body.meetingMode ?? "");
  const viewerTimeZone = String(body.timeZone || BOOKING.ownerTimeZone);

  if (!name) return fail("name_required");
  if (!EMAIL_RE.test(email)) return fail("invalid_email");
  if (meetingMode !== "video" && meetingMode !== "phone") {
    return fail("invalid_meeting_mode");
  }
  if (meetingMode === "phone" && phone.replace(/\D/g, "").length < 7) {
    return fail("phone_required");
  }

  const startsAt = new Date(String(body.startsAt ?? ""));
  if (Number.isNaN(startsAt.getTime())) return fail("invalid_start");
  const endsAt = new Date(startsAt.getTime() + BOOKING.slotMinutes * 60_000);

  // 2. Rate limit. The anon key is public, so this function is the only place
  //    abuse can be stopped.
  const since = new Date(Date.now() - MS_PER_DAY).toISOString();
  const { count, error: countError } = await supabase
    .from("appointments")
    .select("id", { count: "exact", head: true })
    .eq("email", email)
    .gte("created_at", since);

  if (countError) return fail(countError.message, 500);
  if ((count ?? 0) >= BOOKING.maxBookingsPerEmailPerDay) {
    return fail("too_many_bookings", 429);
  }

  // 3 & 4. Recompute availability from scratch — rules, blackouts, existing
  //        bookings AND a live Google freeBusy check. Never trust the client's
  //        idea of what's free; it may be minutes stale.
  const slots = await availableSlots(supabase, startsAt, endsAt);
  const isOffered = slots.some((s) => s.startsAt === startsAt.toISOString());
  if (!isOffered) return fail("slot_unavailable", 409);

  // 5. Insert. The exclusion constraint is the actual lock: if two people submit
  //    the same slot simultaneously, exactly one insert survives and the other
  //    raises 23P01. No amount of checking above can substitute for this.
  const { data: appt, error: insertError } = await supabase
    .from("appointments")
    .insert({
      name,
      email,
      phone: phone || null,
      meeting_mode: meetingMode,
      topic: topic || null,
      starts_at: startsAt.toISOString(),
      ends_at: endsAt.toISOString(),
    })
    .select("id, name, email, phone, meeting_mode, topic, starts_at, ends_at, manage_token")
    .single();

  if (insertError) {
    if (insertError.code === "23P01") return fail("slot_taken", 409);
    return fail(insertError.message, 500);
  }

  // From here the booking is REAL. Downstream failures get recorded on the row
  // and surfaced to the owner, but never fail the request — losing a customer
  // over a Google or Resend hiccup is worse than reconciling by hand.
  await syncToGoogle(supabase, appt as Appointment);
  await sendEmails(supabase, appt as Appointment, viewerTimeZone);

  return json({
    ok: true,
    manageToken: (appt as Appointment).manage_token,
    startsAt: (appt as Appointment).starts_at,
    endsAt: (appt as Appointment).ends_at,
  });
}

async function syncToGoogle(supabase: SupabaseClient, appt: Appointment) {
  try {
    const location =
      appt.meeting_mode === "video"
        ? BOOKING.videoMeetingUrl
        : `Phone: ${appt.phone}`;

    // The booker cannot be a real attendee (no Domain-Wide Delegation), so their
    // details go in the description where you'll actually see them.
    const eventId = await createEvent(supabase, {
      summary: `${BOOKING.appointmentTitle} — ${appt.name}`,
      description: [
        `Name: ${appt.name}`,
        `Email: ${appt.email}`,
        `Phone: ${appt.phone ?? "—"}`,
        `Mode: ${appt.meeting_mode}`,
        "",
        `Wants to talk about: ${appt.topic || "—"}`,
      ].join("\n"),
      location,
      startsAt: new Date(appt.starts_at),
      endsAt: new Date(appt.ends_at),
    });

    await supabase
      .from("appointments")
      .update({ google_event_id: eventId, google_sync_error: null })
      .eq("id", appt.id);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`google sync failed for ${appt.id}:`, message);
    await supabase
      .from("appointments")
      .update({ google_sync_error: message })
      .eq("id", appt.id);
  }
}

async function sendEmails(
  supabase: SupabaseClient,
  appt: Appointment,
  viewerTimeZone: string
) {
  try {
    await sendConfirmation(supabase, appt, viewerTimeZone);
    await sendOwnerNotification(supabase, appt);
    await supabase
      .from("appointments")
      .update({ email_status: "sent" })
      .eq("id", appt.id);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`email failed for ${appt.id}:`, message);
    await supabase
      .from("appointments")
      .update({ email_status: `error: ${message}` })
      .eq("id", appt.id);
  }
}

const APPT_FIELDS =
  "id, name, email, phone, meeting_mode, topic, starts_at, ends_at, status, manage_token, google_event_id";

type StoredAppointment = Appointment & {
  status: "confirmed" | "cancelled";
  google_event_id: string | null;
};

async function findByToken(
  supabase: SupabaseClient,
  token: string
): Promise<StoredAppointment | null> {
  // Tokens are 48 hex chars from gen_random_bytes(24) — unguessable, so
  // possession of the link is the authorization.
  if (!/^[a-f0-9]{48}$/.test(token)) return null;

  const { data } = await supabase
    .from("appointments")
    .select(APPT_FIELDS)
    .eq("manage_token", token)
    .maybeSingle();

  return (data as StoredAppointment | null) ?? null;
}

async function handleManage(supabase: SupabaseClient, body: Record<string, unknown>) {
  const appt = await findByToken(supabase, String(body.token ?? ""));
  if (!appt) return fail("not_found", 404);

  // Deliberately omits manage_token and internal sync fields.
  return json({
    appointment: {
      name: appt.name,
      email: appt.email,
      meetingMode: appt.meeting_mode,
      topic: appt.topic,
      startsAt: appt.starts_at,
      endsAt: appt.ends_at,
      status: appt.status,
    },
    slotMinutes: BOOKING.slotMinutes,
    videoMeetingUrl: BOOKING.videoMeetingUrl,
  });
}

async function releaseAppointment(
  supabase: SupabaseClient,
  appt: StoredAppointment
) {
  // Free the DB slot first so it's immediately rebookable; the exclusion
  // constraint only considers confirmed rows.
  await supabase
    .from("appointments")
    .update({ status: "cancelled" })
    .eq("id", appt.id);

  if (appt.google_event_id) {
    try {
      await deleteEvent(supabase, appt.google_event_id);
    } catch (err) {
      console.error(`google delete failed for ${appt.id}:`, err);
    }
  }
}

async function handleCancel(supabase: SupabaseClient, body: Record<string, unknown>) {
  const appt = await findByToken(supabase, String(body.token ?? ""));
  if (!appt) return fail("not_found", 404);
  if (appt.status === "cancelled") return json({ ok: true });

  await releaseAppointment(supabase, appt);

  try {
    await sendCancellation(supabase, appt);
  } catch (err) {
    console.error("cancellation email failed:", err);
  }

  return json({ ok: true });
}

async function handleReschedule(supabase: SupabaseClient, body: Record<string, unknown>) {
  const existing = await findByToken(supabase, String(body.token ?? ""));
  if (!existing) return fail("not_found", 404);

  const startsAt = new Date(String(body.startsAt ?? ""));
  if (Number.isNaN(startsAt.getTime())) return fail("invalid_start");
  const endsAt = new Date(startsAt.getTime() + BOOKING.slotMinutes * 60_000);

  // The row is UPDATED in place rather than replaced. Inserting a new row would
  // collide with the UNIQUE constraint on manage_token, which the old cancelled
  // row still holds — and keeping one row means the person's existing link and
  // id survive a reschedule.
  //
  // Release first, so the booking's own current time doesn't count as a conflict
  // when the requested time overlaps it.
  await releaseAppointment(supabase, existing);

  const restore = async () => {
    await supabase
      .from("appointments")
      .update({ status: "confirmed", google_event_id: null })
      .eq("id", existing.id);
    await syncToGoogle(supabase, existing);
  };

  const slots = await availableSlots(supabase, startsAt, endsAt);
  if (!slots.some((s) => s.startsAt === startsAt.toISOString())) {
    await restore();
    return fail("slot_unavailable", 409);
  }

  const { data: appt, error } = await supabase
    .from("appointments")
    .update({
      starts_at: startsAt.toISOString(),
      ends_at: endsAt.toISOString(),
      status: "confirmed",
      google_event_id: null,
      google_sync_error: null,
    })
    .eq("id", existing.id)
    .select("id, name, email, phone, meeting_mode, topic, starts_at, ends_at, manage_token")
    .single();

  if (error) {
    if (error.code === "23P01") {
      await restore();
      return fail("slot_taken", 409);
    }
    return fail(error.message, 500);
  }

  await syncToGoogle(supabase, appt as Appointment);
  await sendEmails(
    supabase,
    appt as Appointment,
    String(body.timeZone || BOOKING.ownerTimeZone)
  );

  return json({ ok: true, startsAt: (appt as Appointment).starts_at });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS });
  }
  if (req.method !== "POST") {
    return fail("method_not_allowed", 405);
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return fail("invalid_json");
  }

  const supabase = serviceClient();

  try {
    switch (body.action) {
      case "slots":
        return await handleSlots(supabase, body);
      case "book":
        return await handleBook(supabase, body);
      case "manage":
        return await handleManage(supabase, body);
      case "cancel":
        return await handleCancel(supabase, body);
      case "reschedule":
        return await handleReschedule(supabase, body);
      default:
        return fail("invalid_action");
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`action ${body.action} failed:`, message);
    // Configuration problems are the most common failure here and are worth
    // naming precisely, since the fix is in setup rather than in code.
    if (message === "google_not_configured" || message.startsWith("google_")) {
      return fail(message, 503);
    }
    return fail("server_error", 500);
  }
});
