import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Play,
  Users,
  ArrowRight,
  Mail,
  Award,
  Linkedin,
  Twitter,
  ChevronDown,
} from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import AboutSection from "@/components/AboutSection";
import { blogPosts, CATEGORIES } from "@/lib/blogData";

const GOOGLE_FORM_URL = "https://forms.gle/7CpMZsfiC5HwjFFx9";
/** Newsletter signup form – "Our Newsletter" (Option A). */
const NEWSLETTER_FORM_URL = "https://forms.gle/2f8fNRdqP7yjC5Gc9";

// ─── Past Webinars Data ──────────────────────────────────────────
const pastWebinars = [
  {
    id: 1,
    title: "Understand AI Without the Confusion",
    date: "February 14, 2025",
    attendees: "50+",
    duration: "1 hour",
    description:
      "A practical introduction to artificial intelligence designed for people who are curious but unsure where to start. No technical background required.",
    outcomes: [
      "What AI actually is and what it is not",
      "How AI works in everyday life",
      "Common misconceptions vs reality",
      "A roadmap for continued learning",
    ],
    status: "completed" as const,
  },
  {
    id: 2,
    title: "AI Tools You Can Start Using Today",
    date: "February 28, 2026",
    attendees: "75+",
    duration: "1 hour",
    description:
      "Hands-on walkthrough of real AI tools — ChatGPT, Claude, Canva AI, and more — with live demos and practical workflows you can apply immediately.",
    outcomes: [
      "Hands-on AI tool demonstrations",
      "Practical workflows you can use today",
      "Live Q&A with real-time answers",
      "Resources to continue learning",
    ],
    status: "completed" as const,
  },
];

// ─── Countdown Hook ──────────────────────────────────────────────
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = targetDate.getTime() - new Date().getTime();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return timeLeft;
}

// ─── Countdown Display ───────────────────────────────────────────
function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  const blocks = [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Min" },
    { value: seconds, label: "Sec" },
  ];

  return (
    <div className="flex gap-3 justify-center">
      {blocks.map((block) => (
        <div key={block.label} className="text-center">
          <div className="w-16 h-16 bg-accent/10 border border-accent/20 rounded-lg flex items-center justify-center mb-1">
            <span className="text-2xl font-bold text-accent">
              {String(block.value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            {block.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Navigation ──────────────────────────────────────────────────
function Navigation() {
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
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-accent-foreground font-bold text-sm">Ei</span>
          </div>
          <span className="text-lg font-bold text-foreground tracking-tight">
            EaseIntoAI
          </span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "About", id: "about" },
            { label: "Past Webinars", id: "past-webinars" },
            { label: "Upcoming", id: "upcoming" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </button>
          ))}
          <Link
            href="/insights"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Insights
          </Link>
          <Button
            onClick={() => scrollTo("upcoming")}
            size="sm"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
          >
            Next Webinar
          </Button>
        </div>
      </div>
    </nav>
  );
}

// ─── Newsletter Section (Option A: Google Form) ───────────────────
function NewsletterSection() {
  const handleSubscribe = () => {
    window.open(NEWSLETTER_FORM_URL, "_blank", "noopener,noreferrer");
    toast.success("Opening signup form…");
  };

  return (
    <section className="py-24 bg-secondary/40">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto">
            <Mail className="w-7 h-7 text-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Stay in the Loop
          </h2>
          <p className="text-lg text-muted-foreground">
            Get notified about new webinars, resources, and insights on AI.
            No spam — just value.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2 justify-center">
            <Button
              type="button"
              onClick={handleSubscribe}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-3"
            >
              Subscribe
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Your privacy is respected. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ───────────────────────────────────────────────────
export default function Home() {
  const handleRegisterClick = () => {
    window.open(GOOGLE_FORM_URL, "_blank");
  };

  // Upcoming webinar: Prompt Engineering — March 15, 2026
  const upcomingDate = new Date("2026-03-15T15:00:00Z");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* ── Hero Section ─────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[100px]" />
        </div>

        <div className="container py-24 md:py-36">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm font-medium text-accent">
              <Award className="w-4 h-4" />
              AI Educator &amp; Builder
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-[1.1] tracking-tight">
              Making AI
              <br />
              <span className="text-accent">Accessible</span> to Everyone
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              I host practical, no-hype webinars that help everyday people
              understand and use artificial intelligence with confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                onClick={() =>
                  document
                    .getElementById("upcoming")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-3 text-base"
              >
                Register for Next Webinar
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={() =>
                  document
                    .getElementById("past-webinars")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                variant="outline"
                size="lg"
                className="font-semibold px-8 py-3 text-base border-border"
              >
                View Past Webinars
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </div>

          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── About Section ────────────────────────────────────── */}
      <AboutSection />

      <div className="section-divider" />

        {/* ── Upcoming Webinar ─────────────────────────────────── */}
        <section id="upcoming" className="py-24 bg-secondary/40">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
              Don't Miss It
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Upcoming Webinar
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="overflow-hidden border-accent/20 shadow-lg">
              <div className="p-8 md:p-12 space-y-8">
                {/* Badge */}
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full uppercase tracking-wide">
                    March 14, 2026
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Webinar #3
                  </span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-foreground">
                    Prompt Engineering: Get Better Results From AI
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    You have the tools — now master how to talk to them. This
                    session is all about writing prompts that get you the results
                    you want. We'll cover structure, clarity, examples, and
                    common pitfalls so you can use ChatGPT, Claude, and other
                    AI assistants more effectively every day.
                  </p>
                </div>

                {/* Event details */}
                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-accent" />
                    March 14, 2026
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent" />
                    Time in confirmation email
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    Online — join from anywhere
                  </span>
                </div>

                {/* Countdown */}
                <div className="py-6">
                  <CountdownTimer targetDate={upcomingDate} />
                </div>

                {/* What you'll learn */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    What to Expect
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "How to structure prompts for clarity and consistency",
                      "Using examples and context to improve outputs",
                      "Common mistakes and how to avoid them",
                      "Live Q&A and practice prompts together",
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2.5 text-sm text-foreground"
                      >
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <Button
                    onClick={handleRegisterClick}
                    size="lg"
                    className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-10 py-3 text-base"
                  >
                    Register Now
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3">
                    Free to attend. No spam. Unsubscribe anytime.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
      <div className="section-divider" />

      {/* ── Past Webinars ────────────────────────────────────── */}
      <section id="past-webinars" className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
              Track Record
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Past Webinars
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-xl mx-auto">
              Every session is designed to deliver real understanding, not just
              information.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {pastWebinars.map((webinar) => (
              <Card
                key={webinar.id}
                className="overflow-hidden border-border/60 hover:border-accent/30 transition-colors"
              >
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start gap-8">
                    {/* Left: Info */}
                    <div className="flex-1 space-y-5">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                          Completed
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Webinar #{webinar.id}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-foreground">
                        {webinar.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {webinar.description}
                      </p>

                      <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-accent" />
                          {webinar.date}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-accent" />
                          {webinar.duration}
                        </span>
                        <span className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-accent" />
                          {webinar.attendees} attendees
                        </span>
                      </div>
                    </div>

                    {/* Right: Outcomes */}
                    <div className="md:w-72 flex-shrink-0">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                        Key Outcomes
                      </p>
                      <ul className="space-y-2.5">
                        {webinar.outcomes.map((outcome, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-sm text-foreground"
                          >
                            <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Replay hint */}
                  <div className="mt-8 pt-6 border-t border-border flex items-center gap-3">
                    <Play className="w-5 h-5 text-accent" />
                    <span className="text-sm text-muted-foreground">
                      Replay available for registered attendees
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

    

    


      <div className="section-divider" />

      {/* ── Latest Insights ──────────────────────────────────── */}
      <section className="py-24">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
                From the Blog
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Latest Insights
              </h2>
            </div>
            <Link href="/insights">
              <Button
                variant="outline"
                className="font-medium border-border"
              >
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post) => {
              const cat = CATEGORIES[post.category];
              return (
                <Link key={post.slug} href={`/insights/${post.slug}`}>
                  <Card className="overflow-hidden border-border/60 hover:border-accent/20 transition-colors cursor-pointer group h-full">
                    <div className="p-6 space-y-4 flex flex-col h-full">
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide ${cat.color}`}
                        >
                          {cat.label}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Newsletter / Final CTA ───────────────────────────── */}
      <NewsletterSection />

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-border bg-background">
        <div className="container py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center">
                  <span className="text-accent-foreground font-bold text-sm">
                    Ei
                  </span>
                </div>
                <span className="text-lg font-bold text-foreground tracking-tight">
                  EaseIntoAI
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                AI Educator &amp; Builder. Hosting free, practical webinars to
                help people navigate the world of artificial intelligence with
                clarity and confidence.
              </p>
              <div className="flex gap-3 pt-2">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center hover:bg-accent/10 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-muted-foreground" />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center hover:bg-accent/10 transition-colors"
                  aria-label="Twitter / X"
                >
                  <Twitter className="w-4 h-4 text-muted-foreground" />
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div className="space-y-4">
              <p className="text-sm font-semibold text-foreground">
                Quick Links
              </p>
              <ul className="space-y-2.5">
                {[
                  { label: "About", id: "about" },
                  { label: "Past Webinars", id: "past-webinars" },
                  { label: "Upcoming", id: "upcoming" },
                ].map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() =>
                        document
                          .getElementById(link.id)
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <p className="text-sm font-semibold text-foreground">Contact</p>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="mailto:theaibootcamp09@gmail.com"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    theaibootcamp09@gmail.com
                  </a>
                </li>
              </ul>
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
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} EaseIntoAI. All rights
              reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Built with purpose. Powered by curiosity.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
