import { getBlogPosts } from "@/data/blog";
import { DATA } from "@/data/resume";
import { renderRecoveryMarkdown } from "@/lib/agent-links";
import { getRawPostMarkdown } from "@/lib/posts";

export const MARKDOWN_CONTENT_TYPE = "text/markdown; charset=utf-8";
export const MARKDOWN_VARY = "Accept, Accept-Encoding";

export function markdownHeaders(canonical?: string): Headers {
  const headers = new Headers({
    "Content-Type": MARKDOWN_CONTENT_TYPE,
    Vary: MARKDOWN_VARY,
    "Cache-Control": "public, s-maxage=60, stale-while-revalidate=86400",
  });
  if (canonical) {
    headers.set("Link", `<${canonical}>; rel="canonical"`);
  }
  return headers;
}

export function markdownResponse(
  body: string,
  init?: { status?: number; canonical?: string },
): Response {
  return new Response(body.endsWith("\n") ? body : `${body}\n`, {
    status: init?.status ?? 200,
    headers: markdownHeaders(init?.canonical),
  });
}

function sitemapSection(siteUrl: string = DATA.url): string {
  return [
    "## Sitemap",
    "",
    `- [Home](${siteUrl}/index.md)`,
    `- [Blog](${siteUrl}/blog.md)`,
    `- [Mohsin Mohammed developer resources](${siteUrl}/developers.md)`,
    `- [llms.txt](${siteUrl}/llms.txt)`,
    `- [Markdown sitemap](${siteUrl}/sitemap.md)`,
    `- [XML sitemap](${siteUrl}/sitemap.xml)`,
  ].join("\n");
}

export function getHomeMarkdown(siteUrl: string = DATA.url): string {
  const work = DATA.work
    .map((job) => {
      const period = `${job.start} - ${job.end ?? "Present"}`;
      return `### ${job.company} — ${job.title} (${period})\n\n${job.description}`;
    })
    .join("\n\n");

  const education = DATA.education
    .map((ed) => `### ${ed.school}\n\n${ed.degree} (${ed.start} - ${ed.end})`)
    .join("\n\n");

  return `# ${DATA.name}

> ${DATA.description}

Hi, I'm ${DATA.name.split(" ")[0]} 👋

This is the personal site of **${DATA.name}** at [mohsin.xyz](${siteUrl}). ${DATA.summary}

## About

${DATA.summary}

## Work Experience

${work}

## Education

${education}

## Skills

${DATA.skills.join(", ")}

## Contact

- Email: ${DATA.contact.email}
- GitHub: ${DATA.contact.social.GitHub.url}
- LinkedIn: ${DATA.contact.social.LinkedIn.url}
- X: ${DATA.contact.social.X.url}

## Developer resources

- [Mohsin Mohammed developer resources](${siteUrl}/developers.md): machine-readable endpoints, markdown negotiation, and profiles

${sitemapSection(siteUrl)}
`;
}

export async function getBlogIndexMarkdown(siteUrl: string = DATA.url): Promise<string> {
  const posts = await getBlogPosts();
  const sorted = [...posts].sort((a, b) => {
    const da = new Date((a.metadata as { publishedAt: string }).publishedAt);
    const db = new Date((b.metadata as { publishedAt: string }).publishedAt);
    return db.getTime() - da.getTime();
  });

  const items = sorted
    .map((post) => {
      const { title, summary } = post.metadata as {
        title: string;
        summary: string;
      };
      return `- [${title}](${siteUrl}/blog/${post.slug}.md): ${summary}`;
    })
    .join("\n");

  return `# Mohsin Mohammed Blog

> Engineering writing by ${DATA.name} on Bluetooth, Flutter, wearables, and systems work.

Posts are also available as Markdown via \`Accept: text/markdown\` on the HTML URL, or at the \`.md\` sibling.

${items}

${sitemapSection(siteUrl)}
`;
}

export function getDevelopersMarkdown(siteUrl: string = DATA.url): string {
  return `# Mohsin Mohammed developer resources

> Machine-readable entry points for ${DATA.name} (${siteUrl}). This is a personal site, not a hosted API product — there is no public OpenAPI spec, auth API, webhook catalog, or MCP server.

Use these URLs when an agent searches for **Mohsin Mohammed** developer resources, markdown, or site structure.

## Content negotiation

Pages at ${siteUrl} speak [acceptmarkdown.com](https://acceptmarkdown.com) content negotiation.

- Send \`Accept: text/markdown\` to the canonical HTML URL
- Or fetch the \`.md\` sibling (\`/index.md\`, \`/blog.md\`, \`/blog/{slug}.md\`, \`/developers.md\`)
- Markdown responses use \`Content-Type: text/markdown; charset=utf-8\` and \`Vary: Accept, Accept-Encoding\`

## Discoverable files

- [llms.txt](${siteUrl}/llms.txt): llmstxt.org index of Mohsin Mohammed pages
- [llms-full.txt](${siteUrl}/llms-full.txt): full homepage plus blog posts in one markdown file
- [Markdown sitemap](${siteUrl}/sitemap.md): headings and links for every public page
- [XML sitemap](${siteUrl}/sitemap.xml): crawler sitemap
- [robots.txt](${siteUrl}/robots.txt): crawl rules (AI bots allowed)
- [Home markdown](${siteUrl}/index.md): ${DATA.name} profile
- [Blog markdown](${siteUrl}/blog.md): post index

## Profiles

- [GitHub (mdmohsin7)](${DATA.contact.social.GitHub.url}): source and open source
- [LinkedIn](${DATA.contact.social.LinkedIn.url}): ${DATA.name}
- [X](${DATA.contact.social.X.url}): ${DATA.name}

## How to fetch

\`\`\`bash
curl -sI -H "Accept: text/markdown" ${siteUrl}/
curl -s ${siteUrl}/llms.txt
curl -s ${siteUrl}/developers.md
\`\`\`

${sitemapSection(siteUrl)}
`;
}

export function getSitemapMarkdown(siteUrl: string = DATA.url): string {
  return `# Sitemap

> Public pages on mohsin.xyz, the personal site of ${DATA.name}.

## Site

- [Home](${siteUrl}/index.md): ${DATA.name} profile
- [Blog](${siteUrl}/blog.md): Mohsin Mohammed Blog
- [Mohsin Mohammed developer resources](${siteUrl}/developers.md): machine-readable endpoints

## Discovery

- [llms.txt](${siteUrl}/llms.txt)
- [llms-full.txt](${siteUrl}/llms-full.txt)
- [XML sitemap](${siteUrl}/sitemap.xml)
- [robots.txt](${siteUrl}/robots.txt)
`;
}

export function getNotFoundMarkdown(siteUrl: string = DATA.url): string {
  return `# Not found

This path does not exist on mohsin.xyz, the personal site of ${DATA.name}.

## Where to look next

${renderRecoveryMarkdown(siteUrl)}
`;
}

export type MarkdownDocument = {
  body: string;
  status: number;
  canonical: string;
};

export async function resolveMarkdownPath(
  pathname: string,
  siteUrl: string = DATA.url,
): Promise<MarkdownDocument> {
  const normalized = normalizePath(pathname);

  if (normalized === "/" || normalized === "/index") {
    return {
      body: getHomeMarkdown(siteUrl),
      status: 200,
      canonical: `${siteUrl}/`,
    };
  }

  if (normalized === "/blog") {
    return {
      body: await getBlogIndexMarkdown(siteUrl),
      status: 200,
      canonical: `${siteUrl}/blog`,
    };
  }

  if (normalized === "/developers") {
    return {
      body: getDevelopersMarkdown(siteUrl),
      status: 200,
      canonical: `${siteUrl}/developers`,
    };
  }

  if (normalized === "/sitemap") {
    return {
      body: getSitemapMarkdown(siteUrl),
      status: 200,
      canonical: `${siteUrl}/sitemap.md`,
    };
  }

  const blogMatch = normalized.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    const raw = getRawPostMarkdown(slug);
    if (raw) {
      return {
        body: raw,
        status: 200,
        canonical: `${siteUrl}/blog/${slug}`,
      };
    }
  }

  return {
    body: getNotFoundMarkdown(siteUrl),
    status: 404,
    canonical: `${siteUrl}${normalized}`,
  };
}

function normalizePath(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  const withSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return withSlash.replace(/\/+$/, "") || "/";
}
