import { useCallback, useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { CalendarX, Loader2, Video, Phone, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSEO } from "@/hooks/useSEO";
import { SlotPicker } from "@/components/booking/SlotPicker";
import { TimezoneSelect } from "@/components/booking/TimezoneSelect";
import {
  browserTimeZone,
  cancelAppointment,
  formatSlotDateTime,
  getAppointment,
  getSlots,
  rescheduleAppointment,
  type AppointmentDetail,
  type Slot,
} from "@/lib/appointments";

/**
 * Cancel / reschedule, reached from the link in the confirmation email.
 * The token in the URL is the authorization — 48 hex chars, unguessable.
 */
export default function ManageAppointment() {
  const [, params] = useRoute("/appointment/:token");
  const token = params?.token ?? "";

  useSEO({
    title: "Manage Your Appointment",
    description: "Reschedule or cancel your booked call.",
    type: "website",
  });

  const [appointment, setAppointment] = useState<AppointmentDetail | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeZone, setTimeZone] = useState(browserTimeZone);
  const [working, setWorking] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);

  const [rescheduling, setRescheduling] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setAppointment(await getAppointment(token));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Couldn't load that appointment."
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) void load();
  }, [token, load]);

  const startReschedule = async () => {
    setRescheduling(true);
    setSlotsLoading(true);
    try {
      const result = await getSlots();
      setSlots(result.slots);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't load times.");
    } finally {
      setSlotsLoading(false);
    }
  };

  const confirmReschedule = async () => {
    if (!selected) return;
    setWorking(true);
    setError(null);
    try {
      await rescheduleAppointment(token, selected);
      setRescheduling(false);
      setSelected(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't reschedule.");
    } finally {
      setWorking(false);
    }
  };

  const confirmCancel = async () => {
    setWorking(true);
    setError(null);
    try {
      await cancelAppointment(token);
      await load();
      setCancelOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't cancel.");
    } finally {
      setWorking(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-32 w-full rounded-xl" />
              </div>
            ) : !appointment ? (
              <div className="rounded-xl border border-border bg-muted/30 px-6 py-10 text-center">
                <CalendarX
                  className="mx-auto mb-3 h-8 w-8 text-muted-foreground"
                  aria-hidden="true"
                />
                <p className="font-medium text-foreground">
                  {error ?? "We couldn't find that appointment."}
                </p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link href="/book">Book a new time</Link>
                </Button>
              </div>
            ) : appointment.status === "cancelled" ? (
              <div className="rounded-xl border border-border bg-muted/30 px-6 py-10 text-center">
                <h1 className="text-2xl font-bold text-foreground">
                  This appointment is cancelled
                </h1>
                <p className="mt-2 text-muted-foreground">
                  It was set for{" "}
                  {formatSlotDateTime(appointment.startsAt, timeZone)}.
                </p>
                <Button className="mt-5" asChild>
                  <Link href="/book">Book a new time</Link>
                </Button>
              </div>
            ) : rescheduling ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setRescheduling(false);
                    setSelected(null);
                  }}
                  className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Keep my current time
                </button>

                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <h1 className="text-xl font-semibold text-foreground">
                    Pick a new time
                  </h1>
                  <TimezoneSelect value={timeZone} onChange={setTimeZone} />
                </div>

                <SlotPicker
                  slots={slots}
                  loading={slotsLoading}
                  timeZone={timeZone}
                  selected={selected}
                  onSelect={setSelected}
                />

                {error && (
                  <p className="mt-4 text-sm text-destructive">{error}</p>
                )}

                {selected && (
                  <div className="mt-6 rounded-lg border border-accent/30 bg-accent/5 p-4">
                    <p className="text-sm text-muted-foreground">Moving to</p>
                    <p className="font-semibold text-foreground">
                      {formatSlotDateTime(selected, timeZone)}
                    </p>
                    <Button
                      className="mt-3"
                      onClick={() => void confirmReschedule()}
                      disabled={working}
                    >
                      {working ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Moving…
                        </>
                      ) : (
                        "Confirm new time"
                      )}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  Your appointment
                </h1>

                <div className="mt-6 rounded-xl border border-border bg-muted/30 p-6">
                  <p className="text-lg font-semibold text-foreground">
                    {formatSlotDateTime(appointment.startsAt, timeZone)}
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    {appointment.meetingMode === "video" ? (
                      <>
                        <Video className="h-4 w-4" aria-hidden="true" />
                        Video call
                      </>
                    ) : (
                      <>
                        <Phone className="h-4 w-4" aria-hidden="true" />
                        We'll call you
                      </>
                    )}
                  </p>
                  {appointment.topic && (
                    <p className="mt-4 border-t border-border pt-4 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">
                        You wanted to talk about:
                      </span>{" "}
                      {appointment.topic}
                    </p>
                  )}
                </div>

                <div className="mt-4">
                  <TimezoneSelect value={timeZone} onChange={setTimeZone} />
                </div>

                {error && (
                  <p className="mt-4 text-sm text-destructive">{error}</p>
                )}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button
                    onClick={() => void startReschedule()}
                    disabled={working}
                  >
                    Reschedule
                  </Button>
                  <AlertDialog open={cancelOpen} onOpenChange={setCancelOpen}>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" disabled={working}>
                        Cancel appointment
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Cancel this appointment?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This will release your time for someone else. You can
                          book a new time later if your plans change.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel disabled={working}>
                          Keep appointment
                        </AlertDialogCancel>
                        <AlertDialogAction
                          disabled={working}
                          className="bg-destructive text-white hover:bg-destructive/90"
                          onClick={event => {
                            event.preventDefault();
                            void confirmCancel();
                          }}
                        >
                          {working ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Cancelling…
                            </>
                          ) : (
                            "Yes, cancel it"
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
