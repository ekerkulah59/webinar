export default function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-24 py-20 md:py-28"
      aria-labelledby="about-heading"
    >
      <div className="container grid gap-12 lg:grid-cols-[1fr_21rem] lg:items-start">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
            Meet the founder
          </p>
          <h2
            id="about-heading"
            className="mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl"
          >
            Making Useful AI Easier to Understand and Apply.
          </h2>
          <div className="mt-7 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              EaseIntoAI began with a simple conviction: people should not need
              a technical background to benefit from AI.
            </p>
            <p>
              Emmanuel Kerkulah created EaseIntoAI after seeing individuals and
              business owners struggle to connect fast-moving AI tools with the
              real work they needed to complete. The approach begins with that
              work, explains where AI can help, and keeps people responsible for
              the final result.
            </p>
            <p>
              Emmanuel builds the things he teaches—websites, applications,
              automation, AI-supported tools—which is mostly useful because it
              means he knows which parts are worth your time and which parts you
              can safely ignore.
            </p>
          </div>
        </div>

        <aside className="overflow-hidden rounded-2xl border border-border bg-[#071027] text-white shadow-xl lg:sticky lg:top-24">
          <img
            src="/emam.jpeg"
            alt="Emmanuel Kerkulah, founder of EaseIntoAI"
            className="aspect-[4/3] w-full object-cover object-top"
            loading="lazy"
          />
          <div className="p-6">
            <p className="text-sm font-bold">Emmanuel Kerkulah</p>
            <p className="mt-2 text-sm text-white/65">Founder, EaseIntoAI</p>
            <p className="mt-5 text-xs leading-relaxed text-white/55">
              Based in Delaware, with virtual learning and partnership
              conversations available more broadly.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
