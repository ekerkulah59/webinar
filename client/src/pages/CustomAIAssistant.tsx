import { ArrowRight, CircleHelp } from "lucide-react";
import { Link } from "wouter";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSEO } from "@/hooks/useSEO";

const CONTACT = "hello@easeintoai.co";

const uses = [
  {
    title: "Communication drafts",
    copy: "Prepare customer responses, follow-ups, service explanations, and routine updates for human review.",
  },
  {
    title: "Approved knowledge",
    copy: "Find and summarize information from selected FAQs, policies, procedures, and training materials.",
  },
  {
    title: "Reusable workflows",
    copy: "Guide repeatable tasks with agreed inputs, steps, and clear points for approval.",
  },
];

const safeguards = [
  "A person reviews important outputs before they are used",
  "Only approved source material belongs in the assistant",
  "Sensitive information is excluded unless the use case and controls support it",
  "High-stakes decisions remain with qualified people",
  "Limitations, update needs, and escalation points are documented",
];

const faqs = [
  [
    "Will the assistant always be accurate?",
    "No AI system can promise perfect accuracy. A custom assistant can improve relevance by using approved information and clear instructions, but people still need to review outputs—especially for pricing, policy, legal, financial, health, or other consequential information.",
  ],
  [
    "What information can it use?",
    "Suitability depends on the use case and the information involved. We begin with selected documents, FAQs, procedures, examples, or training materials and decide what should be included, excluded, or handled only by a person.",
  ],
  [
    "Is this only for small businesses?",
    "No. Small-business assistants can support customer communication and recurring operations. Organizations can also explore internal knowledge, training, and repeated-communication assistants with a focused pilot and defined oversight.",
  ],
  [
    "Do I need a technical background?",
    "No. The process is explained in plain language, and the walkthrough focuses on how to use, review, and maintain the assistant responsibly.",
  ],
];

export default function CustomAIAssistant() {
  useSEO({
    title: "Custom AI Assistants With Human Oversight",
    description:
      "Custom AI Assistants built around approved business or organizational information, clear workflows, and human review.",
    url: "https://easeintoai.co/custom-ai-assistant",
    type: "website",
  });

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Custom AI Assistant Implementation",
          provider: {
            "@type": "Organization",
            name: "EaseIntoAI",
            url: "https://easeintoai.co/",
          },
          description:
            "Custom AI Assistants built around approved information, defined workflows, and human review.",
        }}
      />
      <Navigation />

      <main>
        <section
          className="border-b border-border py-16 md:py-24"
          aria-labelledby="assistant-heading"
        >
          <div className="container grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
                Guided AI implementation
              </p>
              <h1
                id="assistant-heading"
                className="mt-5 text-5xl font-bold leading-[1.04] tracking-[-0.04em] md:text-7xl"
              >
                Give AI the context your work actually requires.
              </h1>
              <p className="mt-6 max-w-2xl text-xl font-semibold leading-relaxed text-foreground">
                Build a focused assistant around approved information from your
                business or organization, with clear boundaries and people
                responsible for review and final approval.
              </p>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Instead of starting from scratch each time, use it to prepare
                repeated communication, find selected knowledge, or guide a
                routine workflow. It does not replace qualified judgment or make
                important decisions on its own.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="primary" size="lg">
                  <a
                    href={`mailto:${CONTACT}?subject=Custom%20AI%20Assistant%20conversation`}
                  >
                    Tell Us About the Repeated Work{" "}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </a>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <a href="#how-it-works">See How It Works</a>
                </Button>
              </div>
            </div>
            <img
              src="/herocustom.png"
              alt="A Custom AI Assistant using approved information to prepare work for human review"
              className="w-full rounded-2xl border border-border shadow-xl"
              loading="eager"
            />
          </div>
        </section>

        <section className="py-20 md:py-24" aria-labelledby="value-heading">
          <div className="container">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
                Start with the repeated work
              </p>
              <h2
                id="value-heading"
                className="mt-4 text-4xl font-bold tracking-tight md:text-5xl"
              >
                A useful assistant knows its role, its sources, and when a
                person needs to step in.
              </h2>
            </div>
            <div className="mt-12 grid gap-0 lg:grid-cols-3">
              {uses.map(({ title, copy }, index) => (
                <article
                  key={title}
                  className={`border border-border p-7 md:p-9 ${index > 0 ? "border-t-0 lg:border-l-0 lg:border-t" : "rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none"} ${index === 2 ? "rounded-b-2xl lg:rounded-bl-none lg:rounded-r-2xl" : ""}`}
                >
                  <h3 className="text-2xl font-bold">{title}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="border-y border-border bg-accent/[0.04] py-20"
          aria-labelledby="paths-heading"
        >
          <div className="container">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
              Two implementation pathways
            </p>
            <h2
              id="paths-heading"
              className="mt-4 text-4xl font-bold tracking-tight md:text-5xl"
            >
              Built around the environment where it will be used.
            </h2>
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <article className="rounded-2xl border border-border bg-background p-7 md:p-9">
                <h3 className="text-3xl font-bold">
                  For professionals and small businesses
                </h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Prepare recurring customer responses, service explanations,
                  content, follow-ups, and procedures using information the
                  professional or owner has approved.
                </p>
                <ul className="mt-6 list-disc space-y-3 pl-5 text-sm">
                  {[
                    "Preserve your voice and terminology through review",
                    "Reduce repeated setup and explanation",
                    "Keep a person responsible for what customers receive",
                  ].map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="rounded-2xl border border-[#171663] bg-[#171663] p-7 text-white md:p-9">
                <h3 className="text-3xl font-bold">For organizations</h3>
                <p className="mt-4 leading-relaxed text-white/70">
                  Explore a focused internal knowledge, training, or
                  repeated-communication assistant with clear source boundaries,
                  user roles, review expectations, and a pilot before broader
                  use.
                </p>
                <ul className="mt-6 list-disc space-y-3 pl-5 text-sm text-white/85">
                  {[
                    "Internal knowledge and approved procedure guidance",
                    "Training and orientation support",
                    "Repeated member, employee, or community communication",
                  ].map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Button asChild variant="secondary" className="mt-7">
                  <Link href="/for-organizations">
                    Explore Organizational Programs{" "}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
              </article>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="scroll-mt-24 py-20 md:py-24"
          aria-labelledby="process-heading"
        >
          <div className="container grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
                How it works
              </p>
              <h2
                id="process-heading"
                className="mt-4 text-4xl font-bold tracking-tight md:text-5xl"
              >
                From approved information to a reviewed workflow.
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                Suitability is assessed before anything is built. The process
                stays understandable, testable, and bounded.
              </p>
            </div>
            <ol className="divide-y divide-border border-y border-border">
              {[
                [
                  "01",
                  "Define the use case",
                  "Choose a repeated, appropriate task and name the result a person still needs to review.",
                ],
                [
                  "02",
                  "Select approved information",
                  "Identify the documents, examples, policies, and boundaries the assistant may use.",
                ],
                [
                  "03",
                  "Build and test",
                  "Create the assistant, test representative questions, and refine unclear or unreliable behavior.",
                ],
                [
                  "04",
                  "Walk through oversight",
                  "Document review points, limitations, update responsibilities, and when to escalate to a person.",
                ],
              ].map(([number, title, copy]) => (
                <li
                  key={number}
                  className="grid gap-3 py-6 sm:grid-cols-[4rem_1fr]"
                >
                  <span className="text-sm font-bold text-accent">
                    {number}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {copy}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="bg-[#071027] py-20 text-white"
          aria-labelledby="oversight-heading"
        >
          <div className="container grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <h2
                id="oversight-heading"
                className="text-4xl font-bold tracking-tight md:text-5xl"
              >
                Human oversight is part of the system.
              </h2>
              <p className="mt-5 leading-relaxed text-white/65">
                Approved information can improve relevance. It does not remove
                the need for judgment, verification, privacy awareness, or
                responsible use.
              </p>
            </div>
            <ul className="space-y-4">
              {safeguards.map(item => (
                <li
                  key={item}
                  className="border-b border-white/15 pb-4 text-white/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-20" aria-labelledby="faq-heading">
          <div className="container max-w-4xl">
            <CircleHelp className="h-8 w-8 text-accent" aria-hidden />
            <h2
              id="faq-heading"
              className="mt-5 text-4xl font-bold tracking-tight md:text-5xl"
            >
              Common questions
            </h2>
            <Accordion type="single" collapsible className="mt-8">
              {faqs.map(([question, answer], index) => (
                <AccordionItem key={question} value={`faq-${index}`}>
                  <AccordionTrigger className="py-5 text-left text-lg font-bold">
                    {question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
                    {answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="border-t border-border py-20">
          <div className="container">
            <div className="rounded-2xl bg-accent/[0.06] p-8 text-center md:p-12">
              <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight">
                Start with the work you repeat—and the judgment you want to
                preserve.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-muted-foreground">
                Share the task, the people involved, and the information it
                depends on. EaseIntoAI can help determine whether a custom
                assistant is a responsible fit.
              </p>
              <Button asChild variant="primary" size="lg" className="mt-8">
                <a
                  href={`mailto:${CONTACT}?subject=Custom%20AI%20Assistant%20conversation`}
                >
                  Discuss Your Use Case{" "}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </Button>
              <p className="mt-5 text-sm text-muted-foreground">
                Or email{" "}
                <a
                  href={`mailto:${CONTACT}`}
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
