import { getBlogPosts } from "@/data/blog";
import { DATA } from "@/data/resume";

export const dynamic = "force-static";

export async function GET() {
  const posts = await getBlogPosts();
  const sorted = posts.sort((a, b) => {
    const da = new Date((a.metadata as { publishedAt: string }).publishedAt);
    const db = new Date((b.metadata as { publishedAt: string }).publishedAt);
    return db.getTime() - da.getTime();
  });

  const lines: string[] = [
    `# ${DATA.name}`,
    "",
    `> ${DATA.description}`,
    "",
    "## Blog",
    "",
  ];
  for (const post of sorted) {
    const { title, summary } = post.metadata as {
      title: string;
      summary: string;
    };
    lines.push(`- [${title}](${DATA.url}/blog/${post.slug}.md): ${summary}`);
  }
  lines.push("");
  lines.push("## Links");
  lines.push("");
  lines.push(`- [Home](${DATA.url})`);
  lines.push(`- [Blog index](${DATA.url}/blog)`);

  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
