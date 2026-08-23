import { DATA } from "@/data/resume";

export type AgentLink = {
  href: string;
  label: string;
  hint: string;
};

export function getAgentRecoveryLinks(siteUrl: string = DATA.url): AgentLink[] {
  return [
    {
      href: `${siteUrl}/`,
      label: "Home",
      hint: "Mohsin Mohammed — mohsin.xyz",
    },
    {
      href: `${siteUrl}/llms.txt`,
      label: "llms.txt",
      hint: "site index for agents",
    },
    {
      href: `${siteUrl}/llms-full.txt`,
      label: "llms-full.txt",
      hint: "full-site markdown dump",
    },
    {
      href: `${siteUrl}/sitemap.md`,
      label: "Markdown sitemap",
      hint: "all public pages as markdown",
    },
    {
      href: `${siteUrl}/sitemap.xml`,
      label: "XML sitemap",
      hint: "crawler sitemap",
    },
    {
      href: `${siteUrl}/developers`,
      label: "Mohsin Mohammed developer resources",
      hint: "machine-readable endpoints, GitHub, and how to fetch markdown",
    },
    {
      href: `${siteUrl}/blog`,
      label: "Mohsin Mohammed Blog",
      hint: "engineering writing",
    },
  ];
}

export function renderRecoveryMarkdown(siteUrl: string = DATA.url): string {
  const lines = getAgentRecoveryLinks(siteUrl).map(
    (link) => `- [${link.label}](${link.href}): ${link.hint}`,
  );
  return lines.join("\n");
}
