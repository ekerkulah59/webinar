import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";

/*
  ─────────────────────────────────────────────────────────────────────────────
  RESULTS — deliberately empty.

  This page is the structure that will hold session recaps and case studies.
  It ships with none, because there are none to show yet. Do not seed it with
  examples, composites, or illustrative numbers: the entire value of this page
  is that a reader can trust what appears on it.

  TODO: add entries to SESSION_RECAPS and CASE_STUDIES as real ones land. The
  page switches from the "nothing here yet" state to the populated state on
  its own once either array has items.

  A case study needs, at minimum: who they are (with their permission to be
  named), the task they brought, what was built, and what changed afterward
  in their words. If any of those four are missing, it is not ready to post.
  ─────────────────────────────────────────────────────────────────────────────
*/

type SessionRecap = {
  /** Where it was taught, e.g. "House Of Zion fellowship anniversary". */
  host: string;
  date: string;
  title: string;
  /** What participants actually walked out with. */
  takeaways: string[];
  href?: string;
};

type CaseStudy = {
  /** Business name — only with explicit permission to be named. */
  business: string;
  location?: string;
  /** The repeated task they brought. */
  task: string;
  /** What was built with them. */
  built: string;
  /** What changed, in concrete terms they confirmed. */
  outcome: string;
  quote?: string;
};

const SESSION_RECAPS: SessionRecap[] = [];

const CASE_STUDIES: CaseStudy[] = [];

function EmptyState({
  label,
  heading,
  copy,
}: {
  label: string;
  heading: string;
  copy: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-secondary/60 p-8 md:p-12">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
      <h3 className="mt-4 max-w-2xl text-2xl font-bold leading-snug tracking-tight">
        {heading}
      </h3>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
        {copy}
      </p>
    </div>
  );
}

export default function Results() {
  useSEO({
    title: "Results",
    description:
      "Session recaps and case studies from EaseIntoAI. This page is new and intentionally sparse — we post what actually happened, once it has happened.",
    url: "https://easeintoai.co/results",
    type: "website",
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Navigation />

      <main>
        <section
          className="border-b border-border"
          aria-labelledby="results-heading"
        >
          <div className="container py-14 md:py-20">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.17em] text-accent">
                Proof, as it arrives
              </p>
              <h1
                id="results-heading"
                className="mt-5 text-balance text-[1.75rem] font-bold leading-[1.12] tracking-[-0.035em] text-foreground sm:text-4xl md:text-5xl lg:leading-[1.06]"
              >
                Session recaps and case studies, as they’re ready.
              </h1>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                Recaps and case studies will show the work, the setup, and the
                result. They will be published only after the people involved
                have confirmed the details and agreed to share them.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24" aria-labelledby="recaps-heading">
          <div className="container">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
                Session recaps
              </p>
              <h2
                id="recaps-heading"
                className="mt-4 text-3xl font-bold leading-tight tracking-tight md:text-4xl"
              >
                What a room walked out with.
              </h2>
            </div>

            <div className="mt-10">
              {SESSION_RECAPS.length > 0 ? (
                <div className="grid gap-5 md:grid-cols-2">
                  {SESSION_RECAPS.map(recap => (
                    <article
                      key={`${recap.host}-${recap.date}`}
                      className="rounded-2xl border border-border p-7 md:p-8"
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                        {recap.host} · {recap.date}
                      </p>
                      <h3 className="mt-3 text-2xl font-bold leading-snug tracking-tight">
                        {recap.title}
                      </h3>
                      <ul className="mt-5 list-disc space-y-2.5 border-t border-border pl-5 pt-5 text-sm leading-relaxed text-muted-foreground">
                        {recap.takeaways.map(item => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      {recap.href && (
                        <Link
                          href={recap.href}
                          className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent"
                        >
                          Read the recap{" "}
                          <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                      )}
                    </article>
                  ))}
                </div>
              ) : (
                <EmptyState
                  label="Nothing posted yet"
                  heading="The first recaps are being written up."
                  copy="Sessions have been taught — they are listed under past webinars — but a proper recap means naming what people built, not just what was covered. Those are in progress."
                />
              )}
            </div>
          </div>
        </section>

        <section
          className="border-y border-border bg-accent/[0.04] py-20 md:py-24"
          aria-labelledby="cases-heading"
        >
          <div className="container">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
                Case studies
              </p>
              <h2
                id="cases-heading"
                className="mt-4 text-3xl font-bold leading-tight tracking-tight md:text-4xl"
              >
                One business, one task, what changed.
              </h2>
            </div>

            <div className="mt-10">
              {CASE_STUDIES.length > 0 ? (
                <div className="grid gap-5 lg:grid-cols-2">
                  {CASE_STUDIES.map(study => (
                    <article
                      key={study.business}
                      className="rounded-2xl border border-border bg-background p-7 md:p-9"
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
                        {study.business}
                        {study.location ? ` · ${study.location}` : ""}
                      </p>
                      <dl className="mt-6 space-y-5">
                        <div>
                          <dt className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                            The task
                          </dt>
                          <dd className="mt-1.5 leading-relaxed">
                            {study.task}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                            What we built
                          </dt>
                          <dd className="mt-1.5 leading-relaxed">
                            {study.built}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                            What changed
                          </dt>
                          <dd className="mt-1.5 leading-relaxed">
                            {study.outcome}
                          </dd>
                        </div>
                      </dl>
                      {study.quote && (
                        <blockquote className="mt-6 border-t border-border pt-5 text-sm italic leading-relaxed text-muted-foreground">
                          {study.quote}
                        </blockquote>
                      )}
                    </article>
                  ))}
                </div>
              ) : (
                <EmptyState
                  label="Nothing posted yet"
                  heading="Case studies are forthcoming."
                  copy="A case study needs a real business, a real task, something built, and a result the owner confirms in their own words. The first pilots are where those come from. When one is ready, it goes here with a name on it."
                />
              )}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24" aria-labelledby="meantime-heading">
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
                  In the meantime
                </p>
                <h2
                  id="meantime-heading"
                  className="mt-4 text-3xl font-bold leading-tight tracking-tight md:text-4xl"
                >
                  Here is what does exist.
                </h2>
                <p className="mt-5 leading-relaxed text-muted-foreground">
                  One piece of feedback from an organizer who attended a
                  session. Session recaps and case studies will be added as they
                  are confirmed.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button asChild variant="secondary">
                    <Link href="/past-webinars">
                      See past sessions{" "}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </Button>
                  <Button asChild variant="primary">
                    <Link href="/pilot">See the Pilot</Link>
                  </Button>
                </div>
              </div>

              {/*
                The only testimonial on the site. Real, and it stays the only
                one until there is a second real one.
              */}
              <blockquote className="rounded-2xl border border-accent/20 bg-accent/[0.05] p-7 md:p-10">
                <p className="text-lg font-semibold leading-relaxed md:text-xl">
                  “Emmanuel taught an AI session during our House Of Zion
                  fellowship anniversary, and I honestly loved how clear and
                  practical it was. He broke things down in a way that made me
                  feel confident instead of overwhelmed.”
                </p>
                <footer className="mt-5 text-sm text-muted-foreground">
                  Esther, House Of Zion
                </footer>
              </blockquote>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
