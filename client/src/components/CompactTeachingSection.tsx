import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

const skills = [
  "Understand AI",
  "Know What It Can Do",
  "Give Better Instructions",
  "Review the Results",
  "Use It Responsibly",
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
              Learn the habits that make AI more useful.
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-background/70 md:text-lg">
              Understand what AI can do, choose an appropriate task, give useful
              context, and check the result through examples drawn from everyday
              work.
            </p>
          </header>

          <ol className="grid border-y border-background/15 sm:grid-cols-2 lg:grid-cols-1">
            {skills.map(label => (
              <li
                key={label}
                className="flex min-h-14 items-center border-background/15 py-3.5 sm:border-b sm:px-4 sm:odd:border-r lg:min-h-0 lg:border-b lg:px-0 lg:odd:border-r-0 last:border-b-0"
              >
                <span className="font-semibold">{label}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 flex flex-col gap-5 border-t border-background/15 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm leading-relaxed text-background/75 md:text-base">
              Informed by public AI literacy resources and explained in everyday
              language for people with different levels of technical confidence.
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent md:text-sm">
              Plain-language AI literacy · Practical exercises · Built around
              real work
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
