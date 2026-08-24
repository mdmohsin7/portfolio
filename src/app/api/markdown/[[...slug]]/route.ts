import { getBlogPosts } from "@/data/blog";
import { markdownResponse, resolveMarkdownPath } from "@/lib/markdown";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return [
    { slug: [] },
    { slug: ["index"] },
    { slug: ["blog"] },
    { slug: ["developers"] },
    { slug: ["sitemap"] },
    ...posts.map((post) => ({ slug: ["blog", post.slug] })),
  ];
}

export async function GET(
  _req: Request,
  { params }: { params: { slug?: string[] } },
) {
  const slug = params.slug ?? [];
  const pathname = slug.length === 0 ? "/" : `/${slug.join("/")}`;
  const doc = await resolveMarkdownPath(pathname);
  return markdownResponse(doc.body, {
    status: doc.status,
    canonical: doc.canonical,
  });
}
