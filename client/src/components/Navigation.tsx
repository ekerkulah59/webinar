import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Who We Help", href: "/#who-we-help" },
  { label: "Courses", href: "/courses" },
  { label: "Solutions", href: "/#solutions" },
  { label: "For Organizations", href: "/for-organizations" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/#about" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      return location === "/" && window.location.hash === href.slice(1);
    }
    return location === href;
  };

  const handleHomeClick = () => {
    setMobileOpen(false);
    if (window.location.pathname === "/") {
      window.history.replaceState(null, "", "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${scrolled ? "border-border bg-background/95 shadow-sm backdrop-blur-md" : "border-transparent bg-background/90 backdrop-blur-sm"}`}
    >
      <nav
        className="container flex min-h-16 items-center justify-between gap-6"
        aria-label="Primary navigation"
      >
        <Link
          href="/"
          onClick={handleHomeClick}
          className="shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="EaseIntoAI home"
        >
          <img src="/logo.svg" alt="EaseIntoAI" className="h-8 w-auto" />
        </Link>

        <div className="hidden items-center gap-5 lg:flex">
          {navLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              className={`rounded-sm text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${isActive(link.href) ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm" variant="primary">
            <Link href="/book">Book Intro Call</Link>
          </Button>
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="size-11 lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="size-5" aria-hidden />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(88vw,22rem)] p-0">
            <SheetTitle className="sr-only">Site navigation</SheetTitle>
            <SheetDescription className="sr-only">
              Explore EaseIntoAI solutions, programs, and resources.
            </SheetDescription>
            <nav
              className="flex flex-col gap-1 px-5 pb-8 pt-16"
              aria-label="Mobile navigation"
            >
              {navLinks.map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-4 py-3 text-base font-semibold transition-colors ${isActive(link.href) ? "bg-accent/10 text-accent" : "text-foreground hover:bg-secondary"}`}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                asChild
                className="mt-5 w-full"
                size="lg"
                variant="primary"
              >
                <Link href="/book" onClick={() => setMobileOpen(false)}>
                  Book Intro Call
                </Link>
              </Button>
              <div className="mt-6 border-t border-border pt-5">
                <p className="px-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  More ways to work with us
                </p>
                <Link
                  href="/custom-ai-assistant"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 block rounded-lg px-4 py-3 text-sm font-semibold text-foreground hover:bg-secondary"
                >
                  Custom AI Assistants
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
