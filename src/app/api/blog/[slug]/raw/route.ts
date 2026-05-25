import { getBlogPosts } from "@/data/blog";
import { DATA } from "@/data/resume";
import fs from "fs";
import path from "path";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  const filePath = path.join(process.cwd(), "content", `${params.slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return new Response("Not found", { status: 404 });
  }
  let content = fs.readFileSync(filePath, "utf8");
  // Absolutize /blog/... paths so the markdown is self-contained off-site.
  content = content
    .split('"/blog/').join(`"${DATA.url}/blog/`)
    .split('(/blog/').join(`(${DATA.url}/blog/`);
  return new Response(content, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
