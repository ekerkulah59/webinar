import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useLocation } from "wouter";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Past Webinars", href: "/past-webinars" },
  { label: "Courses", href: "/courses" },
  { label: "Upcoming", href: "/#upcoming" },
  { label: "Insights", href: "/insights" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const closeMobile = () => setMobileOpen(false);
  const currentHash = typeof window !== "undefined" ? window.location.hash : "";

  const isActiveLink = (href: string) => {
    if (href.startsWith("/#")) {
      if (location !== "/") return false;
      return currentHash === href.slice(1);
    }
    return location === href;
  };
  const handleHomeLinkClick = () => {
    if (window.location.pathname !== "/") return;
    if (window.location.hash) {
      window.history.replaceState(null, "", "/");
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-background/80 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none"
      }`}
    >
      <div className="container py-4 flex items-center justify-between gap-4">
        <Link
          href="/"
          onClick={handleHomeLinkClick}
          className="flex shrink-0 items-center"
          aria-label="EaseIntoAI — home"
        >
          <img src="/logo.svg" alt="EaseIntoAI" className="h-9 w-auto" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`text-sm font-medium transition-colors ${
                isActiveLink(href)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link href="/#upcoming">
            <Button size="sm" variant="primary">
              Next Webinar
            </Button>
          </Link>
        </div>

        {/* Mobile nav */}
        <div className="flex shrink-0 items-center md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="size-10 border-border bg-background text-foreground shadow-sm"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
              >
                <Menu className="size-5" aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 gap-0 p-0 sm:max-w-xs">
              <SheetTitle className="sr-only">Site navigation</SheetTitle>
              <nav className="flex flex-col gap-1 px-4 pt-14 pb-8">
                {navLinks.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={closeMobile}
                    className={`text-base font-medium px-3 py-3 rounded-md transition-colors ${
                      isActiveLink(href)
                        ? "bg-accent/10 text-foreground"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
                <div className="mt-4 px-3">
                  <Link href="/#upcoming" onClick={closeMobile}>
                    <Button className="w-full" variant="primary">
                      Next Webinar
                    </Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
