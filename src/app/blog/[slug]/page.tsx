import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { POSTS } from "../posts";
import { NavHeader } from "../../components/NavHeader";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { LinkedInShareButton } from "./LinkedInShareButton";
import {
  HeroBackground,
  ScrollProgress,
  ReadingProgress,
  AnimatedContent,
  AnimatedHeader,
  SectionDivider,
} from "./BlogPostClient";

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

  const content = typeof post.content === "string" ? post.content : "";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />
      <ScrollProgress />
      <ReadingProgress />
      <NavHeader />

      {/* ─── Hero header ─── */}
      <div className="relative overflow-hidden">
        <HeroBackground />

        <div className="mx-auto max-w-3xl px-5 md:px-8 pt-12 md:pt-20 pb-16 md:pb-24">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-coral-600 dark:hover:text-coral-400 transition-colors mb-10 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to blog
          </Link>

          <AnimatedHeader>
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag, i) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-coral-200/50 dark:border-coral-800/30 px-4 py-1.5 text-xs font-semibold text-coral-600 dark:text-coral-400 shadow-sm"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-100 md:text-4xl lg:text-5xl leading-[1.1] tracking-tight mb-6">
              {post.title}
            </h1>

            <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8 max-w-2xl">
              {post.description}
            </p>

            <div className="flex flex-wrap items-center gap-5 text-sm text-zinc-400 dark:text-zinc-500">
              <span className="flex items-center gap-2">
                {/* Author avatar ring */}
                <span className="relative h-8 w-8 rounded-full bg-gradient-to-br from-coral-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
                  FJ
                </span>
                <span className="font-medium text-zinc-600 dark:text-zinc-300">Finlay Jefferis</span>
              </span>
              <span className="h-4 w-px bg-zinc-300 dark:bg-zinc-700" />
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
            </div>
          </AnimatedHeader>
        </div>

        {/* Bottom fade into content area */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent" />
      </div>

      {/* ─── Article body ─── */}
      <main className="relative">
        {/* Side accent line */}
        <div className="hidden lg:block absolute left-[calc(50%-380px)] top-0 bottom-0 w-px bg-gradient-to-b from-coral-200/40 via-pink-200/20 to-transparent dark:from-coral-800/20 dark:via-pink-800/10" />

        <div className="mx-auto max-w-3xl px-5 md:px-8 py-8 md:py-12">
          <article>
            <AnimatedContent html={content} />

            <SectionDivider />

            {/* ─── Footer CTA ─── */}
            <footer className="relative rounded-2xl overflow-hidden p-8 md:p-12 mt-4">
              {/* Footer background */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950 -z-10" />
              <div className="absolute inset-0 border border-zinc-200 dark:border-zinc-800 rounded-2xl -z-10" />

              {/* Decorative corner SVG */}
              <svg className="absolute top-0 right-0 w-32 h-32 text-coral-100 dark:text-coral-950/50 -z-5" viewBox="0 0 128 128" fill="none">
                <circle cx="128" cy="0" r="96" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="128" cy="0" r="64" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="128" cy="0" r="32" stroke="currentColor" strokeWidth="0.5" />
              </svg>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                    Found this useful?
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Share it with someone who&apos;d benefit, or get in touch to chat about your project.
                  </p>
                </div>
                <div className="flex gap-3">
                  <LinkedInShareButton url={url} title={post.title} />
                  <a
                    href="/#contact"
                    className="inline-flex items-center gap-2 rounded-lg bg-coral-600 hover:bg-coral-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors"
                  >
                    Get in touch
                  </a>
                </div>
              </div>
            </footer>
          </article>
        </div>
      </main>
    </>
  );
}
