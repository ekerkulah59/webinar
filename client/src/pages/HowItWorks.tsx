import { JsonLd } from "@/components/JsonLd";
import { easeSteps } from "@/lib/offerData";
import { Link } from "wouter";
import PageLayout from "@/components/PageLayout";
import ProcessInfographicSection from "@/components/ProcessInfographicSection";
import SafeCheckSection from "@/components/SafeCheckSection";
import { Button } from "@/components/ui/button";
export default function HowItWorks() {
  return (
    <PageLayout
      title="How It Works — EASE and SAFE"
      eyebrow="A practical method"
      heading="Your real work is the starting point."
      description="A self-paced course can introduce the tools. EaseIntoAI helps you apply them to your business: choose one task, build a working system together, and check that it helps."
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "The EASE Method",
          description:
            "Choose one real business task, build a working AI system, and evaluate the result.",
          step: easeSteps.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: step.title,
            text: step.description,
          })),
        }}
      />
      <ProcessInfographicSection />
      <section className="py-14 md:py-20">
        <div className="container grid gap-8 md:grid-cols-2">
          <h2 className="text-3xl font-bold tracking-tight">
            The part that happens after the lesson.
          </h2>
          <div className="space-y-4 leading-relaxed text-muted-foreground">
            <p>
              Free courses can give you a foundation. They can’t work alongside
              you to decide how a particular tool should handle your customer
              inquiries, your service information, or your review process.
            </p>
            <p>
              The EASE Method guides that setup. The SAFE Check helps you review
              the work before you use or share it. Together, they keep your
              judgment part of the system.
            </p>
          </div>
        </div>
      </section>
      <SafeCheckSection />
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold">
            Put the method to work on your task.
          </h2>
          <Button asChild size="lg" className="mt-6">
            <Link href="/pilot">Explore the Pilot</Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
