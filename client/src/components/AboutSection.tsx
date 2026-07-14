import { useState } from "react";
import { Globe, User } from "lucide-react";

const pillars = [
  {
    title: "We Start With Your Workload",
    text: "We identify the repetitive tasks consuming your time before recommending any AI tool.",
  },
  {
    title: "We Build Something Practical",
    text: "Every session helps you apply AI to a real email, follow-up, content task, form, or business process.",
  },
  {
    title: "We Protect Your Voice",
    text: "AI helps prepare the work, but your personality, judgment, and client relationships remain yours."
  },
  {
    title: "We Keep You in Control",
    text: "You learn what AI can handle, what information should remain private, and what always requires human review.",
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
              You’re Not Behind on AI. You’re Carrying Too Much.
            </h2>

            <div className="mt-8 space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              <p>
              AI is everywhere—your inbox, social media, and every “10 tools you need” post. But when you’re serving clients, creating content, answering inquiries, managing appointments, and handling the administration, learning another tool can feel like one more responsibility.

The problem isn’t that you’re unwilling to learn. The problem is that you’re already doing the work of several people.
              </p>
              <p>
              You do the work customers pay you for. Then you do all the work behind it: the emails, follow-ups, forms, content, planning, and client communication that keep the business moving.

If you also have family or caregiving responsibilities, unfinished business work often competes with the time and energy the people you love need from you.
              </p>
              <p>
              EaseIntoAI helps women business owners identify the repetitive work taking up their time and learn how to use AI to make that work lighter.

We teach practical ways to use AI for first drafts, client communication, content preparation, follow-ups, business documents, and everyday admin—while you remain responsible for reviewing and approving the final result.
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
          EaseIntoAI was started after noticing that most AI content is made
          for people excited about technology — not for women running a
          business all day and a home all evening. They don&apos;t need
          another tool list. They need hours back.
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
