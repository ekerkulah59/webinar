import { Link } from "wouter";
import { Clock, BookOpen, CheckCircle2, Lock, Gift, ArrowRight, GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { courses } from "@/lib/courseData";

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
              <Link href={`/courses/${freeCourse.slug}`}>
                <Card className="overflow-hidden border-accent/30 shadow-md hover:border-accent/60 hover:shadow-lg transition-all cursor-pointer group">
                  <div className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-start gap-8">
                      <div className="flex-1 space-y-5">
                        {/* Badges */}
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                            Free
                          </span>
                          {freeCourse.status === "available" ? (
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                              Available Now
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                              Coming Soon
                            </span>
                          )}
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-accent transition-colors leading-tight">
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

                    <div className="mt-8 pt-6 border-t border-border flex items-center gap-2 text-sm font-medium text-accent">
                      {freeCourse.status === "available" ? "Start for Free" : "View course"}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </Link>
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
                <Link key={course.id} href={`/courses/${course.slug}`}>
                  <Card className="overflow-hidden border-border/60 hover:border-accent/30 hover:shadow-md transition-all cursor-pointer group">
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

                          <h2 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-accent transition-colors leading-tight">
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

                      <div className="mt-8 pt-6 border-t border-border flex items-center gap-2 text-sm font-medium text-accent">
                        View course
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </Link>
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

              <Link href={`/courses/${featuredCourse.slug}`}>
                <Card className="overflow-hidden border-accent/40 shadow-lg ring-1 ring-accent/20 hover:border-accent/70 hover:shadow-xl transition-all cursor-pointer group">
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

                        <h2 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-accent transition-colors leading-tight">
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

                    <div className="mt-8 pt-6 border-t border-border flex items-center gap-2 text-sm font-medium text-accent">
                      View course
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </Link>
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
