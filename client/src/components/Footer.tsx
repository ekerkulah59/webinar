import { FormEvent, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitLead } from "@/lib/leads";

const footerGroups = [
  {
    title: "Work together",
    links: [
      ["The Pilot", "/pilot"],
      ["Ways to work together", "/offers"],
      ["How it works", "/how-it-works"],
      ["Discuss a Pilot", "/book"],
    ],
  },
  {
    title: "Explore",
    links: [
      ["Individual learning", "/individual-learning"],
      ["Courses", "/courses"],
      ["Insights", "/insights"],
      ["Resources", "/resources"],
    ],
  },
  {
    title: "EaseIntoAI",
    links: [
      ["About Emmanuel", "/about"],
      ["Results", "/results"],
      ["For organizations", "/for-organizations"],
      ["Past webinars", "/past-webinars"],
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const subscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    try {
      setIsSubmitting(true);
      setStatus("");
      await submitLead({ source: "newsletter", email });
      setEmail("");
      toast.success("You're on the list!");
      setStatus("You’re on the list. Thank you for subscribing.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to subscribe. Please email hello@easeintoai.co.";
      toast.error(message);
      setStatus(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer
      id="newsletter"
      className="border-t-2 border-accent/50 bg-[#071027] text-white"
    >
      <div className="container py-14 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.7fr]">
          <div>
            <img
              src="/logo-full-dark.svg"
              alt="EaseIntoAI"
              className="h-12 w-auto"
            />
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70">
              EaseIntoAI helps small-business owners get AI working on the work
              they already repeat every week—built with them, in plain language,
              with a person still approving what goes out.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-white/65">
              Smyrna, Delaware · Local and virtual support
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
            {footerGroups.map(group => (
              <div key={group.title}>
                <h2 className="text-sm font-bold">{group.title}</h2>
                <ul className="mt-4 space-y-3">
                  {group.links.map(([label, href]) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="inline-block py-1 text-sm text-white/75 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/15 pt-8 lg:col-span-2">
            <h2 className="text-sm font-bold">Stay informed</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              A short note when there's something worth using: a new workshop
              date, a course that just opened, or one idea you can try this
              week.
            </p>
            <form
              onSubmit={subscribe}
              className="mt-5 flex max-w-xl flex-col gap-3 sm:flex-row"
            >
              <label className="sr-only" htmlFor="footer-email">
                Email address
              </label>
              <Input
                id="footer-email"
                type="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                required
                autoComplete="email"
                placeholder="Email address"
                className="h-11 border-white/20 bg-white/10 text-white placeholder:text-white/65"
                disabled={isSubmitting}
              />
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? "Subscribing…" : "Subscribe"}
              </Button>
            </form>
            <p role="status" className="mt-3 text-sm text-white/85">
              {status}
            </p>
            <p className="mt-2 text-xs text-white/65">
              We use your email to send the updates you request. Read our{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-white"
              >
                privacy notice
              </Link>
              .
            </p>
            <a
              href="mailto:hello@easeintoai.co"
              className="mt-5 inline-block text-sm font-semibold text-indigo-300 hover:text-white"
            >
              hello@easeintoai.co
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-7 text-xs text-white/65">
          <p>© {new Date().getFullYear()} EaseIntoAI. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="py-2 hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="py-2 hover:text-white">
              Website terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
