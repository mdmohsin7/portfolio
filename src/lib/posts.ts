import { DATA } from "@/data/resume";
import fs from "fs";
import path from "path";

export function contentDir(): string {
  return path.join(process.cwd(), "content");
}

export function absolutizeBlogUrls(content: string, siteUrl: string = DATA.url): string {
  return content
    .split('"/blog/')
    .join(`"${siteUrl}/blog/`)
    .split("(/blog/")
    .join(`(${siteUrl}/blog/`);
}

export function getRawPostMarkdown(slug: string): string | null {
  const filePath = path.join(contentDir(), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return absolutizeBlogUrls(fs.readFileSync(filePath, "utf8"));
}

export function listPostSlugs(): string[] {
  return fs
    .readdirSync(contentDir())
    .filter((file) => path.extname(file) === ".mdx")
    .map((file) => path.basename(file, path.extname(file)));
}
