import { FormEvent, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitLead } from "@/lib/leads";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleHomeLinkClick = () => {
    if (window.location.pathname !== "/") return;
    if (window.location.hash) {
      window.history.replaceState(null, "", "/");
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleNewsletterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;

    try {
      setIsSubmitting(true);
      await submitLead({
        source: "newsletter",
        email,
      });
      setEmail("");
      toast.success("You're on the list!");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to subscribe right now.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer
      id="newsletter"
      className="border-t-2 border-accent/50 bg-foreground"
    >
      <div className="container py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 md:col-span-2">
            <img
              src="/logo-full-dark.svg"
              alt="EaseIntoAI"
              className="h-14 w-auto"
            />
            <p className="text-sm text-background/60 leading-relaxed max-w-sm">
              Practical AI education for non-technical women building businesses
              around full-time jobs and full lives. Reduce repetitive work,
              create reusable processes, and grow within the hours you have.
            </p>
            <p className="text-xs text-background/45 leading-relaxed max-w-sm">
              Based in Delaware · Serving the Mid-Atlantic: New Jersey,
              Maryland, Pennsylvania, Virginia, New York &amp; the Washington,
              DC area · Live webinars on Zoom, wherever you are
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-background">Explore</p>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/#who-we-help"
                  className="break-all text-sm text-background/60 hover:text-background transition-colors"
                >
                  Who We Help
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  onClick={handleHomeLinkClick}
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/past-webinars"
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  Past Webinars
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/custom-ai-assistant"
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  Custom AI Assistant
                </Link>
              </li>
              <li>
                <Link
                  href="/insights"
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  News &amp; Insights
                </Link>
              </li>
              <li>
                <Link
                  href="/book"
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  Book a Call
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-background">Contact</p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:theaibootcamp09@gmail.com"
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  theaibootcamp09@gmail.com
                </a>
              </li>
            </ul>
            {/* Replace this Gmail address only when a verified @easeintoai.co inbox is configured. */}
            <div className="pt-4">
              <a
                href="https://www.easetranslate.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:text-accent/80 transition-colors font-medium"
              >
                Check out EaseTranslate →
              </a>
            </div>
            <div className="mb-12 rounded-xl  p-6 md:p-7">
              <p className="text-base font-semibold text-background">
                Subscribe to our newsletter
              </p>
              <form
                className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center"
                onSubmit={handleNewsletterSubmit}
              >
                <Input
                  type="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  required
                  autoComplete="email"
                  placeholder="Enter your email"
                  className="h-11 border-background/25 bg-background/10 text-background placeholder:text-background/50 sm:max-w-sm"
                  disabled={isSubmitting}
                />
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/40">
            &copy; {new Date().getFullYear()} EaseIntoAI. All rights reserved.
          </p>
          <p className="text-xs text-background/40">
            Built with purpose. Powered by curiosity.
          </p>
        </div>
      </div>
    </footer>
  );
}
