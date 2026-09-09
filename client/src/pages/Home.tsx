import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { LeadForm } from "@/components/LeadForm";
import Navigation from "@/components/Navigation";
import ProcessInfographicSection from "@/components/ProcessInfographicSection";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/blogData";
import { courses } from "@/lib/courseData";
import { pastWebinars } from "@/lib/webinarData";
import { useSEO } from "@/hooks/useSEO";

const UPCOMING_WORKSHOP = {
  slug: "two-weeks-marketing-content-september-2026",
  title: "Stop Creating Content After Work",
  startsAt: "2026-09-10T20:00:00-04:00",
  timeZone: "America/New_York",
};

const ownerAudiences = [
  "Salons, spas, and barbershops",
  "Coaches, consultants, and therapists",
  "Boutiques and product businesses",
  "Event, rental, and photography businesses",
  "Local trades and service companies",
  "Women running a business alongside a full-time job",
];

// Owner-first. Organizations are a channel, not a co-equal audience, so they
// are handled by one quiet line further down rather than a third card here.
const pathways = [
  {
    eyebrow: "Start here",
    title: "Get one thing running in my business",
    copy: "Bring the task you redo every week. We build it into a process with you, in plain language, using your own words and examples — and you approve anything that goes out under your name.",
    ctaLabel: "See the Pilot",
    href: "/pilot",
    external: false,
    variant: "primary",
    featured: true,
  },
  {
    eyebrow: "Not ready to commit",
    title: "Learn it myself first",
    copy: "Self-paced courses in plain language: what AI is genuinely good at, how to ask for what you actually want, and how to spot the answers you should not trust. One of them is free.",
    ctaLabel: "See the courses",
    href: "/courses",
    external: false,
    variant: "secondary",
    featured: false,
  },
  {
    eyebrow: "Rather not do it yourself",
    title: "Have it built for me",
    copy: "An AI receptionist for the questions that come in after hours, a website that actually books people, or the follow-ups that keep getting forgotten. We build it and hand it over working.",
    ctaLabel: "See done-for-you",
    href: "/pilot#done-for-you",
    external: true,
    variant: "secondary",
    featured: false,
  },
] as const;

const solutions = [
  {
    number: "01",
    title: "Learn what AI is actually good for",
    copy: "Clear learning experiences that show where AI helps, how to give it direction, and how to judge what comes back before you rely on it.",
    examples: [
      "Workshops and webinars",
      "Cohort-based programs",
      "Workforce AI literacy",
      "Small-business AI readiness",
      "Role-based training",
    ],
  },
  {
    number: "02",
    title: "Get repeated work off your plate",
    copy: "Turn the drafting and setup you rebuild every week into a process that runs on your own approved information, with clear steps and a review point before anything goes out.",
    examples: [
      "Custom AI Assistants",
      "Content and communication workflows",
      "Internal knowledge assistants",
      "Customer-response systems",
      "Administrative automation",
    ],
  },
  {
    number: "03",
    title: "Have it built for you",
    copy: "If you would rather not build it yourself, we build the piece you need and hand it over working — then show you how to run it without calling us every time.",
    examples: [
      "AI receptionist",
      "Website that books people",
      "Follow-up automation",
      "Custom AI Assistants",
      "Customer-response systems",
    ],
  },
];

function Countdown({ startsAt }: { startsAt: string }) {
  const target = useMemo(() => new Date(startsAt).getTime(), [startsAt]);
  const [remaining, setRemaining] = useState(() =>
    Math.max(0, target - Date.now())
  );

  useEffect(() => {
    const timer = window.setInterval(
      () => setRemaining(Math.max(0, target - Date.now())),
      1000
    );
    return () => window.clearInterval(timer);
  }, [target]);

  const parts = [
    [Math.floor(remaining / 86_400_000), "Days"],
    [Math.floor((remaining / 3_600_000) % 24), "Hours"],
    [Math.floor((remaining / 60_000) % 60), "Min"],
    [Math.floor((remaining / 1_000) % 60), "Sec"],
  ] as const;

  return (
    <div
      className="grid grid-cols-4 gap-2"
      aria-label="Time remaining until the workshop"
      aria-live="polite"
    >
      {parts.map(([value, label]) => (
        <div
          key={label}
          className="rounded-lg bg-white/10 px-2 py-3 text-center"
        >
          <p className="text-xl font-bold">{String(value).padStart(2, "0")}</p>
          <p className="mt-1 text-[10px] uppercase tracking-wider text-white/65">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  useSEO({
    title: "Practical AI for Small-Business Owners",
    description:
      "Get AI actually working in your business without the tech overwhelm. EaseIntoAI starts with the work you already repeat every week, builds the process with you, and keeps you in control of what goes out.",
    url: "https://easeintoai.co/",
    type: "website",
  });

  const workshopDate = useMemo(() => new Date(UPCOMING_WORKSHOP.startsAt), []);
  const [workshopIsUpcoming, setWorkshopIsUpcoming] = useState(
    () => Date.now() < workshopDate.getTime()
  );
  const availableCourses = courses.filter(
    course => course.status === "available"
  );

  useEffect(() => {
    const updateWorkshopState = () =>
      setWorkshopIsUpcoming(Date.now() < workshopDate.getTime());
    const timer = window.setInterval(updateWorkshopState, 60_000);
    return () => window.clearInterval(timer);
  }, [workshopDate]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "EaseIntoAI",
          url: "https://easeintoai.co/",
          email: "hello@easeintoai.co",
          description:
            "Practical AI help for small-business owners: plain-language education and hands-on implementation that starts with the work you already do, with a person responsible for what goes out.",
        }}
      />
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
      <Navigation />

      <main>
        <section
          className="border-b border-border"
          aria-labelledby="home-heading"
        >
          <div className="container grid gap-10 py-14 md:py-20 lg:grid-cols-[1fr_.96fr] lg:items-center lg:gap-16 lg:py-16">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.17em] text-accent">
                For small-business owners
              </p>
              <h1
                id="home-heading"
                className="mt-5 max-w-2xl text-balance text-[1.75rem] font-bold leading-[1.12] tracking-[-0.035em] text-foreground sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.06]"
              >
                Get AI actually working in your business — without the tech
                overwhelm.
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                Plain-language help that starts with your real work, builds the
                system with you, and keeps you in control. You bring the task
                you redo every week. You leave with it running.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  variant="primary"
                  size="lg"
                  className="h-auto min-h-12 w-full whitespace-normal px-6 py-3 text-center sm:w-auto"
                >
                  <Link href="/pilot">
                    See the Pilot <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
              </div>
              <p className="mt-7 text-balance text-sm font-semibold text-muted-foreground">
                <span className="whitespace-nowrap">
                  No technical background needed <span aria-hidden>·</span>
                </span>{" "}
                <span className="whitespace-nowrap">
                  Built around work you already do <span aria-hidden>·</span>
                </span>{" "}
                <span className="whitespace-nowrap">
                  You approve everything before it goes out
                </span>
              </p>
              {/*
                The organizations door. Deliberately one quiet line, not a
                second headline or a co-equal button — chambers, libraries and
                workforce boards are a channel to owners, not the buyer this
                page is written for.
              */}
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                With a chamber, library, nonprofit, or employer?{" "}
                <Link
                  href="/for-organizations"
                  className="font-semibold text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
                >
                  Bring this to your members
                </Link>
                .
              </p>
            </div>

            {/*
              POSITIONING NOTE — this image is a deliberate keep, not a
              placeholder. It is the strongest credibility asset for
              organizational buyers (facilitation, a real deliverable, a broad
              range of ages and backgrounds), but it is unambiguously a group,
              which costs relevance with solo professionals and owners.
              Swapping it for a solo-at-a-laptop shot would invert the problem
              rather than solve it, so the balance is corrected in copy instead:
              the hero subline ends by naming the solo cases explicitly, and the
              three pathway cards carry equal visual weight.
            */}
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
              <img
                src="/practical-ai-workshop.png"
                alt="A facilitator points to a process map while three professionals work through it together at a table with laptops"
                width="1536"
                height="1024"
                className="aspect-[4/3] h-full w-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </section>

        <section
          id="pathways"
          className="scroll-mt-24 py-12 md:py-16"
          aria-labelledby="pathways-heading"
        >
          <div className="container">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
              Where to start
            </p>
            <h2
              id="pathways-heading"
              className="mt-3 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl"
            >
              Three ways in. Most owners want the first one.
            </h2>

            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {pathways.map(
                ({
                  eyebrow,
                  title,
                  copy,
                  ctaLabel,
                  href,
                  external,
                  variant,
                  featured,
                }) => (
                  <article
                    key={title}
                    className={`flex flex-col rounded-2xl border p-7 transition-colors md:p-8 ${featured ? "border-accent bg-accent/[0.06] shadow-sm md:-my-2 md:py-10" : "border-border hover:border-accent/45"}`}
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
                      {eyebrow}
                    </p>
                    <h3 className="mt-3 text-2xl font-bold leading-snug tracking-tight">
                      {title}
                    </h3>
                    <p className="mt-4 flex-1 leading-relaxed text-muted-foreground">
                      {copy}
                    </p>
                    <Button
                      asChild
                      variant={variant}
                      className="mt-7 self-start"
                    >
                      {external ? (
                        <a href={href}>
                          {ctaLabel}{" "}
                          <ArrowRight className="h-4 w-4" aria-hidden />
                        </a>
                      ) : (
                        <Link href={href}>
                          {ctaLabel}{" "}
                          <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                      )}
                    </Button>
                  </article>
                )
              )}
            </div>
          </div>
        </section>

        <ProcessInfographicSection />

        <section
          id="solutions"
          className="scroll-mt-24 border-y border-border py-20 md:py-28"
          aria-labelledby="solutions-heading"
        >
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_.8fr] lg:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
                  What we do
                </p>
                <h2
                  id="solutions-heading"
                  className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl"
                >
                  Understand it. Apply it. Or hand it over.
                </h2>
              </div>
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                Every engagement starts with one task you actually do, then
                builds the skill, the process, and the review step that make it
                hold up.
              </p>
            </div>

            <div className="mt-12 grid gap-0 lg:grid-cols-3">
              {solutions.map(({ number, title, copy, examples }, index) => (
                <article
                  key={title}
                  className={`border border-border p-7 md:p-9 ${index === 0 ? "rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none" : "border-t-0 lg:border-l-0 lg:border-t"} ${index === 2 ? "rounded-b-2xl bg-[#171663] text-white lg:rounded-bl-none lg:rounded-r-2xl" : "bg-background"}`}
                >
                  <span
                    className={`text-sm font-bold ${index === 2 ? "text-indigo-200" : "text-accent"}`}
                  >
                    {number}
                  </span>
                  <h3
                    className={`mt-6 text-3xl font-bold ${index === 2 ? "text-white" : "text-foreground"}`}
                  >
                    {title}
                  </h3>
                  <p
                    className={`mt-4 leading-relaxed ${index === 2 ? "text-white/75" : "text-muted-foreground"}`}
                  >
                    {copy}
                  </p>
                  <ul
                    className={`mt-7 list-disc space-y-2.5 border-t pl-5 pt-6 text-sm ${index === 2 ? "border-white/15 text-white/80" : "border-border text-foreground"}`}
                  >
                    {examples.map(example => (
                      <li key={example}>{example}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div
              id="business-solutions"
              className="mt-10 flex flex-col gap-4 rounded-2xl bg-accent/[0.055] p-6 sm:flex-row sm:items-center sm:justify-between md:p-8"
            >
              <div>
                <h3 className="text-xl font-bold">
                  Ready to get one thing running?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  The Pilot is the paid starting point: bring one repeated task,
                  build it into a process with us, keep the approval.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Button asChild variant="secondary">
                  <Link href="/courses">Learn it myself</Link>
                </Button>
                <Button asChild variant="primary">
                  <Link href="/pilot">
                    See the Pilot <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24" aria-labelledby="proof-heading">
          <div className="container grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
                A growing foundation
              </p>
              <h2
                id="proof-heading"
                className="mt-4 text-4xl font-bold tracking-tight md:text-5xl"
              >
                Early, and honest about it.
              </h2>
              <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">
                We are not going to show you a wall of testimonials we do not
                have. Here is what exists so far.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-4">
                <div className="border-l-2 border-accent pl-4">
                  <p className="text-3xl font-bold">{pastWebinars.length}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    live sessions taught
                  </p>
                </div>
                <div className="border-l-2 border-accent pl-4">
                  <p className="text-3xl font-bold">
                    {availableCourses.length}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    self-paced courses you can start today
                  </p>
                </div>
              </div>
            </div>
            <blockquote className="rounded-2xl border border-accent/20 bg-accent/[0.05] p-7 md:p-10">
              <p className="text-xl font-semibold leading-relaxed md:text-2xl">
                “Emmanuel taught an AI session during our House Of Zion
                fellowship anniversary, and I honestly loved how clear and
                practical it was. He broke things down in a way that made me
                feel confident instead of overwhelmed.”
              </p>
              <footer className="mt-5 text-sm text-muted-foreground">
                Esther, House Of Zion
              </footer>
              <Link
                href="/results"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent"
              >
                See recaps and case studies{" "}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </blockquote>
          </div>
        </section>

        <section
          id="who-we-help"
          className="scroll-mt-24 bg-[#071027] py-20 text-white md:py-28"
          aria-labelledby="who-heading"
        >
          <div className="container">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-indigo-300">
              Who we help
            </p>
            <h2
              id="who-heading"
              className="mt-4 text-5xl font-bold md:text-6xl"
            >
              You&apos;ve probably already tried this alone.
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/65">
              You opened a chatbot, typed something in, got back a paragraph
              that did not sound like you, and closed the tab. That is the
              normal experience. It is also a solvable one.
            </p>
            <ul className="mt-11 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {ownerAudiences.map(item => (
                <li
                  key={item}
                  className="border-t border-white/15 pt-4 text-white/85"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-9 max-w-3xl leading-relaxed text-white/55">
              If you run something small and the admin keeps eating the hours
              you wanted for the actual work, you are who this is built for.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-[#071027] hover:bg-white/90"
              >
                <Link href="/pilot">
                  See the Pilot <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Link
                href="/for-organizations"
                className="text-sm font-semibold text-indigo-200 hover:text-white"
              >
                Serving business owners as an organization? Start here
              </Link>
            </div>
          </div>
        </section>

        <AboutSection />

        <section
          id="upcoming"
          className="scroll-mt-24 border-y border-border bg-accent/[0.045] py-20"
          aria-labelledby="workshop-heading"
        >
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
                    Build two weeks of marketing content around your real
                    business while preserving your voice, judgment, and final
                    approval.
                  </p>
                  <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-foreground">
                    <li>Thursday, September 10, 2026</li>
                    <li>8:00 PM Eastern</li>
                    <li>Live on Zoom · Free</li>
                  </ul>
                  <p className="mt-7 rounded-xl bg-secondary p-4 text-sm leading-relaxed text-muted-foreground">
                    AI can help plan and draft. You review every piece for
                    accuracy, relevance, voice, and customer trust before
                    publishing.
                  </p>
                </div>
                <aside className="bg-accent p-7 text-white md:p-9">
                  <h3 className="text-2xl font-bold">Save your free spot</h3>
                  <div className="mt-5">
                    <Countdown startsAt={UPCOMING_WORKSHOP.startsAt} />
                  </div>
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
                  There is no workshop currently scheduled. Join the list for
                  future dates, or explore recordings and outcomes from
                  completed sessions.
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

        <section className="py-20" aria-labelledby="insights-heading">
          <div className="container">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
                  Insights
                </p>
                <h2
                  id="insights-heading"
                  className="mt-3 text-4xl font-bold tracking-tight"
                >
                  Practical ideas for the work you do
                </h2>
              </div>
              <Button asChild variant="secondary">
                <Link href="/insights">
                  Browse All Insights{" "}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </div>
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {blogPosts.slice(0, 3).map(post => (
                <article
                  key={post.slug}
                  className="border-t-2 border-accent pt-5"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
                    {post.category.replaceAll("-", " ")}
                  </p>
                  <h3 className="mt-3 text-xl font-bold leading-snug">
                    <Link
                      href={`/insights/${post.slug}`}
                      className="hover:text-accent"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/insights/${post.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-accent"
                  >
                    Read article <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="border-t border-border bg-accent/[0.045] py-20 md:py-24"
          aria-labelledby="home-cta-heading"
        >
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2
                id="home-cta-heading"
                className="text-3xl font-bold leading-tight tracking-tight md:text-5xl"
              >
                Pick the task you are tired of redoing.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                You do not need to know which tool to use, or how any of it
                works, before you start. That is the whole point.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  asChild
                  variant="primary"
                  size="lg"
                  className="h-auto min-h-12 w-full whitespace-normal px-6 py-3 text-center sm:w-auto"
                >
                  <Link href="/pilot">
                    See the Pilot <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="h-auto min-h-12 w-full whitespace-normal px-6 py-3 text-center sm:w-auto"
                >
                  <Link href="/book">Book a short call</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
