import { describe, expect, it } from "vitest";
import {
  getNotAcceptableBody,
  isNextInternalAccept,
  isRscRequest,
  markdownApiPath,
  negotiateRequest,
  preferredType,
  shouldNegotiatePath,
  stripMdExtension,
} from "@/lib/accept";

describe("preferredType (acceptmarkdown.com test vectors)", () => {
  it("serves markdown for Accept: text/markdown", () => {
    expect(preferredType("text/markdown")).toBe("text/markdown");
  });

  it("serves markdown when markdown is listed before html", () => {
    expect(preferredType("text/markdown, text/html;q=0.8")).toBe(
      "text/markdown",
    );
  });

  it("serves html for Accept: text/html", () => {
    expect(preferredType("text/html")).toBe("text/html");
  });

  it("respects q=0 rejection of markdown", () => {
    expect(preferredType("text/markdown;q=0, text/html")).toBe("text/html");
  });

  it("returns null when the only produced type is rejected", () => {
    expect(preferredType("text/markdown;q=0")).toBeNull();
    expect(preferredType("application/pdf")).toBeNull();
  });

  it("defaults to html when Accept is missing", () => {
    expect(preferredType(null)).toBe("text/html");
  });

  it("defaults to html for */*", () => {
    expect(preferredType("*/*")).toBe("text/html");
  });

  it("does not substring-match a Chrome Accept header into markdown", () => {
    const chrome =
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8";
    expect(preferredType(chrome)).toBe("text/html");
  });
});

describe("shouldNegotiatePath", () => {
  it("negotiates HTML page paths and .md siblings", () => {
    expect(shouldNegotiatePath("/")).toBe(true);
    expect(shouldNegotiatePath("/blog")).toBe(true);
    expect(shouldNegotiatePath("/blog/our-ble-connection-was-a-ghost")).toBe(
      true,
    );
    expect(shouldNegotiatePath("/index.md")).toBe(true);
    expect(shouldNegotiatePath("/blog.md")).toBe(true);
  });

  it("skips machine files and static assets", () => {
    expect(shouldNegotiatePath("/llms.txt")).toBe(false);
    expect(shouldNegotiatePath("/sitemap.xml")).toBe(false);
    expect(shouldNegotiatePath("/robots.txt")).toBe(false);
    expect(shouldNegotiatePath("/me.webp")).toBe(false);
    expect(shouldNegotiatePath("/favicon.ico")).toBe(false);
  });
});

describe("negotiateRequest", () => {
  it("rewrites markdown-preferring GETs and explicit .md URLs", () => {
    expect(
      negotiateRequest({
        pathname: "/",
        accept: "text/markdown",
        rsc: false,
      }),
    ).toEqual({ action: "markdown", pathname: "/" });

    expect(
      negotiateRequest({
        pathname: "/blog.md",
        accept: "text/html",
        rsc: false,
      }),
    ).toEqual({ action: "markdown", pathname: "/blog" });
  });

  it("skips RSC navigations and Next flight Accept types", () => {
    expect(
      negotiateRequest({
        pathname: "/",
        accept: "text/markdown",
        rsc: true,
      }),
    ).toEqual({ action: "skip" });

    expect(
      negotiateRequest({
        pathname: "/",
        accept: "text/x-component, text/html, */*",
        rsc: false,
      }),
    ).toEqual({ action: "skip" });
  });

  it("returns 406 when nothing matches", () => {
    expect(
      negotiateRequest({
        pathname: "/",
        accept: "application/pdf",
        rsc: false,
      }),
    ).toEqual({ action: "406" });
  });

  it("maps markdown rewrites onto the catch-all API path", () => {
    expect(markdownApiPath("/")).toBe("/api/markdown");
    expect(markdownApiPath("/blog")).toBe("/api/markdown/blog");
    expect(stripMdExtension("/developers.md")).toBe("/developers");
  });

  it("describes 406 bodies the way acceptmarkdown.com expects", () => {
    expect(getNotAcceptableBody()).toContain("text/markdown");
    expect(getNotAcceptableBody()).toContain("text/html");
  });

  it("detects Next internal flight headers and Accept types", () => {
    expect(isNextInternalAccept("text/x-component")).toBe(true);
    expect(isRscRequest(new Headers({ rsc: "1" }))).toBe(true);
    expect(isRscRequest(new Headers({ "next-router-state-tree": "[]" }))).toBe(
      true,
    );
    expect(isRscRequest(new Headers({ accept: "text/html" }))).toBe(false);
  });
});
