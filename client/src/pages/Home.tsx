import { useEffect, useId, useState } from "react";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  MapPin,
  PlayCircle,
  ShieldCheck,
} from "lucide-react";
import { Link } from "wouter";
import AboutSection from "@/components/AboutSection";
import CompactTeachingSection from "@/components/CompactTeachingSection";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { LeadForm } from "@/components/LeadForm";
import Navigation from "@/components/Navigation";
import ProcessInfographicSection from "@/components/ProcessInfographicSection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  blogPosts,
  EDITORIAL_CATEGORIES,
  formatPublishedDate,
  getEditorialCategory,
} from "@/lib/blogData";
import { pastWebinars } from "@/lib/webinarData";
import { useSEO } from "@/hooks/useSEO";

const UPCOMING_WEBINAR = {
  slug: "two-weeks-marketing-content-september-2026",
  startIso: "2026-09-10T20:00:00-04:00",
  timeZone: "America/New_York",
};

const upcomingDate = new Date(UPCOMING_WEBINAR.startIso);

const upcomingDateLabel = new Intl.DateTimeFormat("en-US", {
  timeZone: UPCOMING_WEBINAR.timeZone,
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
}).format(upcomingDate);

const upcomingTimeLabel = `${new Intl.DateTimeFormat("en-US", {
  timeZone: UPCOMING_WEBINAR.timeZone,
  hour: "numeric",
  minute: "2-digit",
}).format(upcomingDate)} Eastern Time`;

const industries = [
  {
    title: "Beauty and wellness",
    image: "/who-we-help/beauty-wellness.webp",
    imageAlt:
      "Black woman hairstylist actively styling a client's natural hair in a professional salon",
    description:
      "Spend more time serving clients and less time recreating the work around every appointment.",
    examples: [
      "Service descriptions",
      "Client responses",
      "Appointment preparation",
      "Aftercare instructions",
      "Promotions and social content",
      "Policies and FAQs",
    ],
  },
  {
    title: "Events and rentals",
    image: "/who-we-help/events-rentals.webp",
    imageAlt:
      "Woman event-business owner reviewing table settings in a prepared venue",
    description:
      "Build consistent processes around inquiries, packages, planning, and customer communication.",
    examples: [
      "Quotes and proposals",
      "Package descriptions",
      "Event checklists",
      "Availability responses",
      "Contracts and follow-ups",
      "Promotional content",
    ],
  },
  {
    title: "Coaches and consultants",
    image: "/who-we-help/coaches-consultants.webp",
    imageAlt:
      "Woman consultant reviewing a client plan during a focused coaching conversation",
    description:
      "Use your limited business hours for your clients and expertise instead of rebuilding support materials.",
    examples: [
      "Session preparation",
      "Worksheets and exercises",
      "Client action plans",
      "Notes and summaries",
      "Proposals and follow-ups",
      "Educational content",
    ],
  },
  {
    title: "Authors and content creators",
    image: "/who-we-help/authors-creators.webp",
    imageAlt:
      "Black woman content creator recording an educational video in her studio",
    description:
      "Protect your voice while making the planning, organization, and promotion around your ideas easier.",
    examples: [
      "Research organization",
      "Outlines and scripts",
      "Launch planning",
      "Content repurposing",
      "Promotional campaigns",
      "Audience communication",
    ],
  },
  {
    title: "Local and product-based businesses",
    image: "/who-we-help/local-products.webp",
    imageAlt:
      "Woman product-business owner carefully packaging a customer order beside organized inventory",
    description:
      "Create clearer customer experiences and reusable processes without needing a large team.",
    examples: [
      "Product descriptions",
      "Customer questions",
      "Promotions",
      "Business procedures",
      "Order communication",
      "Content planning",
    ],
  },
];

type Industry = (typeof industries)[number];

function IndustryCard({
  industry,
  featured,
}: {
  industry: Industry;
  featured: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const examplesId = useId();

  return (
    <article
      tabIndex={0}
      className={`industry-card group ${featured ? "lg:col-span-2" : "lg:col-span-3"}`}
    >
      <div className="industry-card-media">
        <img
          src={industry.image}
          alt={industry.imageAlt}
          width={1200}
          height={800}
          loading="lazy"
          decoding="async"
          className="industry-card-image"
        />
        <div className="industry-card-image-shade" aria-hidden />
      </div>

      <div className="industry-card-summary">
        <div>
          <h3 className="text-xl font-bold text-foreground">
            {industry.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {industry.description}
          </p>
        </div>

        <div className="industry-card-cue" aria-hidden>
          <span>View task examples</span>
          <ArrowRight className="h-4 w-4" />
        </div>

        <button
          type="button"
          className="industry-card-toggle"
          aria-expanded={expanded}
          aria-controls={examplesId}
          onClick={() => setExpanded(current => !current)}
        >
          <span>{expanded ? "Hide examples" : "See examples"}</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>

        <div
          id={examplesId}
          hidden={!expanded}
          className="industry-card-touch-examples"
        >
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-foreground">
            {industry.examples.map(example => (
              <li key={example} className="flex items-start gap-2">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  aria-hidden
                />
                {example}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="industry-card-desktop-examples">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/70">
          AI-supported tasks
        </p>
        <h3 className="mt-2 text-2xl font-bold text-white">{industry.title}</h3>
        <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 text-sm text-white">
          {industry.examples.map(example => (
            <li key={example} className="flex items-start gap-2">
              <CheckCircle2
                className="mt-0.5 h-4 w-4 shrink-0 text-indigo-200"
                aria-hidden
              />
              {example}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

const learningOutcomes = [
  "Plan two weeks of content around your business goals and current offers.",
  "Give AI the business context it needs to produce more relevant drafts.",
  "Create and edit content that sounds natural, accurate, and like you.",
  "Organize your content so it is ready for final review and scheduling.",
  "Leave with a repeatable content-creation process you can use again.",
];

function useCountdown(targetDate: Date) {
  const calculate = () => {
    const difference = targetDate.getTime() - Date.now();
    if (difference <= 0)
      return { days: 0, hours: 0, minutes: 0, seconds: 0, complete: true };
    return {
      days: Math.floor(difference / 86_400_000),
      hours: Math.floor((difference / 3_600_000) % 24),
      minutes: Math.floor((difference / 60_000) % 60),
      seconds: Math.floor((difference / 1_000) % 60),
      complete: false,
    };
  };
  const [timeLeft, setTimeLeft] = useState(calculate);

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(calculate()), 1_000);
    return () => window.clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const timeLeft = useCountdown(targetDate);
  if (timeLeft.complete) {
    return (
      <p className="rounded-lg border border-accent-foreground/25 bg-background/10 px-4 py-3 text-center text-sm">
        Registration is still open. Save your spot for the live session.
      </p>
    );
  }
  return (
    <div
      className="grid grid-cols-4 gap-2"
      aria-label="Time remaining until the workshop"
      aria-live="polite"
    >
      {[
        [timeLeft.days, "Days"],
        [timeLeft.hours, "Hours"],
        [timeLeft.minutes, "Min"],
        [timeLeft.seconds, "Sec"],
      ].map(([value, label]) => (
        <div
          key={label}
          className="rounded-lg bg-background/10 px-2 py-3 text-center"
        >
          <p className="text-xl font-bold">{String(value).padStart(2, "0")}</p>
          <p className="mt-1 text-[10px] uppercase tracking-wider text-accent-foreground/70">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  useSEO({
    title: "Practical AI for Women Building Businesses While Working Full-Time",
    description:
      "EaseIntoAI helps non-technical women use practical AI to grow businesses around full-time jobs and full lives. Learn simple ways to reduce repetitive work without losing your voice or control.",
    url: "https://easeintoai.co/",
    type: "website",
  });

  const [videoUnavailable, setVideoUnavailable] = useState(false);
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Event",
          name: "Stop Creating Content After Work",
          description:
            "Build two weeks of marketing content in 90 minutes with practical AI while preserving your voice, judgment, and final control. A free beginner-friendly workshop for women building businesses around full-time jobs and full lives.",
          startDate: UPCOMING_WEBINAR.startIso,
          duration: "PT90M",
          eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "VirtualLocation",
            name: "Live on Zoom",
            url: "https://easeintoai.co/#upcoming",
          },
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

      <main>
        <section
          className="relative overflow-hidden"
          aria-labelledby="home-heading"
        >
          <div className="absolute inset-0 -z-10" aria-hidden>
            <div className="absolute right-0 top-10 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[120px]" />
            <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-accent/8 blur-[100px]" />
          </div>
          <div className="container py-14 md:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
              <div className="order-2 text-center lg:order-1 lg:text-left">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent sm:text-sm">
                  Practical AI for Non-Technical Women Building Businesses While
                  Working Full-Time
                </p>
                <h1
                  id="home-heading"
                  className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl"
                >
                  You Don’t Need to Be a Tech Person to Make AI Work for Your
                  Business.
                </h1>
                <p className="mt-6 text-xl font-semibold leading-snug text-foreground md:text-2xl">
                  You already worked a full day. Your business shouldn’t take
                  the rest of your night.
                </p>
                <div className="mx-auto mt-5 max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground lg:mx-0 md:text-lg">
                  <p>
                    Whether you style hair, provide spa services, decorate
                    events, manage rentals, coach, write, create content, or
                    sell products, EaseIntoAI helps you use simple AI tools for
                    the work surrounding your business—quotes, bookings,
                    customer responses, content, planning, follow-ups, and
                    everyday operations.
                  </p>
                  <p>
                    No complicated language. No endless list of tools. You bring
                    your business knowledge, and we help you turn it into
                    practical AI-supported workflows.
                  </p>
                </div>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                  <Button variant="primary" size="lg" asChild>
                    <a href="#who-we-help">
                      Show Me How AI Can Help My Business{" "}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </a>
                  </Button>
                  <Button variant="secondary" size="lg" asChild>
                    <a href="#upcoming">Join the Free Live Workshop</a>
                  </Button>
                </div>
                <p className="mt-6 text-sm font-medium text-muted-foreground">
                  No technical experience required <span aria-hidden>·</span>{" "}
                  Built around real businesses <span aria-hidden>·</span> You
                  remain in control
                </p>
              </div>

              <div className="order-1 mx-auto w-full max-w-[560px] lg:order-2 lg:justify-self-end">
                <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground lg:text-left">
                  Practical support for the hours you have
                </p>
                <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xl ring-1 ring-black/5">
                  <div className="aspect-video w-full">
                    {!videoUnavailable ? (
                      <video
                        className="h-full w-full object-cover"
                        controls
                        playsInline
                        preload="metadata"
                        poster="/hero-video-poster.svg"
                        aria-label="Introduction to EaseIntoAI"
                        onError={() => setVideoUnavailable(true)}
                      >
                        <source
                          src="/EaseIntoAI_Brand_Introduction_with_captions.mp4"
                          type="video/mp4"
                        />
                      </video>
                    ) : (
                      <div className="flex h-full flex-col justify-end bg-gradient-to-br from-slate-950 via-slate-800 to-indigo-700 p-6 text-white">
                        <PlayCircle className="mb-3 h-10 w-10" aria-hidden />
                        <p className="text-lg font-semibold">
                          Meet EaseIntoAI in the live workshop
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="who-we-help"
          className="scroll-mt-24 border-y border-border bg-accent/[0.045] py-20"
          aria-labelledby="who-heading"
        >
          <div className="container">
            <header className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-accent">
                Who We Help
              </p>
              <h2
                id="who-heading"
                className="mt-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl"
              >
                Different Businesses. The Same Challenge: Not Enough Hours.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Whether you work behind a salon chair, at an event venue, from a
                home office, or in front of a camera, EaseIntoAI helps reduce
                the repetitive work surrounding the part of your business that
                truly requires you.
              </p>
            </header>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
              {industries.map((industry, index) => (
                <IndustryCard
                  key={industry.title}
                  industry={industry}
                  featured={index < 3}
                />
              ))}
            </div>
            <div className="mt-10 text-center">
              <p className="text-lg font-semibold text-foreground">
                You don’t need to know which AI tool can do these things. That’s
                what EaseIntoAI helps you determine.
              </p>
              <Button className="mt-5" variant="primary" size="lg" asChild>
                <a href="#upcoming">
                  Find My First AI-Supported Task{" "}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20" aria-labelledby="problem-heading">
          <div className="container grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-accent">
                Why EaseIntoAI Exists
              </p>
              <h2
                id="problem-heading"
                className="mt-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl"
              >
                You’re Not Behind. You’re Building With Limited Hours.
              </h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  You may spend your day working for an employer and your
                  evenings serving clients, creating products, writing,
                  coaching, decorating events, managing rentals, or growing your
                  platform.
                </p>
                <p>
                  Then comes the work behind the business: quotes, bookings,
                  content, customer questions, preparation, policies,
                  follow-ups, documents, and planning.
                </p>
                <p>
                  The problem isn’t that you aren’t committed. You are already
                  using nearly every hour available to you.
                </p>
                <p>
                  EaseIntoAI helps you identify the repetitive work that does
                  not need to begin from scratch every time—and shows you, step
                  by step, how AI can help prepare it while you remain
                  responsible for the final result.
                </p>
              </div>
            </div>
            <blockquote className="rounded-2xl bg-foreground p-8 text-3xl font-bold leading-tight text-background shadow-xl md:p-10 md:text-4xl">
              “You bring the business knowledge. We make the AI understandable.”
            </blockquote>
          </div>
        </section>

        <ProcessInfographicSection />

        <section className="py-16" aria-labelledby="proof-heading">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-accent">
                Community Feedback
              </p>
              <h2 id="proof-heading" className="sr-only">
                What participants say
              </h2>
              <Card className="mt-6 border-accent/25 p-8 shadow-sm md:p-10">
                <blockquote className="text-xl font-medium leading-relaxed text-foreground md:text-2xl">
                  “Emmanuel taught an AI session during our House Of Zion
                  fellowship anniversary, and I honestly loved how clear and
                  practical it was. He broke things down in a way that made me
                  feel confident instead of overwhelmed.”
                </blockquote>
                <p className="mt-5 text-sm text-muted-foreground">
                  Esther, House Of Zion
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section
          id="upcoming"
          className="scroll-mt-24 bg-accent/[0.06] py-20"
          aria-labelledby="webinar-heading"
        >
          <div className="container">
            <div className="mx-auto grid max-w-6xl gap-8 rounded-3xl border border-border/70 bg-background p-6 shadow-sm lg:grid-cols-[1.65fr_1fr] lg:gap-10 md:p-10">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-accent">
                  Free Live Workshop · Content Without the Late Nights
                </p>
                <h2
                  id="webinar-heading"
                  className="mt-4 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl"
                >
                  Stop Creating Content After Work
                </h2>
                <p className="mt-5 max-w-3xl text-xl font-semibold leading-snug text-foreground md:text-2xl">
                  Build <span className="text-accent">two weeks</span> of
                  marketing content in{" "}
                  <span className="text-accent">90 minutes</span>
                  —with AI, without losing your voice.
                </p>
                <p className="mt-4 text-lg font-medium leading-relaxed text-foreground">
                  A practical, beginner-friendly workshop for women building
                  businesses around full-time jobs and full lives.
                </p>
                <div className="mt-5 space-y-4 leading-relaxed text-muted-foreground">
                  <p>
                    Your business needs consistent marketing, but creating
                    content after working all day can consume the little time
                    and energy you have left.
                  </p>
                  <p>
                    In this live workshop, you’ll use practical AI to plan,
                    draft, and organize two weeks of marketing content around
                    your real business, offers, and customers.
                  </p>
                  <p>
                    You won’t be handed generic prompts or asked to let AI speak
                    for your business. You’ll learn a repeatable process that
                    helps you create content more efficiently while keeping your
                    voice, judgment, and final approval.
                  </p>
                </div>
                <ul className="mt-7 space-y-3 border-y border-border py-6">
                  {learningOutcomes.map(outcome => (
                    <li
                      key={outcome}
                      className="flex gap-3 text-sm leading-relaxed md:text-base"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                        aria-hidden
                      />
                      {outcome}
                    </li>
                  ))}
                </ul>
                <aside
                  className="mt-6 rounded-2xl border border-accent/20 bg-accent/[0.05] p-5 md:p-6"
                  aria-labelledby="voice-callout-heading"
                >
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <ShieldCheck className="h-5 w-5" aria-hidden />
                    </div>
                    <div>
                      <h3
                        id="voice-callout-heading"
                        className="text-lg font-bold text-foreground"
                      >
                        Your Voice Stays in the Content
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                        AI can help you plan and draft, but you remain the
                        editor and decision-maker. You’ll review every piece for
                        accuracy, personality, relevance, and customer trust
                        before publishing it.
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-relaxed text-accent">
                        Your business context · Your judgment · Your final
                        approval
                      </p>
                    </div>
                  </div>
                </aside>
              </div>

              <Card className="h-fit border-0 bg-accent text-accent-foreground shadow-xl">
                <div className="space-y-5 p-6 md:p-7">
                  <h3 className="text-2xl font-bold">Save your free spot</h3>
                  <div className="space-y-3 text-sm">
                    <p className="flex items-center gap-2 border-b border-accent-foreground/20 pb-2">
                      <Calendar className="h-4 w-4" aria-hidden />
                      {upcomingDateLabel}
                    </p>
                    <p className="flex items-center gap-2 border-b border-accent-foreground/20 pb-2">
                      <Clock className="h-4 w-4" aria-hidden />
                      {upcomingTimeLabel}
                    </p>
                    <p className="flex items-center gap-2 border-b border-accent-foreground/20 pb-2">
                      <MapPin className="h-4 w-4" aria-hidden />
                      Live on Zoom · Free
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="h-4 w-4" aria-hidden />
                      90 minutes including Q&amp;A
                    </p>
                  </div>
                  <CountdownTimer targetDate={upcomingDate} />
                  <LeadForm
                    source="webinar"
                    webinarSlug={UPCOMING_WEBINAR.slug}
                    variant="inverted"
                    submitLabel="Save My Free Spot"
                    className="[&_button]:w-full"
                  />
                </div>
              </Card>
            </div>
          </div>
        </section>

        <CompactTeachingSection />
        <AboutSection />

        <section id="past-webinars" className="bg-accent py-20">
          <div className="container text-center text-accent-foreground">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-foreground/70">
              Past Webinars
            </p>
            <h2 className="mt-3 text-4xl font-bold md:text-5xl">
              Keep Learning in Plain Language
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-accent-foreground/80">
              Explore {pastWebinars.length} completed live sessions built to
              make practical AI feel approachable and useful.
            </p>
            <Button className="mt-7" variant="secondary" size="lg" asChild>
              <Link href="/past-webinars">
                View Past Webinars{" "}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </section>

        <section className="py-20" aria-labelledby="insights-heading">
          <div className="container">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-accent">
                  News &amp; Insights
                </p>
                <h2
                  id="insights-heading"
                  className="mt-3 text-4xl font-bold md:text-5xl"
                >
                  Practical Ideas for the Work You Do
                </h2>
              </div>
              <Button variant="secondary" asChild>
                <Link href="/insights">
                  View All <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {blogPosts.slice(0, 3).map(post => {
                const category =
                  EDITORIAL_CATEGORIES[getEditorialCategory(post)];
                return (
                  <Link
                    key={post.slug}
                    href={`/insights/${post.slug}`}
                    className="group"
                  >
                    <Card className="h-full p-6 surface-card surface-card-hover">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${category.color}`}
                      >
                        {category.label}
                      </span>
                      <h3 className="mt-5 text-lg font-bold leading-snug group-hover:text-accent">
                        {post.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </p>
                      <p className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground">
                        {formatPublishedDate(post.publishedAt)} ·{" "}
                        {post.readingTime}
                      </p>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
