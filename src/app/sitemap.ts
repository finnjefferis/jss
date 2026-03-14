import type { MetadataRoute } from "next";
import { POSTS } from "./blog/posts";

const SITE_URL = "https://www.jefferissoftware.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries: MetadataRoute.Sitemap = POSTS.length
    ? [
        { url: `${SITE_URL}/blog`, lastModified: new Date(POSTS[0].date), priority: 0.8 },
        ...POSTS.map((post) => ({
          url: `${SITE_URL}/blog/${post.slug}`,
          lastModified: new Date(post.date),
          priority: 0.6 as const,
        })),
      ]
    : [];

  return [
    { url: SITE_URL, lastModified: new Date("2026-03-13"), priority: 1 },
    { url: `${SITE_URL}/packages/business`, lastModified: new Date("2026-03-01"), priority: 0.9 },
    { url: `${SITE_URL}/packages/commerce`, lastModified: new Date("2026-03-01"), priority: 0.9 },
    { url: `${SITE_URL}/software`, lastModified: new Date("2026-03-01"), priority: 0.8 },
    { url: `${SITE_URL}/work/naxco`, lastModified: new Date("2026-02-15"), priority: 0.7 },
    { url: `${SITE_URL}/work/edivert`, lastModified: new Date("2026-02-15"), priority: 0.7 },
    { url: `${SITE_URL}/work/ivy`, lastModified: new Date("2026-02-15"), priority: 0.7 },
    { url: `${SITE_URL}/work/jmrt`, lastModified: new Date("2026-02-15"), priority: 0.7 },
    { url: `${SITE_URL}/work/toolbox`, lastModified: new Date("2026-02-15"), priority: 0.7 },
    { url: `${SITE_URL}/work/carbon`, lastModified: new Date("2026-02-15"), priority: 0.7 },
    ...blogEntries,
  ];
}
