import { getBlogPosts } from "@/data/blog";
import { DATA } from "@/data/resume";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${DATA.url}/blog/${post.slug}`,
    lastModified: new Date(
      (post.metadata as { publishedAt: string }).publishedAt,
    ),
  }));

  return [
    { url: DATA.url, lastModified: new Date() },
    { url: `${DATA.url}/blog`, lastModified: new Date() },
    ...postEntries,
  ];
}
