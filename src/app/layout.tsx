import "./globals.css";
import { Sora, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";

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
    default: "Bespoke Software, Websites & Ads | Jefferis Software Solutions",
    template: "%s | Jefferis Software Solutions",
  },
  description:
    "Jefferis Software Solutions builds bespoke software and fast, modern websites for small businesses across the UK — and runs the ad pipelines that fill them with leads. Makers of Relay, the back office that runs itself.",
  authors: [{ name: "Jefferis Software Solutions", url: SITE_URL }],
  creator: "Jefferis Software Solutions",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "Jefferis Software Solutions",
    title: "Bespoke Software, Websites & Ads | Jefferis Software Solutions",
    description:
      "Bespoke software, fast modern websites and ads for small businesses across the UK. Makers of Relay — the back office that runs itself.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Jefferis Software Solutions — bespoke software, websites and ads",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bespoke Software, Websites & Ads | Jefferis Software Solutions",
    description:
      "Bespoke software, fast modern websites and ads for small businesses across the UK. Makers of Relay — the back office that runs itself.",
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
      "Bespoke software, websites and advertising for small businesses across the UK. Makers of Relay, the back office that runs itself.",
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
      "Bespoke software, websites and advertising for small businesses across the UK.",
    image: `${SITE_URL}/jsslogo.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Worthing",
      addressRegion: "West Sussex",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 50.8146,
      longitude: -0.3714,
    },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software, Web & Advertising Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Bespoke Software Development",
            description:
              "Custom business systems for UK companies: field-service and back-office platforms, CRMs, client portals, integrations, and workflow automation.",
            url: `${SITE_URL}/software`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Relay — Back-Office Platform",
            description:
              "Our flagship product. Relay reads every email and WhatsApp as it lands, drafts the paperwork, chases the money, and ticks the work off when the reply comes back. In private preview.",
            url: `${SITE_URL}/software/relay`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Design & Development",
            description:
              "Fast, modern, conversion-focused websites for small businesses across the UK. Mobile-first, CMS options, and performance optimisation.",
            url: `${SITE_URL}/packages`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Advertising",
            description:
              "Full-pipeline ad campaigns: creatives built from your own site, a custom landing funnel, and live tracking that attributes every lead to the ad that brought it.",
            url: `${SITE_URL}/ads`,
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
        {/* Relay: reports opens back to Shared links */}
        <script src="https://relay-production-7d2c.up.railway.app/t/jss.js" async></script>
      </body>
    </html>
  );
}
