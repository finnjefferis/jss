import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Cpu } from "lucide-react";
import { NavHeader } from "../components/NavHeader";
import { RevealSection } from "../components/RevealSection";
import { TierCardGrid, MonthlyPlanGrid } from "../components/PackageCards";

const SITE_URL = "https://www.jefferissoftware.co.uk";

export const metadata: Metadata = {
  title: "Web Design Packages & Pricing",
  description:
    "Transparent pricing for small business websites. From £459 for a clean starter site to full e-commerce builds. No hidden fees, no surprises.",
  alternates: { canonical: `${SITE_URL}/packages` },
  openGraph: {
    title: "Web Design Packages & Pricing | Jefferis Software Solutions",
    description:
      "Transparent pricing for small business websites. From £459 for a clean starter site to full e-commerce builds.",
    url: `${SITE_URL}/packages`,
  },
};

const TIERS = [
  {
    id: "starter",
    name: "Starter",
    price: "£459",
    tagline: "Get online fast.",
    description:
      "A clean, professional site for businesses that need to look legit online. Done properly, done fast.",
    icon: "Zap",
    features: [
      "Unlimited pages",
      "Mobile-first design",
      "Contact form",
      "Basic SEO setup",
      "Google Business setup",
      "7–10 day delivery",
    ],
    cta: "View Starter",
    highlight: false,
    note: "Fixed scope. No CMS.",
  },
  {
    id: "business",
    name: "Business",
    price: "£919",
    tagline: "Built to grow.",
    description:
      "A professional site you can actually keep up to date — with a CMS, blog, and priority support.",
    icon: "BarChart3",
    features: [
      "Everything in Starter",
      "CMS access (edit your content)",
      "Blog / news section",
      "Full SEO setup",
      "Recorded training session",
      "Priority support",
    ],
    cta: "View Business",
    highlight: true,
    note: "Most popular",
  },
  {
    id: "commerce",
    name: "Commerce",
    price: "£1,999+",
    tagline: "Built to sell.",
    description:
      "A full online store with payments, product management, and a CMS — so you spend less time on admin.",
    icon: "ShoppingBag",
    features: [
      "Everything in Business",
      "E-commerce setup",
      "Stripe payment integration",
      "Product management",
      "Order confirmations",
      "Ongoing support available",
    ],
    cta: "View Commerce",
    highlight: false,
    note: "Price varies by scope.",
  },
];

const MONTHLY_PLANS = [
  {
    name: "Hosting",
    price: "£29/mo",
    description:
      "Your site stays fast, secure, and online. We handle the boring stuff.",
    features: [
      "Hosting & SSL",
      "Daily backups",
      "Website monitoring & updates",
      "Security patches",
      "Basic support",
    ],
  },
  {
    name: "Growth",
    price: "£149/mo",
    description:
      "We actively grow your online presence so customers find you first.",
    features: [
      "Everything in Hosting",
      "Full Google Business management",
      "2 SEO-optimised blog posts per month",
      "2-weekly SEO report",
      "AI-optimised ads",
    ],
  },
  {
    name: "Lead Machine",
    price: "£349/mo",
    description:
      "Full marketing engine. We bring the leads, you close the deals.",
    features: [
      "Everything in Growth",
      "Weekly SEO report",
      "Full SEO strategy",
      "Content marketing",
      "Lead generation campaigns",
      "Quarterly strategy call",
    ],
  },
];

const BOOKING_URL =
  "https://outlook.office.com/bookwithme/user/b44ea33c0eb847a3a69babfcdc453315@jefferissoftware.co.uk?anonymous&ismsaljsauthenabled&ep=plink";

const packagesSchema = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Packages",
        item: `${SITE_URL}/packages`,
      },
    ],
  },
];

export default function PackagesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(packagesSchema) }}
      />
      <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors">
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-coral-500 via-pink-500 to-coral-500 z-50" />

        <NavHeader />

        {/* Hero */}
        <RevealSection className="relative pt-12 md:pt-20 pb-16 md:pb-24 overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-coral-500/6 rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-pink-500/6 rounded-full blur-3xl" />
          </div>

          <div className="mx-auto max-w-6xl px-5 md:px-8 relative z-10 text-center">
            <p data-reveal style={{ "--d": 0 } as React.CSSProperties} className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400">
              Packages & Pricing
            </p>
            <h1 data-reveal style={{ "--d": 100 } as React.CSSProperties} className="text-4xl font-extrabold leading-[1.12] text-zinc-900 dark:text-white sm:text-5xl lg:text-6xl mb-6">
              Honest pricing.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-600 to-pink-600" data-gradient style={{ "--gd": 400 } as React.CSSProperties}>
                No surprises.
              </span>
            </h1>
            <p data-reveal style={{ "--d": 200 } as React.CSSProperties} className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Pick a website build that fits your business, then choose a monthly
              plan to keep it running and growing. Every price is real — no
              &ldquo;starting from&rdquo; games.
            </p>
          </div>
        </RevealSection>

        {/* Website Build Tiers */}
        <RevealSection className="pb-16 md:pb-24">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="mb-10">
              <p data-reveal style={{ "--d": 0 } as React.CSSProperties} className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
                One-off website builds
              </p>
              <h2 data-reveal style={{ "--d": 80 } as React.CSSProperties} className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 md:text-3xl">
                Choose your starting point.
              </h2>
            </div>

            <TierCardGrid tiers={TIERS} />

            <p data-reveal style={{ "--d": 550 } as React.CSSProperties} className="mt-6 text-center text-sm text-zinc-400 dark:text-zinc-500">
              All packages include a 3-month payment plan option — no interest, no fuss.
            </p>
          </div>
        </RevealSection>

        {/* Monthly Plans */}
        <RevealSection className="py-16 md:py-24 border-t border-zinc-100 dark:border-zinc-900">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="mb-10">
              <p data-reveal style={{ "--d": 0 } as React.CSSProperties} className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
                Monthly plans
              </p>
              <h2 data-reveal style={{ "--d": 80 } as React.CSSProperties} className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 md:text-3xl mb-3">
                Keep it running. Keep it growing.
              </h2>
              <p data-reveal style={{ "--d": 160 } as React.CSSProperties} className="text-base text-zinc-500 dark:text-zinc-400 max-w-2xl">
                Every website needs hosting. Pick the plan that matches your ambition — from keeping the lights on to full-blown lead generation.
              </p>
            </div>

            <MonthlyPlanGrid plans={MONTHLY_PLANS} />

            <p data-reveal style={{ "--d": 600 } as React.CSSProperties} className="mt-6 text-center text-sm text-zinc-400 dark:text-zinc-500">
              Hosting included as standard with every website. No hidden fees, cancel any time.
            </p>
          </div>
        </RevealSection>

        {/* Custom Software Callout */}
        <RevealSection className="py-16 md:py-24 border-t border-zinc-100 dark:border-zinc-900">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <Link
              href="/software"
              data-reveal
              style={{ "--d": 0 } as React.CSSProperties}
              className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 hover:border-coral-300 dark:hover:border-coral-700 hover:shadow-lg hover:shadow-coral-500/10 transition-all duration-300"
            >
              <div className="flex-shrink-0 h-14 w-14 rounded-2xl bg-coral-50 dark:bg-coral-950 flex items-center justify-center group-hover:bg-coral-100 dark:group-hover:bg-coral-900 transition-colors duration-300">
                <Cpu className="h-7 w-7 text-coral-600 dark:text-coral-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
                  Need something more?
                </p>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1 group-hover:text-coral-600 dark:group-hover:text-coral-400 transition-colors duration-300">
                  Custom software development
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Dashboards, CRM integrations, booking systems, and workflow
                  automation — built around how you actually work. Priced per
                  project.
                </p>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300 group-hover:border-coral-300 dark:group-hover:border-coral-600 group-hover:text-coral-600 dark:group-hover:text-coral-400 transition-colors duration-300 whitespace-nowrap">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </div>
        </RevealSection>

        {/* CTA */}
        <RevealSection className="py-16 md:py-24 border-t border-zinc-100 dark:border-zinc-900">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div data-reveal style={{ "--d": 0 } as React.CSSProperties} className="rounded-3xl bg-gradient-to-br from-coral-600 to-pink-700 p-8 md:p-14 text-center relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.08),_transparent_60%)]" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral-200 mb-3">
                Not sure which to pick?
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
                Book a free discovery call.
              </h2>
              <p className="text-coral-100 text-sm leading-relaxed max-w-md mx-auto mb-8">
                30 minutes. No sales pressure. We&apos;ll talk through your
                project and recommend the right package. If it&apos;s not a good
                fit, we&apos;ll say so.
              </p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-coral-700 shadow-xl hover:bg-coral-50 hover:scale-[1.02] transition-all"
              >
                Schedule a time
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </RevealSection>
      </main>
    </>
  );
}
