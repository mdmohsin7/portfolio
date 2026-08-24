import { describe, expect, it } from "vitest";
import { DATA } from "@/data/resume";
import { getAgentRecoveryLinks } from "@/lib/agent-links";
import {
  getDevelopersMarkdown,
  getHomeMarkdown,
  getNotFoundMarkdown,
  getSitemapMarkdown,
  markdownHeaders,
  markdownResponse,
  resolveMarkdownPath,
} from "@/lib/markdown";

function visibleTextLength(htmlOrMd: string): number {
  return htmlOrMd.replace(/\s+/g, " ").trim().length;
}

describe("homepage markdown", () => {
  it("has an H1, the brand name, and 500+ characters", () => {
    const md = getHomeMarkdown();
    expect(md.startsWith(`# ${DATA.name}`)).toBe(true);
    expect(md).toContain("mohsin.xyz");
    expect(md).toContain("## About");
    expect(visibleTextLength(md)).toBeGreaterThanOrEqual(500);
  });
});

describe("agent-friendly 404 markdown", () => {
  it("points agents at sitemap, llms.txt, and developer resources", () => {
    const md = getNotFoundMarkdown();
    expect(md.startsWith("# Not found")).toBe(true);
    expect(md).toContain("## Where to look next");
    expect(md).toContain(`${DATA.url}/llms.txt`);
    expect(md).toContain(`${DATA.url}/sitemap.md`);
    expect(md).toContain(`${DATA.url}/developers`);
    expect(md).toContain("Mohsin Mohammed");
  });

  it("uses the shared recovery list so HTML 404s stay in sync", () => {
    const labels = getAgentRecoveryLinks().map((link) => link.label);
    expect(labels).toContain("llms.txt");
    expect(labels).toContain("Markdown sitemap");
    expect(labels).toContain("Mohsin Mohammed developer resources");
  });
});

describe("developer resources + sitemap markdown", () => {
  it("is discoverable by the Mohsin Mohammed name", () => {
    const md = getDevelopersMarkdown();
    expect(md).toContain("# Mohsin Mohammed developer resources");
    expect(md).toContain("llms.txt");
    expect(md).toContain("Accept: text/markdown");
    expect(md).toContain("mdmohsin7");
  });

  it("lists public pages under headings", () => {
    const md = getSitemapMarkdown();
    expect(md.startsWith("# Sitemap")).toBe(true);
    expect(md).toContain("/index.md");
    expect(md).toContain("/developers.md");
  });
});

describe("resolveMarkdownPath + response headers", () => {
  it("serves known pages and a real 404 body for misses", async () => {
    const home = await resolveMarkdownPath("/");
    expect(home.status).toBe(200);
    expect(home.body).toContain(`# ${DATA.name}`);

    const developers = await resolveMarkdownPath("/developers.md".replace(".md", ""));
    expect(developers.status).toBe(200);
    expect(developers.body).toContain("Mohsin Mohammed developer resources");

    const missing = await resolveMarkdownPath("/some-path-that-does-not-exist");
    expect(missing.status).toBe(404);
    expect(missing.body).toContain("llms.txt");
  });

  it("sets acceptmarkdown.com Content-Type and Vary: Accept", () => {
    const headers = markdownHeaders("https://mohsin.xyz/");
    expect(headers.get("Content-Type")).toBe("text/markdown; charset=utf-8");
    expect(headers.get("Vary")).toMatch(/Accept/);
    expect(headers.get("Link")).toContain('rel="canonical"');
  });

  it("returns a 404 Response that stays markdown", async () => {
    const doc = await resolveMarkdownPath("/does-not-exist");
    const res = markdownResponse(doc.body, {
      status: doc.status,
      canonical: doc.canonical,
    });
    expect(res.status).toBe(404);
    expect(res.headers.get("Content-Type")).toBe("text/markdown; charset=utf-8");
    expect(res.headers.get("Vary")).toMatch(/Accept/);
    const body = await res.text();
    expect(body).toContain("Where to look next");
  });
});
