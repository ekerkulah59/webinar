import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="EaseIntoAI — home">
          <img src="/logo.svg" alt="EaseIntoAI" className="h-9 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/#about"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            href="/past-webinars"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Past Webinars
          </Link>
          <button
            onClick={() => scrollTo("upcoming")}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Upcoming
          </button>
          <Link
            href="/insights"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Insights
          </Link>
          <Link href="/#upcoming">
            <Button
              size="sm"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
            >
              Next Webinar
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
