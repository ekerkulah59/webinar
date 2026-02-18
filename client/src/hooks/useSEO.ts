import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  type?: string;
}

/**
 * Updates the document title and Open Graph / Twitter meta tags
 * so that shared links render rich previews on LinkedIn, X, etc.
 */
export function useSEO({ title, description, url, type = "article" }: SEOProps) {
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

    const pageUrl = url || window.location.href;

    // Open Graph
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", pageUrl);
    setMeta("property", "og:type", type);

    // Twitter Card
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);

    // Standard meta description
    setMeta("name", "description", description);

    // Cleanup: restore defaults on unmount
    return () => {
      document.title = "EaseIntoAI — Making AI Accessible to Everyone";
    };
  }, [title, description, url, type]);
}
