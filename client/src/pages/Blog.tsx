import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  Newspaper,
  Linkedin,
  Twitter,
  LinkIcon,
  Check,
} from "lucide-react";
import { blogPosts, CATEGORIES, type BlogPost } from "@/lib/blogData";

// ─── Category Filter ─────────────────────────────────────────────
type CategoryKey = BlogPost["category"] | "all";

function CategoryFilter({
  active,
  onChange,
}: {
  active: CategoryKey;
  onChange: (cat: CategoryKey) => void;
}) {
  const tabs: { key: CategoryKey; label: string }[] = [
    { key: "all", label: "All Posts" },
    { key: "ai-news", label: "AI News" },
    { key: "tutorial", label: "Tutorials" },
    { key: "opinion", label: "My Take" },
    { key: "webinar-recap", label: "Webinar Recaps" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            active === tab.key
              ? "bg-accent text-accent-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// ─── Copy Post Link Button ───────────────────────────────────────
function CopyPostLink({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const url = `${window.location.origin}/insights/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = url;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <button
      onClick={handleCopy}
      title={copied ? "Link copied!" : "Copy link to post"}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
        copied
          ? "bg-green-100 text-green-700 border border-green-200"
          : "bg-secondary/80 text-muted-foreground hover:text-foreground hover:bg-secondary border border-transparent hover:border-border"
      }`}
    >
      {copied ? (
        <>
          <Check className="w-3 h-3" />
          Copied!
        </>
      ) : (
        <>
          <LinkIcon className="w-3 h-3" />
          Copy link
        </>
      )}
    </button>
  );
}

// ─── Post Card ───────────────────────────────────────────────────
function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const cat = CATEGORIES[post.category];

  if (featured) {
    return (
      <Link href={`/insights/${post.slug}`}>
        <Card className="overflow-hidden border-accent/20 hover:border-accent/40 transition-colors cursor-pointer group">
          <div className="p-8 md:p-10 space-y-5">
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide ${cat.color}`}
              >
                {cat.label}
              </span>
              <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full uppercase tracking-wide">
                Featured
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-accent transition-colors leading-tight">
              {post.title}
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-6 text-sm text-muted-foreground pt-2">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all">
                Read article
                <ArrowRight className="w-4 h-4" />
              </span>
              <CopyPostLink slug={post.slug} />
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/insights/${post.slug}`}>
      <Card className="overflow-hidden border-border/60 hover:border-accent/20 transition-colors cursor-pointer group h-full">
        <div className="p-6 space-y-4 flex flex-col h-full">
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide ${cat.color}`}
            >
              {cat.label}
            </span>
          </div>

          <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
            {post.title}
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed flex-1">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>
            <CopyPostLink slug={post.slug} />
          </div>
        </div>
      </Card>
    </Link>
  );
}

// ─── Navigation (shared with Home) ──────────────────────────────
function BlogNav() {
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-accent-foreground font-bold text-sm">Ei</span>
          </div>
          <span className="text-lg font-bold text-foreground tracking-tight">
            EaseIntoAI
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <Link
            href="/insights"
            className="text-sm font-medium text-foreground transition-colors"
          >
            Insights
          </Link>
          <Link href="/">
            <Button
              size="sm"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
            >
              Next Webinar
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

// ─── Main Blog Page ──────────────────────────────────────────────
export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");

  const featuredPost = blogPosts.find((p) => p.featured);
  const filteredPosts =
    activeCategory === "all"
      ? blogPosts.filter((p) => !p.featured)
      : blogPosts.filter(
          (p) => p.category === activeCategory && !p.featured
        );

  // If filtering by a specific category that includes the featured post, show it in the grid
  const showFeaturedInGrid =
    activeCategory !== "all" &&
    featuredPost?.category === activeCategory;

  const gridPosts = showFeaturedInGrid
    ? blogPosts.filter((p) => p.category === activeCategory)
    : filteredPosts;

  return (
    <div className="min-h-screen bg-background">
      <BlogNav />

      {/* Header */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm font-medium text-accent">
              <Newspaper className="w-4 h-4" />
              AI Insights &amp; Updates
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
              Insights
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              My takes on AI news, practical tutorials, and lessons from hosting
              webinars. Written for people who want clarity, not jargon.
            </p>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Content */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Filters */}
            <CategoryFilter
              active={activeCategory}
              onChange={setActiveCategory}
            />

            {/* Featured post (only when showing "all") */}
            {activeCategory === "all" && featuredPost && (
              <PostCard post={featuredPost} featured />
            )}

            {/* Post grid */}
            {gridPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gridPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground">
                  No posts in this category yet. Check back soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="container py-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-xs">Ei</span>
              </div>
              <span className="text-sm font-semibold text-foreground">
                EaseIntoAI
              </span>
            </div>
            <div className="flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center hover:bg-accent/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-muted-foreground" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center hover:bg-accent/10 transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4 text-muted-foreground" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} EaseIntoAI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
