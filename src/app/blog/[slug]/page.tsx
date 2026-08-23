import { getBlogPosts, getPost } from "@/data/blog";
import { DATA } from "@/data/resume";
import { ShareButtons } from "@/components/share-buttons";
import { formatDate } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  const post = await getPost(params.slug).catch(() => null);

  if (!post) {
    return undefined;
  }

  const { title, publishedAt, summary, image } = post.metadata as {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
  };
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${DATA.url}${image}`
    : `${DATA.url}/og?title=${title}`;

  return {
    title,
    description: summary,
    openGraph: {
      title,
      description: summary,
      type: "article",
      publishedTime: publishedAt,
      url: `${DATA.url}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: summary,
      images: [ogImage],
    },
    alternates: {
      canonical: `${DATA.url}/blog/${post.slug}`,
      types: {
        "text/markdown": `${DATA.url}/blog/${post.slug}.md`,
      },
    },
  };
}

export default async function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const post = await getPost(params.slug).catch(() => null);

  if (!post) {
    notFound();
  }

  const { title, publishedAt, summary, image } = post.metadata as {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
  };

  return (
    <section id="blog">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: title,
            datePublished: publishedAt,
            dateModified: publishedAt,
            description: summary,
            image: image
              ? image.startsWith("http")
                ? image
                : `${DATA.url}${image}`
              : `${DATA.url}/og?title=${title}`,
            url: `${DATA.url}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: DATA.name,
            },
          }),
        }}
      />
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="size-4" />
        Back to all posts
      </Link>
      {image && (
        <div className="mb-8 overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={title}
            width={1200}
            height={630}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      )}
      <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
        {title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <Suspense fallback={<p className="h-5" />}>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(publishedAt)}
          </p>
        </Suspense>
        <ShareButtons url={`${DATA.url}/blog/${post.slug}`} title={title} />
      </div>
      <article
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.source }}
      ></article>
    </section>
  );
}

