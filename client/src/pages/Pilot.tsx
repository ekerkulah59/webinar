import { JsonLd } from "@/components/JsonLd";
import { Link } from "wouter";
import PageLayout from "@/components/PageLayout";
import ProcessInfographicSection from "@/components/ProcessInfographicSection";
import { Button } from "@/components/ui/button";
import { pilot } from "@/lib/offerData";
export default function Pilot() {
  return (
    <PageLayout
      title={pilot.name}
      eyebrow="The paid starting point · built with you"
      heading={pilot.name}
      description="One AI system actually running in your business, with you in control. Bring a task you repeat and work with Emmanuel to make it useful in your day-to-day business."
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: pilot.name,
          description:
            "Hands-on support to get one AI system running in a small business, with the owner in control.",
          provider: {
            "@type": "Organization",
            name: "EaseIntoAI",
            url: "https://easeintoai.co",
          },
        }}
      />
      {/* TODO: Add structured offer pricing only after pricing and enrollment details are approved. */}
      <section className="py-14 md:py-20">
        <div className="container grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              For the owner doing the work.
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              You run a salon or spa, coach clients, manage a boutique, plan
              events, or provide a local service. You want practical help using
              AI, without becoming a technology expert.
            </p>
            <ul className="mt-6 list-disc space-y-3 pl-5 text-muted-foreground">
              <li>You have a repeated task you want to make easier.</li>
              <li>You can bring examples of how you do that work today.</li>
              <li>You want to understand and review what the system does.</li>
            </ul>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              We’ll agree on one useful task, build and test the system
              together, and review what changed. The task and review points
              depend on your business.
            </p>
          </div>
          <aside className="rounded-2xl border border-accent/30 bg-accent/[0.05] p-7 md:p-9">
            <p className="text-sm font-bold uppercase tracking-widest text-accent">
              Your next step
            </p>
            <h2 className="mt-4 text-2xl font-bold">
              Let’s start with your business.
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Tell Emmanuel what you do and which repeated task you’d like help
              with. We’ll talk through whether the Pilot is a useful fit and
              what working together could look like.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Bring a task or a question. No technical preparation needed.
            </p>
            <Button asChild size="lg" className="mt-6 w-full">
              <Link href={pilot.ctaLink}>Discuss a Pilot</Link>
            </Button>
          </aside>
        </div>
      </section>
      <ProcessInfographicSection />
      <section className="py-14 md:py-20">
        <div className="container grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">
              A system you can understand and use.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              You’ll know what information it uses, what it helps with, and when
              to step in. The SAFE Check gives you a repeatable way to review
              AI-assisted work.
            </p>
            <Link
              href="/how-it-works#safe-check"
              className="mt-5 inline-block font-semibold text-accent underline underline-offset-4"
            >
              See the SAFE Check
            </Link>
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              An organization can sponsor a cohort.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Owners can join directly. Chambers, libraries, churches, and
              business support organizations can also help bring the Pilot to
              their members.
            </p>
            <Link
              href="/for-organizations"
              className="mt-5 inline-block font-semibold text-accent underline underline-offset-4"
            >
              Explore a partnership
            </Link>
          </div>
        </div>
      </section>
      <section
        id="done-for-you"
        className="scroll-mt-24 border-t border-border py-12"
      >
        <div className="container">
          <p className="text-muted-foreground">
            Prefer to have something built for you?{" "}
            <Link
              href="/book"
              className="font-semibold text-accent underline underline-offset-4"
            >
              Discuss what you need.
            </Link>
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
