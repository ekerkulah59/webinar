import { ShieldCheck, HeartHandshake, Rocket, Mic } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
              About Us
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              We Are in the Fourth
              <br />
              Industrial Revolution
            </h2>
            <p className="text-lg text-muted-foreground mt-5 max-w-2xl mx-auto leading-relaxed">
              And if AI feels overwhelming or even scary right now — you're not
              alone. Most people feel that way. That's exactly why we're here.
            </p>
          </div>

          {/* Empathy-first statement */}
          <div className="mb-20 p-8 md:p-10 rounded-2xl bg-accent/10 border border-accent/30">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <p className="text-xl md:text-2xl text-foreground leading-relaxed">
                The fear is real — fear of being replaced, fear of falling
                behind, fear of not understanding.{" "}
                <span className="font-semibold text-accent">
                  But here's what we believe:
                </span>{" "}
                AI is not here to replace you. It's a thinking partner. It helps
                you recognize patterns, spot opportunities, and launch solutions
                you couldn't build alone.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                The gap between fear and confidence is smaller than you think —
                and closing it starts with understanding.
              </p>
            </div>
          </div>

          {/* Two-column: Photo + Story */}
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 md:gap-16 items-start">
            {/* Photo column */}
            <div className="flex flex-col items-center md:sticky md:top-32">
              <div className="relative">
                <div className="w-64 h-72 sm:w-72 sm:h-80 rounded-2xl overflow-hidden border border-border shadow-xl">
                  <img
                    src="emam.jpeg"
                    alt="Emmanuel Kerkulah — Creator of EaseIntoAI"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative accent */}
                <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-accent/10 rounded-2xl -z-10" />
              </div>
              <div className="text-center mt-5">
                <p className="text-base font-semibold text-foreground">
                  Emmanuel Kerkulah
                </p>
                <p className="text-sm text-muted-foreground">
                  Creator &amp; Host
                </p>
              </div>
            </div>

            {/* Content column */}
            <div className="space-y-6">
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  EaseIntoAI was started by Emmanuel Kerkulah from a simple
                  observation: millions of people are curious about AI but held
                  back by confusion, misinformation, or the feeling that it's
                  "not for them." The truth is, the vast opportunities AI
                  provides are within reach for everyone. You don't need a
                  technical background. You just need a place to start.
                </p>
                <p>
                  Our approach is rooted in real-world experimentation —
                  building automation systems, websites, and SaaS applications,
                  often starting from nothing but curiosity. We learned by
                  doing, made every mistake, and turned those lessons into
                  webinars so you don't have to figure it out alone.
                </p>
                <p>
                  That's why EaseIntoAI exists. Not to impress you with jargon,
                  but to sit with you through the discomfort, answer your real
                  questions, and help you move from fear to action. Whether
                  you're just getting started or stuck in uncertainty, our
                  mission is simple:{" "}
                  <span className="text-foreground font-medium">
                    help you see AI clearly, use it confidently, and stop being
                    afraid of what could actually be your greatest advantage.
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Mission pillars — full-width below the two-column layout */}
          <div className="mt-20 pt-10 border-t border-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  icon: ShieldCheck,
                  title: "We Get the Fear",
                  text: "You're not behind. You're not too late. The fear of AI is normal — and we're here to help you move past it.",
                },
                {
                  icon: HeartHandshake,
                  title: "AI as a Partner",
                  text: "AI isn't your replacement — it's a thinking partner that helps you recognize patterns and build solutions.",
                },
                {
                  icon: Rocket,
                  title: "From Fear to Action",
                  text: "Our goal is to take you from overwhelmed to empowered — one clear, practical step at a time.",
                },
                {
                  icon: Mic,
                  title: "Why Webinars",
                  text: "Live sessions let us sit with your questions in real time. No scripts. No upsells. Just honest learning.",
                },
              ].map((pillar) => (
                <div key={pillar.title} className="space-y-3 text-center">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center mx-auto">
                    <pillar.icon className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    {pillar.title}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
