import { useState } from "react";
import { Globe, User } from "lucide-react";

const pillars = [
  {
    title: "We Start With the Fear",
    text: "Feeling intimidated by AI is normal, especially when you're already stretched thin running a business. We don't rush past it. We start there.",
  },
  {
    title: "We Teach Frameworks",
    text: "You'll leave with tools you can use in your business the same day, not just information to remember.",
  },
  {
    title: "We Answer Real Questions",
    text: "Every session ends with live Q&A. Ask about your actual business, your actual offers, your actual clients.",
  },
  {
    title: "We Stay Honest",
    text: "We tell you when AI gets things wrong, especially with client-facing work. No hype. No affiliate links. No upsells.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="container">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-12 lg:gap-16 items-start">
          {/* Main content */}
          <div>
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
              About EaseIntoAI
            </p>
            <h2 className="text-4xl md:text-[2.75rem] font-bold text-foreground leading-[1.15] tracking-tight max-w-2xl">
              Most Women Running a Business Feel Behind on AI. That&apos;s Not
              Your Fault.
            </h2>

            <div className="mt-8 space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              <p>
                AI is everywhere right now in the news, in your inbox, in
                every &ldquo;10 tools you need&rdquo; post from someone selling
                something. And if you&apos;re a coach, consultant, creator, or
                you run a salon, boutique, studio, or food truck, the honest
                feeling isn&apos;t excitement. It&apos;s overwhelm.
                You&apos;re already juggling marketing, content, client
                messages, bookings, and the actual work of your business. AI
                feels like one more thing to figure out, on top of everything
                else.
              </p>
              <p>
                Here&apos;s the truth: you don&apos;t need to be technical to
                use AI. You don&apos;t need a computer science degree or a
                &ldquo;tech brain.&rdquo; You just need someone to explain it
                in plain language, show you what it actually does for a
                business like yours, and answer your real questions without
                making you feel behind.
              </p>
              <p>
                That&apos;s what EaseIntoAI is for. We host practical, live
                Zoom webinars built specifically for women entrepreneurs and
                small business owners that walk you through AI from the ground
                up: what it is, how to use it for content and clients, where
                it goes wrong, and how to build simple systems that give you
                back hours every week.
              </p>
            </div>

            {/* Profile card — mobile only, before feature grid */}
            <aside className="mt-10 lg:hidden">
              <ProfileCard />
            </aside>

            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-lg bg-accent/[0.06] pl-5 pr-5 py-5 border-l-4 border-l-accent surface-card surface-card-hover"
                >
                  <p className="text-sm font-bold text-foreground mb-1.5">
                    {pillar.title}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Profile sidebar — desktop */}
          <aside className="hidden lg:block lg:sticky lg:top-28">
            <ProfileCard />
          </aside>
        </div>
      </div>
    </section>
  );
}

function ProfileCard() {
  const [hasPortraitError, setHasPortraitError] = useState(false);

  return (
    <div className="rounded-2xl bg-foreground text-background p-7 shadow-xl">
      <div className="mb-5">
        {!hasPortraitError ? (
          <img
            src="/image.jpeg"
            alt="Portrait of Emmanuel Kerkulah, founder of EaseIntoAI"
            className="h-24 w-24 rounded-full object-cover border-2 border-background/25"
            loading="lazy"
            onError={() => setHasPortraitError(true)}
          />
        ) : (
          <div className="h-24 w-24 rounded-full border border-background/20 bg-background/10 flex items-center justify-center">
            <User className="w-10 h-10 text-background/65" aria-hidden />
          </div>
        )}
      </div>
      <h3 className="text-xl font-bold text-background leading-tight">
        Emmanuel Kerkulah
      </h3>
      <p className="mt-1 text-sm font-medium text-accent">
        Creator &amp; Host · easeintoai.co
      </p>

      <div className="mt-5 space-y-4 text-sm text-background/75 leading-relaxed">
        <p>
          EaseIntoAI was started after noticing that most AI content was made
          for people already excited about technology not for the women
          running businesses who are curious, stretched thin, and just want
          practical help.
        </p>
        <p>
          Emmanuel&apos;s approach is built on real-world experimentation:
          building automation systems, websites, and applications, making every
          mistake and turning those lessons into webinars so you don&apos;t
          have to figure it out alone.
        </p>
      </div>

      <div className="mt-6 pt-5 border-t border-background/15">
        <a
          href="https://easeintoai.co"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
        >
          <Globe className="w-4 h-4" />
          easeintoai.co
        </a>
      </div>
    </div>
  );
}
