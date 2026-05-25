import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Mail,
  Award,
  ChevronDown,
  PlayCircle,
} from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import AboutSection from "@/components/AboutSection";
import WhatWeCoverSection from "@/components/WhatWeCoverSection";
import FluencyFrameworkSection from "@/components/FluencyFrameworkSection";
import SafeCheckSection from "@/components/SafeCheckSection";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { LeadForm } from "@/components/LeadForm";
import { blogPosts, CATEGORIES } from "@/lib/blogData";
import { pastWebinars } from "@/lib/webinarData";

/** Upcoming webinar metadata used for registration + countdown */
const UPCOMING_WEBINAR = {
  slug: "ai-at-work-june-2026",
  dateLabel: "June 13, 2026",
  startIso: "2026-06-13T15:00:00-04:00",
  timeLabel: "3:00 PM ET",
};


// ─── Countdown Hook ──────────────────────────────────────────────
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = targetDate.getTime() - new Date().getTime();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isComplete: false,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

// ─── Countdown Display ───────────────────────────────────────────
function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const { days, hours, minutes, seconds, isComplete } = useCountdown(targetDate);

  const blocks = [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Min" },
    { value: seconds, label: "Sec" },
  ];

  if (isComplete) {
    return (
      <div className="rounded-xl border border-accent/25 bg-accent/8 px-5 py-4 text-center">
        <p className="text-base font-semibold text-foreground">Starting soon</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Registration is still open. Save your spot and we will send your Zoom details.
        </p>
      </div>
    );
  }

  return (
    <div className="flex gap-3 justify-center" aria-live="polite">
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


// ─── Newsletter Section ───────────────────────────────────────────
function NewsletterSection() {
  return (
    <section id="newsletter" className="py-24 bg-foreground">
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
          <div className="max-w-md mx-auto pt-2 text-left">
            <LeadForm
              source="newsletter"
              variant="inverted"
              submitLabel="Subscribe"
              onSuccess={() => toast.success("You're on the list!")}
            />
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
  const [videoUnavailable, setVideoUnavailable] = useState(false);
  const upcomingDate = new Date(UPCOMING_WEBINAR.startIso);
  const sessionCount = pastWebinars.length;

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

        <div className="container py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left: text content */}
            <div className="space-y-8 text-center md:text-left order-2 md:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-medium shadow-md">
                <Award className="w-4 h-4" />
                AI Educator &amp; Builder
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-[1.1] tracking-tight">
                AI Doesn&apos;t Have to Feel This{" "}
                <span className="text-accent">Overwhelming.</span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">
                EaseIntoAI hosts live, practical webinars that help everyday
                people understand artificial intelligence — clearly, honestly,
                and without the hype. No tech background. No jargon. Real
                questions answered.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
                <Button
                  onClick={() =>
                    document
                      .getElementById("upcoming")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  variant="primary"
                  size="lg"
                  className="px-8 py-3 text-base"
                >
                  Register for the Next Webinar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  onClick={() =>
                    document
                      .getElementById("past-webinars")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  variant="secondary"
                  size="lg"
                  className="px-8 py-3 text-base"
                >
                  Browse Past Sessions
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Right: brand intro video (visible on all breakpoints — replaces stock collage) */}
            <div className="relative order-1 md:order-2 flex flex-col justify-center w-full max-w-[540px] mx-auto md:mx-0 md:justify-self-end">
              <p className="text-center md:text-left text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                See what EaseIntoAI is about
              </p>
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-border/30 bg-card ring-1 ring-black/5">
                <div className="aspect-video w-full">
                  {!videoUnavailable ? (
                    <video
                      className="h-full w-full object-cover"
                      controls
                      playsInline
                      preload="none"
                      poster="/hero-video-poster.svg"
                      aria-label="EaseIntoAI introduction video"
                      onError={() => setVideoUnavailable(true)}
                    >
                      <source src="/EaseIntoAI.mp4" type="video/mp4" />
                    </video>
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-800 to-accent/70 text-white p-6 flex flex-col justify-between">
                      <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                        Preview
                      </div>
                      <div>
                        <PlayCircle className="w-10 h-10 mb-3 text-white/90" aria-hidden />
                        <p className="text-lg font-semibold">Intro video is coming soon</p>
                        <p className="mt-2 text-sm text-white/80">
                          Register now and join live to get the full walkthrough.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Trust Bar ────────────────────────────────────────── */}
      <div className="border-y border-border bg-accent/[0.07]">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border">
            <div className="flex flex-col items-center justify-center px-4 py-8 md:py-10 text-center">
              <p className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                Free
              </p>
              <p className="mt-2 text-sm text-muted-foreground leading-snug">
                Always. No credit card.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center px-4 py-8 md:py-10 text-center">
              <p className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                100+
              </p>
              <p className="mt-2 text-sm text-muted-foreground leading-snug">
                Attendees across {sessionCount} sessions
              </p>
            </div>

            <div className="flex flex-col items-center justify-center px-4 py-8 md:py-10 text-center">
              <p className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                {sessionCount}
              </p>
              <p className="mt-2 text-sm text-muted-foreground leading-snug">
                Sessions completed
              </p>
            </div>

            <div className="col-span-2 lg:col-span-1 flex flex-col items-center justify-center px-4 py-8 md:py-10 text-center">
              <span className="inline-block rounded-full bg-accent px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-accent-foreground">
                DOL Aligned
              </span>
              <p className="mt-3 max-w-[220px] text-sm text-muted-foreground leading-snug">
                Curriculum aligned with the U.S. Department of Labor&apos;s AI
                Literacy Framework (2026)
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section-divider" />

      {/* ── About Section ────────────────────────────────────── */}
      <AboutSection />

      <div className="section-divider" />

      <WhatWeCoverSection />

      <div className="section-divider" />

      <FluencyFrameworkSection />

     

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
            <Card className="overflow-hidden border-accent/20 shadow-lg surface-card">
              <div className="p-8 md:p-12 space-y-8">
                {/* Badge */}
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full uppercase tracking-wide">
                    {UPCOMING_WEBINAR.dateLabel}
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
                    {UPCOMING_WEBINAR.dateLabel}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent" />
                    {UPCOMING_WEBINAR.timeLabel}
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

                {/* Registration */}
                <div className="pt-4 border-t border-border/60">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                    Reserve your spot
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Zoom link and calendar invite are sent right after registration.
                  </p>
                  <LeadForm
                    source="webinar"
                    webinarSlug={UPCOMING_WEBINAR.slug}
                    submitLabel="Register Now"
                    onSuccess={() => toast.success("You're registered!")}
                  />
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
              {pastWebinars.length} sessions completed. 100+ attendees. Every session free, practical, and built for everyday people.
            </p>
            <div className="flex justify-center gap-10 py-4">
              {[
                { value: `${pastWebinars.length}`, label: "Sessions" },
                { value: "100+", label: "Attendees" },
                { value: "Free", label: "Always" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold text-accent-foreground">{stat.value}</p>
                  <p className="text-sm text-accent-foreground/70">{stat.label}</p>
                </div>
              ))}
            </div>
            <Link href="/past-webinars">
              <Button size="lg" variant="secondary" className="font-semibold px-8">
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
              <Button variant="secondary" className="font-medium">
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
                  <Card className="overflow-hidden border-border/60 surface-card surface-card-hover cursor-pointer group h-full">
                    <div className="h-36 bg-gradient-to-br from-accent/15 via-accent/8 to-transparent border-b border-border/60" aria-hidden />
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
