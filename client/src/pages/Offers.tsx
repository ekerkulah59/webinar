import PageLayout from "@/components/PageLayout";
import OfferLadder from "@/components/OfferLadder";
export default function Offers() {
  return (
    <PageLayout
      title="Ways to Work Together"
      eyebrow="Practical support, at your pace"
      heading="Choose the help your business needs."
      description="Start with learning, get one system running together in the paid Pilot, or have a specific piece built for you. You don’t need to complete every rung."
    >
      <section className="py-14 md:py-20">
        <div className="container">
          <OfferLadder />
        </div>
      </section>
    </PageLayout>
  );
}
