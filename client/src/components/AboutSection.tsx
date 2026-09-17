import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutSection({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  const Heading = standalone ? "h1" : "h2";
  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-border py-16 md:py-20"
      aria-labelledby="about-heading"
    >
      <div className="container grid gap-9 md:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] md:items-center lg:gap-16">
        <figure className="m-0 overflow-hidden rounded-2xl border border-border bg-card">
          <div className="aspect-[4/3] overflow-hidden bg-secondary">
            <img
              src="/emam.jpeg"
              alt="Emmanuel Kerkulah, founder of EaseIntoAI"
              className="h-full w-full scale-[1.8] object-cover object-[50%_55%]"
              loading={standalone ? "eager" : "lazy"}
              width="1200"
              height="1600"
            />
          </div>
          <figcaption className="border-t border-border px-6 py-5">
            <p className="font-semibold">Emmanuel Kerkulah</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Founder, EaseIntoAI · Smyrna, Delaware
            </p>
          </figcaption>
        </figure>
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
            Meet the founder
          </p>
          <Heading
            id="about-heading"
            className="mt-4 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl"
          >
            Hi, I’m Emmanuel. Let’s make AI useful in your business.
          </Heading>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              I founded EaseIntoAI to help small-business owners turn access to
              AI into something they can actually use in their everyday work.
            </p>
            <p>
              We start with a task you know well. I help you work through the
              choices in plain language, build the system with you, and show you
              how to review what it does. You stay in control.
            </p>
            {standalone && (
              <p>
                Based in Smyrna, Delaware, I bring a personal approach to
                practical AI support. Whether you run a salon, coach clients,
                manage a shop, or provide a local service, the starting point is
                your business and what you need help with.
              </p>
            )}
          </div>
          <Button
            asChild
            variant={standalone ? "primary" : "secondary"}
            size="lg"
            className="mt-7"
          >
            <Link href={standalone ? "/book" : "/about"}>
              {standalone
                ? "Let’s talk about your business"
                : "More about Emmanuel"}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
