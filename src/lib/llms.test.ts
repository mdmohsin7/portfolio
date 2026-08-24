import { describe, expect, it } from "vitest";
import { DATA } from "@/data/resume";
import { getLlmsFullTxt, getLlmsTxt } from "@/lib/llms";

describe("llms.txt (llmstxt.org)", () => {
  it("starts with an H1 and blockquote, then H2 file lists", async () => {
    const txt = await getLlmsTxt();
    const lines = txt.trim().split("\n");
    expect(lines[0]).toBe(`# ${DATA.name}`);
    expect(lines[2].startsWith("> ")).toBe(true);
    expect(txt).toContain("## Developer resources");
    expect(txt).toContain("Mohsin Mohammed developer resources");
    expect(txt).toContain(`${DATA.url}/developers.md`);
    expect(txt).toContain("## Blog");
    expect(txt).toMatch(/^- \[[^\]]+\]\(https:\/\/mohsin\.xyz\/blog\/.+\.md\): /m);
  });
});

describe("llms-full.txt", () => {
  it("includes the profile and at least one blog post", async () => {
    const txt = await getLlmsFullTxt();
    expect(txt).toContain(`# ${DATA.name}`);
    expect(txt).toContain("Mohsin Mohammed developer resources");
    expect(txt.length).toBeGreaterThan(1000);
  });
});
