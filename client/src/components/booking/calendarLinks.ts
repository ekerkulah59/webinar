/**
 * Add-to-calendar helpers.
 *
 * These are load-bearing, not a nicety. A Google service account cannot invite
 * attendees without Domain-Wide Delegation, so the booker never receives a
 * native calendar invite — the .ics and the Google link are the only way the
 * appointment reaches their calendar.
 */

const TITLE = "Intro call with EaseIntoAI";

/** Compact UTC stamp used by both .ics and Google: 20260812T170000Z */
function stamp(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function escapeIcs(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

export type CalendarEvent = {
  startsAt: string;
  endsAt: string;
  description: string;
  location: string;
};

export function buildIcs(event: CalendarEvent): string {
  // RFC 5545 requires CRLF line endings.
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//EaseIntoAI//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${stamp(event.startsAt)}-easeintoai@easeintoai.co`,
    `DTSTAMP:${stamp(new Date().toISOString())}`,
    `DTSTART:${stamp(event.startsAt)}`,
    `DTEND:${stamp(event.endsAt)}`,
    `SUMMARY:${escapeIcs(TITLE)}`,
    `DESCRIPTION:${escapeIcs(event.description)}`,
    `LOCATION:${escapeIcs(event.location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function googleCalendarUrl(event: CalendarEvent): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: TITLE,
    dates: `${stamp(event.startsAt)}/${stamp(event.endsAt)}`,
    details: event.description,
    location: event.location,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

export function downloadIcs(event: CalendarEvent): void {
  const blob = new Blob([buildIcs(event)], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "appointment.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
