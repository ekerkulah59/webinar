import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Sparkles, ExternalLink, CheckCircle2, Shield, BookOpen, Users } from "lucide-react";
import AboutHost from "@/components/AboutHost";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdlQlVt0h__m_8r2qzBqS3uL_Z5SC7Fgw6jSklH8QIPj-WiSA/viewform";

export default function Home() {
  const handleRegisterClick = () => {
    window.open(GOOGLE_FORM_URL, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">

            <span className="text-xl font-bold text-foreground">AI Bootcamp</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                  Understand AI Without the Confusion
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  A practical introduction to artificial intelligence designed for people who are curious but unsure where to start. No technical background required.
                </p>
              </div>

              {/* Event details */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4 text-lg">
                  <Calendar className="w-6 h-6 text-accent flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Saturday, February 14, 2025</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-lg">
                  <Clock className="w-6 h-6 text-accent flex-shrink-0" />
                  <p className="font-semibold text-foreground">11:00 AM to 12:00 PM EST</p>
                </div>

                <div className="flex items-center gap-4 text-lg">
                  <MapPin className="w-6 h-6 text-accent flex-shrink-0" />
                  <p className="font-semibold text-foreground">Online. Join from anywhere.</p>
                </div>
              </div>

              {/* Why attend - trust focused */}
              <div className="space-y-3 pt-6 border-t border-border">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">What you will understand</p>
                <ul className="space-y-2">
                  {[
                    "What AI actually is and what it is not",
                    "How AI works in everyday life",
                    "Common misconceptions and hype vs reality",
                    "Where to learn more after this session",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right - Registration CTA */}
            <div className="lg:sticky lg:top-24">
              <Card className="p-8 shadow-lg border-border/50">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      Register for Free
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      One hour. No experience needed. No sales pitch.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Button
                      onClick={handleRegisterClick}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      Register Now
                      <ExternalLink className="w-4 h-4" />
                    </Button>

                    <p className="text-xs text-muted-foreground">
                      We respect your privacy. Your email will only be used to send you the webinar link and follow-up resources.
                    </p>
                  </div>

                  <div className="pt-4 space-y-3 border-t border-border">
                    <p className="text-sm font-semibold text-foreground">After you register</p>
                    <ul className="text-xs text-muted-foreground space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-accent font-bold mt-0.5">1.</span>
                        <span>You will receive an email with the meeting link</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent font-bold mt-0.5">2.</span>
                        <span>Join the webinar on February 14 at 11 AM EST</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent font-bold mt-0.5">3.</span>
                        <span>Get resources and next steps to continue learning</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why this matters section */}
      <section className="py-20 bg-secondary/30 border-t border-border">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why This Webinar Exists</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              AI is everywhere, but most people feel confused or intimidated. This webinar cuts through the noise and gives you a clear, honest foundation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "No Hype",
                description: "We focus on what AI actually is, not sensational headlines or exaggerated claims about the future.",
              },
              {
                icon: BookOpen,
                title: "Practical Understanding",
                description: "Learn how AI works in tools you already use, with real examples that make sense.",
              },
              {
                icon: Users,
                title: "Beginner Friendly",
                description: "Designed for people with no technical background. Questions are encouraged.",
              },
            ].map((feature, idx) => (
              <Card key={idx} className="p-6 border-border/50 hover:shadow-md transition-shadow">
                <feature.icon className="w-10 h-10 text-accent mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About The Host */}
      <AboutHost />

      {/* What to expect section */}
      <section className="py-20 border-t border-border">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8">What to Expect</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">The Basics</h3>
                <p className="text-muted-foreground">
                  We start with the fundamentals. What is artificial intelligence? How is it different from regular software? What can it actually do?
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Real Examples</h3>
                <p className="text-muted-foreground">
                  You will see how AI is already part of your daily life. From search engines to recommendations to voice assistants. Understanding these examples helps everything else make sense.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Clearing Up Confusion</h3>
                <p className="text-muted-foreground">
                  We address common misconceptions head on. Is AI going to replace all jobs? Can AI think like humans? What is machine learning? What is the difference between AI and ChatGPT? You will get honest, clear answers.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Your Next Steps</h3>
                <p className="text-muted-foreground">
                  By the end, you will have a roadmap. Whether you want to learn more, use AI tools, or just stay informed, you will know where to go next.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-secondary/30 border-t border-border">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8">Common Questions</h2>

            <div className="space-y-6">
              {[
                {
                  q: "Do I need any technical background?",
                  a: "No. This webinar is designed for people with no technical experience. Everything is explained in plain language.",
                },
                {
                  q: "Is this a sales pitch?",
                  a: "No. This is an educational session. There is no product to sell and no upsell at the end. You will get resources and guidance, nothing more.",
                },
                {
                  q: "How long is the webinar?",
                  a: "One hour. We keep it focused and respect your time.",
                },
                {
                  q: "Will I get a recording?",
                  a: "Yes. If you cannot attend live, you will receive a recording so you can watch on your own schedule.",
                },
                {
                  q: "What if I have questions during the webinar?",
                  a: "Questions are encouraged. There will be time for Q&A during the session.",
                },
              ].map((item, idx) => (
                <Card key={idx} className="p-6 border-border/50">
                  <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                  <p className="text-muted-foreground text-sm">{item.a}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 border-t border-border">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Understand AI?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Register below. It is free, no experience needed, and you will walk away with a clear understanding of what AI is and how to think about it.
            </p>
            <Button
              onClick={handleRegisterClick}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 px-8 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 mx-auto"
            >
              Register Now
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background/50">
        <div className="container py-8">
          <div className="text-center text-muted-foreground text-sm mb-4">
            <p>Questions? Email us at theaibootcamp09@gmail.com</p>
          </div>
          <div className="text-center text-xs text-muted-foreground">
            <p>© 2025 AI Bootcamp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
