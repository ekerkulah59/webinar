import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const safeItems = [
  {
    letter: "S",
    letterClassName: "text-accent",
    question: "Safe to share?",
    description:
      "Does this output contain any confidential, personal, or sensitive information that shouldn't leave your hands?",
  },
  {
    letter: "A",
    letterClassName: "text-chart-2",
    question: "Accurate?",
    description:
      "Have you verified the key facts? AI can sound completely certain while being completely wrong.",
  },
  {
    letter: "F",
    letterClassName: "text-chart-3",
    question: "Fair to send?",
    description:
      "Is this appropriate to send given what your clients expect and any disclosure you owe them?",
  },
  {
    letter: "E",
    letterClassName: "text-chart-1",
    question: "Edited by me?",
    description:
      "Have you reviewed and personalized it? Your business's name is on it. You own the outcome.",
  },
];

export default function SafeCheckSection() {
  return (
    <section id="safe-check" className="py-20 bg-foreground">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-5">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest">
              Original Framework
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-background leading-tight tracking-tight">
              The SAFE Check
            </h2>
            <p className="text-base md:text-lg text-background/75 leading-relaxed">
              Before you send anything AI helped you create, run it through
              these four questions. It takes about thirty seconds, and it is the
              habit that lets you use AI on customer-facing work without lying
              awake about it.
            </p>
            <p className="text-base md:text-lg text-background/75 leading-relaxed">
              AI can be confidently wrong. Your name goes on the work. The SAFE
              Check is how you stay in control.
            </p>
            <Button asChild variant="primary" size="lg" className="mt-2">
              <Link href="/pilot">
                Put it to work in the Pilot
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {safeItems.map(item => (
              <div
                key={item.letter}
                className="rounded-xl border border-background/15 bg-background/[0.07] p-5"
              >
                <p
                  className={`text-4xl font-black leading-none mb-3 ${item.letterClassName}`}
                  aria-hidden
                >
                  {item.letter}
                </p>
                <p className="text-sm font-bold text-background mb-2">
                  {item.question}
                </p>
                <p className="text-sm text-background/60 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
