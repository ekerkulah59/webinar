import { useState, type MouseEvent } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { ArticleCover } from "@/components/ArticleCover";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import {
  blogPosts,
  EDITORIAL_CATEGORIES,
  formatPublishedDate,
  getEditorialCategory,
  type BlogPost,
  type EditorialCategory,
} from "@/lib/blogData";
import { useSEO } from "@/hooks/useSEO";

type FilterKey = EditorialCategory | "all";

const filters: Array<{ key: FilterKey; label: string }> = [
  { key: "all", label: "All" },
  { key: "ai-news", label: "AI News" },
  { key: "practical-guides", label: "Practical Guides" },
  { key: "business-use-cases", label: "Business Use Cases" },
  { key: "easeintoai-updates", label: "EaseIntoAI Updates" },
  { key: "webinar-recaps", label: "Webinar Recaps" },
];

function CategoryBadge({ post }: { post: BlogPost }) {
  const category = EDITORIAL_CATEGORIES[getEditorialCategory(post)];
  return (
    <span
      className={`inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] ${category.color}`}
    >
      {category.label}
    </span>
  );
}

function ArticleMeta({ post }: { post: BlogPost }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
      <span>{formatPublishedDate(post.publishedAt)}</span>
      <span>{post.readingTime}</span>
    </div>
  );
}

function CopyPostLink({ post }: { post: BlogPost }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const url = `${window.location.origin}/insights/${post.slug}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex min-h-9 items-center rounded-md px-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      aria-label={
        copied ? `Link copied for ${post.title}` : `Copy link for ${post.title}`
      }
    >
      <span aria-live="polite">{copied ? "Copied" : "Copy link"}</span>
    </button>
  );
}

function FeaturedStory({ post }: { post: BlogPost }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="grid lg:grid-cols-[1.05fr_1fr]">
        <Link
          href={`/insights/${post.slug}`}
          className="group block min-h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
        >
          <ArticleCover
            post={post}
            priority
            className="aspect-video h-full min-h-64 w-full lg:aspect-auto"
          />
        </Link>
        <div className="flex flex-col p-6 md:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge post={post} />
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-accent">
              Featured
            </span>
          </div>
          <Link
            href={`/insights/${post.slug}`}
            className="group mt-5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4"
          >
            <h2 className="text-2xl font-bold leading-tight tracking-tight transition-colors group-hover:text-accent md:text-3xl">
              {post.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              {post.excerpt}
            </p>
          </Link>
          <div className="mt-auto flex flex-col gap-5 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
            <ArticleMeta post={post} />
            <Link
              href={`/insights/${post.slug}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4"
            >
              Read the Full Story
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <Card className="news-card group flex h-full flex-col overflow-hidden p-0">
      <Link
        href={`/insights/${post.slug}`}
        className="flex flex-1 flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
      >
        <div className="overflow-hidden">
          <ArticleCover
            post={post}
            className="news-card-image aspect-video w-full"
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <CategoryBadge post={post} />
          <h2 className="mt-4 text-xl font-bold leading-snug tracking-tight transition-colors group-hover:text-accent">
            {post.title}
          </h2>
          <p className="news-card-excerpt mt-3 text-sm leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
          <div className="mt-auto pt-5">
            <ArticleMeta post={post} />
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-accent">
              Read article
              <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </div>
        </div>
      </Link>
      <div className="flex justify-end border-t border-border px-3 py-1.5">
        <CopyPostLink post={post} />
      </div>
    </Card>
  );
}

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const featuredPost = blogPosts.find(post => post.featured) ?? blogPosts[0];
  const gridPosts = blogPosts.filter(post => {
    if (activeFilter === "all") return post.slug !== featuredPost.slug;
    return getEditorialCategory(post) === activeFilter;
  });

  useSEO({
    title: "News & Insights",
    description:
      "Plain-language AI explanations, practical guides, business examples, workshop lessons, and responsible-use commentary from EaseIntoAI.",
    url: "https://easeintoai.co/insights",
    type: "website",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section className="border-b border-border py-12 md:py-16">
          <div className="container">
            <header className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-accent">
                Explanations, examples, and lessons
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
                News &amp; Insights
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Practical explanations, business examples, workshop lessons, and
                careful commentary for people deciding how AI belongs in their
                work.
              </p>
            </header>

            <div
              className="mt-8 flex flex-wrap gap-2"
              role="group"
              aria-label="Filter News and Insights by category"
            >
              {filters.map(filter => (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setActiveFilter(filter.key)}
                  aria-pressed={activeFilter === filter.key}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                    activeFilter === filter.key
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-accent/40 hover:text-foreground"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14" aria-live="polite">
          <div className="container">
            {activeFilter === "all" && featuredPost ? (
              <FeaturedStory post={featuredPost} />
            ) : null}

            {gridPosts.length > 0 ? (
              <div
                className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${
                  activeFilter === "all" ? "mt-10" : ""
                }`}
              >
                {gridPosts.map(post => (
                  <ArticleCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-border bg-secondary/40 px-6 py-12 text-center text-muted-foreground">
                No articles are published in this category yet.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
