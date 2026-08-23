import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /llms.txt", () => {
  it("is text/plain and lists Mohsin Mohammed developer resources", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("text/plain; charset=utf-8");
    const body = await res.text();
    expect(body.startsWith("# Mohsin Mohammed\n")).toBe(true);
    expect(body).toContain("## Developer resources");
    expect(body).toContain("developers.md");
  });
});
