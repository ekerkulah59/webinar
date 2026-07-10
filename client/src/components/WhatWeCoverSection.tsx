import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Search,
  Lightbulb,
  PenLine,
  ClipboardCheck,
  ShieldCheck,
} from "lucide-react";
import { Link } from "wouter";

type CoverageArea = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
};

const coverageAreas: CoverageArea[] = [
  {
    number: "01",
    eyebrow: "Area",
    title: "How AI Actually Works",
    description:
      "AI doesn't \"know\" your brand or your clients — it generates the most statistically likely response based on what you tell it. That's why it can nail an Instagram caption in one prompt and completely miss your tone in the next. Understanding this is the first step to getting consistent results.",
    icon: Search,
    href: "/courses",
  },
  {
    number: "02",
    eyebrow: "Area",
    title: "What AI Can and Can't Do",
    description:
      "From drafting a client welcome email to summarizing a long DM thread before you reply, we show real use cases from real businesses — a boutique owner planning a seasonal launch, a coach outlining her signature program, a food truck owner writing menu descriptions. No cherry-picked demos.",
    icon: Lightbulb,
    href: "/courses",
  },
  {
    number: "03",
    eyebrow: "Area",
    title: "How to Ask AI the Right Way",
    description:
      "The quality of what you get back depends entirely on how you ask. If ChatGPT has ever handed you something generic and robotic, it's not you — it's the prompt. We teach a simple framework so AI's drafts sound like your brand, not a template.",
    icon: PenLine,
    href: "/courses",
  },
  {
    number: "04",
    eyebrow: "Area",
    title: "How to Evaluate AI Output",
    description:
      "AI can sound confident while getting your pricing, your policies, or a client's name wrong. Before that email goes out or that caption gets posted, we teach the SAFE Check — 4 questions to run on anything AI writes before it carries your business's name.",
    icon: ClipboardCheck,
    href: "/courses",
  },
  {
    number: "05",
    eyebrow: "Area",
    title: "How to Use AI Responsibly",
    description:
      "What happens to a client's information when you paste it into a free AI tool to \"clean up\" an email? What should you never share about a client, a booking, or a payment? We cover the responsible habits every business owner needs before AI touches client-facing work.",
    icon: ShieldCheck,
    href: "/courses",
  },
];

function AreaCard({ area }: { area: CoverageArea }) {
  const Icon = area.icon;

  return (
    <article className="area-card group flex h-full flex-col p-6 md:p-7">
      <div className="mb-5 flex items-center gap-4">
        <div className="area-card-icon-chip">
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <span className="text-accent">{area.number}</span>
          <span className="mx-1.5 text-muted-foreground/70" aria-hidden>
            —
          </span>
          {area.eyebrow}
        </p>
      </div>

      <h3 className="text-[1.35rem] font-semibold leading-[1.2] tracking-tight text-foreground">
        {area.title}
      </h3>

      <p className="mt-4 flex-1 text-[1.01rem] leading-[1.65] text-muted-foreground">
        {area.description}
      </p>

      
    </article>
  );
}

export default function WhatWeCoverSection() {
  return (
    <section id="what-we-cover" className="py-20 bg-accent/[0.04]">
      <div className="container">
        <header className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
            What We Cover
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight">
            Five Things Every Woman Running a Business Should Understand About
            AI
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Our sessions are built around the five foundational AI literacy
            skills identified by the U.S. Department of Labor, taught through
            real examples from real businesses. Plain language. Nothing that
            sounds like a machine wrote it.
          </p>
        </header>

        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {coverageAreas.map((area) => (
            <AreaCard key={area.number} area={area} />
          ))}
        </div>

        <div className="flex flex-col gap-4 rounded-xl bg-foreground px-6 py-6 md:flex-row md:items-center md:gap-6 md:px-8 md:py-7">
          <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-accent-foreground">
            <img
              src="/dol.png"
              alt="Department of Labor seal"
              className="h-4 w-4 rounded-full bg-white object-cover"
              loading="lazy"
            />
            DOL Aligned
          </span>
          <p className="text-sm md:text-base text-background/85 leading-relaxed">
            Curriculum aligned with the U.S. Department of Labor&apos;s AI
            Literacy Framework (2026). The DOL defines these five areas as the
            foundational skills every worker needs, regardless of industry.
            EaseIntoAI teaches all five in plain language — built around the
            reality of running a small business.
          </p>
        </div>
      </div>
    </section>
  );
}
