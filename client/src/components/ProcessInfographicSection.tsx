type ProcessStep = {
  title: string;
  description: string;
};

const processSteps: ProcessStep[] = [
  {
    title: "Start With Your Work",
    description:
      "You show us the task, how you currently complete it, and where it slows you down.",
  },
  {
    title: "Make AI Understandable",
    description:
      "We explain where AI can help in plain language—without coding or technical terminology.",
  },
  {
    title: "Build It Together",
    description:
      "We turn the task into a simple, reusable AI-assisted process using examples from your work.",
  },
  {
    title: "Keep You in Control",
    description:
      "You review, correct, and approve meaningful results before they are used or shared.",
  },
];

export default function ProcessInfographicSection() {
  return (
    <section
      id="how-we-help"
      className="border-y border-border bg-accent/[0.04] py-10"
      aria-labelledby="process-heading"
    >
      <div className="container">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            How EaseIntoAI Helps
          </p>
          <h2
            id="process-heading"
            className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-4xl"
          >
            Turn One Repeated Task Into a Process You Can Reuse
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            We don&apos;t begin with a list of tools. We begin with one task,
            the result you need, and the decisions a person must still make.
          </p>
        </header>

        <ol className="process-journey mt-6" aria-label="EaseIntoAI process">
          <li className="process-state process-state-start">
            <span className="process-node process-node-start" aria-hidden />
            <p className="process-state-label">A Task You Rebuild or Repeat</p>
          </li>

          {processSteps.map(({ title, description }, index) => (
            <li key={title} className="process-step" tabIndex={0}>
              <span className="process-node" aria-hidden>
                {index + 1}
              </span>
              <div className="process-step-copy">
                <p className="text-xs font-bold uppercase tracking-widest text-accent">
                  Step {index + 1}
                </p>
                <h3 className="mt-1.5 text-base font-bold leading-snug text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            </li>
          ))}

          <li className="process-state process-state-final">
            <span className="process-node process-node-final" aria-hidden />
            <p className="process-state-label">Reusable AI-Supported Process</p>
          </li>
        </ol>

        <p className="mx-auto mt-5 w-fit rounded-full border border-accent/20 bg-background px-5 py-2.5 text-center text-sm font-bold text-foreground shadow-sm md:text-base">
          Less rebuilding. More time for the work that requires you.
        </p>

        <aside
          className="mt-7 flex flex-col gap-4 border-t border-border/80 pt-5 md:flex-row md:items-center md:justify-between"
          aria-label="Independent AI fluency framework reference"
        >
          <div>
            <h3 className="text-base font-bold text-foreground md:text-lg">
              Practice That Supports AI Fluency
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Know what to delegate, describe what you need, evaluate the
              result, and use AI responsibly.
            </p>
          </div>
          <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Educational reference: Anthropic AI Fluency Framework
          </p>
        </aside>
      </div>
    </section>
  );
}
