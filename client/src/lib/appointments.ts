import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

/**
 * Client for the `appointments` Edge Function. Deliberately shaped like
 * lib/leads.ts: thin typed wrappers, no state, errors thrown as Error.
 *
 * All availability logic lives server-side — this module never decides what's
 * bookable, it only renders what the function returns.
 */

export type Slot = {
  /** ISO 8601, UTC */
  startsAt: string;
  endsAt: string;
};

export type MeetingMode = "video" | "phone";

export type BookingInput = {
  startsAt: string;
  name: string;
  email: string;
  phone?: string;
  meetingMode: MeetingMode;
  topic?: string;
  /** Honeypot — must stay empty. */
  website?: string;
};

export type BookingResult = {
  manageToken: string;
  startsAt: string;
  endsAt: string;
};

export type AppointmentDetail = {
  name: string;
  email: string;
  meetingMode: MeetingMode;
  topic: string | null;
  startsAt: string;
  endsAt: string;
  status: "confirmed" | "cancelled";
};

/** Server error codes → copy a human can act on. */
const ERROR_COPY: Record<string, string> = {
  slot_taken:
    "Someone just booked that time. Pick another slot and you'll be all set.",
  slot_unavailable:
    "That time isn't available anymore. Choose a different slot.",
  too_many_bookings:
    "You've already booked a few calls today. Email us if you need another.",
  invalid_email: "Enter a valid email address.",
  phone_required: "A phone number is required for a phone call.",
  name_required: "Name is required.",
  not_found: "We couldn't find that appointment. The link may have expired.",
  google_not_configured:
    "Scheduling isn't finished setting up yet. Please try again shortly.",
};

function humanize(code: string): string {
  if (ERROR_COPY[code]) return ERROR_COPY[code];
  if (code.startsWith("google_")) return ERROR_COPY.google_not_configured;
  return "Something went wrong. Please try again.";
}

export function browserTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "America/New_York";
  }
}

async function callFunction<T>(body: Record<string, unknown>): Promise<T> {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Scheduling is not configured yet. Add Supabase keys to .env.local (see supabase/README.md)."
    );
  }

  const { data, error } = await getSupabase().functions.invoke("appointments", {
    body: { timeZone: browserTimeZone(), ...body },
  });

  if (error) {
    // invoke() surfaces non-2xx as FunctionsHttpError with the body on
    // error.context — that's where our error code actually lives.
    let code = "";
    try {
      const parsed = await (error as { context?: Response }).context?.json();
      code = parsed?.error ?? "";
    } catch {
      // fall through to the generic message
    }
    throw new Error(humanize(code));
  }

  if (data && typeof data === "object" && "error" in data) {
    throw new Error(humanize(String((data as { error: string }).error)));
  }

  return data as T;
}

export type SlotsResponse = {
  slots: Slot[];
  slotMinutes: number;
  /** The owner's timezone — shown alongside the visitor's for clarity. */
  timeZone: string;
  videoMeetingUrl: string;
  appointmentTitle: string;
};

/** Bookable slots between two instants. Defaults to the full booking window. */
export async function getSlots(
  from?: Date,
  to?: Date
): Promise<SlotsResponse> {
  const result = await callFunction<SlotsResponse>({
    action: "slots",
    from: from?.toISOString(),
    to: to?.toISOString(),
  });
  return { ...result, slots: result.slots ?? [] };
}

export async function bookAppointment(
  input: BookingInput
): Promise<BookingResult> {
  return callFunction<BookingResult>({
    action: "book",
    ...input,
    email: input.email.trim().toLowerCase(),
    name: input.name.trim(),
    phone: input.phone?.trim() || undefined,
    topic: input.topic?.trim() || undefined,
  });
}

export async function getAppointment(
  token: string
): Promise<AppointmentDetail> {
  const result = await callFunction<{ appointment: AppointmentDetail }>({
    action: "manage",
    token,
  });
  return result.appointment;
}

export async function cancelAppointment(token: string): Promise<void> {
  await callFunction({ action: "cancel", token });
}

export async function rescheduleAppointment(
  token: string,
  startsAt: string
): Promise<void> {
  await callFunction({ action: "reschedule", token, startsAt });
}

/* ---------- display helpers ---------- */

export function formatSlotTime(iso: string, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function formatSlotDateTime(iso: string, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(iso));
}

/** YYYY-MM-DD as seen in `timeZone` — the key slots are grouped by. */
export function localDateKey(iso: string, timeZone: string): string {
  // en-CA formats as YYYY-MM-DD, which sorts correctly as a string.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(iso));
}

/** A stable list of timezones for the picker, with the visitor's own first. */
export function timeZoneOptions(): string[] {
  const common = [
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "America/Anchorage",
    "Pacific/Honolulu",
    "Europe/London",
    "Europe/Paris",
    "Africa/Lagos",
    "Asia/Dubai",
    "Asia/Kolkata",
    "Asia/Tokyo",
    "Australia/Sydney",
  ];
  const mine = browserTimeZone();
  return [mine, ...common.filter((tz) => tz !== mine)];
}
