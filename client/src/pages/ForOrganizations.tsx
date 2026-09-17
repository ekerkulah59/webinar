import { Link } from "wouter";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
export default function ForOrganizations() {
  return (
    <PageLayout
      title="For Organizations"
      eyebrow="A local partner for practical AI"
      heading="Bring practical AI to your members — host a session or sponsor a cohort."
      description="Help the small-business owners you serve turn access to AI into something they can use. EaseIntoAI partners with chambers, libraries, churches, SBDC teams, and workforce boards."
    >
      <section className="py-14 md:py-20">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-border p-8">
              <p className="text-sm font-semibold text-accent">
                A welcoming first step
              </p>
              <h2 className="mt-4 text-2xl font-bold">
                Host a practical session.
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                Bring your members together for a plain-language introduction,
                practical examples, and the SAFE Check. We’ll discuss the
                audience and choose a useful focus together.
              </p>
            </article>
            <article className="rounded-2xl border border-accent/30 bg-accent/[0.05] p-8">
              <p className="text-sm font-semibold text-accent">
                Help owners put it into practice
              </p>
              <h2 className="mt-4 text-2xl font-bold">
                Sponsor a Pilot cohort.
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                Support owners as they work toward one AI system running in
                their own business. We’ll discuss fit, sponsorship, and the
                Pilot details before agreeing on a plan.
              </p>
            </article>
          </div>
          <div className="mt-12 max-w-3xl">
            <h2 className="text-3xl font-bold">
              Start with the people you want to reach.
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Tell Emmanuel about your organization, who you serve, and the work
              your members want help with. Include any timing or accessibility
              needs you already know about.
            </p>
            <Button asChild size="lg" className="mt-7">
              <Link href="/book?audience=organization">Request a session</Link>
            </Button>
            <p className="mt-5 text-sm text-muted-foreground">
              Based in Smyrna, Delaware. We can discuss local and virtual
              options.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
