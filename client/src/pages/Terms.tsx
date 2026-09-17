import PageLayout from "@/components/PageLayout";

export default function Terms() {
  return (
    <PageLayout
      title="Website terms"
      eyebrow="Working together"
      heading="Website terms"
      description="A few practical points about using this website and taking the next step with EaseIntoAI."
    >
      <div className="container py-12 md:py-16">
        <div className="max-w-3xl space-y-8 text-base leading-relaxed text-muted-foreground">
          <p className="text-sm">Updated September 10, 2026</p>
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              Learning and information
            </h2>
            <p>
              Website articles, examples, and resources are educational. AI
              output needs human review for accuracy and suitability before you
              use it in your business. Examples illustrate possibilities; they
              are not promises of a particular result.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              Conversations and paid work
            </h2>
            <p>
              Requesting a conversation does not enroll you in a paid Pilot or
              commit you to a project. Scope, pricing, delivery arrangements,
              and any applicable cancellation terms are agreed separately before
              paid work begins.
            </p>
            <p>
              For courses sold through an external checkout, review the product
              details and purchase terms shown there before purchasing.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              Appointments and contact
            </h2>
            <p>
              Use your appointment management link to reschedule or cancel. If
              you cannot access it, or a form is unavailable, email{" "}
              <a
                className="font-medium text-accent underline underline-offset-4"
                href="mailto:hello@easeintoai.co"
              >
                hello@easeintoai.co
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
