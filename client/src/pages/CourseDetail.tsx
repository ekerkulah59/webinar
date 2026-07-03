import { Link, useParams } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  Gift,
  GraduationCap,
  Lock,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getCourseBySlug, courses } from "@/lib/courseData";
import { useSEO } from "@/hooks/useSEO";
import { JsonLd } from "@/components/JsonLd";

export default function CourseDetail() {
  const params = useParams<{ slug: string }>();
  const course = getCourseBySlug(params.slug || "");

  useSEO({
    title: course ? course.title : "Course not found",
    description: course?.description || "This course could not be found.",
  });

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            Course not found
          </h1>
          <Link href="/courses">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentIdx = courses.findIndex((c) => c.slug === course.slug);
  const prevCourse = currentIdx > 0 ? courses[currentIdx - 1] : null;
  const nextCourse =
    currentIdx < courses.length - 1 ? courses[currentIdx + 1] : null;

  const isAvailable = course.status === "available" && !!course.enrollUrl;

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: course.title,
          description: course.description,
          url: `https://easeintoai.co/courses/${course.slug}`,
          provider: {
            "@type": "Organization",
            name: "EaseIntoAI",
            url: "https://easeintoai.co/",
          },
          ...(course.priceAmount !== undefined || course.type === "free"
            ? {
                offers: {
                  "@type": "Offer",
                  price: String(course.priceAmount ?? 0),
                  priceCurrency: "USD",
                  availability: isAvailable
                    ? "https://schema.org/InStock"
                    : "https://schema.org/PreOrder",
                },
              }
            : {}),
        }}
      />
      <Navigation />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-10 -left-10 w-[300px] h-[300px] bg-accent/8 rounded-full blur-[80px]" />
        </div>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Courses
            </Link>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {course.type === "free" ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                  <Gift className="w-3 h-3" />
                  Free
                </span>
              ) : (
                <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full uppercase tracking-wide">
                  {course.price}
                </span>
              )}

              {course.audience && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-100 text-violet-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                  <GraduationCap className="w-3 h-3" />
                  {course.audience}
                </span>
              )}

              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                <Clock className="w-3 h-3" />
                {course.status === "coming-soon" ? "Coming Soon" : "Available Now"}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              {course.title}
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {course.longDescription}
            </p>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-10">
              <Clock className="w-4 h-4 text-accent" />
              {course.duration}
            </div>

            {/* CTA */}
            {isAvailable ? (
              <a
                href={course.enrollUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="font-semibold px-10">
                  {course.type === "free" ? "Start for Free" : `Enroll for ${course.price}`}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
            ) : (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Button
                  disabled
                  size="lg"
                  className="bg-accent/50 text-accent-foreground font-semibold px-10 cursor-not-allowed"
                >
                  Coming Soon
                  <Clock className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-sm text-muted-foreground">
                  Be first to know —{" "}
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
            )}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── What's Inside + Who It's For ─────────────────────── */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Modules */}
            <Card className="p-6 md:p-8 space-y-4 border-border/60">
              <div className="flex items-center gap-2.5">
                {course.type === "free" ? (
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                ) : (
                  <Lock className="w-5 h-5 text-accent" />
                )}
                <h2 className="text-lg font-bold text-foreground">
                  What's Inside
                </h2>
              </div>
              <ul className="space-y-3">
                {course.modules.map((mod, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-foreground"
                  >
                    {course.type === "free" ? (
                      <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    )}
                    {mod}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Who it's for */}
            <Card className="p-6 md:p-8 space-y-4 border-border/60">
              <div className="flex items-center gap-2.5">
                <Users className="w-5 h-5 text-accent" />
                <h2 className="text-lg font-bold text-foreground">
                  Who This Is For
                </h2>
              </div>
              <ul className="space-y-3">
                {course.whoIsItFor.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-foreground/90 leading-relaxed"
                  >
                    <span className="text-accent mt-1.5 text-xs flex-shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── What You'll Leave With ────────────────────────────── */}
      <section className="py-20 bg-secondary/40">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              What You'll Walk Away With
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {course.whatYouWillLeave.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 bg-background rounded-xl border border-border/60"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-foreground leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section className="py-20 bg-accent">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground">
              {isAvailable
                ? course.type === "free"
                  ? "Start Learning for Free"
                  : `Ready to Enroll?`
                : "This Course Is Coming Soon"}
            </h2>
            <p className="text-lg text-accent-foreground/80 leading-relaxed">
              {isAvailable
                ? "Join now and start building real AI skills at your own pace."
                : "Join the newsletter to get notified the moment it launches — plus early access and launch pricing."}
            </p>
            {isAvailable ? (
              <a
                href={course.enrollUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-accent-foreground text-accent hover:bg-accent-foreground/90 font-semibold px-10"
                >
                  {course.type === "free"
                    ? "Start for Free"
                    : `Enroll for ${course.price}`}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
            ) : (
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
            )}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Prev / Next ───────────────────────────────────────── */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
            {prevCourse ? (
              <Link href={`/courses/${prevCourse.slug}`}>
                <Card className="p-5 hover:border-accent/20 transition-colors cursor-pointer group h-full">
                  <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3" /> Previous Course
                  </p>
                  <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors leading-snug">
                    {prevCourse.title}
                  </p>
                </Card>
              </Link>
            ) : (
              <div />
            )}
            {nextCourse ? (
              <Link href={`/courses/${nextCourse.slug}`}>
                <Card className="p-5 hover:border-accent/20 transition-colors cursor-pointer group h-full text-right">
                  <p className="text-xs text-muted-foreground mb-2 flex items-center justify-end gap-1">
                    Next Course <ArrowRight className="w-3 h-3" />
                  </p>
                  <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors leading-snug">
                    {nextCourse.title}
                  </p>
                </Card>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
