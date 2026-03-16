import type { ReactNode } from "react";
import type { Metadata } from "next";

const SITE_URL = "https://www.jefferissoftware.co.uk";

export const metadata: Metadata = {
  title: "Free Industry Tips — SEO Keywords & Quick Wins for Your Business",
  description:
    "Enter your industry and get free SEO keywords, website tips, and quick wins tailored to your business. Built by Jefferis Software Solutions.",
  alternates: { canonical: `${SITE_URL}/tools/industry-tips` },
  openGraph: {
    title: "Free Industry Tips — SEO Keywords & Quick Wins",
    description:
      "Enter your industry and get free keywords, tips, and quick wins to grow your business online.",
    url: `${SITE_URL}/tools/industry-tips`,
    type: "website",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
