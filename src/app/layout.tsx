import "./globals.css";
import { Sora, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { CookieConsent } from "./components/CookieConsent";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

const SITE_URL = "https://www.jefferissoftware.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Web Design for Small Businesses UK | Jefferis Software Solutions",
    template: "%s | Jefferis Software Solutions",
  },
  description:
    "Jefferis Software Solutions builds fast, modern websites and bespoke software for small businesses across the UK. Real results: more traffic, more enquiries, more growth.",
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
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Jefferis Software Solutions — Web Design for Small Businesses UK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design for Small Businesses UK | Jefferis Software Solutions",
    description:
      "Fast, modern websites and bespoke software for small businesses across the UK. Proven results.",
    images: [`${SITE_URL}/og-image.png`],
  },
  alternates: {
    canonical: "/",
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

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Jefferis Software Solutions",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/jsslogo.png`,
    },
    description:
      "Web design and bespoke software development for small businesses across the UK.",
    telephone: "+447887034503",
    email: "hello@jefferissoftware.co.uk",
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    founder: {
      "@type": "Person",
      "@id": `${SITE_URL}/#founder`,
      name: "Finlay Jefferis",
      jobTitle: "Founder & Developer",
      worksFor: { "@id": `${SITE_URL}/#organization` },
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+447887034503",
      email: "hello@jefferissoftware.co.uk",
      contactType: "customer service",
      availableLanguage: "English",
    },
    sameAs: [
      "https://www.linkedin.com/company/jefferis-software-solutions",
      "https://github.com/finlayjefferis",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Jefferis Software Solutions",
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#business`,
    name: "Jefferis Software Solutions",
    url: SITE_URL,
    telephone: "+447887034503",
    email: "hello@jefferissoftware.co.uk",
    description:
      "Web design and bespoke software development for small businesses across the UK.",
    image: `${SITE_URL}/jsslogo.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chichester",
      addressRegion: "West Sussex",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 50.8365,
      longitude: -0.7792,
    },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Design & Software Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Design",
            description:
              "Custom website design for small businesses across the UK. Mobile-first, conversion-focused.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Development",
            description:
              "Full-stack web development using modern technologies. CMS integration, SEO setup, and performance optimisation.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Bespoke Software Development",
            description:
              "Custom internal tools, dashboards, CRM integrations, and workflow automation for UK businesses.",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "4",
      bestRating: "5",
      worstRating: "1",
    },
  },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(! t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${sora.variable} ${spaceGrotesk.variable}`}>
        {children}
        <Analytics />
        <CookieConsent />
      </body>
    </html>
  );
}
