type FluencySkill = {
  letter: string;
  title: string;
  subtitle: string;
  description: string;
  sessionTag: string;
  headerClassName: string;
  tagClassName: string;
};

const fluencySkills: FluencySkill[] = [
  {
    letter: "D",
    title: "Delegation",
    subtitle: "Deciding what to hand to AI",
    description:
      "Knowing what work AI should do, what humans should do, and how to divide tasks intelligently between them.",
    sessionTag: "Session 3 — AI for Your Job",
    headerClassName: "bg-foreground",
    tagClassName: "bg-accent/15 text-foreground",
  },
  {
    letter: "D",
    title: "Description",
    subtitle: "How you communicate with AI",
    description:
      "Clearly defining what you want — the output, the format, the tone. This is what separates a useful AI response from a generic one.",
    sessionTag: "Session 2 — PREP Framework",
    headerClassName: "bg-chart-3",
    tagClassName: "bg-accent/20 text-accent",
  },
  {
    letter: "D",
    title: "Discernment",
    subtitle: "Evaluating what AI gives you",
    description:
      "Critically assessing AI output for accuracy, appropriateness, and reliability before acting on it or sharing it.",
    sessionTag: "Session 1 — SAFE Check",
    headerClassName: "bg-accent",
    tagClassName: "bg-accent/15 text-accent",
  },
  {
    letter: "D",
    title: "Diligence",
    subtitle: "Using AI ethically",
    description:
      "Being honest about AI's role in your work, protecting your data, and taking accountability for what you produce with AI assistance.",
    sessionTag: "Session 1 — Responsible Use",
    headerClassName: "bg-chart-1",
    tagClassName: "bg-primary/10 text-primary",
  },
];

export default function FluencyFrameworkSection() {
  return (
    <section id="ai-fluency" className="py-20">
      <div className="container">
        <header className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
            The AI Fluency Framework
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight">
            The 4 Skills of AI Fluency
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Developed by Anthropic, the AI Fluency Framework identifies the four
            core competencies you need to work with AI effectively. Our
            curriculum is organized around all four.
          </p>
          <div className="mt-4 flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-medium text-foreground">
              <img
                src="/anthropic.svg"
                alt="Anthropic logo"
                className="h-3.5 w-3.5 object-contain"
                loading="lazy"
              />
              Anthropic Framework Reference
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {fluencySkills.map((skill) => (
            <article
              key={skill.title}
              className="flex flex-col overflow-hidden rounded-xl surface-card surface-card-hover"
            >
              <div
                className={`flex items-center gap-3.5 px-5 py-5 ${skill.headerClassName}`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/15 text-xl font-black text-white">
                  {skill.letter}
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {skill.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/85 leading-snug">
                    {skill.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex flex-1 flex-col bg-card px-5 py-5">
                <p className="text-base text-foreground/80 leading-relaxed mb-4 flex-1">
                  {skill.description}
                </p>
                {/* <span
                  className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${skill.tagClassName}`}
                >
                  {skill.title === "Delegation" 
                    
                  }
                 
                </span> */}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
