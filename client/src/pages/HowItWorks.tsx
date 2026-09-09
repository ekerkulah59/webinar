import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import ProcessInfographicSection from "@/components/ProcessInfographicSection";
import SafeCheckSection from "@/components/SafeCheckSection";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";

const beliefs = [
  {
    title: "We start with your real work",
    copy: "Not a demo account, not a sample business. The inquiry you answered four times this week, the post you rewrite every Sunday, the quote that takes forty minutes. If it is not something you actually do, we are not working on it.",
  },
  {
    title: "A human stays in control",
    copy: "AI drafts. You decide. Every meaningful output stops at a person before it reaches a customer, and you learn a fast, repeatable way to judge whether it is fit to send.",
  },
  {
    title: "Plain language, always",
    copy: "No prompt engineering vocabulary, no model comparisons, no jargon you have to nod along to. If an explanation only works for someone who already understands it, it is a bad explanation.",
  },
  {
    title: "You leave with something built",
    copy: "The measure of a session is not what you learned about AI. It is whether a process is running in your business the following week.",
  },
];

const comparison = [
  {
    them: "Teaches you what AI is",
    us: "Puts AI on a task you already do",
  },
  {
    them: "Generic examples from someone else's business",
    us: "Your own words, your own customers, your own examples",
  },
  {
    them: "You finish with notes",
    us: "You finish with a process that runs",
  },
  {
    them: "Nobody checks whether you ever used it",
    us: "The whole point is that you use it — with a review step you can trust",
  },
];

export default function HowItWorks() {
  useSEO({
    title: "How It Works",
    description:
      "The EaseIntoAI method: start with the work you already repeat, build the process with you in plain language, and keep a human responsible for what goes out — including the SAFE Check.",
    url: "https://easeintoai.co/how-it-works",
    type: "website",
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How EaseIntoAI turns a repeated task into a reusable process",
          description:
            "Start with a task you already repeat, make AI understandable in plain language, build the process together, and keep a person responsible for approving what goes out.",
          step: [
            {
              "@type": "HowToStep",
              name: "Start with your work",
              text: "You show us the task, how you currently complete it, and where it slows you down.",
            },
            {
              "@type": "HowToStep",
              name: "Make AI understandable",
              text: "We explain where AI can help in plain language, without coding or technical terminology.",
            },
            {
              "@type": "HowToStep",
              name: "Build it together",
              text: "We turn the task into a simple, reusable AI-assisted process using examples from your work.",
            },
            {
              "@type": "HowToStep",
              name: "Keep you in control",
              text: "You review, correct, and approve meaningful results before they are used or shared.",
            },
          ],
        }}
      />
      <Navigation />

      <main>
        <section
          className="border-b border-border"
          aria-labelledby="how-it-works-heading"
        >
          <div className="container py-14 md:py-20">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.17em] text-accent">
                Our method
              </p>
              <h1
                id="how-it-works-heading"
                className="mt-5 text-balance text-[1.75rem] font-bold leading-[1.12] tracking-[-0.035em] text-foreground sm:text-4xl md:text-5xl lg:leading-[1.06]"
              >
                Start with your real work. Keep a human in control.
              </h1>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                That is the whole method, and it is the reason this works when a
                free course did not. You are not here to learn about AI. You are
                here to get a few hours back and still be able to stand behind
                everything that leaves your business.
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
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="h-auto min-h-12 w-full whitespace-normal px-6 py-3 text-center sm:w-auto"
                >
                  <a href="#safe-check">Jump to the SAFE Check</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24" aria-labelledby="beliefs-heading">
          <div className="container">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
                What we hold to
              </p>
              <h2
                id="beliefs-heading"
                className="mt-4 text-3xl font-bold leading-tight tracking-tight md:text-4xl"
              >
                Four rules we do not bend.
              </h2>
            </div>
            <div className="mt-11 grid gap-x-10 gap-y-9 md:grid-cols-2">
              {beliefs.map(({ title, copy }, index) => (
                <article key={title} className="border-t-2 border-accent pt-5">
                  <span className="text-xs font-bold text-accent">
                    0{index + 1}
                  </span>
                  <h3 className="mt-4 text-xl font-bold leading-snug">
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

        <ProcessInfographicSection />

        <SafeCheckSection />

        <section
          className="py-20 md:py-24"
          aria-labelledby="difference-heading"
        >
          <div className="container">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
                Why not just take a free course
              </p>
              <h2
                id="difference-heading"
                className="mt-4 text-3xl font-bold leading-tight tracking-tight md:text-4xl"
              >
                Free courses are fine. They just stop before the useful part.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                There is a lot of good free material about AI, and we point
                people to it. The gap is not information. It is that nobody sits
                with you and builds the thing.
              </p>
            </div>

            <div className="mt-11 overflow-hidden rounded-2xl border border-border">
              <div className="grid grid-cols-2 border-b border-border bg-secondary">
                <p className="px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground md:px-7">
                  A self-paced AI course
                </p>
                <p className="border-l border-border px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-accent md:px-7">
                  Working with us
                </p>
              </div>
              {comparison.map(({ them, us }) => (
                <div
                  key={them}
                  className="grid grid-cols-2 border-b border-border last:border-b-0"
                >
                  <p className="px-5 py-5 text-sm leading-relaxed text-muted-foreground md:px-7 md:text-base">
                    {them}
                  </p>
                  <p className="border-l border-border px-5 py-5 text-sm font-semibold leading-relaxed text-foreground md:px-7 md:text-base">
                    {us}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-7 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              If a self-paced course genuinely is the right starting point for
              you, take one —{" "}
              <Link href="/courses" className="font-semibold text-accent">
                ours are here
              </Link>
              , and one of them is free.
            </p>
          </div>
        </section>

        <section
          className="border-t border-border py-20 md:py-24"
          aria-labelledby="how-cta-heading"
        >
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2
                id="how-cta-heading"
                className="text-3xl font-bold leading-tight tracking-tight md:text-5xl"
              >
                Ready to point this at your own work?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Bring the task you are tired of redoing. That is all the
                preparation this takes.
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
