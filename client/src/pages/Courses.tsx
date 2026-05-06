import { Clock, BookOpen, CheckCircle2, Lock, Gift, ArrowRight, GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface Course {
  id: number;
  title: string;
  description: string;
  type: "free" | "paid";
  price?: string;
  duration: string;
  modules: string[];
  status: "coming-soon";
  audience?: string;
  featured?: boolean;
}

const courses: Course[] = [
  {
    id: 1,
    title: "AI 101: Understand AI Without the Confusion",
    description:
      "The perfect starting point. No jargon, no hype — just a clear, honest introduction to what AI is, how it works in everyday life, and how to stop feeling overwhelmed by it.",
    type: "free",
    duration: "1 hour",
    modules: [
      "What AI actually is (and what it's not)",
      "How AI shows up in your everyday life",
      "The biggest misconceptions — debunked",
      "Your roadmap for getting started",
    ],
    status: "coming-soon",
  },
  {
    id: 2,
    title: "AI Foundations: From Curious to Confident",
    description:
      "The complete beginner-to-capable journey. Five structured modules covering everything from understanding AI to building a daily workflow — all in one place, at your own pace.",
    type: "paid",
    price: "$39",
    duration: "5+ hours",
    modules: [
      "Module 1 — Understanding AI Without the Confusion",
      "Module 2 — AI Tools You Can Start Using Today",
      "Module 3 — Prompt Engineering: Get Better Results",
      "Module 4 — Build Your AI Workflow",
      "Module 5 — Hallucinations & Fact-Checking",
      "Bonus: Prompt templates & cheat sheets",
    ],
    status: "coming-soon",
  },
  {
    id: 3,
    title: "Prompt Engineering Masterclass",
    description:
      "Go deep on the skill that separates casual AI users from people who get real results. Learn how to write prompts that are clear, specific, and consistently effective.",
    type: "paid",
    price: "$19",
    duration: "2 hours",
    modules: [
      "Why most prompts fail (and how to fix them)",
      "The structure of a great prompt",
      "Using context, examples, and formatting",
      "Live rewrites: before vs. after",
      "20 ready-to-use prompt templates",
    ],
    status: "coming-soon",
  },
  {
    id: 4,
    title: "AI at Work: Using AI in Your Job Confidently",
    description:
      "Built for professionals. Learn what's safe to share with AI, the best workplace use cases, and how to use AI output responsibly — so you can move faster without cutting corners.",
    type: "paid",
    price: "$19",
    duration: "2 hours",
    modules: [
      "What's safe to share with AI at work — and what's not",
      "AI for emails, reports & meeting summaries",
      "Using AI output responsibly in your role",
      "Build your personal AI policy",
      "Live demo: real workplace workflows",
    ],
    status: "coming-soon",
  },
  {
    id: 5,
    title: "AI Basics for Teachers",
    description:
      "A practical, six-module course built specifically for educators. Learn how to use AI to plan lessons, create worksheets, give feedback, communicate with parents, build classroom resources, and automate time-consuming tasks — so you can focus on what matters most: teaching.",
    type: "paid",
    price: "$49",
    duration: "6 modules",
    audience: "Teachers & Educators",
    featured: true,
    modules: [
      "Module 1 — AI Basics for Teachers",
      "Module 2 — Lesson Planning with AI",
      "Module 3 — Worksheets, Assessments & Differentiation",
      "Module 4 — Grading, Feedback & Parent Communication",
      "Module 5 — Presentations, Visuals & Classroom Resources",
      "Module 6 — Automation & Advanced Time-Saving Systems",
    ],
    status: "coming-soon",
  },
];

export default function Courses() {
  const freeCourse = courses.find((c) => c.type === "free");
  const featuredCourse = courses.find((c) => c.featured);
  const paidCourses = courses.filter((c) => c.type === "paid" && !c.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* ── Header ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-10 -left-10 w-[300px] h-[300px] bg-accent/8 rounded-full blur-[80px]" />
        </div>
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-5">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest">
              Learn at Your Own Pace
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight leading-tight">
              Courses
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Everything you learned in the live webinars — packaged into
              self-paced courses you can revisit anytime. Free and paid options
              for every stage of your AI journey.
            </p>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Free Course ──────────────────────────────────────── */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Gift className="w-5 h-5 text-accent" />
              <p className="text-sm font-semibold text-accent uppercase tracking-widest">
                Free Course
              </p>
            </div>

            {freeCourse && (
              <Card className="overflow-hidden border-accent/30 shadow-md">
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start gap-8">
                    <div className="flex-1 space-y-5">
                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                          Free
                        </span>
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                          Coming Soon
                        </span>
                      </div>

                      <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                        {freeCourse.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {freeCourse.description}
                      </p>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 text-accent" />
                        {freeCourse.duration}
                      </div>
                    </div>

                    {/* Modules */}
                    <div className="md:w-72 flex-shrink-0 bg-secondary/50 rounded-xl p-5 space-y-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        What's Inside
                      </p>
                      <ul className="space-y-2.5">
                        {freeCourse.modules.map((mod, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                            <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                            {mod}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Button
                      disabled
                      size="lg"
                      className="bg-accent/50 text-accent-foreground font-semibold px-8 cursor-not-allowed"
                    >
                      Coming Soon
                      <Clock className="w-4 h-4 ml-2" />
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Be the first to know —{" "}
                      <a
                        href="https://forms.gle/2f8fNRdqP7yjC5Gc9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent/80 font-medium transition-colors"
                      >
                        join the newsletter
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Paid Courses ─────────────────────────────────────── */}
      <section className="py-20 bg-secondary/40">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="w-5 h-5 text-accent" />
              <p className="text-sm font-semibold text-accent uppercase tracking-widest">
                Paid Courses
              </p>
            </div>

            <div className="space-y-6">
              {paidCourses.map((course) => (
                <Card
                  key={course.id}
                  className="overflow-hidden border-border/60"
                >
                  <div className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-start gap-8">
                      <div className="flex-1 space-y-4">
                        {/* Badges */}
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full uppercase tracking-wide">
                            {course.price}
                          </span>
                          <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                            Coming Soon
                          </span>
                        </div>

                        <h2 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
                          {course.title}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                          {course.description}
                        </p>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 text-accent" />
                          {course.duration}
                        </div>
                      </div>

                      {/* Modules */}
                      <div className="md:w-72 flex-shrink-0 bg-secondary/50 rounded-xl p-5 space-y-3">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          What's Inside
                        </p>
                        <ul className="space-y-2.5">
                          {course.modules.map((mod, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                              <Lock className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
                              {mod}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-border">
                      <Button
                        disabled
                        variant="outline"
                        className="font-semibold cursor-not-allowed opacity-60"
                      >
                        Coming Soon
                        <Clock className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Featured: AI Basics for Teachers ────────────────── */}
      {featuredCourse && (
        <section className="py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="w-5 h-5 text-accent" />
                <p className="text-sm font-semibold text-accent uppercase tracking-widest">
                  Specialty Course
                </p>
              </div>

              <Card className="overflow-hidden border-accent/40 shadow-lg ring-1 ring-accent/20">
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start gap-8">
                    <div className="flex-1 space-y-5">
                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full uppercase tracking-wide">
                          {featuredCourse.price}
                        </span>
                        <span className="px-3 py-1 bg-violet-100 text-violet-700 text-xs font-semibold rounded-full uppercase tracking-wide flex items-center gap-1.5">
                          <GraduationCap className="w-3 h-3" />
                          {featuredCourse.audience}
                        </span>
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                          Coming Soon
                        </span>
                      </div>

                      <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                        {featuredCourse.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {featuredCourse.description}
                      </p>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 text-accent" />
                        {featuredCourse.duration}
                      </div>
                    </div>

                    {/* Modules */}
                    <div className="md:w-72 flex-shrink-0 bg-secondary/50 rounded-xl p-5 space-y-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        What's Inside
                      </p>
                      <ul className="space-y-2.5">
                        {featuredCourse.modules.map((mod, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                            <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                            {mod}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Button
                      disabled
                      size="lg"
                      className="bg-accent/50 text-accent-foreground font-semibold px-8 cursor-not-allowed"
                    >
                      Coming Soon
                      <Clock className="w-4 h-4 ml-2" />
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Designed for K–12 and higher-ed teachers at any tech comfort level.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      <div className="section-divider" />

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-20 bg-accent">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground">
              Get Notified When Courses Drop
            </h2>
            <p className="text-lg text-accent-foreground/80 leading-relaxed">
              Courses are being built now. Join the newsletter and you'll be the
              first to know — plus get early access and launch pricing.
            </p>
            <a
              href="https://forms.gle/2f8fNRdqP7yjC5Gc9"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-accent-foreground text-accent hover:bg-accent-foreground/90 font-semibold px-10"
              >
                Join the Newsletter
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
