import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

const RESOURCES = [
  {
    href: "/llms.txt",
    title: "llms.txt",
    detail: "llmstxt.org index of Mohsin Mohammed pages for agents",
  },
  {
    href: "/llms-full.txt",
    title: "llms-full.txt",
    detail: "Homepage plus every blog post as one markdown document",
  },
  {
    href: "/sitemap.md",
    title: "Markdown sitemap",
    detail: "Headings and links for every public page",
  },
  {
    href: "/sitemap.xml",
    title: "XML sitemap",
    detail: "Crawler sitemap",
  },
  {
    href: "/index.md",
    title: "Home markdown",
    detail: `${DATA.name} profile as text/markdown`,
  },
  {
    href: "/blog.md",
    title: "Blog markdown",
    detail: "Mohsin Mohammed Blog index",
  },
  {
    href: DATA.contact.social.GitHub.url,
    title: "GitHub (mdmohsin7)",
    detail: "Source and open source by Mohsin Mohammed",
    external: true,
  },
] as const;

export const metadata: Metadata = {
  title: "Mohsin Mohammed developer resources",
  description:
    "Developer resources for Mohsin Mohammed (mohsin.xyz): llms.txt, markdown content negotiation, sitemaps, and GitHub. Personal site — no public API, OpenAPI spec, or MCP server.",
  alternates: {
    canonical: `${DATA.url}/developers`,
    types: {
      "text/markdown": `${DATA.url}/developers.md`,
    },
  },
};

export default function DevelopersPage() {
  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-4 tracking-tighter">
          Mohsin Mohammed developer resources
        </h1>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <p className="text-muted-foreground text-sm mb-6">
          Machine-readable entry points for {DATA.name} at mohsin.xyz. This is a
          personal site, not a hosted API product — there is no public OpenAPI
          spec, auth API, webhook catalog, or MCP server. Pages speak{" "}
          <Link
            href="https://acceptmarkdown.com"
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            acceptmarkdown.com
          </Link>{" "}
          negotiation: send <code>Accept: text/markdown</code> or fetch the{" "}
          <code>.md</code> sibling URL.
        </p>
      </BlurFade>
      <ul className="space-y-3">
        {RESOURCES.map((resource, id) => (
          <BlurFade key={resource.href} delay={BLUR_FADE_DELAY * 3 + id * 0.05}>
            <li>
              <Link
                href={resource.href}
                className="text-sm hover:underline"
                target={"external" in resource && resource.external ? "_blank" : undefined}
                rel={
                  "external" in resource && resource.external
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                {resource.title}
              </Link>
              <p className="text-xs text-muted-foreground">{resource.detail}</p>
            </li>
          </BlurFade>
        ))}
      </ul>
    </section>
  );
}
