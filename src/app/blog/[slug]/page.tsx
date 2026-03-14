import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { POSTS } from "../posts";
import { NavHeader } from "../../components/NavHeader";
import { ArrowLeft, Calendar, Clock, Linkedin } from "lucide-react";
import { LinkedInShareButton } from "./LinkedInShareButton";

const SITE_URL = "https://jefferissoftware.co.uk";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      authors: ["Finlay Jefferis"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function renderContent(blocks: string[]) {
  return blocks.map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-10 mb-4"
        >
          {block.replace("## ", "")}
        </h2>
      );
    }

    const parts = block.split(/\n\n/);
    return parts.map((part, j) => {
      const rendered = part
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\\"/g, '"');

      return (
        <p
          key={`${i}-${j}`}
          className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: rendered }}
        />
      );
    });
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;

  const blogPostSchema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${SITE_URL}/blog`,
        },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      image: `${SITE_URL}/og-image.png`,
      url,
      author: {
        "@type": "Person",
        name: "Finlay Jefferis",
        url: SITE_URL,
      },
      publisher: { "@id": `${SITE_URL}/#organization` },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      keywords: post.tags,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />
      <NavHeader />
      <main className="mx-auto max-w-3xl px-5 md:px-8 py-12 md:py-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-coral-600 dark:hover:text-coral-400 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>

        <article>
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-coral-50 dark:bg-coral-950 px-3 py-1 text-xs font-semibold text-coral-600 dark:text-coral-400"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 md:text-3xl lg:text-4xl leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400 dark:text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                By Finlay Jefferis
              </span>
            </div>
          </header>

          <div className="prose-content">{renderContent(post.content)}</div>

          <footer className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Found this useful? Share it on LinkedIn.
              </p>
              <LinkedInShareButton url={url} title={post.title} />
            </div>
          </footer>
        </article>
      </main>
    </>
  );
}
