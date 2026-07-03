import { useEffect } from "react";

const SITE_URL = "https://easeintoai.co";
const DEFAULT_TITLE =
  "EaseIntoAI — Practical AI for Women Entrepreneurs & Small Business Owners";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

interface SEOProps {
  title: string;
  description: string;
  /** Canonical URL for the page. Defaults to SITE_URL + current path. */
  url?: string;
  type?: string;
  image?: string;
}

/**
 * Updates the document title, canonical link, and Open Graph / Twitter meta
 * tags so that shared links render rich previews on LinkedIn, X, etc.
 */
export function useSEO({ title, description, url, type = "article", image }: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} — EaseIntoAI`;

    // Document title
    document.title = fullTitle;

    // Helper to set or create a <meta> tag
    function setMeta(attr: string, key: string, value: string) {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    }

    // Canonical URL — always absolute, no hash or query
    const pageUrl = url || `${SITE_URL}${window.location.pathname}`;
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", pageUrl);

    const ogImage = image || DEFAULT_OG_IMAGE;

    // Open Graph
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", pageUrl);
    setMeta("property", "og:type", type);
    setMeta("property", "og:image", ogImage);

    // Twitter Card
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    // Standard meta description
    setMeta("name", "description", description);

    // Cleanup: restore defaults on unmount
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title, description, url, type, image]);
}
