import { describe, expect, it } from "vitest";
import { escapeHtml, isMeetingUrl } from "./safety";

describe("meeting URL configuration", () => {
  it.each([
    undefined,
    "",
    "https://zoom.us/my/REPLACE_ME",
    "https://example.com/room",
    "javascript:alert(1)",
    "http://meet.google.com/abc",
    "https://user:pass@zoom.us/room",
  ])("rejects unusable configuration %s", value => {
    expect(isMeetingUrl(value)).toBe(false);
  });
  it("allows a configured HTTPS meeting room", () => {
    expect(isMeetingUrl("https://meet.google.com/abc-defg-hij")).toBe(true);
  });
});

describe("transactional email text", () => {
  it("prevents submitted markup from becoming HTML", () => {
    expect(escapeHtml('<a href="https://bad.test">Click & pay</a>')).toBe(
      "&lt;a href=&quot;https://bad.test&quot;&gt;Click &amp; pay&lt;/a&gt;"
    );
  });
  it("preserves international names", () => {
    expect(escapeHtml("Chloé O'Neil 李")).toBe("Chloé O&#39;Neil 李");
  });
});
