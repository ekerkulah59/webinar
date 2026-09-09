import { useCallback, useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { SlotPicker } from "@/components/booking/SlotPicker";
import { BookingForm } from "@/components/booking/BookingForm";
import { BookingConfirmation } from "@/components/booking/BookingConfirmation";
import { TimezoneSelect } from "@/components/booking/TimezoneSelect";
import {
  bookAppointment,
  browserTimeZone,
  formatSlotDateTime,
  getSlots,
  type BookingInput,
  type MeetingMode,
  type Slot,
} from "@/lib/appointments";

type Booked = {
  name: string;
  startsAt: string;
  endsAt: string;
  meetingMode: MeetingMode;
  phone?: string;
  manageToken: string;
};

export default function BookAppointment() {
  useSEO({
    title: "Discuss a Pilot",
    description:
      "A short, no-pitch call. Bring the task you keep redoing, or the members you want to reach, and we will tell you honestly whether the Pilot is the right next step.",
    type: "website",
  });

  const [slots, setSlots] = useState<Slot[]>([]);
  const [videoMeetingUrl, setVideoMeetingUrl] = useState("");
  const [slotMinutes, setSlotMinutes] = useState(30);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [timeZone, setTimeZone] = useState(browserTimeZone);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [booked, setBooked] = useState<Booked | null>(null);

  const loadSlots = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const result = await getSlots();
      setSlots(result.slots);
      setVideoMeetingUrl(result.videoMeetingUrl);
      setSlotMinutes(result.slotMinutes);
    } catch (err) {
      setLoadError(
        err instanceof Error ? err.message : "Couldn't load available times."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadSlots();
  }, [loadSlots]);

  const handleSubmit = async (input: Omit<BookingInput, "startsAt">) => {
    if (!selected) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      const result = await bookAppointment({ ...input, startsAt: selected });
      setBooked({
        name: input.name,
        startsAt: result.startsAt,
        endsAt: result.endsAt,
        meetingMode: input.meetingMode,
        phone: input.phone,
        manageToken: result.manageToken,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setSubmitError(message);
      // If the slot went while they were filling the form, send them back to a
      // fresh list rather than letting them retry a time that no longer exists.
      if (
        message.includes("booked that time") ||
        message.includes("available")
      ) {
        setSelected(null);
        void loadSlots();
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 right-0 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[100px]" />
          <div className="absolute -bottom-10 -left-10 h-[300px] w-[300px] rounded-full bg-accent/8 blur-[80px]" />
        </div>

        <div className="container">
          {booked ? (
            <BookingConfirmation
              name={booked.name}
              startsAt={booked.startsAt}
              endsAt={booked.endsAt}
              meetingMode={booked.meetingMode}
              phone={booked.phone}
              timeZone={timeZone}
              manageToken={booked.manageToken}
              videoMeetingUrl={videoMeetingUrl}
            />
          ) : (
            <>
              <div className="mx-auto max-w-2xl space-y-4 text-center">
                <p className="text-sm font-semibold uppercase tracking-widest text-accent">
                  Free 30-minute intro call
                </p>
                <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
                  Discuss a Pilot
                </h1>
                <p className="text-lg text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    If you run a business:
                  </span>{" "}
                  bring the task you keep redoing. We will tell you honestly
                  whether the Pilot is right, whether a course would serve you
                  better, or whether AI is the wrong tool for it.
                </p>
                <p className="text-lg text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    If you are with an organization:
                  </span>{" "}
                  bring the people you want to reach and what a useful result
                  would look like for them.
                </p>
                <p className="text-base text-muted-foreground">
                  No pitch, and no technical preparation needed.
                </p>
                <div className="flex items-center justify-center gap-5 pt-2 text-sm text-muted-foreground">
                  <span>{slotMinutes} minutes</span>
                  <span>Video or phone</span>
                </div>
              </div>

              <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-border bg-background p-4 shadow-sm sm:p-6 md:p-8">
                {loadError ? (
                  <div className="py-8 text-center">
                    <h2 className="text-xl font-semibold text-foreground">
                      Online booking is temporarily unavailable
                    </h2>
                    <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                      The live scheduling service is not returning available
                      times. Try again, or email us with your role or
                      organization and what you want to learn or improve so we
                      can find a time together.
                    </p>
                    <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
                      <Button onClick={() => void loadSlots()}>
                        Try again
                      </Button>
                      <Button variant="outline" asChild>
                        <a href="mailto:hello@easeintoai.co?subject=Conversation%20with%20EaseIntoAI&body=Role%20or%20organization%3A%0A%0AWhat%20I%20want%20to%20learn%20or%20improve%3A%0A%0APreferred%20next%20step%3A">
                          Email to schedule
                        </a>
                      </Button>
                    </div>
                  </div>
                ) : selected ? (
                  <div className="mx-auto max-w-lg">
                    <button
                      type="button"
                      onClick={() => {
                        setSelected(null);
                        setSubmitError(null);
                      }}
                      className="mb-5 inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Pick a different time
                    </button>

                    <div className="mb-6 rounded-lg border border-accent/30 bg-accent/5 px-4 py-3">
                      <p className="text-sm text-muted-foreground">
                        You're booking
                      </p>
                      <p className="font-semibold text-foreground">
                        {formatSlotDateTime(selected, timeZone)}
                      </p>
                    </div>

                    <BookingForm
                      onSubmit={handleSubmit}
                      submitting={submitting}
                      error={submitError}
                    />
                  </div>
                ) : (
                  <>
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                      <h2 className="text-lg font-semibold text-foreground">
                        Choose a time
                      </h2>
                      <TimezoneSelect value={timeZone} onChange={setTimeZone} />
                    </div>

                    <SlotPicker
                      slots={slots}
                      loading={loading}
                      timeZone={timeZone}
                      selected={selected}
                      onSelect={setSelected}
                    />
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
