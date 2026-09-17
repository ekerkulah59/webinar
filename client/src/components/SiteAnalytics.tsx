import { Analytics } from "@vercel/analytics/react";

/** Enable only after Web Analytics is enabled for the Vercel project. */
export default function SiteAnalytics() {
  if (import.meta.env.VITE_ANALYTICS_ENABLED !== "true") return null;
  return (
    <Analytics
      beforeSend={event => {
        const url = new URL(event.url);
        // Management URLs contain an access token. Never send them to analytics.
        if (url.pathname.startsWith("/appointment/")) return null;
        url.search = "";
        url.hash = "";
        return { ...event, url: url.toString() };
      }}
    />
  );
}
