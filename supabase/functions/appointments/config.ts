// Booking configuration. Change these, then redeploy the function.
//
// Your recurring bookable hours are NOT here — they live in the
// `availability_rules` table so you can edit them from the Supabase Table
// Editor without a deploy.

export const BOOKING = {
  /** IANA timezone your availability_rules wall-clock times are expressed in. */
  ownerTimeZone: "America/New_York",

  /** Length of one appointment, in minutes. */
  slotMinutes: 30,

  /** Breathing room enforced around existing calendar events, in minutes. */
  bufferMinutes: 15,

  /** Nobody can book less than this many hours from now. */
  minNoticeHours: 12,

  /** Nobody can book further out than this many days. */
  maxAdvanceDays: 30,

  /** Max bookings from one email address per 24h, to blunt abuse of the public endpoint. */
  maxBookingsPerEmailPerDay: 3,

  /** Shown to people who choose "video call". Your permanent meeting room. */
  videoMeetingUrl: "https://zoom.us/my/REPLACE_ME",

  /** Where the "new booking" notification goes. */
  ownerEmail: "hello@easeintoai.co",

  /** Must be on a domain you've verified in Resend. */
  fromEmail: "EaseIntoAI <hello@easeintoai.co>",

  /** Used to build the cancel/reschedule link in emails. No trailing slash. */
  siteUrl: "https://easeintoai.co",

  /** Human-readable name of the call, used in emails and the calendar event. */
  appointmentTitle: "Intro call with EaseIntoAI",
} as const;
