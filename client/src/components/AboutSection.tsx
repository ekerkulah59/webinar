import { Link } from "wouter";

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
            Hi — I&apos;m Emmanuel. I&apos;m right here in Delaware.
          </h2>
          <div className="mt-7 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              You are not going to be handed off to a support queue or a
              chatbot. When you work with EaseIntoAI, you work with me — the
              same person who taught the session, wrote the course, and will be
              on the call.
            </p>
            <p>
              I started this after watching the same thing happen over and over:
              a smart owner, genuinely willing to try, opening an AI tool and
              getting back something that sounded nothing like them. The problem
              was never that they were behind. It was that nobody had started
              with their actual work.
            </p>
            <p>
              I build the things I teach — websites, applications, automation,
              AI-supported tools. That is mostly useful because it means I know
              which parts are worth your time and which parts you can safely
              ignore. I will tell you when AI is the wrong answer, including
              when that costs me the job.
            </p>
            <p>
              I am based in Delaware, and I would rather build this business one
              local owner at a time than scale something impersonal. If you
              would like to talk before committing to anything,{" "}
              <Link href="/book" className="font-semibold text-accent">
                book a short call
              </Link>{" "}
              — no pitch.
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
              Based in Delaware. Happy to meet local owners in person, and works
              virtually with everyone else.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
