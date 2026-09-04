import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { courses } from "@/lib/courseData";
import { useSEO } from "@/hooks/useSEO";

const categoryFor = (slug: string) => {
  if (
    [
      "ai-101-understand-ai",
      "ai-foundations-from-curious-to-confident",
      "prompt-engineering-masterclass",
    ].includes(slug)
  )
    return "AI Foundations";
  if (slug === "ai-for-women-entrepreneurs")
    return "Business and Entrepreneurship";
  if (slug === "ai-at-work") return "Workplace and Professional Skills";
  return "Education and Community Learning";
};

export default function Courses() {
  useSEO({
    title: "Practical AI Courses for Everyday Work",
    description:
      "Plain-language AI courses for curious learners, professionals, business owners, and educators who want to use AI with more confidence and judgment.",
    url: "https://easeintoai.co/courses",
    type: "website",
  });

  const available = courses.filter(course => course.status === "available");
  const inDevelopment = courses.filter(
    course => course.status === "coming-soon"
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section
          className="border-b border-border py-16 md:py-24"
          aria-labelledby="courses-heading"
        >
          <div className="container grid gap-8 lg:grid-cols-[1fr_.7fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
                Learn at your own pace
              </p>
              <h1
                id="courses-heading"
                className="mt-4 max-w-3xl text-4xl font-bold tracking-[-0.04em] sm:text-5xl md:text-6xl"
              >
                Understand AI, use it with confidence, and keep your judgment in
                control.
              </h1>
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              You do not need to become a technology expert to use AI well.
              Learn at your own pace, practice with familiar tasks, and build a
              foundation you can apply to everyday life, work, or business.
            </p>
          </div>
        </section>

        <section className="py-20 md:py-24" aria-labelledby="available-heading">
          <div className="container">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
                Available now
              </p>
              <h2
                id="available-heading"
                className="mt-3 text-4xl font-bold tracking-tight"
              >
                Choose the foundation that fits your next step
              </h2>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {available.map((course, index) => (
                <article
                  key={course.slug}
                  className={`flex flex-col rounded-2xl border p-7 md:p-9 ${index === 1 ? "border-[#171663] bg-[#171663] text-white" : "border-border bg-background"}`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p
                      className={`text-xs font-bold uppercase tracking-[0.15em] ${index === 1 ? "text-indigo-200" : "text-accent"}`}
                    >
                      {categoryFor(course.slug)}
                    </p>
                    <span
                      className={`text-sm font-bold ${index === 1 ? "text-white" : "text-foreground"}`}
                    >
                      {course.type === "free" ? "Free" : course.price}
                    </span>
                  </div>
                  <h3 className="mt-6 text-3xl font-bold leading-tight">
                    {course.title}
                  </h3>
                  <p
                    className={`mt-4 leading-relaxed ${index === 1 ? "text-white/70" : "text-muted-foreground"}`}
                  >
                    {course.description}
                  </p>
                  <ul
                    className={`mt-7 list-disc space-y-3 border-t pl-5 pt-6 text-sm ${index === 1 ? "border-white/15 text-white/80" : "border-border text-foreground"}`}
                  >
                    {course.modules.slice(0, 4).map(module => (
                      <li key={module}>{module}</li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
                    <Button
                      asChild
                      variant={index === 1 ? "secondary" : "primary"}
                    >
                      <a
                        href={course.enrollUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {course.type === "free"
                          ? "Enroll Free"
                          : `Enroll for ${course.price}`}
                      </a>
                    </Button>
                    <Link
                      href={`/courses/${course.slug}`}
                      className={`text-sm font-bold ${index === 1 ? "text-indigo-200 hover:text-white" : "text-accent"}`}
                    >
                      View course details
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="border-y border-border bg-accent/[0.04] py-20"
          aria-labelledby="development-heading"
        >
          <div className="container grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
                Programs in development
              </p>
              <h2
                id="development-heading"
                className="mt-4 text-4xl font-bold tracking-tight"
              >
                What we&apos;re building next
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                These planned courses extend the same practical approach into
                prompting, workplace use, education, and entrepreneurship. They
                are not yet open for enrollment.
              </p>
              <Button asChild variant="primary" className="mt-7">
                <a href="/#newsletter">Get course updates</a>
              </Button>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {inDevelopment.map(course => (
                <article
                  key={course.slug}
                  className="grid gap-3 py-6 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
                      {categoryFor(course.slug)}
                    </p>
                    <h3 className="mt-2 text-xl font-bold">{course.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {course.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 sm:pl-6">
                    <span className="text-xs font-semibold text-muted-foreground">
                      In development
                    </span>
                    <Link
                      href={`/courses/${course.slug}`}
                      aria-label={`View ${course.title}`}
                      className="text-accent"
                    >
                      <ArrowRight className="h-5 w-5" aria-hidden />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container flex flex-col gap-5 rounded-2xl border border-accent/20 p-7 sm:flex-row sm:items-center sm:justify-between md:p-9">
            <div>
              <h2 className="text-2xl font-bold">
                Want to bring this learning to a team or community?
              </h2>
              <p className="mt-2 text-muted-foreground">
                Compare customizable workshops, learning series, and focused
                pilots for employees, entrepreneurs, members, or residents.
              </p>
            </div>
            <Button asChild variant="secondary">
              <Link href="/for-organizations">
                Explore Organization Programs{" "}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
