import { Link } from "wouter";
import PageLayout from "@/components/PageLayout";
import WorkshopSection from "@/components/WorkshopSection";
import { Button } from "@/components/ui/button";
export default function IndividualLearning() {
  return (
    <PageLayout
      title="Individual Learning"
      eyebrow="Rung 1 · learn"
      heading="A clear, comfortable place to start."
      description="Build your confidence with free and low-cost workshops and self-paced learning. Practice with familiar work, ask better questions, and learn to check what AI gives you."
    >
      <WorkshopSection />
      <section className="py-16">
        <div className="container grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold">Learn at your own pace.</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Explore the existing course collection, including the free AI 101
              introduction. Each course lists its availability and price.
            </p>
            <Button asChild variant="secondary" className="mt-6">
              <Link href="/courses">Browse courses</Link>
            </Button>
          </article>
          <article className="rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold">Make the SAFE Check a habit.</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Safe to share · Accurate · Fair to send · Edited by me. Four
              questions to ask before you use or share AI-assisted work.
            </p>
            <Button asChild variant="secondary" className="mt-6">
              <Link href="/how-it-works#safe-check">Read the SAFE Check</Link>
            </Button>
          </article>
        </div>
      </section>
      <section className="border-t border-border py-14">
        <div className="container">
          <h2 className="text-3xl font-bold">
            Ready to put it into your business?
          </h2>
          <p className="mt-4 text-muted-foreground">
            The paid Pilot adds hands-on help to get one system running.
          </p>
          <Button asChild className="mt-6">
            <Link href="/pilot">Explore the Pilot</Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
