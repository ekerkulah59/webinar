/** Only offer video when an actual HTTPS meeting URL has been configured. */
export function isMeetingUrl(value: string | undefined): boolean {
  if (!value || /replace_me|placeholder|example\.(com|org|net)/i.test(value))
    return false;
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      url.hostname.includes(".")
    );
  } catch {
    return false;
  }
}

/** User-provided names and notes must stay text in transactional email HTML. */
export function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    character =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character]!
  );
}
