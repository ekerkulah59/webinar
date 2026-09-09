import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";

const CONTACT = "hello@easeintoai.co";

/*
  ─────────────────────────────────────────────────────────────────────────────
  OFFER PLACEHOLDERS — fill these in before this page goes live.

  Everything in this block is deliberately unfinished. The page is built to
  hold the real offer; it does not invent one. Anything still wrapped in
  square brackets renders visibly on the page, so an unfinished field cannot
  ship by accident.
  ─────────────────────────────────────────────────────────────────────────────
*/

// TODO [PILOT_NAME]: confirm the final public name for the offer.
const PILOT_NAME = "Small Business AI Readiness Pilot";

// TODO [PILOT_PRICE]: set the real price signal, e.g. "$750" or "$750 · payment
// plan available". This string renders on the page exactly as written.
const PILOT_PRICE = "[PILOT_PRICE]";

// TODO [CTA_LINK]: swap in the real checkout or application URL when the pilot
// opens for enrollment. Until then this points at the booking page so the
// primary call-to-action is never a dead link.
const CTA_LINK = "/book";
const CTA_IS_EXTERNAL = /^https?:\/\//.test(CTA_LINK);

// TODO [PILOT_INCLUDES]: replace every line below with what an owner actually
// gets. Keep it concrete — a number of sessions, a named deliverable, a
// specific kind of support.
const PILOT_INCLUDES = [
  "[PILOT_INCLUDES — how many working sessions, and how long each one runs]",
  "[PILOT_INCLUDES — what we build together, named as a deliverable]",
  "[PILOT_INCLUDES — what you take away and keep using afterward]",
  "[PILOT_INCLUDES — what support looks like between sessions]",
  "[PILOT_INCLUDES — how long the whole thing takes, start to finish]",
];

// TODO: fill in the practical logistics.
const PILOT_FACTS = [
  ["Format", "[PILOT_INCLUDES — live online, in person, or both]"],
  ["Length", "[PILOT_INCLUDES — total weeks]"],
  ["Group size", "[PILOT_INCLUDES — cohort size, or one-to-one]"],
  ["Starts", "[PILOT_INCLUDES — next start date]"],
] as const;

const forYou = [
  "You run the business day to day — a salon, a studio, a shop, a practice, a service company.",
  "You have tried AI a few times, got something generic back, and quietly stopped.",
  "The same work keeps landing on your plate every week: the same replies, the same posts, the same quotes.",
  "You do not want to hand your customers to a robot. You want the busywork handled and the judgment kept.",
];

const notForYou = [
  "You want a tool recommendation list rather than something built around your work.",
  "You are looking for a way to publish work you have not read.",
  "You want AI to make pricing, hiring, legal, or medical calls on its own.",
];

const steps = [
  {
    title: "Bring one real task",
    copy: "Not a hypothetical. The thing you actually redo every week — the inquiry reply, the weekly post, the quote, the follow-up nobody has time for.",
  },
  {
    title: "We build it with you",
    copy: "You watch it get made, in plain language, using your own words and your own examples. No code. Nothing you cannot maintain yourself later.",
  },
  {
    title: "You keep the approval",
    copy: "Every meaningful output stops for a person. We teach you the SAFE Check so you can tell, quickly, whether something is fit to send under your name.",
  },
  {
    title: "You leave with it running",
    copy: "The pilot ends with a process working in your business — not a folder of notes about what you could try someday.",
  },
];

const doneForYou = [
  {
    title: "AI receptionist",
    copy: "Answer the routine questions that come in after hours — hours, location, availability, what a service includes — and hand the real conversations to you.",
    detail:
      "[PILOT_INCLUDES — what a receptionist build includes and what it costs]",
  },
  {
    title: "Website",
    copy: "A clear, fast site that says what you do, who you do it for, and how someone books you. Built to be updated by you, not held hostage by whoever made it.",
    detail:
      "[PILOT_INCLUDES — what a website build includes and what it costs]",
  },
  {
    title: "Follow-up automation",
    copy: "The messages that make you money and always get forgotten: the quote nobody chased, the customer who has not been back, the review never asked for.",
    detail:
      "[PILOT_INCLUDES — what a follow-up build includes and what it costs]",
  },
];

function PrimaryCta({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const classes = `h-auto min-h-12 w-full whitespace-normal px-6 py-3 text-center sm:w-auto ${className}`;

  return (
    <Button asChild variant="primary" size="lg" className={classes}>
      {CTA_IS_EXTERNAL ? (
        <a href={CTA_LINK} target="_blank" rel="noopener noreferrer">
          {children} <ArrowRight className="h-4 w-4" aria-hidden />
        </a>
      ) : (
        <Link href={CTA_LINK}>
          {children} <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      )}
    </Button>
  );
}

export default function Pilot() {
  useSEO({
    title: "Small Business AI Readiness Pilot",
    description:
      "A paid, hands-on pilot for small-business owners. Bring one task you repeat every week and leave with an AI-supported process running in your business, with you approving what goes out.",
    url: "https://easeintoai.co/pilot",
    type: "website",
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      {/*
        TODO: once [PILOT_PRICE] is set, add an "offers" block to this
        structured data. It is deliberately omitted rather than guessed —
        publishing a placeholder price in schema would put a fake number in
        search results.
      */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: PILOT_NAME,
          serviceType: "Small-business AI readiness program",
          provider: {
            "@type": "Organization",
            name: "EaseIntoAI",
            url: "https://easeintoai.co/",
          },
          description:
            "A hands-on pilot for small-business owners. Start with one repeated task, build an AI-supported process around it, and keep a person responsible for what goes out.",
        }}
      />
      <Navigation />

      <main>
        <section
          className="border-b border-border"
          aria-labelledby="pilot-heading"
        >
          <div className="container grid gap-10 py-14 md:py-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-16 lg:py-16">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.17em] text-accent">
                The paid place to start
              </p>
              <h1
                id="pilot-heading"
                className="mt-5 max-w-2xl text-balance text-[1.75rem] font-bold leading-[1.12] tracking-[-0.035em] text-foreground sm:text-4xl md:text-5xl lg:leading-[1.06]"
              >
                {PILOT_NAME}
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                Bring one task you redo every single week. Leave with it running
                as a process you own — built in plain language, in your voice,
                with you approving anything that goes out under your name.
              </p>

              <div className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <p className="text-3xl font-bold tracking-tight text-foreground">
                  {PILOT_PRICE}
                </p>
                <p className="text-sm font-semibold text-muted-foreground">
                  {/* TODO: replace with the real terms once pricing is set. */}
                  [PILOT_PRICE — payment terms, if any]
                </p>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <PrimaryCta>Join the Pilot</PrimaryCta>
              </div>

              <p className="mt-7 text-balance text-sm font-semibold text-muted-foreground">
                <span className="whitespace-nowrap">
                  No technical background needed <span aria-hidden>·</span>
                </span>{" "}
                <span className="whitespace-nowrap">
                  Built on your own work <span aria-hidden>·</span>
                </span>{" "}
                <span className="whitespace-nowrap">
                  Nothing goes out without your approval
                </span>
              </p>

              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Not sure it is the right fit?{" "}
                <Link
                  href="/book"
                  className="font-semibold text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
                >
                  Book a short call
                </Link>{" "}
                and we will tell you honestly.
              </p>
            </div>

            <div className="rounded-2xl border border-accent/25 bg-accent/[0.05] p-7 md:p-9">
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
                What is included
              </h2>
              <ul className="mt-6 space-y-4">
                {PILOT_INCLUDES.map(item => (
                  <li
                    key={item}
                    className="border-b border-accent/15 pb-4 text-[0.95rem] leading-relaxed text-foreground last:border-b-0 last:pb-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-accent/20 pt-6">
                {PILOT_FACTS.map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      {label}
                    </dt>
                    <dd className="mt-1.5 text-sm font-semibold leading-snug text-foreground">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24" aria-labelledby="fit-heading">
          <div className="container">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
                Honest fit
              </p>
              <h2
                id="fit-heading"
                className="mt-4 text-3xl font-bold leading-tight tracking-tight md:text-4xl"
              >
                This is for owners, not for people studying AI.
              </h2>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
              <div className="rounded-2xl border border-border p-7 md:p-9">
                <h3 className="text-lg font-bold">
                  You are in the right place if
                </h3>
                <ul className="mt-5 space-y-4">
                  {forYou.map(item => (
                    <li
                      key={item}
                      className="flex gap-3 leading-relaxed text-muted-foreground"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-secondary p-7 md:p-9">
                <h3 className="text-lg font-bold">
                  This is not the right fit if
                </h3>
                <ul className="mt-5 space-y-4">
                  {notForYou.map(item => (
                    <li
                      key={item}
                      className="flex gap-3 leading-relaxed text-muted-foreground"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/45"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-border pt-5 text-sm leading-relaxed text-muted-foreground">
                  If a course is the better starting point, we would rather send
                  you there.{" "}
                  <Link href="/courses" className="font-semibold text-accent">
                    See the self-paced courses
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="border-y border-border bg-accent/[0.04] py-20 md:py-24"
          aria-labelledby="how-heading"
        >
          <div className="container">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
                How the pilot runs
              </p>
              <h2
                id="how-heading"
                className="mt-4 text-3xl font-bold leading-tight tracking-tight md:text-4xl"
              >
                One task. Built with you. Yours to keep.
              </h2>
            </div>

            <ol className="mt-11 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {steps.map(({ title, copy }, index) => (
                <li
                  key={title}
                  className="rounded-2xl border border-border bg-background p-6 md:p-7"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                    {index + 1}
                  </span>
                  <h3 className="mt-5 text-lg font-bold leading-snug">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {copy}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-9 flex flex-col gap-4 rounded-2xl border border-accent/25 bg-background p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
              <p className="max-w-2xl leading-relaxed text-muted-foreground">
                <span className="font-bold text-foreground">
                  The method is the difference.
                </span>{" "}
                A free course teaches you about AI. This starts with your real
                work and keeps a human in control of it.
              </p>
              <Button asChild variant="secondary" className="shrink-0">
                <Link href="/how-it-works">
                  See how it works{" "}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section
          id="done-for-you"
          className="scroll-mt-24 py-20 md:py-24"
          aria-labelledby="dfy-heading"
        >
          <div className="container">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
                Or have it built for you
              </p>
              <h2
                id="dfy-heading"
                className="mt-4 text-3xl font-bold leading-tight tracking-tight md:text-4xl"
              >
                Some owners do not want to build it. They want it done.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                That is a fair answer. If you would rather hand this over, we
                build the piece you need and walk you through running it — so it
                stays yours, not something you have to call someone about every
                time it needs a change.
              </p>
            </div>

            <div className="mt-11 grid gap-5 md:grid-cols-3">
              {doneForYou.map(({ title, copy, detail }) => (
                <article
                  key={title}
                  className="flex flex-col rounded-2xl border border-border p-7 transition-colors hover:border-accent/45 md:p-8"
                >
                  <h3 className="text-2xl font-bold leading-snug tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-4 flex-1 leading-relaxed text-muted-foreground">
                    {copy}
                  </p>
                  <p className="mt-6 border-t border-border pt-5 text-sm leading-relaxed text-muted-foreground">
                    {detail}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-4 rounded-2xl bg-secondary p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
              <div>
                <h3 className="text-xl font-bold">
                  Tell us what keeps getting dropped.
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  We will tell you whether it is worth building, what it would
                  take, and whether you would be better off doing it yourself in
                  the pilot.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Button asChild variant="primary">
                  <Link href="/book">Book a call</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/custom-ai-assistant">
                    More on custom assistants
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section
          className="border-t border-border py-20 md:py-24"
          aria-labelledby="sponsor-heading"
        >
          <div className="container">
            <div className="grid gap-8 rounded-2xl bg-[#171663] p-8 text-white md:p-12 lg:grid-cols-[1.3fr_.7fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-indigo-300">
                  For chambers, libraries, and business support groups
                </p>
                <h2
                  id="sponsor-heading"
                  className="mt-4 max-w-2xl text-3xl font-bold leading-tight tracking-tight md:text-4xl"
                >
                  You can sponsor this for a group of your members.
                </h2>
                <p className="mt-5 max-w-2xl leading-relaxed text-white/70">
                  Same pilot, run as a cohort for the owners you serve — with a
                  summary at the end of who took part, what they built, and what
                  we would recommend next.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-[#171663] hover:bg-white/90"
                >
                  <Link href="/for-organizations">
                    Sponsor a cohort{" "}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
                <a
                  href={`mailto:${CONTACT}?subject=Sponsoring%20a%20pilot%20cohort`}
                  className="text-center text-sm font-semibold text-indigo-200 hover:text-white"
                >
                  {CONTACT}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          className="border-t border-border py-20 md:py-24"
          aria-labelledby="pilot-cta-heading"
        >
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2
                id="pilot-cta-heading"
                className="text-3xl font-bold leading-tight tracking-tight md:text-5xl"
              >
                Pick the task. We will do the rest together.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                You do not need to know which AI tool to use, or how any of it
                works, before you start. That is the point of the pilot.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <PrimaryCta>Join the Pilot</PrimaryCta>
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="h-auto min-h-12 w-full whitespace-normal px-6 py-3 text-center sm:w-auto"
                >
                  <Link href="/book">Talk to Emmanuel first</Link>
                </Button>
              </div>
              <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                Questions before you commit?{" "}
                <a
                  href={`mailto:${CONTACT}?subject=Question%20about%20the%20pilot`}
                  className="font-semibold text-accent"
                >
                  {CONTACT}
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
