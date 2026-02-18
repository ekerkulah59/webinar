import { useState } from "react";
import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Linkedin,
  Twitter,
  Share2,
  LinkIcon,
  Check,
} from "lucide-react";
import { getPostBySlug, blogPosts, CATEGORIES } from "@/lib/blogData";
import { useSEO } from "@/hooks/useSEO";

// ─── Simple Markdown-like renderer ──────────────────────────────
function RenderContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: JSX.Element[] = [];
  let currentList: string[] = [];
  let listKey = 0;

  function flushList() {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${listKey++}`} className="space-y-2 my-4">
          {currentList.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-foreground/90 leading-relaxed"
            >
              <span className="text-accent mt-1.5 text-sm">•</span>
              {item}
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  }

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={idx} className="text-2xl font-bold text-foreground mt-10 mb-4">
          {trimmed.replace("## ", "")}
        </h2>
      );
    } else if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      flushList();
      elements.push(
        <p key={idx} className="font-semibold text-foreground mt-6 mb-2">
          {trimmed.replace(/\*\*/g, "")}
        </p>
      );
    } else if (trimmed.startsWith("- ")) {
      currentList.push(trimmed.replace("- ", ""));
    } else if (trimmed === "") {
      flushList();
    } else {
      flushList();
      const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
      elements.push(
        <p key={idx} className="text-foreground/90 leading-relaxed my-3">
          {parts.map((part, pi) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={pi} className="font-semibold text-foreground">
                {part.replace(/\*\*/g, "")}
              </strong>
            ) : (
              <span key={pi}>{part}</span>
            )
          )}
        </p>
      );
    }
  });

  flushList();
  return <div className="prose-custom">{elements}</div>;
}

// ─── Copy Link Button ────────────────────────────────────────────
function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
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
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
        copied
          ? "bg-green-100 text-green-700 border border-green-200"
          : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-border"
      }`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          Link copied!
        </>
      ) : (
        <>
          <LinkIcon className="w-4 h-4" />
          Copy link
        </>
      )}
    </button>
  );
}

// ─── Blog Post Page ──────────────────────────────────────────────
export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const post = getPostBySlug(params.slug || "");

  // SEO — update document title and meta tags for social sharing
  useSEO({
    title: post?.title || "Post not found",
    description: post?.excerpt || "This post could not be found.",
  });

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            Post not found
          </h1>
          <Link href="/insights">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Insights
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const cat = CATEGORIES[post.category];
  const currentIdx = blogPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIdx > 0 ? blogPosts[currentIdx - 1] : null;
  const nextPost =
    currentIdx < blogPosts.length - 1 ? blogPosts[currentIdx + 1] : null;

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `${post.title} — by EaseIntoAI`;

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-sm">
                Ei
              </span>
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
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
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

      {/* Article */}
      <article className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Insights
            </Link>

            {/* Header */}
            <header className="space-y-6 mb-12">
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide ${cat.color}`}
                >
                  {cat.label}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
                {post.title}
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-2 pb-4 border-b border-border">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
                <span>By EaseIntoAI</span>
              </div>
            </header>

            {/* Content */}
            <div className="mb-16">
              <RenderContent content={post.content} />
            </div>

            {/* ── Share Bar ────────────────────────────────────── */}
            <div className="py-8 px-6 md:px-8 bg-secondary/50 rounded-xl border border-border">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Share2 className="w-4 h-4 text-accent" />
                    Share this article
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Know someone who'd find this useful? Send them the link.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {/* Copy link — primary sharing action */}
                  <CopyLinkButton />

                  {/* LinkedIn */}
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-secondary border border-border rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>

                  {/* X / Twitter */}
                  <a
                    href={`https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-secondary border border-border rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                    Post on X
                  </a>
                </div>
              </div>
            </div>

            {/* Prev / Next navigation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-12">
              {prevPost ? (
                <Link href={`/insights/${prevPost.slug}`}>
                  <Card className="p-5 hover:border-accent/20 transition-colors cursor-pointer group h-full">
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <ArrowLeft className="w-3 h-3" /> Previous
                    </p>
                    <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors leading-snug">
                      {prevPost.title}
                    </p>
                  </Card>
                </Link>
              ) : (
                <div />
              )}
              {nextPost ? (
                <Link href={`/insights/${nextPost.slug}`}>
                  <Card className="p-5 hover:border-accent/20 transition-colors cursor-pointer group h-full text-right">
                    <p className="text-xs text-muted-foreground mb-2 flex items-center justify-end gap-1">
                      Next <ArrowRight className="w-3 h-3" />
                    </p>
                    <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors leading-snug">
                      {nextPost.title}
                    </p>
                  </Card>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="container py-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-xs">
                  Ei
                </span>
              </div>
              <span className="text-sm font-semibold text-foreground">
                EaseIntoAI
              </span>
            </Link>
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} EaseIntoAI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
