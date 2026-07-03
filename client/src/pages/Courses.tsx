import { Clock, BookOpen, CheckCircle2, Lock, Gift, ArrowRight, GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { courses } from "@/lib/courseData";
import { useSEO } from "@/hooks/useSEO";

export default function Courses() {
  useSEO({
    title: "Self-Paced AI Courses for Women Entrepreneurs & Small Business Owners",
    description:
      "Free and paid AI courses built for busy business owners — content creation, prompting, client communication, and simple automations. Plain language, no tech background required.",
    type: "website",
  });

  const freeCourse = courses.find((c) => c.type === "free");
  const featuredCourse = courses.find((c) => c.featured);
  const paidCourses = courses.filter((c) => c.type === "paid" && !c.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* ── Header ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 md:py-24">
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
              Everything from the live webinars, packaged into self-paced
              courses you can revisit anytime. Built for busy business owners —
              free and paid options for every stage of your AI journey.
            </p>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Free Course ──────────────────────────────────────── */}
      <section className="py-16">
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
                        {freeCourse.enrollUrl ? (
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                            Available Now
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                            Coming Soon
                          </span>
                        )}
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
                    {freeCourse.enrollUrl ? (
                      <a href={freeCourse.enrollUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="primary" size="lg" className="font-semibold px-8">
                          Enroll Free
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </a>
                    ) : (
                      <Button
                        disabled
                        variant="primary"
                        size="lg"
                        className="font-semibold px-8 cursor-not-allowed"
                      >
                        Available Now
                        <Clock className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                    <p className="text-sm text-muted-foreground">
                      Be the first to know —{" "}
                      <a
                        href="/#newsletter"
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
      <section className="py-16 bg-secondary/40">
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
                          {course.enrollUrl ? (
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                              Available Now
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                              Coming Soon
                            </span>
                          )}
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
                      {course.enrollUrl ? (
                        <a href={course.enrollUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="primary" className="font-semibold">
                            Enroll Now
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </a>
                      ) : (
                        <Button
                          disabled
                          variant="secondary"
                          className="font-semibold cursor-not-allowed opacity-60"
                        >
                          Coming Soon
                          <Clock className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Featured Specialty Course ────────────────────────── */}
      {featuredCourse && (
        <section className="py-16">
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
                      variant="primary"
                      size="lg"
                      className="font-semibold px-8 cursor-not-allowed"
                    >
                      Coming Soon
                      <Clock className="w-4 h-4 ml-2" />
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Built for coaches, consultants, creators, and local
                      business owners — at any tech comfort level.
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
      <section className="py-16 bg-accent">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground">
              Get Notified When Courses Drop
            </h2>
            <p className="text-lg text-accent-foreground/80 leading-relaxed">
              Courses are being built now. Join the newsletter and you'll be the
              first to know — plus get early access and launch pricing.
            </p>
            <a href="/#newsletter">
              <Button
                size="lg"
                variant="secondary"
                className="font-semibold px-10"
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
