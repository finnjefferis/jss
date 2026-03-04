import "./globals.css";
import { Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://jefferissoftware.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Web Design for Small Businesses UK | Jefferis Software Solutions",
    template: "%s | Jefferis Software Solutions",
  },
  description:
    "Jefferis Software Solutions builds fast, modern websites and bespoke software for small businesses across the UK. Real results: more traffic, more enquiries, more growth.",
  keywords: [
    "web design UK",
    "small business website design",
    "web developer UK",
    "bespoke software UK",
    "website redesign",
    "mobile-first web design",
    "affordable web design UK",
    "bespoke web applications UK",
  ],
  authors: [{ name: "Jefferis Software Solutions", url: SITE_URL }],
  creator: "Jefferis Software Solutions",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "Jefferis Software Solutions",
    title: "Web Design for Small Businesses UK | Jefferis Software Solutions",
    description:
      "Fast, modern websites and bespoke software for small businesses across the UK. Proven results.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design for Small Businesses UK | Jefferis Software Solutions",
    description:
      "Fast, modern websites and bespoke software for small businesses across the UK. Proven results.",
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/jsslogo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Jefferis Software Solutions",
  description:
    "Web design and bespoke software development for small businesses across the UK.",
  url: SITE_URL,
  telephone: "+447887034503",
  email: "hello@jefferissoftware.co.uk",
  areaServed: {
    "@type": "Country",
    name: "United Kingdom",
  },
  serviceType: ["Web Design", "Web Development", "Bespoke Software Development"],
  priceRange: "££",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "4",
    bestRating: "5",
  },
  sameAs: [],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={manrope.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
