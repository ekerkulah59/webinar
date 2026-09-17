import { JsonLd } from "@/components/JsonLd";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/LeadForm";
const UPCOMING_WORKSHOP = {
  slug: "two-weeks-marketing-content-september-2026",
  title: "Stop Creating Content After Work",
  startsAt: "2026-09-10T20:00:00-04:00",
};
export default function WorkshopSection() {
  const [workshopIsUpcoming, setUpcoming] = useState(
    () => Date.now() < Date.parse(UPCOMING_WORKSHOP.startsAt)
  );
  useEffect(() => {
    const timer = window.setInterval(
      () => setUpcoming(Date.now() < Date.parse(UPCOMING_WORKSHOP.startsAt)),
      60000
    );
    return () => window.clearInterval(timer);
  }, []);
  return (
    <section
      id="upcoming"
      className="scroll-mt-24 border-y border-border bg-accent/[0.045] py-20"
      aria-labelledby="workshop-heading"
    >
      {workshopIsUpcoming && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Event",
            name: UPCOMING_WORKSHOP.title,
            startDate: UPCOMING_WORKSHOP.startsAt,
            eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            isAccessibleForFree: true,
            organizer: {
              "@type": "Organization",
              name: "EaseIntoAI",
              url: "https://easeintoai.co/",
            },
          }}
        />
      )}
      <div className="container">
        {workshopIsUpcoming ? (
          <div className="grid overflow-hidden rounded-2xl border border-border bg-background shadow-sm lg:grid-cols-[1.25fr_.75fr]">
            <div className="p-7 md:p-10 lg:p-12">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
                Upcoming live workshop
              </p>
              <h2
                id="workshop-heading"
                className="mt-4 text-4xl font-bold tracking-tight md:text-5xl"
              >
                {UPCOMING_WORKSHOP.title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Build two weeks of marketing content around your real business
                while preserving your voice, judgment, and final approval.
              </p>
              <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-foreground">
                <li>Thursday, September 10, 2026</li>
                <li>8:00 PM Eastern</li>
                <li>Live on Zoom · Free</li>
              </ul>
              <p className="mt-7 rounded-xl bg-secondary p-4 text-sm leading-relaxed text-muted-foreground">
                AI can help plan and draft. You review every piece for accuracy,
                relevance, voice, and customer trust before publishing.
              </p>
            </div>
            <aside className="bg-accent p-7 text-white md:p-9">
              <h3 className="text-2xl font-bold">Save your free spot</h3>

              <LeadForm
                source="webinar"
                webinarSlug={UPCOMING_WORKSHOP.slug}
                variant="inverted"
                submitLabel="Save My Free Spot"
                className="mt-6 [&_button]:w-full"
              />
            </aside>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
              Future workshops
            </p>
            <h2
              id="workshop-heading"
              className="mt-4 text-4xl font-bold tracking-tight md:text-5xl"
            >
              Get notified about the next live workshop.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Join the list for the next published workshop date, or explore the
              self-paced courses below.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild variant="primary">
                <a href="#newsletter">Get Workshop Updates</a>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/past-webinars">View Past Webinars</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
