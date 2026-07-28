import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BrainCircuit,
  ClipboardCheck,
  Lightbulb,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";
import { Link } from "wouter";

const skills: Array<{ label: string; icon: LucideIcon }> = [
  { label: "Understand AI", icon: BrainCircuit },
  { label: "Know What It Can Do", icon: Lightbulb },
  { label: "Give Better Instructions", icon: MessageSquareText },
  { label: "Review the Results", icon: ClipboardCheck },
  { label: "Use It Responsibly", icon: ShieldCheck },
];

export default function CompactTeachingSection() {
  return (
    <section
      id="what-we-cover"
      className="bg-foreground py-14 text-background md:py-16"
      aria-labelledby="teaching-heading"
    >
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-end lg:gap-14">
          <header>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              What We Teach
            </p>
            <h2
              id="teaching-heading"
              className="mt-3 max-w-xl text-3xl font-bold leading-tight tracking-tight md:text-4xl"
            >
              Practical AI Skills. Explained Without the Technical Language.
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-background/70 md:text-lg">
              Learn how to understand AI, choose the right tasks, give clear
              instructions, review the results, and use it responsibly—through
              examples from businesses like yours.
            </p>
          </header>

          <ol className="grid border-y border-background/15 sm:grid-cols-2 lg:grid-cols-1">
            {skills.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="flex min-h-14 items-center gap-3 border-background/15 py-3.5 sm:border-b sm:px-4 sm:odd:border-r lg:min-h-0 lg:border-b lg:px-0 lg:odd:border-r-0 last:border-b-0"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="font-semibold">{label}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 flex flex-col gap-5 border-t border-background/15 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm leading-relaxed text-background/75 md:text-base">
              Aligned with the U.S. Department of Labor&apos;s AI Literacy
              Framework. Explained in everyday language for non-technical
              business owners.
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent md:text-sm">
              DOL-aligned AI literacy · Beginner-friendly · Built around real
              business tasks
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex w-fit shrink-0 items-center gap-2 text-sm font-semibold text-background underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-foreground"
          >
            See How We Teach
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
