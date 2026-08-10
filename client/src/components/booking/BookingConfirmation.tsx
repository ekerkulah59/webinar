import { CalendarPlus, CheckCircle2, Download, Video, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { formatSlotDateTime, type MeetingMode } from "@/lib/appointments";
import {
  downloadIcs,
  googleCalendarUrl,
  type CalendarEvent,
} from "./calendarLinks";

type BookingConfirmationProps = {
  name: string;
  startsAt: string;
  endsAt: string;
  meetingMode: MeetingMode;
  phone?: string;
  timeZone: string;
  manageToken: string;
  videoMeetingUrl: string;
};

export function BookingConfirmation({
  name,
  startsAt,
  endsAt,
  meetingMode,
  phone,
  timeZone,
  manageToken,
  videoMeetingUrl,
}: BookingConfirmationProps) {
  const firstName = name.trim().split(/\s+/)[0];

  const location =
    meetingMode === "video" ? videoMeetingUrl : `Phone call to ${phone ?? "you"}`;
  const description =
    meetingMode === "video"
      ? `Join here: ${videoMeetingUrl}`
      : `We'll call you at ${phone ?? "the number you provided"}.`;

  const event: CalendarEvent = { startsAt, endsAt, description, location };

  return (
    <div className="mx-auto max-w-lg text-center">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
        <CheckCircle2 className="h-7 w-7 text-accent" aria-hidden="true" />
      </div>

      <h2 className="text-2xl font-bold text-foreground">
        You're booked, {firstName}
      </h2>
      <p className="mt-2 text-muted-foreground">
        A confirmation is on its way to your inbox.
      </p>

      <div className="mt-6 rounded-xl border border-border bg-muted/30 p-5 text-left">
        <p className="font-semibold text-foreground">
          {formatSlotDateTime(startsAt, timeZone)}
        </p>
        <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          {meetingMode === "video" ? (
            <>
              <Video className="h-4 w-4" aria-hidden="true" />
              <a
                href={videoMeetingUrl}
                className="underline underline-offset-2 hover:text-foreground"
                target="_blank"
                rel="noreferrer"
              >
                Join the video call
              </a>
            </>
          ) : (
            <>
              <Phone className="h-4 w-4" aria-hidden="true" />
              We'll call you at {phone}
            </>
          )}
        </p>
      </div>

      <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
        <Button variant="outline" onClick={() => downloadIcs(event)}>
          <Download className="mr-2 h-4 w-4" aria-hidden="true" />
          Download invite
        </Button>
        <Button variant="outline" asChild>
          <a href={googleCalendarUrl(event)} target="_blank" rel="noreferrer">
            <CalendarPlus className="mr-2 h-4 w-4" aria-hidden="true" />
            Add to Google Calendar
          </a>
        </Button>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Need to change it?{" "}
        <Link
          href={`/appointment/${manageToken}`}
          className="font-medium text-foreground underline underline-offset-2"
        >
          Reschedule or cancel
        </Link>
      </p>
    </div>
  );
}
