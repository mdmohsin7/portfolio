import { getBlogPosts } from "@/data/blog";
import { DATA } from "@/data/resume";
import { getNotFoundMarkdown, markdownResponse } from "@/lib/markdown";
import { getRawPostMarkdown } from "@/lib/posts";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  const content = getRawPostMarkdown(params.slug);
  if (!content) {
    return markdownResponse(getNotFoundMarkdown(), { status: 404 });
  }
  return markdownResponse(content, {
    canonical: `${DATA.url}/blog/${params.slug}`,
  });
}
