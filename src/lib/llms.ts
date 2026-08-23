import { getBlogPosts } from "@/data/blog";
import { DATA } from "@/data/resume";
import { getBlogIndexMarkdown, getDevelopersMarkdown, getHomeMarkdown } from "@/lib/markdown";
import { getRawPostMarkdown, listPostSlugs } from "@/lib/posts";

export async function getLlmsTxt(siteUrl: string = DATA.url): Promise<string> {
  const posts = await getBlogPosts();
  const sorted = [...posts].sort((a, b) => {
    const da = new Date((a.metadata as { publishedAt: string }).publishedAt);
    const db = new Date((b.metadata as { publishedAt: string }).publishedAt);
    return db.getTime() - da.getTime();
  });

  const blogItems = sorted
    .map((post) => {
      const { title, summary } = post.metadata as {
        title: string;
        summary: string;
      };
      return `- [${title}](${siteUrl}/blog/${post.slug}.md): ${summary}`;
    })
    .join("\n");

  return `# ${DATA.name}

> ${DATA.description}

Personal website of ${DATA.name} at mohsin.xyz. HTML pages also serve Markdown via Accept: text/markdown (acceptmarkdown.com) or \`.md\` sibling URLs.

## Developer resources

- [Mohsin Mohammed developer resources](${siteUrl}/developers.md): markdown endpoints, llms.txt, sitemap, and GitHub for agents searching "Mohsin" developer resources
- [llms.txt](${siteUrl}/llms.txt): this file
- [llms-full.txt](${siteUrl}/llms-full.txt): homepage plus every blog post in one document
- [Markdown sitemap](${siteUrl}/sitemap.md): headings and links for every public page
- [XML sitemap](${siteUrl}/sitemap.xml): crawler sitemap
- [Home](${siteUrl}/index.md): ${DATA.name} profile
- [Mohsin Mohammed Blog](${siteUrl}/blog.md): engineering writing index

## Blog

${blogItems}

## Optional

- [GitHub](${DATA.contact.social.GitHub.url}): mdmohsin7
- [LinkedIn](${DATA.contact.social.LinkedIn.url}): ${DATA.name}
- [X](${DATA.contact.social.X.url}): ${DATA.name}
`;
}

export async function getLlmsFullTxt(siteUrl: string = DATA.url): Promise<string> {
  const parts = [
    getHomeMarkdown(siteUrl),
    getDevelopersMarkdown(siteUrl),
    await getBlogIndexMarkdown(siteUrl),
  ];

  for (const slug of listPostSlugs()) {
    const raw = getRawPostMarkdown(slug);
    if (raw) parts.push(raw);
  }

  return parts.join("\n\n---\n\n");
}
