import { describe, expect, it } from "vitest";
import { GET } from "./route";

async function get(slug?: string[]) {
  return GET(new Request("http://localhost/api/markdown"), { params: { slug } });
}

describe("GET /api/markdown/[[...slug]]", () => {
  it("serves homepage markdown with acceptmarkdown.com headers", async () => {
    const res = await get([]);
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("text/markdown; charset=utf-8");
    expect(res.headers.get("Vary")).toMatch(/Accept/);
    const body = await res.text();
    expect(body).toMatch(/^# Mohsin Mohammed/m);
    expect(body.replace(/\s+/g, " ").trim().length).toBeGreaterThanOrEqual(500);
  });

  it("returns HTTP 404 markdown with recovery links", async () => {
    const res = await get(["some-path-that-does-not-exist"]);
    expect(res.status).toBe(404);
    expect(res.headers.get("Content-Type")).toBe("text/markdown; charset=utf-8");
    expect(res.headers.get("Vary")).toMatch(/Accept/);
    const body = await res.text();
    expect(body).toContain("llms.txt");
    expect(body).toContain("sitemap.md");
    expect(body).toContain("developers");
  });

  it("serves developer resources markdown", async () => {
    const res = await get(["developers"]);
    expect(res.status).toBe(200);
    expect(await res.text()).toContain("Mohsin Mohammed developer resources");
  });
});
