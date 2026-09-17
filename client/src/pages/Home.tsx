import AboutSection from "@/components/AboutSection";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import OfferLadder from "@/components/OfferLadder";
import ProcessInfographicSection from "@/components/ProcessInfographicSection";
import { useSEO } from "@/hooks/useSEO";
export default function Home() {
  useSEO({
    title: "Practical AI for Small-Business Owners",
    description:
      "Get one AI system working in your business with plain-language, hands-on help from EaseIntoAI. Based in Smyrna, Delaware. You stay in control.",
    type: "website",
  });
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main id="main-content">
        <section className="border-b border-border">
          <div className="container grid gap-10 py-14 md:py-20 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:gap-16">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.17em] text-accent">
                Practical AI for small-business owners
              </p>
              <h1 className="mt-5 max-w-2xl text-balance text-4xl font-bold leading-[1.08] tracking-[-0.035em] md:text-5xl lg:text-[3.25rem]">
                Get AI working in your business. Without the tech overwhelm.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Plain-language help that starts with your real work, builds the
                system with you, and keeps you in control.
              </p>
              <Button asChild size="lg" className="mt-8">
                <Link href="/pilot">Explore the Pilot</Link>
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">
                A paid, hands-on starting point. No technical background needed.
              </p>
            </div>
            <aside
              className="rounded-2xl border border-border bg-[#071027] p-7 text-white shadow-xl md:p-9"
              aria-label="An example of the work we can help with"
            >
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-200">
                Start with your everyday work
              </p>
              <h2 className="mt-5 text-2xl font-bold leading-snug">
                A simpler way to answer everyday customer questions.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Example task · customer inquiries
              </p>
              <ol className="mt-7 space-y-5 border-t border-white/15 pt-6">
                {[
                  "Bring the questions you answer most.",
                  "Build replies around your approved business information.",
                  "Review the drafts. Keep the final say.",
                ].map((item, i) => (
                  <li key={item} className="flex gap-4 text-sm leading-relaxed">
                    <span className="text-indigo-200">0{i + 1}</span>
                    {item}
                  </li>
                ))}
              </ol>
              <p className="mt-7 border-t border-white/15 pt-5 text-sm font-semibold text-indigo-200">
                One useful system. Built with you.
              </p>
            </aside>
          </div>
        </section>
        <section className="py-16 md:py-20">
          <div className="container grid gap-6 md:grid-cols-2 md:gap-16">
            <h2 className="max-w-xl text-3xl font-bold tracking-tight md:text-4xl">
              You don’t need another course. You need it working.
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                Getting access to AI is a start. Turning it into something
                useful in your salon, shop, coaching practice, or local service
                business takes another step.
              </p>
              <p>
                EaseIntoAI closes that gap. We start with one task you actually
                do and help you put a working system around it.
              </p>
            </div>
          </div>
        </section>
        <section
          id="pathways"
          className="scroll-mt-24 border-t border-border py-16 md:py-20"
        >
          <div className="container">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
              Your next step
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Learn it. Build it together. Have it built.
            </h2>
            <p className="mt-5 mb-9 max-w-2xl leading-relaxed text-muted-foreground">
              Start where you need support. The Pilot is the paid entry offer
              for getting one system running in your business.
            </p>
            <OfferLadder />
          </div>
        </section>
        <ProcessInfographicSection />
        <section className="py-16 md:py-20" aria-labelledby="proof-heading">
          <div className="container grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
                Learning from real work
              </p>
              <h2
                id="proof-heading"
                className="mt-4 text-3xl font-bold tracking-tight"
              >
                Results, as they’re ready to share.
              </h2>
              <div className="mt-6 rounded-xl border border-dashed border-border p-6">
                <p className="font-semibold">
                  Session recaps & case studies — forthcoming
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  This space will show the task, what we built, and what
                  changed, once the owner has confirmed the result and agreed to
                  share it.
                </p>
              </div>
              <Link
                href="/results"
                className="mt-5 inline-block font-semibold text-accent underline underline-offset-4"
              >
                Visit Results
              </Link>
            </div>
            <blockquote className="rounded-2xl bg-secondary p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Feedback from a session
              </p>
              <p className="mt-5 text-xl leading-relaxed">
                “Emmanuel taught an AI session during our House Of Zion
                fellowship anniversary, and I honestly loved how clear and
                practical it was. He broke things down in a way that made me
                feel confident instead of overwhelmed.”
              </p>
              <footer className="mt-6 text-sm text-muted-foreground">
                Esther, House Of Zion
              </footer>
            </blockquote>
          </div>
        </section>
        <AboutSection />
        <section className="bg-accent/[0.05] py-16 md:py-20">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Bring the task you’re ready to simplify.
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted-foreground">
              The Pilot helps you get one AI system running in your business,
              with you in control.
            </p>
            <Button asChild size="lg" className="mt-7">
              <Link href="/pilot">Explore the Pilot</Link>
            </Button>
            <p className="mt-8 text-sm text-muted-foreground">
              With a chamber, library, church, or business support organization?{" "}
              <Link
                href="/for-organizations"
                className="font-semibold text-accent underline underline-offset-4"
              >
                Bring this to your members.
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
