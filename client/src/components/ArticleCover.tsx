import type { BlogPost } from "@/lib/blogData";
import { EDITORIAL_CATEGORIES, getEditorialCategory } from "@/lib/blogData";

export function ArticleCover({
  post,
  priority = false,
  className = "",
}: {
  post: BlogPost;
  priority?: boolean;
  className?: string;
}) {
  const editorialCategory = getEditorialCategory(post);
  const category = EDITORIAL_CATEGORIES[editorialCategory];

  if (post.featuredImage) {
    return (
      <figure className={`overflow-hidden bg-secondary ${className}`}>
        <img
          src={post.featuredImage}
          alt={post.featuredImageAlt ?? ""}
          width={1600}
          height={900}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
          className="h-full w-full object-cover"
        />
      </figure>
    );
  }

  return (
    <div
      className={`article-cover article-cover-${editorialCategory} ${className}`}
      role="img"
      aria-label={`Branded EaseIntoAI editorial cover for ${post.title}`}
    >
      <span className="article-cover-mark" aria-hidden>
        E
      </span>
      <span className="article-cover-category">{category.label}</span>
      <span className="article-cover-brand">EaseIntoAI</span>
    </div>
  );
}
