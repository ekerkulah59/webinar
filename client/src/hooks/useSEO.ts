import { useEffect } from "react";

const SITE_URL = "https://easeintoai.co";
const DEFAULT_TITLE =
  "EaseIntoAI — Practical AI for Women Entrepreneurs & Small Business Owners";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

interface SEOProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  /** Canonical URL for the page. Defaults to SITE_URL + current path. */
  url?: string;
  type?: string;
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

/**
 * Updates the document title, canonical link, and Open Graph / Twitter meta
 * tags so that shared links render rich previews on LinkedIn, X, etc.
 */
export function useSEO({
  title,
  description,
  ogTitle,
  ogDescription,
  url,
  type = "article",
  image,
  publishedTime,
  modifiedTime,
  author,
}: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} — EaseIntoAI`;
    const fullOgTitle = ogTitle ? `${ogTitle} — EaseIntoAI` : fullTitle;
    const socialDescription = ogDescription || description;

    // Document title
    document.title = fullTitle;

    // Helper to set or create a <meta> tag
    function setMeta(attr: string, key: string, value: string) {
      let el = document.querySelector(
        `meta[${attr}="${key}"]`
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    }

    function removeMeta(attr: string, key: string) {
      document.querySelector(`meta[${attr}="${key}"]`)?.remove();
    }

    // Canonical URL — always absolute, no hash or query
    const pageUrl = url || `${SITE_URL}${window.location.pathname}`;
    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", pageUrl);

    const ogImage = image || DEFAULT_OG_IMAGE;

    // Open Graph
    setMeta("property", "og:title", fullOgTitle);
    setMeta("property", "og:description", socialDescription);
    setMeta("property", "og:url", pageUrl);
    setMeta("property", "og:type", type);
    setMeta("property", "og:image", ogImage);

    if (type === "article") {
      if (publishedTime) {
        setMeta("property", "article:published_time", publishedTime);
      }
      if (modifiedTime) {
        setMeta("property", "article:modified_time", modifiedTime);
      }
      if (author) setMeta("property", "article:author", author);
    } else {
      removeMeta("property", "article:published_time");
      removeMeta("property", "article:modified_time");
      removeMeta("property", "article:author");
    }

    // Twitter Card
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullOgTitle);
    setMeta("name", "twitter:description", socialDescription);
    setMeta("name", "twitter:image", ogImage);

    // Standard meta description
    setMeta("name", "description", description);

    // Cleanup: restore defaults on unmount
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [
    title,
    description,
    ogTitle,
    ogDescription,
    url,
    type,
    image,
    publishedTime,
    modifiedTime,
    author,
  ]);
}
