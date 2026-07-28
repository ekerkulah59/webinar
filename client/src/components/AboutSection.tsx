import { useState } from "react";
import { Globe, User } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="container">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-12 lg:gap-16 items-start">
          {/* Main content */}
          <div>
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
              Meet the Founder
            </p>
            <h2 className="text-4xl md:text-[2.75rem] font-bold text-foreground leading-[1.15] tracking-tight max-w-2xl">
              Built for Business Owners Who Need Practical Support, Not More
              Hype.
            </h2>

            <div className="mt-8 space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              <p>
                EaseIntoAI was created after recognizing that most AI education
                is designed for people excited about technology—not for women
                working full-time, building businesses after hours, serving
                clients, managing families, and trying to grow without a full
                team.
              </p>
              <p>
                They do not need another list of tools. They need practical
                support for the hours they actually have—whether their work
                happens behind a salon chair, at an event venue, on a coaching
                call, in front of a camera, or while preparing customer orders.
              </p>
              <p>
                Emmanuel brings hands-on experience building websites,
                applications, automation systems, and AI tools. EaseIntoAI turns
                that experience into beginner-friendly guidance that starts with
                a real business task and keeps the owner responsible for
                reviewing and approving the result.
              </p>
            </div>

            {/* Profile card — mobile only, before feature grid */}
            <aside className="mt-10 lg:hidden">
              <ProfileCard />
            </aside>
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
          EaseIntoAI is for non-technical women building serious businesses
          around full-time work and already-full lives. The teaching starts with
          the work they need to complete—not with a list of tools.
        </p>
        <p>
          Emmanuel&apos;s approach is grounded in building websites,
          applications, automation systems, and AI tools, then explaining the
          useful parts in everyday language.
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
