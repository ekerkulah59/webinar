import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";

type Item = { title: string; copy: string };

const audiences = [
  {
    who: "Chambers of commerce · Economic-development groups",
    title: "Members who leave with something working",
    copy: "Programming business owners actually use, so they finish with one process running in their business instead of notes about a trend.",
  },
  {
    who: "Libraries · Cities and towns",
    title: "Residents who gain access, not just exposure",
    copy: "Plain-language sessions someone with no technical background can follow, at a pace that respects where each person is starting.",
  },
  {
    who: "Nonprofits · Workforce organizations · Schools",
    title: "Participants who are ready for the work",
    copy: "Practice on realistic tasks, plus a record of what participants learned and built that you can share with funders and boards.",
  },
  {
    who: "Employers · Internal teams",
    title: "Employees who use AI well, and know when not to",
    copy: "Clear expectations about human review and sensitive information, so people stop experimenting on their own with no guidance.",
  },
];

const outcomes: Item[] = [
  {
    title: "Know where it helps",
    copy: "Tell the difference between a task AI can speed up and one it will quietly get wrong.",
  },
  {
    title: "Ask for what they need",
    copy: "Give a tool enough context to produce something usable on the first or second try.",
  },
  {
    title: "Check the answer",
    copy: "Spot the confident mistakes, and know what to verify before anything goes out.",
  },
  {
    title: "Protect what is sensitive",
    copy: "Recognize the information that should never go into a tool, and what to do instead.",
  },
  {
    title: "Keep the decision human",
    copy: "Know which calls stay with a qualified person, no matter how good the draft looks.",
  },
  {
    title: "Leave with something built",
    copy: "Finish with one reusable prompt, checklist, or process they can use the next day.",
  },
];

const programs = [
  {
    title: "Small Business AI Readiness Program",
    copy: "For chambers, economic-development groups, and business support organizations. Owners leave with one AI-supported process running in their own business.",
  },
  {
    title: "Workforce AI Literacy Program",
    copy: "For workforce organizations, employers, and training programs. Employees and job seekers practice on realistic workplace tasks and learn the rules for handling sensitive information.",
  },
  {
    title: "Community AI Education Series",
    copy: "For libraries, cities and towns, schools, and community organizations. Accessible sessions that meet residents where they are, with no technical background assumed.",
  },
  {
    title: "Organizational AI Adoption Pilot",
    copy: "For one team ready to test something real. Pick a use case, run it, review what happened, and decide about wider adoption with evidence in hand.",
  },
];

const partnerIncludes = [
  "Program discovery and planning",
  "Plain-language curriculum",
  "Live or virtual facilitation",
  "Practical exercises and demonstrations",
  "Participant workbooks and resources",
  "Responsible-use guidance",
  "Pre- and post-program evaluation",
  "Summary report for your leadership",
  "Optional implementation support",
];

const pilotSteps = [
  "Understand the people and the need",
  "Define a focused program or use case",
  "Deliver the pilot",
  "Measure participation, learning, and what got built",
  "Review the findings and recommend next steps",
];

const principles: Item[] = [
  {
    title: "Human review",
    copy: "People review meaningful outputs and remain responsible for final decisions.",
  },
  {
    title: "Privacy awareness",
    copy: "Participants learn what to protect and how to work within your organization's policies.",
  },
  {
    title: "Appropriate use",
    copy: "AI is applied where it supports the work, not where human judgment should lead.",
  },
  {
    title: "Accessibility",
    copy: "Learning is designed in plain language for different levels of technical confidence.",
  },
  {
    title: "Clear limitations",
    copy: "Participants learn where AI can be wrong, incomplete, or unsuitable.",
  },
  {
    title: "Practical outcomes",
    copy: "Programs focus on an applicable next step, not abstract awareness alone.",
  },
];

export default function ForOrganizations() {
  useSEO({
    title: "Practical AI Programs for Teams & Communities",
    description:
      "Hands-on AI programs for chambers, libraries, nonprofits, employers, and public organizations. Participants practice on real work and leave with something usable.",
    url: "https://easeintoai.co/for-organizations",
    type: "website",
  });

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "EaseIntoAI Organizational AI Education and Adoption Programs",
          provider: {
            "@type": "Organization",
            name: "EaseIntoAI",
            url: "https://easeintoai.co/",
          },
          serviceType:
            "AI education, implementation, and adoption program design",
        }}
      />
      <Navigation />

      <main>
        <section
          className="border-b border-border"
          aria-labelledby="organizations-heading"
        >
          <div className="container grid gap-10 py-14 md:py-20 lg:grid-cols-[.98fr_1.02fr] lg:items-center lg:gap-14 lg:py-16">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.17em] text-accent">
                AI programs for teams and communities
              </p>
              <h1
                id="organizations-heading"
                className="mt-5 max-w-2xl text-balance font-serif text-[1.875rem] font-bold leading-[1.1] tracking-[-0.03em] sm:text-4xl lg:text-5xl lg:leading-[1.04]"
              >
                Help your people use AI on real work. And know where it does not
                belong.
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
                Hands-on programs built for the employees, members,
                entrepreneurs, and residents your organization serves.
                Participants practice on tasks from their own work, learn how to
                check what AI gives back, and leave with something they can keep
                using.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  variant="primary"
                  size="lg"
                  className="h-auto min-h-12 w-full whitespace-normal px-6 py-3 text-center sm:w-auto"
                >
                  <a href="#programs">
                    Explore Program Options{" "}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="h-auto min-h-12 w-full whitespace-normal px-6 py-3 text-center sm:w-auto"
                >
                  <a href="#outcomes">See What Participants Learn</a>
                </Button>
              </div>
              <p className="mt-7 text-balance text-sm font-semibold text-muted-foreground">
                <span className="whitespace-nowrap">
                  Plain language <span aria-hidden>·</span>
                </span>{" "}
                <span className="whitespace-nowrap">
                  Hands-on practice <span aria-hidden>·</span>
                </span>{" "}
                <span className="whitespace-nowrap">
                  Results you can report
                </span>
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border shadow-xl">
              <img
                src="/practical-ai-workshop.png"
                alt="Workshop participants mapping out a process together around a table of laptops and notes"
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
          className="bg-accent/[0.045] py-16 md:py-20"
          aria-labelledby="challenge-heading"
        >
          <div className="container">
            <div>
              <h2
                id="challenge-heading"
                className="max-w-4xl font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl"
              >
                Your people have heard plenty about AI. They still do not know
                what to do with it on Monday.
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                General explanations do not tell a shop owner which task is
                worth handing over. They do not tell a caseworker what should
                never be pasted into a chatbot. That changes when the learning
                is built around the work people already do.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28" aria-labelledby="audiences-heading">
          <div className="container">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
                Built around who you serve
              </p>
              <h2
                id="audiences-heading"
                className="mt-4 font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl"
              >
                You are not buying AI education. You are buying a result for
                your people.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                What counts as a good outcome is different for a chamber than it
                is for a library, a workforce board, or an HR team. The program
                starts from yours.
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {audiences.map(({ who, title, copy }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-border bg-background p-7 md:p-8"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    {who}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl font-bold leading-snug">
                    {title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="outcomes"
          className="scroll-mt-24 border-y border-border bg-accent/[0.04] py-20 md:py-28"
          aria-labelledby="outcomes-heading"
        >
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
                What participants can do afterward
              </p>
              <h2
                id="outcomes-heading"
                className="mt-4 font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl"
              >
                Not a presentation about AI. Practice on the work in front of
                them.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Sessions are built so people try things, get them wrong safely,
                and walk out with something finished.
              </p>
            </div>
            <ol className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {outcomes.map(({ title, copy }, index) => (
                <li key={title} className="border-t border-border pt-5">
                  <span className="text-xs font-bold text-accent">
                    0{index + 1}
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {copy}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="programs"
          className="scroll-mt-24 py-20 md:py-28"
          aria-labelledby="programs-heading"
        >
          <div className="container">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
                Customizable program models
              </p>
              <h2
                id="programs-heading"
                className="mt-4 font-serif text-4xl font-bold tracking-tight md:text-6xl"
              >
                Choose a model, then shape it around your audience.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Start from the model that fits. Then set the audience, the
                length, the examples, and the depth around what your people
                actually need.
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {programs.map(({ title, copy }, index) => (
                <article
                  key={title}
                  className={`rounded-2xl border p-7 md:p-9 ${index === 3 ? "border-[#171663] bg-[#171663] text-white" : "border-border bg-background"}`}
                >
                  <h3 className="font-serif text-3xl font-bold">{title}</h3>
                  <p
                    className={`mt-4 leading-relaxed ${index === 3 ? "text-white/70" : "text-muted-foreground"}`}
                  >
                    {copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="border-y border-border bg-accent/[0.04] py-20 md:py-28"
          aria-labelledby="included-heading"
        >
          <div className="container grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
                Flexible by design
              </p>
              <h2
                id="included-heading"
                className="mt-4 font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl"
              >
                Build the program around the outcome you need.
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                Planning, facilitation, participant materials, evaluation, and
                follow-through. Take the pieces that serve your goal and leave
                the rest.
              </p>
            </div>
            <ul className="grid gap-x-10 sm:grid-cols-2">
              {partnerIncludes.map(label => (
                <li
                  key={label}
                  className="border-b border-border py-4 font-semibold"
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-20 md:py-24" aria-labelledby="pilot-heading">
          <div className="container">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
                Low-risk starting point
              </p>
              <h2
                id="pilot-heading"
                className="mt-4 font-serif text-4xl font-bold tracking-tight md:text-5xl"
              >
                Test the approach before you expand it.
              </h2>
              <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
                A pilot sets one audience, one use case, one learning goal, and
                a review point. You find out what works with your own people
                before committing anything further.
              </p>
            </div>
            <ol className="mt-12 grid gap-4 md:grid-cols-5">
              {pilotSteps.map((step, index) => (
                <li
                  key={step}
                  className="relative rounded-xl border border-border bg-background p-5"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="mt-5 text-sm font-semibold leading-relaxed">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-accent/25 bg-accent/[0.05] p-7 md:flex-row md:items-center md:justify-between md:p-8">
              <p className="max-w-2xl leading-relaxed">
                <span className="font-bold">
                  You finish with something to bring to leadership.
                </span>{" "}
                <span className="text-muted-foreground">
                  A short summary of who took part, what they learned, what they
                  built, and what we would recommend doing next.
                </span>
              </p>
              <Button
                asChild
                variant="primary"
                size="lg"
                className="h-auto min-h-12 w-full shrink-0 whitespace-normal px-6 py-3 text-center md:w-auto"
              >
                <a href="#partnership-contact">
                  Discuss a Focused Pilot{" "}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section
          className="bg-[#071027] py-20 text-white md:py-28"
          aria-labelledby="responsibility-heading"
        >
          <div className="container">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-indigo-300">
                Responsible by practice
              </p>
              <h2
                id="responsibility-heading"
                className="mt-4 font-serif text-4xl font-bold tracking-tight md:text-6xl"
              >
                Keep people responsible for meaningful decisions.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/65">
                Participants learn to protect sensitive information, check
                important outputs, follow your organization's policies, and
                recognize when a task should stay with a qualified person.
              </p>
            </div>
            <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {principles.map(({ title, copy }) => (
                <article key={title} className="border-t border-white/15 pt-5">
                  <h3 className="text-xl font-bold">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    {copy}
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-10 max-w-3xl rounded-xl border border-white/15 bg-white/5 p-5 text-sm leading-relaxed text-white/70">
              Sensitive information is treated as a rule, not an afterthought.
              Participants learn to work from approved information, to respect
              your organization's policy boundaries, and to keep private data
              out of tools that have not been authorized for it.
            </p>
          </div>
        </section>

        <section
          id="partnership-contact"
          className="scroll-mt-24 py-20 md:py-28"
          aria-labelledby="partnership-heading"
        >
          <div className="container">
            <div className="overflow-hidden rounded-2xl bg-[#171663] text-white shadow-xl">
              <div className="p-8 md:p-12">
                <h2
                  id="partnership-heading"
                  className="max-w-3xl font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl"
                >
                  Turn an AI goal into a program your people can use.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
                  Tell us who you want to support, what work or learning need is
                  most important, and what evidence would make a pilot useful to
                  your organization.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-[#171663] hover:bg-white/90"
                  >
                    <a href="mailto:hello@easeintoai.co?subject=Organization%20program%20conversation%20with%20EaseIntoAI&body=Organization%3A%0A%0APeople%20we%20want%20to%20support%3A%0A%0AWork%20or%20learning%20need%3A%0A%0AWhat%20a%20useful%20pilot%20should%20show%3A">
                      Tell Us About Your Organization{" "}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </a>
                  </Button>
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 hover:text-white"
                  >
                    Or book a short intro call
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
                <p className="mt-8 max-w-2xl border-t border-white/15 pt-6 text-sm leading-relaxed text-white/60">
                  EaseIntoAI is building its institutional practice
                  deliberately, which is why engagements start small. You define
                  the audience and what a good result looks like. We deliver a
                  focused program, show you what happened, and you decide what
                  comes next.
                </p>
                <a
                  href="mailto:hello@easeintoai.co"
                  className="mt-5 inline-block text-sm font-semibold text-indigo-200 hover:text-white"
                >
                  hello@easeintoai.co
                </a>
              </div>
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Based in Delaware · Programs delivered virtually, and on site by
              arrangement
            </p>
          </div>
        </section>

        <section className="border-t border-border py-12">
          <div className="container flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Looking for individual courses or implementation support for your
              own business?
            </p>
            <Button asChild variant="secondary">
              <Link href="/#business-solutions">
                Explore Courses &amp; Business Support
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
