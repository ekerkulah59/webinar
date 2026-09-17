import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pilot } from "@/lib/offerData";
export default function OfferLadder() {
  const offers = [
    {
      title: "Learn",
      label: "Free / low-cost",
      copy: "Get comfortable with AI through public workshops, self-paced learning, and the SAFE Check.",
      href: "/individual-learning",
      cta: "Explore learning",
    },
    {
      title: pilot.name,
      label: "Paid · built with you",
      copy: "Bring one real task. Build one AI system that runs in your business, with you in control.",
      href: "/pilot",
      cta: "Explore the Pilot",
    },
    {
      title: "Done-for-you",
      label: "Project-based",
      copy: "Have a receptionist, website, follow-up automation, or content system built around your business.",
      href: "/book",
      cta: "Discuss what you need",
    },
  ];
  return (
    <ol
      className="grid gap-5 lg:grid-cols-3"
      aria-label="Three ways to work with EaseIntoAI"
    >
      {offers.map((offer, index) => (
        <li
          key={offer.title}
          className={`relative flex flex-col rounded-2xl border p-7 md:p-8 ${index === 1 ? "border-accent/50 bg-accent/[0.055] shadow-sm" : "border-border bg-card"}`}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-bold text-accent">0{index + 1}</span>
            <span className="text-xs font-semibold text-muted-foreground">
              {offer.label}
            </span>
          </div>
          <h3 className="mt-6 text-2xl font-bold leading-tight tracking-tight">
            {offer.title}
          </h3>
          <p className="mt-4 flex-1 leading-relaxed text-muted-foreground">
            {offer.copy}
          </p>
          <Button
            asChild
            variant={index === 1 ? "primary" : "secondary"}
            className="mt-7 w-full"
          >
            <Link href={offer.href}>
              {offer.cta}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </li>
      ))}
    </ol>
  );
}
