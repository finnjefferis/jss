import Link from "next/link";
import type { Metadata } from "next";
import { POSTS } from "./posts";
import { NavHeader } from "../components/NavHeader";
import { ArrowRight, Calendar, Clock } from "lucide-react";

const SITE_URL = "https://jefferissoftware.co.uk";

export const metadata: Metadata = {
  title: "Blog — Web Design Tips for Small Businesses",
  description:
    "Practical advice on web design, SEO, and growing your small business online. Written by Jefferis Software Solutions.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Blog — Web Design Tips for Small Businesses",
    description:
      "Practical advice on web design, SEO, and growing your small business online.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

const blogSchema = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog — Web Design Tips for Small Businesses",
    description:
      "Practical advice on web design, SEO, and growing your small business online.",
    url: `${SITE_URL}/blog`,
    publisher: { "@id": `${SITE_URL}/#organization` },
  },
];

export default function BlogPage() {
  const sorted = [...POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <NavHeader />
      <main className="mx-auto max-w-4xl px-5 md:px-8 py-12 md:py-20">
        <div className="mb-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
            Blog
          </p>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 md:text-4xl">
            Tips &amp; insights for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">
              small businesses.
            </span>
          </h1>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-2xl">
            Straightforward advice on web design, development, and growing your
            business online. No jargon, no fluff.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {sorted.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 p-6 md:p-8 transition-all hover:border-rose-500 dark:hover:border-rose-500 hover:shadow-lg hover:shadow-rose-500/10"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 dark:text-zinc-500 mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(post.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                {post.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-rose-600 dark:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Read
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
