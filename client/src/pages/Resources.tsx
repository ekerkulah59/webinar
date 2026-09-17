import PageLayout from "@/components/PageLayout";
import { Link } from "wouter";
export default function Resources() {
  return (
    <PageLayout
      title="Resources"
      eyebrow="Coming later"
      heading="Practical resources are on the way."
      description="This space will hold simple guides and checklists for using AI in your business."
    >
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl rounded-2xl border border-dashed border-border p-8">
            <h2 className="text-2xl font-bold">
              Guides & checklists — forthcoming
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              No downloads are published here yet. In the meantime, the{" "}
              <Link
                href="/how-it-works#safe-check"
                className="font-semibold text-accent underline underline-offset-4"
              >
                SAFE Check
              </Link>{" "}
              is ready to use, and you can explore{" "}
              <Link
                href="/insights"
                className="font-semibold text-accent underline underline-offset-4"
              >
                existing insights
              </Link>
              .
            </p>
            {/* TODO: Add approved resources and working download links when ready. */}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
