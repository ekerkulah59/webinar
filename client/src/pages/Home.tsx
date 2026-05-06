import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  CheckCircle2,
  ArrowRight,
  Mail,
  Award,
  ChevronDown,
} from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import AboutSection from "@/components/AboutSection";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogPosts, CATEGORIES } from "@/lib/blogData";
import { pastWebinars } from "@/lib/webinarData";

const GOOGLE_FORM_URL = "https://forms.gle/LCyyQECaFynLEy596";
/** Newsletter signup form – "Our Newsletter" (Option A). */
const NEWSLETTER_FORM_URL = "https://forms.gle/2f8fNRdqP7yjC5Gc9";


// ─── Countdown Hook ──────────────────────────────────────────────
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = targetDate.getTime() - new Date().getTime();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return timeLeft;
}

// ─── Countdown Display ───────────────────────────────────────────
function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  const blocks = [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Min" },
    { value: seconds, label: "Sec" },
  ];

  return (
    <div className="flex gap-3 justify-center">
      {blocks.map((block) => (
        <div key={block.label} className="text-center">
          <div className="w-16 h-16 bg-accent/10 border border-accent/20 rounded-lg flex items-center justify-center mb-1">
            <span className="text-2xl font-bold text-accent">
              {String(block.value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            {block.label}
          </span>
        </div>
      ))}
    </div>
  );
}


// ─── Newsletter Section (Option A: Google Form) ───────────────────
function NewsletterSection() {
  const handleSubscribe = () => {
    window.open(NEWSLETTER_FORM_URL, "_blank", "noopener,noreferrer");
    toast.success("Opening signup form…");
  };

  return (
    <section className="py-24 bg-foreground">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="w-14 h-14 bg-background/10 rounded-2xl flex items-center justify-center mx-auto">
            <Mail className="w-7 h-7 text-background" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-background">
            Stay in the Loop
          </h2>
          <p className="text-lg text-background/70">
            Get notified about new webinars, resources, and insights on AI.
            No spam — just value.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2 justify-center">
            <Button
              type="button"
              onClick={handleSubscribe}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-3"
            >
              Subscribe
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <p className="text-xs text-background/40">
            Your privacy is respected. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ───────────────────────────────────────────────────
export default function Home() {
  const handleRegisterClick = () => {
    window.open(GOOGLE_FORM_URL, "_blank");
  };

  // Upcoming webinar: AI at Work — May 23, 2026
  const upcomingDate = new Date("2026-05-23T15:00:00Z");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* ── Hero Section ─────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[80px]" />
        </div>

        <div className="container py-24 md:py-36">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-medium shadow-md">
              <Award className="w-4 h-4" />
              AI Educator &amp; Builder
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-[1.1] tracking-tight">
              Making AI
              <br />
              <span className="text-accent">Accessible</span> to Everyone
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              I host practical, no-hype webinars that help everyday people
              understand and use artificial intelligence with confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                onClick={() =>
                  document
                    .getElementById("upcoming")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-3 text-base"
              >
                Register for Next Webinar
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={() =>
                  document
                    .getElementById("past-webinars")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                variant="outline"
                size="lg"
                className="font-semibold px-8 py-3 text-base border-border"
              >
                View Past Webinars
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </div>

          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── About Section ────────────────────────────────────── */}
      <AboutSection />

      <div className="section-divider" />

        {/* ── Upcoming Webinar ─────────────────────────────────── */}
        <section id="upcoming" className="py-24 bg-accent/8">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
              Don't Miss It
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Upcoming Webinar
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="overflow-hidden border-accent/20 shadow-lg">
              <div className="p-8 md:p-12 space-y-8">
                {/* Badge */}
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full uppercase tracking-wide">
                    May 23, 2026
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Webinar #6
                  </span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-foreground">
                    AI at Work: Using AI Confidently in Your Job (Without Getting in Trouble)
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    You've learned the tools. Now let's put them to work —
                    professionally. This session covers what's safe to share
                    with AI at work, the most useful workplace use cases, and
                    how to use AI output responsibly so you can move faster
                    without cutting corners.
                  </p>
                </div>

                {/* Event details */}
                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-accent" />
                    May 23, 2026
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent" />
                    Time in confirmation email
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    Online — join from anywhere
                  </span>
                </div>

                {/* Countdown */}
                <div className="py-6">
                  <CountdownTimer targetDate={upcomingDate} />
                </div>

                {/* What you'll learn */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    What to Expect
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "What's safe to share with AI at work — and what's not",
                      "AI for emails, reports, meeting summaries & brainstorming",
                      "How to use AI output responsibly in a professional setting",
                      "Build your own simple personal AI policy",
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2.5 text-sm text-foreground"
                      >
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <Button
                    onClick={handleRegisterClick}
                    size="lg"
                    className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-10 py-3 text-base"
                  >
                    Register Now
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3">
                    Free to attend. No spam. Unsubscribe anytime.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
      <div className="section-divider" />

      {/* ── Past Webinars Teaser ─────────────────────────────── */}
      <section id="past-webinars" className="py-24 bg-accent">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-sm font-semibold text-accent-foreground/70 uppercase tracking-widest">
              Track Record
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-accent-foreground">
              Past Webinars
            </h2>
            <p className="text-lg text-accent-foreground/80 leading-relaxed">
              {pastWebinars.length} sessions completed. 400+ attendees. Every session free, practical, and built for everyday people.
            </p>
            <div className="flex justify-center gap-10 py-4">
              {[
                { value: `${pastWebinars.length}`, label: "Sessions" },
                { value: "400+", label: "Attendees" },
                { value: "Free", label: "Always" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold text-accent-foreground">{stat.value}</p>
                  <p className="text-sm text-accent-foreground/70">{stat.label}</p>
                </div>
              ))}
            </div>
            <Link href="/past-webinars">
              <Button size="lg" className="font-semibold px-8 bg-accent-foreground text-accent hover:bg-accent-foreground/90">
                View All Past Webinars
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Latest Insights ──────────────────────────────────── */}
      <section className="py-24">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
                From the Blog
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Latest Insights
              </h2>
            </div>
            <Link href="/insights">
              <Button
                variant="outline"
                className="font-medium border-border"
              >
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post) => {
              const cat = CATEGORIES[post.category];
              return (
                <Link key={post.slug} href={`/insights/${post.slug}`}>
                  <Card className="overflow-hidden border-border/60 hover:border-accent/20 transition-colors cursor-pointer group h-full">
                    <div className="p-6 space-y-4 flex flex-col h-full">
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide ${cat.color}`}
                        >
                          {cat.label}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Newsletter / Final CTA ───────────────────────────── */}
      <NewsletterSection />

      <Footer />
    </div>
  );
}
