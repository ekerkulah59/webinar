// Confirmation email via Resend.
//
// This is not optional polish. Because a service account can't add the booker as
// a Google Calendar attendee (see google.ts), this email is the ONLY way the
// appointment reaches their calendar — hence the .ics attachment and the
// add-to-Google link.

import type { SupabaseClient } from "npm:@supabase/supabase-js@2";
import { getSecret } from "./secrets.ts";
import { BOOKING } from "./config.ts";

const RESEND_URL = "https://api.resend.com/emails";

export type Appointment = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  meeting_mode: "video" | "phone";
  topic: string | null;
  starts_at: string;
  ends_at: string;
  manage_token: string;
};

function formatWhen(iso: string, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(iso));
}

/** Compact UTC stamp for .ics and Google Calendar URLs: 20260812T170000Z */
function toCalendarStamp(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function meetingLocation(appt: Appointment): string {
  return appt.meeting_mode === "video"
    ? BOOKING.videoMeetingUrl
    : `Phone call to ${appt.phone ?? "the number you provided"}`;
}

function escapeIcs(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

export function buildIcs(appt: Appointment): string {
  const location = meetingLocation(appt);
  const description =
    appt.meeting_mode === "video"
      ? `Join here: ${location}`
      : `We'll call you at ${appt.phone}.`;

  // CRLF line endings are required by RFC 5545.
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//EaseIntoAI//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${appt.id}@easeintoai.co`,
    `DTSTAMP:${toCalendarStamp(new Date().toISOString())}`,
    `DTSTART:${toCalendarStamp(appt.starts_at)}`,
    `DTEND:${toCalendarStamp(appt.ends_at)}`,
    `SUMMARY:${escapeIcs(BOOKING.appointmentTitle)}`,
    `DESCRIPTION:${escapeIcs(description)}`,
    `LOCATION:${escapeIcs(location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function googleCalendarUrl(appt: Appointment): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: BOOKING.appointmentTitle,
    dates: `${toCalendarStamp(appt.starts_at)}/${toCalendarStamp(appt.ends_at)}`,
    details:
      appt.meeting_mode === "video"
        ? `Join here: ${BOOKING.videoMeetingUrl}`
        : `We'll call you at ${appt.phone}.`,
    location: meetingLocation(appt),
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

function manageUrl(appt: Appointment): string {
  return `${BOOKING.siteUrl}/appointment/${appt.manage_token}`;
}

async function send(
  supabase: SupabaseClient,
  payload: Record<string, unknown>
): Promise<void> {
  const apiKey = await getSecret(supabase, "resend_api_key");
  if (!apiKey) throw new Error("resend_not_configured");

  const res = await fetch(RESEND_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: BOOKING.fromEmail, ...payload }),
  });

  if (!res.ok) {
    throw new Error(`resend_error_${res.status}: ${await res.text()}`);
  }
}

export async function sendConfirmation(
  supabase: SupabaseClient,
  appt: Appointment,
  viewerTimeZone: string
): Promise<void> {
  const when = formatWhen(appt.starts_at, viewerTimeZone);
  const firstName = appt.name.trim().split(/\s+/)[0];

  const howWeMeet =
    appt.meeting_mode === "video"
      ? `<p style="margin:0 0 16px">We'll meet by video: <a href="${BOOKING.videoMeetingUrl}">${BOOKING.videoMeetingUrl}</a></p>`
      : `<p style="margin:0 0 16px">I'll call you at <strong>${appt.phone}</strong> at that time.</p>`;

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;color:#1a1a1a;line-height:1.6">
      <p style="margin:0 0 16px">Hi ${firstName},</p>
      <p style="margin:0 0 16px">You're booked. Here are the details:</p>
      <div style="border-left:3px solid #333;padding:12px 16px;margin:0 0 20px;background:#fafafa">
        <p style="margin:0 0 4px"><strong>${BOOKING.appointmentTitle}</strong></p>
        <p style="margin:0">${when}</p>
      </div>
      ${howWeMeet}
      <p style="margin:0 0 16px">
        The calendar invite is attached, or
        <a href="${googleCalendarUrl(appt)}">add it to Google Calendar</a>.
      </p>
      <p style="margin:0 0 16px">
        Need to change it? <a href="${manageUrl(appt)}">Reschedule or cancel here</a>.
      </p>
      <p style="margin:0;color:#666">— EaseIntoAI</p>
    </div>
  `;

  await send(supabase, {
    to: appt.email,
    subject: `Confirmed: ${BOOKING.appointmentTitle}, ${when}`,
    html,
    attachments: [
      {
        filename: "appointment.ics",
        content: btoa(buildIcs(appt)), // Resend expects base64
      },
    ],
  });
}

export async function sendOwnerNotification(
  supabase: SupabaseClient,
  appt: Appointment
): Promise<void> {
  const when = formatWhen(appt.starts_at, BOOKING.ownerTimeZone);

  await send(supabase, {
    to: BOOKING.ownerEmail,
    subject: `New booking: ${appt.name} — ${when}`,
    html: `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:1.6">
        <p style="margin:0 0 12px"><strong>${appt.name}</strong> booked a call.</p>
        <p style="margin:0 0 4px">When: ${when}</p>
        <p style="margin:0 0 4px">Mode: ${appt.meeting_mode}</p>
        <p style="margin:0 0 4px">Email: ${appt.email}</p>
        <p style="margin:0 0 4px">Phone: ${appt.phone ?? "—"}</p>
        <p style="margin:12px 0 0">Wants to talk about: ${appt.topic || "—"}</p>
      </div>
    `,
  });
}

export async function sendCancellation(
  supabase: SupabaseClient,
  appt: Appointment
): Promise<void> {
  const when = formatWhen(appt.starts_at, BOOKING.ownerTimeZone);
  await send(supabase, {
    to: BOOKING.ownerEmail,
    subject: `Cancelled: ${appt.name} — ${when}`,
    html: `<p>${appt.name} (${appt.email}) cancelled their ${when} call.</p>`,
  });
}
