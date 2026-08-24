import { describe, expect, it } from "vitest";
import { DATA } from "@/data/resume";
import { getHomepageJsonLd, getPersonJsonLd, getSameAs } from "@/lib/jsonld";

describe("homepage JSON-LD", () => {
  it("emits Person + WebSite with name, description, url, and sameAs", () => {
    const graph = getHomepageJsonLd();
    expect(graph["@context"]).toBe("https://schema.org");

    const types = graph["@graph"].map((node) => node["@type"]);
    expect(types).toContain("Person");
    expect(types).toContain("WebSite");

    const person = getPersonJsonLd();
    expect(person.name).toBe(DATA.name);
    expect(person.url).toBe(DATA.url);
    expect(person.description.length).toBeGreaterThan(20);
    expect(person.sameAs).toEqual(getSameAs());
    expect(person.sameAs.length).toBeGreaterThanOrEqual(3);
    expect(person.jobTitle).toBeTruthy();
  });
});
