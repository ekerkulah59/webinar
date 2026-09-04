import { FormEvent, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitLead } from "@/lib/leads";

const footerLinks = [
  ["Solutions", "/#solutions"],
  ["For Organizations", "/for-organizations"],
  ["Courses", "/courses"],
  ["Custom AI Assistants", "/custom-ai-assistant"],
  ["Insights", "/insights"],
  ["Past Webinars", "/past-webinars"],
  ["About", "/#about"],
  ["Contact", "/book"],
] as const;

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    try {
      setIsSubmitting(true);
      await submitLead({ source: "newsletter", email });
      setEmail("");
      toast.success("You're on the list!");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to subscribe right now."
      );
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
        <div className="grid gap-12 lg:grid-cols-[1.35fr_.8fr_1fr]">
          <div>
            <img
              src="/logo-full-dark.svg"
              alt="EaseIntoAI"
              className="h-12 w-auto"
            />
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70">
              EaseIntoAI helps people find the few places AI genuinely helps
              them—then put it to work on something they already do, with a
              person still responsible for what goes out.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-white/50">
              Based in Delaware · Virtual learning and partnership conversations
              available more broadly
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold">Explore</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 lg:grid-cols-1">
              {footerLinks.map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-white/65 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold">Stay informed</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              A short note when there's something worth using: a new workshop
              date, a course that just opened, or one idea you can try this
              week.
            </p>
            <form
              onSubmit={subscribe}
              className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row"
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
                className="h-11 border-white/20 bg-white/10 text-white placeholder:text-white/45"
                disabled={isSubmitting}
              />
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? "Subscribing…" : "Subscribe"}
              </Button>
            </form>
            <a
              href="mailto:hello@easeintoai.co"
              className="mt-5 inline-block text-sm font-semibold text-indigo-300 hover:text-white"
            >
              hello@easeintoai.co
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-7 text-xs text-white/45">
          © {new Date().getFullYear()} EaseIntoAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
