import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Award,
  ChevronDown,
  PlayCircle,
} from "lucide-react";
import { Link } from "wouter";
import AboutSection from "@/components/AboutSection";
import WhatWeCoverSection from "@/components/WhatWeCoverSection";
import FluencyFrameworkSection from "@/components/FluencyFrameworkSection";
import SafeCheckSection from "@/components/SafeCheckSection";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { LeadForm } from "@/components/LeadForm";
import { useSEO } from "@/hooks/useSEO";
import { blogPosts, CATEGORIES } from "@/lib/blogData";
import { pastWebinars } from "@/lib/webinarData";

/** Upcoming webinar metadata used for registration + countdown */
const UPCOMING_WEBINAR = {
  slug: "ai-for-women-entrepreneurs-july-2026",
  dateLabel: "July 22, 2026",
  startIso: "2026-07-22T12:00:00-04:00",
  timeLabel: "12:00 PM New York Time",
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

// ─── Main Page ───────────────────────────────────────────────────
export default function Home() {
  useSEO({
    title: "Practical AI for Women Entrepreneurs & Small Business Owners",
    description:
      "Free live webinars for women running a business and a family. Hand your admin to AI — in your voice — and get your evenings back.",
    url: "https://easeintoai.co/",
    type: "website",
  });

  const [videoUnavailable, setVideoUnavailable] = useState(false);
  const upcomingDate = new Date(UPCOMING_WEBINAR.startIso);
  const sessionCount = pastWebinars.length;
  const scrollToRegistration = () => {
    document.getElementById("upcoming")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Event",
          name: "Running the Business by Day and the House by Night? Let AI Take the Night Shift.",
          description:
            "A free live webinar for women founders: hand your evening admin to AI, in your own voice. No tech background needed.",
          startDate: UPCOMING_WEBINAR.startIso,
          eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "VirtualLocation",
            url: "https://easeintoai.co/#upcoming",
          },
          image: "https://easeintoai.co/og-image.png",
          organizer: {
            "@type": "Organization",
            name: "EaseIntoAI",
            url: "https://easeintoai.co/",
          },
          performer: { "@type": "Person", name: "Emmanuel Kerkulah" },
          isAccessibleForFree: true,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: "https://easeintoai.co/#upcoming",
          },
        }}
      />
      <Navigation />

      {/* ── Hero Section ─────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[80px]" />
        </div>

        <div className="container py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left: text content */}
            <div className="space-y-8 text-center md:text-left order-2 md:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-medium shadow-md">
                <Award className="w-4 h-4" />
                AI Education for Women Running a Business and a Household
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-[1.1] tracking-tight">
                You Didn&apos;t Start a Business to Spend{" "}
                <span className="text-accent">Bedtime</span> Answering
                Emails.
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">
                Free live webinars for women running a business and a family.
                Hand the invoices, follow-ups, and captions to AI. Get your
                evenings back. It still sounds like you. No jargon. No hype.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
                <Button
                  onClick={scrollToRegistration}
                  variant="primary"
                  size="lg"
                  className="px-8 py-3 text-base"
                >
                  Give Me My Evenings Back
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
                Hand off the busywork. Keep your voice.
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
                      <source src="/EaseIntoAI_Brand_Introduction_with_captions.mp4" type="video/mp4" />
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
                Live
              </p>
              <p className="mt-2 text-sm text-muted-foreground leading-snug">
                Practical webinar sessions
              </p>
            </div>

            <div className="flex flex-col items-center justify-center px-4 py-8 md:py-10 text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-accent-foreground">
                <img
                  src="/anthropic.svg"
                  alt="Anthropic logo"
                  className="h-4 w-4 object-contain"
                  loading="lazy"
                />
                Anthropic
              </span>
              <p className="mt-3 text-sm text-muted-foreground leading-snug">
                Framework reference for AI fluency principles
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
              <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-accent-foreground">
                <img
                  src="/dol.png"
                  alt="Department of Labor seal"
                  className="h-5 w-5 rounded-full bg-white object-cover"
                  loading="lazy"
                />
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

      {/* ── Community Testimonial ─────────────────────────────── */}
      <section className="py-16 bg-accent/[0.06]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">
              Community Feedback
            </p>
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
              Founders leave with more than notes. They leave with one piece
              of admin off their plate for good, in their own voice.
            </p>
            <Card className="border-accent/25 shadow-sm">
              <div className="p-8 md:p-10">
                <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
                  &ldquo;Emmanuel taught an AI session during our House Of Zion
                  fellowship anniversary, and I honestly loved how clear and
                  practical it was. He broke things down in a way that made me
                  feel confident instead of overwhelmed.&rdquo;
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                  Esther, House Of Zion
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <WhatWeCoverSection />

      <div className="section-divider" />

      <FluencyFrameworkSection />

      {/* ── Upcoming Webinar ─────────────────────────────────── */}
      <section id="upcoming" className="py-20 bg-accent/[0.06]">
        <div className="container">
          <div className="max-w-6xl mx-auto rounded-3xl border border-border/70 bg-background shadow-sm p-6 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr] lg:gap-10">
              <div>
                <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-accent">
                  Free AI Webinar
                </span>
                <h2 className="mt-4 text-3xl md:text-4xl font-bold text-foreground leading-tight max-w-3xl">
                  Running the Business by Day and the House by Night? Let AI Take the Night Shift.
                </h2>
                <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                  Sixty free minutes. Learn to hand your evening admin to AI — in your voice,
                  approved by you. No tech background needed.
                </p>

                <ul className="mt-8 divide-y divide-border/70 border-y border-border/70">
                  {[
                    {
                      title: "Spot the Time-Stealers",
                      text: "We'll find the exact tasks that are keeping you at your laptop when you should be with your family.",
                    },
                    {
                      title: "Build Your “Auto-Pilot”",
                      text: "We'll set up your forms and emails so they handle themselves — no more chasing down clients or retyping the same messages.",
                    },
                    {
                      title: "Keep It You",
                      text: "We'll train your AI to talk exactly like you, so your business stays personal — not robotic.",
                    },
                    {
                      title: "Fix It Live",
                      text: "Bring your most annoying admin task, and we'll build the solution for it together, right there on the call.",
                    },
                  ].map((item) => (
                    <li key={item.title} className="flex items-start gap-3 py-3.5">
                      <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-[15px] text-foreground leading-relaxed">
                        <span className="font-semibold">{item.title}:</span>{" "}
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 text-sm text-muted-foreground">
                  No jargon. No tech background required. You approve every word before it
                  goes out.
                </p>
              </div>

              <Card className="h-fit border-0 bg-accent text-accent-foreground shadow-xl">
                <div className="p-6 md:p-7 space-y-5">
                  <h3 className="text-xl font-bold leading-snug">
                    Lighten the Load, Session 1
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between gap-3 border-b border-accent-foreground/20 pb-2">
                      <span className="inline-flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {UPCOMING_WEBINAR.dateLabel}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3 border-b border-accent-foreground/20 pb-2">
                      <span className="inline-flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {UPCOMING_WEBINAR.timeLabel}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3 border-b border-accent-foreground/20 pb-2">
                      <span className="inline-flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Live on Zoom
                      </span>
                      <span className="rounded-full bg-background/15 px-2 py-0.5 text-xs font-semibold">
                        Free
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-accent-foreground/90">
                      <Clock className="w-4 h-4" />
                      <span>60 minutes incl. Q&amp;A</span>
                    </div>
                  </div>

                  <LeadForm
                    source="webinar"
                    webinarSlug={UPCOMING_WEBINAR.slug}
                    variant="inverted"
                    submitLabel="Save My Free Spot"
                    className="[&_button]:w-full"
                  />

                  <p className="text-xs text-accent-foreground/75">
                    100% free. Your Zoom link arrives by email, plus a text reminder before
                    the session.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <div className="section-divider" />

      {/* ── Past Webinars Teaser ─────────────────────────────── */}
      <section id="past-webinars" className="py-20 bg-accent">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-sm font-semibold text-accent-foreground/70 uppercase tracking-widest">
              Track Record
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-accent-foreground">
              Past Webinars
            </h2>
            <p className="text-lg text-accent-foreground/80 leading-relaxed">
              {pastWebinars.length} sessions completed. 100+ attendees. Every session takes a real task off your plate — in plain language.
            </p>
            <div className="flex justify-center gap-10 py-4">
              {[
                { value: `${pastWebinars.length}`, label: "Sessions" },
                { value: "100+", label: "Attendees" },
                { value: "Live", label: "Format" },
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
      <section className="py-20">
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

      <Footer />
    </div>
  );
}
