// webinar-sms — sends registration confirmation + reminder texts via Twilio.
//
// Invoked two ways (both authenticated with the x-webhook-secret header):
//   1. DB trigger on `leads` insert  → { type: "confirmation", record: <lead row> }
//   2. pg_cron before the webinar    → { type: "reminder", kind: "day_before" | "hour_before" }
//
// Secrets are read from Supabase Vault (preferred) or function env vars (fallback):
//   sms_webhook_secret   shared secret, must match the DB trigger / cron jobs
//   twilio_account_sid   from twilio.com/console
//   twilio_auth_token    from twilio.com/console
//   twilio_from_number   your Twilio phone number in E.164 form, e.g. +15551234567

import { createClient, type SupabaseClient } from "npm:@supabase/supabase-js@2";

const WEBINAR = {
  slug: "ai-for-women-entrepreneurs-july-2026",
  title: "You Run the Business. Who Handles Everything Behind It?",
  startsAt: new Date("2026-07-22T12:00:00-04:00"),
  whenLabel: "Tuesday, July 22 at 12:00 PM New York Time",
};

type ReminderKind = "day_before" | "hour_before";

const ENV_FALLBACK: Record<string, string | undefined> = {
  sms_webhook_secret: Deno.env.get("SMS_WEBHOOK_SECRET"),
  twilio_account_sid: Deno.env.get("TWILIO_ACCOUNT_SID"),
  twilio_auth_token: Deno.env.get("TWILIO_AUTH_TOKEN"),
  twilio_from_number: Deno.env.get("TWILIO_FROM_NUMBER"),
};

const secretCache = new Map<string, string>();

function getServiceClient(): SupabaseClient {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
}

async function getSecret(
  supabase: SupabaseClient,
  name: string
): Promise<string | null> {
  const cached = secretCache.get(name);
  if (cached) return cached;

  const { data, error } = await supabase.rpc("get_sms_secret", {
    secret_name: name,
  });

  if (error) {
    console.error(`vault read failed for ${name}:`, error.message);
  }

  const value = (typeof data === "string" ? data : null) ?? ENV_FALLBACK[name] ?? null;
  if (value) secretCache.set(name, value);
  return value;
}

function buildMessage(kind: "confirmation" | ReminderKind, name?: string | null): string {
  const firstName = name?.trim().split(/\s+/)[0];
  switch (kind) {
    case "confirmation":
      return `Hi${firstName ? ` ${firstName}` : ""}! You're registered for "${WEBINAR.title}" on ${WEBINAR.whenLabel}. Your Zoom link will arrive by email. — EaseIntoAI`;
    case "day_before":
      return `Reminder from EaseIntoAI: "${WEBINAR.title}" is tomorrow, ${WEBINAR.whenLabel}. Your Zoom link is in your email. See you there!`;
    case "hour_before":
      return `Starting in about an hour: "${WEBINAR.title}" (${WEBINAR.whenLabel}). Grab your Zoom link from your email. — EaseIntoAI`;
  }
}

/** Normalize to E.164; assumes US numbers when no country code is given. */
function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (raw.trim().startsWith("+") && digits.length >= 10 && digits.length <= 15) {
    return `+${digits}`;
  }
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return null;
}

async function sendTwilioSms(
  supabase: SupabaseClient,
  to: string,
  body: string
): Promise<void> {
  const sid = await getSecret(supabase, "twilio_account_sid");
  const token = await getSecret(supabase, "twilio_auth_token");
  const from = await getSecret(supabase, "twilio_from_number");
  if (!sid || !token || !from) {
    throw new Error("twilio_not_configured");
  }

  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${sid}:${token}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ To: to, From: from, Body: body }),
    }
  );

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`twilio_error_${res.status}: ${detail}`);
  }
}

/**
 * Claims a (phone, kind) slot in sms_messages so each recipient gets each
 * message at most once. Returns false if it was already claimed.
 */
async function claimSend(
  supabase: SupabaseClient,
  phone: string,
  kind: string
): Promise<{ claimed: boolean; id?: string }> {
  const { data, error } = await supabase
    .from("sms_messages")
    .insert({ phone, kind, webinar_slug: WEBINAR.slug, status: "pending" })
    .select("id")
    .single();

  if (error) {
    if (error.code === "23505") return { claimed: false }; // already sent
    throw new Error(error.message);
  }
  return { claimed: true, id: data.id };
}

async function finalizeSend(
  supabase: SupabaseClient,
  id: string,
  status: "sent" | "error",
  errorMessage?: string
): Promise<void> {
  await supabase
    .from("sms_messages")
    .update({ status, error: errorMessage ?? null })
    .eq("id", id);
}

async function sendOne(
  supabase: SupabaseClient,
  rawPhone: string,
  kind: "confirmation" | ReminderKind,
  name?: string | null
): Promise<"sent" | "skipped" | "error"> {
  const phone = normalizePhone(rawPhone);
  if (!phone) return "skipped";

  const claim = await claimSend(supabase, phone, kind);
  if (!claim.claimed) return "skipped";

  try {
    await sendTwilioSms(supabase, phone, buildMessage(kind, name));
    await finalizeSend(supabase, claim.id!, "sent");
    return "sent";
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    await finalizeSend(supabase, claim.id!, "error", message);
    console.error(`SMS ${kind} to ${phone} failed:`, message);
    return "error";
  }
}

/** Reminders only fire inside their expected window, so a stale cron job can't text people after the event. */
function reminderWindowOpen(kind: ReminderKind): boolean {
  const msUntilStart = WEBINAR.startsAt.getTime() - Date.now();
  const hours = msUntilStart / 3_600_000;
  if (kind === "day_before") return hours >= 20 && hours <= 28;
  return hours >= 0.5 && hours <= 2;
}

Deno.serve(async (req: Request) => {
  const supabase = getServiceClient();
  const secret = await getSecret(supabase, "sms_webhook_secret");

  if (!secret || req.headers.get("x-webhook-secret") !== secret) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  let payload: {
    type?: string;
    kind?: ReminderKind;
    record?: { name?: string | null; phone?: string | null; webinar_slug?: string | null };
  };
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "invalid_json" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (payload.type === "confirmation") {
    const record = payload.record;
    if (!record?.phone) {
      return new Response(JSON.stringify({ result: "skipped", reason: "no_phone" }), {
        headers: { "Content-Type": "application/json" },
      });
    }
    const result = await sendOne(supabase, record.phone, "confirmation", record.name);
    return new Response(JSON.stringify({ result }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  if (payload.type === "reminder") {
    const kind = payload.kind;
    if (kind !== "day_before" && kind !== "hour_before") {
      return new Response(JSON.stringify({ error: "invalid_kind" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (!reminderWindowOpen(kind)) {
      return new Response(
        JSON.stringify({ result: "skipped", reason: "outside_reminder_window" }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    const { data: leads, error } = await supabase
      .from("leads")
      .select("name, phone")
      .eq("source", "webinar")
      .eq("webinar_slug", WEBINAR.slug)
      .not("phone", "is", null);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const counts = { sent: 0, skipped: 0, error: 0 };
    for (const lead of leads ?? []) {
      const result = await sendOne(supabase, lead.phone!, kind, lead.name);
      counts[result] += 1;
    }

    return new Response(JSON.stringify({ result: "done", kind, ...counts }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ error: "invalid_type" }), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
});
