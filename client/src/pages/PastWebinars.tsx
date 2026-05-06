import { Calendar, Clock, Users, CheckCircle2, Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { pastWebinars } from "@/lib/webinarData";

export default function PastWebinars() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* ── Header ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest">
              Track Record
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Past Webinars
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every session is designed to deliver real understanding, not just
              information. Browse the full archive below.
            </p>
            <div className="flex justify-center gap-8 pt-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">{pastWebinars.length}</p>
                <p className="text-sm text-muted-foreground">Sessions</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">400+</p>
                <p className="text-sm text-muted-foreground">Attendees</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">Free</p>
                <p className="text-sm text-muted-foreground">Always</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Webinar List ─────────────────────────────────────── */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            {pastWebinars.map((webinar) => (
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
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-accent" />
                          {webinar.date}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-accent" />
                          {webinar.duration}
                        </span>
                        <span className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-accent" />
                          {webinar.attendees} attendees
                        </span>
                      </div>
                    </div>

                    {/* Right: Outcomes */}
                    <div className="md:w-72 flex-shrink-0">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                        Key Outcomes
                      </p>
                      <ul className="space-y-2.5">
                        {webinar.outcomes.map((outcome, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-sm text-foreground"
                          >
                            <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border flex items-center gap-3">
                    <Play className="w-5 h-5 text-accent" />
                    <span className="text-sm text-muted-foreground">
                      Replay available for registered attendees
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
