import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { pastWebinars } from "@/lib/webinarData";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";

export default function PastWebinars() {
  useSEO({
    title: "Past AI Webinars",
    description:
      "Browse five completed EaseIntoAI webinars covering AI basics, tools, prompting, workflows, and fact-checking in plain language.",
    type: "website",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* ── Header ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest">
              Track Record
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Past Webinars
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              See the topics, practical exercises, and participant outcomes
              covered in earlier EaseIntoAI sessions.
            </p>
            <div className="flex justify-center gap-8 pt-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">
                  {pastWebinars.length}
                </p>
                <p className="text-sm text-muted-foreground">Sessions</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">100+</p>
                <p className="text-sm text-muted-foreground">
                  Recorded attendances
                </p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">Free</p>
                <p className="text-sm text-muted-foreground">Early Sessions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Webinar List ─────────────────────────────────────── */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            {pastWebinars.map(webinar => (
              <Card
                key={webinar.id}
                className="overflow-hidden border-border/60 hover:border-accent/30 transition-colors"
              >
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start gap-8">
                    {/* Left: Info */}
                    <div className="flex-1 space-y-5">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                          Completed
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Webinar #{webinar.id}
                        </span>
                      </div>

                      <h2 className="text-2xl font-bold text-foreground">
                        {webinar.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">
                        {webinar.description}
                      </p>

                      <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                        <span>{webinar.date}</span>
                        <span>{webinar.duration}</span>
                        <span>{webinar.attendees} attendees</span>
                      </div>
                    </div>

                    {/* Right: Outcomes */}
                    <div className="md:w-72 flex-shrink-0">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                        Key Outcomes
                      </p>
                      <ul className="list-disc space-y-2.5 pl-5">
                        {webinar.outcomes.map((outcome, idx) => (
                          <li key={idx} className="text-sm text-foreground">
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      Replay access was provided to registered attendees
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-2xl bg-accent/[0.06] p-8 text-center md:p-10">
            <h2 className="text-3xl font-bold tracking-tight">
              Ready for a current way to learn?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              Start with a self-paced course, or join the update list for the
              next live workshop.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild variant="primary">
                <Link href="/courses">
                  Start With a Course{" "}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <a href="/#newsletter">Get Workshop Updates</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
