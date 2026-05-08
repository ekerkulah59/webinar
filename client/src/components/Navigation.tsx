import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
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

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

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

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link href="/#upcoming">
            <Button
              size="sm"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
            >
              Next Webinar
            </Button>
          </Link>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 pt-10">
              <nav className="flex flex-col gap-1">
                {navLinks.map(({ label, href }) => (
                  <SheetClose asChild key={label}>
                    <Link
                      href={href}
                      className="text-base font-medium px-3 py-3 rounded-md text-foreground hover:bg-muted transition-colors"
                    >
                      {label}
                    </Link>
                  </SheetClose>
                ))}
                <div className="mt-4 px-3">
                  <SheetClose asChild>
                    <Link href="/#upcoming">
                      <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium">
                        Next Webinar
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
