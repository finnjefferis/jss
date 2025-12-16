import type { Metadata } from "next";
import { Inter } from "next/font/google"; // or your font
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// 1. Set your base URL so images/links work correctly everywhere
const baseUrl = "https://www.jefferis-software.com"; // Replace with your actual domain

export const metadata: Metadata = {
  // 2. Base URL for resolving relative links (like images)
  metadataBase: new URL(baseUrl),

  // 3. Title Template: "Page Name | Jefferis Software Solutions"
  title: {
    default: "Jefferis Software Solutions | Websites & Growth for Trades",
    template: "%s | Jefferis Software Solutions",
  },

  // 4. Description: The snippet Google shows in results
  description:
    "Simple, fast websites and social media management for small businesses. We turn local searches into paying customers.",

  // 5. Open Graph: How it looks on Facebook, LinkedIn, WhatsApp, iMessage
  openGraph: {
    title: "Jefferis Software Solutions | Turn Clicks into Clients",
    description:
      "Don't let a bad website lose you work. We build high-performance sites and growth systems for local trades and businesses.",
    url: baseUrl,
    siteName: "Jefferis Software Solutions",
    locale: "en_GB",
    type: "website",
    // Next.js will look for 'opengraph-image.png' in your app folder automatically, 
    // but you can define it here explicitly if you want:
    // images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },

  // 6. Twitter Card: How it looks on X (Twitter)
  twitter: {
    card: "summary_large_image",
    title: "Jefferis Software Solutions",
    description: "Websites & social growth for small businesses.",
    // creator: "@yourtwitterhandle", // Optional
  },

  // 7. Robots: Tell Google to index this site
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // 8. Keywords: Helpful for smaller search engines
  keywords: [
    "Web Design",
    "Small Business Website",
    "Local SEO",
    "Social Media Management",
    "Trade Websites",
    "Lead Generation",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}