import { useState, type ReactNode } from "react";
import { Link, useParams } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  LinkIcon,
  Linkedin,
  Share2,
  Twitter,
  UserRound,
} from "lucide-react";
import { ArticleCover } from "@/components/ArticleCover";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  blogPosts,
  EDITORIAL_CATEGORIES,
  formatPublishedDate,
  getEditorialCategory,
  getPostBySlug,
  type BlogPost as BlogPostType,
  type NewsArticleSections,
} from "@/lib/blogData";
import { useSEO } from "@/hooks/useSEO";

const SITE_URL = "https://easeintoai.co";

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, index) => {
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={index}
          href={linkMatch[2]}
          className="font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent/80"
        >
          {linkMatch[1]}
        </a>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return <span key={index}>{part}</span>;
  });
}

function RenderContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: ReactNode[] = [];
  let listItems: string[] = [];
  let ordered = false;
  let listKey = 0;

  const flushList = () => {
    if (listItems.length === 0) return;
    const items = listItems.map((item, index) => (
      <li key={index}>{renderInline(item)}</li>
    ));
    elements.push(
      ordered ? (
        <ol key={`list-${listKey++}`} className="article-list list-decimal">
          {items}
        </ol>
      ) : (
        <ul key={`list-${listKey++}`} className="article-list list-disc">
          {items}
        </ul>
      )
    );
    listItems = [];
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    const imageMatch = trimmed.match(
      /^!\[([^\]]*)\]\((\S+)(?:\s+"([^"]+)")?\)$/
    );
    const orderedMatch = trimmed.match(/^\d+\.\s+(.+)$/);

    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={index} className="article-h2">
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={index} className="article-h3">
          {trimmed.slice(4)}
        </h3>
      );
    } else if (imageMatch) {
      flushList();
      elements.push(
        <figure key={index} className="my-8">
          <img
            src={imageMatch[2]}
            alt={imageMatch[1]}
            width={1200}
            height={675}
            loading="lazy"
            decoding="async"
            className="aspect-video w-full rounded-xl border border-border object-cover"
          />
          {imageMatch[3] ? (
            <figcaption className="mt-2 text-sm text-muted-foreground">
              {imageMatch[3]}
            </figcaption>
          ) : null}
        </figure>
      );
    } else if (trimmed.startsWith("> [!NOTE] ")) {
      flushList();
      elements.push(
        <aside key={index} className="article-callout">
          {renderInline(trimmed.slice(10))}
        </aside>
      );
    } else if (trimmed.startsWith("> ")) {
      flushList();
      elements.push(
        <blockquote key={index} className="article-blockquote">
          {renderInline(trimmed.slice(2))}
        </blockquote>
      );
    } else if (trimmed.startsWith("- ")) {
      if (ordered && listItems.length > 0) flushList();
      ordered = false;
      listItems.push(trimmed.slice(2));
    } else if (orderedMatch) {
      if (!ordered && listItems.length > 0) flushList();
      ordered = true;
      listItems.push(orderedMatch[1]);
    } else if (trimmed === "") {
      flushList();
    } else {
      flushList();
      elements.push(
        <p key={index} className="article-paragraph">
          {renderInline(trimmed)}
        </p>
      );
    }
  });
  flushList();

  return <div>{elements}</div>;
}

function RenderNewsSections({ sections }: { sections: NewsArticleSections }) {
  const groups = [
    {
      heading: "What Happened",
      label: "Confirmed facts",
      content: sections.whatHappened,
    },
    {
      heading: "Why It Matters",
      label: "EaseIntoAI interpretation",
      content: sections.whyItMatters,
    },
    {
      heading: "What It Means for Your Business",
      label: "EaseIntoAI interpretation",
      content: sections.whatItMeansForYourBusiness,
    },
    {
      heading: "What You Should Do Now",
      label: "Recommendations",
      content: sections.whatYouShouldDoNow,
    },
  ];

  return (
    <div>
      {groups.map(group => (
        <section key={group.heading}>
          <h2 className="article-h2">{group.heading}</h2>
          <p className="text-xs font-bold uppercase tracking-widest text-accent">
            {group.label}
          </p>
          <RenderContent content={group.content} />
        </section>
      ))}
      <section>
        <h2 className="article-h2">Primary Sources</h2>
        <ul className="article-list list-disc">
          {sections.primarySources.map(source => (
            <li key={source.url}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline underline-offset-4"
              >
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function CategoryBadge({ post }: { post: BlogPostType }) {
  const category = EDITORIAL_CATEGORIES[getEditorialCategory(post)];
  return (
    <span
      className={`inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] ${category.color}`}
    >
      {category.label}
    </span>
  );
}

function CopyLinkButton() {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold transition-colors hover:border-accent/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
    >
      {copied ? (
        <Check className="h-4 w-4" aria-hidden />
      ) : (
        <LinkIcon className="h-4 w-4" aria-hidden />
      )}
      <span aria-live="polite">{copied ? "Link copied" : "Copy link"}</span>
    </button>
  );
}

function RelatedCard({ post }: { post: BlogPostType }) {
  return (
    <Link
      href={`/insights/${post.slug}`}
      className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-accent/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
    >
      <ArticleCover post={post} className="aspect-video w-full" />
      <div className="p-5">
        <CategoryBadge post={post} />
        <h3 className="mt-3 font-bold leading-snug transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-accent">
          Read article <ArrowRight className="h-4 w-4" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const post = getPostBySlug(params.slug ?? "");
  const canonicalUrl = post
    ? `${SITE_URL}/insights/${post.slug}`
    : `${SITE_URL}/insights`;
  const socialImage = post?.featuredImage
    ? `${SITE_URL}${post.featuredImage}`
    : `${SITE_URL}/og-image.png`;

  useSEO({
    title: post?.seoTitle ?? post?.title ?? "Article not found",
    description:
      post?.seoDescription ??
      post?.excerpt ??
      "This article could not be found.",
    ogTitle: post?.ogTitle,
    ogDescription: post?.ogDescription,
    url: canonicalUrl,
    type: "article",
    image: socialImage,
    publishedTime: post?.publishedAt,
    modifiedTime: post?.updatedAt,
    author: post?.author,
  });

  if (!post) {
    return (
      <div className="grid min-h-screen place-items-center bg-background px-6 text-center">
        <div>
          <h1 className="text-3xl font-bold">Article not found</h1>
          <Button className="mt-6" variant="outline" asChild>
            <Link href="/insights">
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden /> Back to News
              &amp; Insights
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter(
      candidate =>
        candidate.slug !== post.slug &&
        getEditorialCategory(candidate) === getEditorialCategory(post)
    )
    .slice(0, 3);
  const shareText = `${post.title} — EaseIntoAI`;

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.seoDescription ?? post.excerpt,
          url: canonicalUrl,
          datePublished: post.publishedAt,
          ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
          author: { "@type": "Person", name: post.author },
          publisher: {
            "@type": "Organization",
            name: "EaseIntoAI",
            url: SITE_URL,
            logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
          },
          image: socialImage,
          mainEntityOfPage: canonicalUrl,
        }}
      />
      <Navigation />
      <main>
        <article className="py-10 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-5xl">
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden /> Back to News &amp;
                Insights
              </Link>

              <header className="mt-9 max-w-4xl">
                <CategoryBadge post={post} />
                <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight md:text-6xl">
                  {post.title}
                </h1>
                <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-5 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <UserRound className="h-4 w-4" aria-hidden /> {post.author}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" aria-hidden /> Published{" "}
                    {formatPublishedDate(post.publishedAt)}
                  </span>
                  {post.updatedAt ? (
                    <span>Updated {formatPublishedDate(post.updatedAt)}</span>
                  ) : null}
                  <span className="inline-flex items-center gap-2">
                    <Clock3 className="h-4 w-4" aria-hidden />{" "}
                    {post.readingTime}
                  </span>
                </div>
              </header>

              <ArticleCover
                post={post}
                priority
                className="mt-9 aspect-video w-full rounded-2xl border border-border shadow-sm"
              />
              {post.featuredImageCaption || post.featuredImageCredit ? (
                <p className="mt-3 text-sm text-muted-foreground">
                  {post.featuredImageCaption}
                  {post.featuredImageCredit ? (
                    <>
                      {post.featuredImageCaption ? " · " : ""}
                      {post.featuredImageSourceUrl ? (
                        <a
                          href={post.featuredImageSourceUrl}
                          className="underline underline-offset-4"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {post.featuredImageCredit}
                        </a>
                      ) : (
                        post.featuredImageCredit
                      )}
                    </>
                  ) : null}
                </p>
              ) : null}

              <div className="mx-auto mt-12 max-w-3xl">
                {post.newsSections ? (
                  <RenderNewsSections sections={post.newsSections} />
                ) : (
                  <RenderContent content={post.content} />
                )}

                <aside className="mt-12 rounded-2xl border border-accent/20 bg-accent/[0.05] p-6 md:p-8">
                  <h2 className="text-2xl font-bold">
                    Put Practical AI Into Your Business
                  </h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    Bring one repetitive task to the current EaseIntoAI workshop
                    and learn where AI can help while you remain in control.
                  </p>
                  <Button className="mt-5" variant="primary" asChild>
                    <Link href="/#upcoming">
                      View the Current Workshop
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                    </Link>
                  </Button>
                </aside>

                <section className="mt-10 border-y border-border py-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="inline-flex items-center gap-2 font-bold">
                        <Share2 className="h-4 w-4 text-accent" aria-hidden />
                        Share this article
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Send this practical explanation to someone who needs it.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <CopyLinkButton />
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <Linkedin className="h-4 w-4" aria-hidden /> LinkedIn
                      </a>
                      <a
                        href={`https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(canonicalUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <Twitter className="h-4 w-4" aria-hidden /> Post on X
                      </a>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 ? (
          <section className="border-t border-border bg-secondary/35 py-12 md:py-16">
            <div className="container">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-accent">
                    Keep Reading
                  </p>
                  <h2 className="mt-2 text-3xl font-bold">Related Articles</h2>
                </div>
                <Link
                  href="/insights"
                  className="hidden text-sm font-bold text-accent sm:inline-flex"
                >
                  All News &amp; Insights
                </Link>
              </div>
              <div className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map(related => (
                  <RelatedCard key={related.slug} post={related} />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
