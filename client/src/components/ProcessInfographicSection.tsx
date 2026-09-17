import { easeSteps } from "@/lib/offerData";
export default function ProcessInfographicSection() {
  return (
    <section
      id="how-we-help"
      className="scroll-mt-24 border-y border-border bg-accent/[0.04] py-16 md:py-20"
      aria-labelledby="process-heading"
    >
      <div className="container">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
          The EASE Method
        </p>
        <h2
          id="process-heading"
          className="mt-4 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl"
        >
          From a repeated task to a working system.
        </h2>
        <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
          A practical sequence built around your business, with a clear review
          point at every step.
        </p>
        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {easeSteps.map((step, index) => (
            <li key={step.title}>
              <span
                className="flex size-12 items-center justify-center rounded-full border border-accent/25 bg-background text-xl font-bold text-accent"
                aria-hidden
              >
                {step.letter}
              </span>
              <p className="mt-5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Step {index + 1}
              </p>
              <h3 className="mt-2 text-xl font-bold">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
