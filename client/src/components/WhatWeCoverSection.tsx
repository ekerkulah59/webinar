import type { LucideIcon } from "lucide-react";
import {
  Search,
  Lightbulb,
  Pencil,
  ClipboardCheck,
  Lock,
} from "lucide-react";

type CoverageArea = {
  area: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconClassName: string;
};

const coverageAreas: CoverageArea[] = [
  {
    area: "Area 1",
    title: "How AI Actually Works",
    description:
      "AI doesn't \"know\" things — it generates the most statistically likely response. Understanding this explains why it's sometimes brilliant and sometimes confidently wrong.",
    icon: Search,
    iconClassName: "bg-sky-500/15 text-sky-700",
  },
  {
    area: "Area 2",
    title: "What AI Can and Can't Do",
    description:
      "From drafting emails to summarizing documents — we show real use cases, real results, and real limitations. No cherry-picked demos.",
    icon: Lightbulb,
    iconClassName: "bg-emerald-500/15 text-emerald-700",
  },
  {
    area: "Area 3",
    title: "How to Ask AI the Right Way",
    description:
      "The quality of what you get back depends entirely on how you ask. We teach a simple framework — no technical knowledge required.",
    icon: Pencil,
    iconClassName: "bg-amber-500/15 text-amber-800",
  },
  {
    area: "Area 4",
    title: "How to Evaluate AI Output",
    description:
      "AI can sound confident while being completely wrong. We teach the SAFE Check — 4 questions to run on any AI output before you act on it.",
    icon: ClipboardCheck,
    iconClassName: "bg-accent/15 text-accent",
  },
  {
    area: "Area 5",
    title: "How to Use AI Responsibly",
    description:
      "What happens to your personal data when you use a free AI tool? What should you never paste in? We cover the responsible habits everyone needs.",
    icon: Lock,
    iconClassName: "bg-violet-500/15 text-violet-700",
  },
];

export default function WhatWeCoverSection() {
  return (
    <section id="what-we-cover" className="py-24 bg-accent/[0.04]">
      <div className="container">
        <header className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
            What We Cover
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight">
            Five Things Every Person Should Understand About AI
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Our sessions are built around the five foundational AI literacy
            skills identified by the U.S. Department of Labor — taught in plain
            language, with no jargon.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {coverageAreas.map((item) => (
            <article
              key={item.area}
              className="flex flex-col rounded-xl bg-card p-5 surface-card surface-card-hover"
            >
              <div
                className={`mb-4 flex h-11 w-11 items-center justify-center rounded-lg ${item.iconClassName}`}
              >
                <item.icon className="h-5 w-5" aria-hidden />
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                {item.area}
              </p>
              <h3 className="text-sm font-bold text-foreground leading-snug mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="flex flex-col gap-4 rounded-xl bg-foreground px-6 py-6 md:flex-row md:items-center md:gap-6 md:px-8 md:py-7">
          <span className="inline-flex w-fit shrink-0 rounded-full bg-accent px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-accent-foreground">
            DOL Aligned
          </span>
          <p className="text-sm md:text-base text-background/85 leading-relaxed">
            Curriculum aligned with the U.S. Department of Labor&apos;s AI
            Literacy Framework (2026). The DOL defines these five areas as the
            foundational skills every worker needs — regardless of industry.
            EaseIntoAI teaches all five in plain language.
          </p>
        </div>
      </div>
    </section>
  );
}
