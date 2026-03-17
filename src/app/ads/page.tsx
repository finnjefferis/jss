import type { Metadata } from "next";
import Link from "next/link";
import { NavHeader } from "../components/NavHeader";
import { RevealSection } from "../components/RevealSection";
import { ScrollArrow } from "../components/ScrollArrow";
import {
  ArrowRight,
  BarChart3,
  Brain,
  Calendar,
  Eye,
  Layers,
  LineChart,
  MessageSquare,
  MousePointerClick,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { AdDashboardAnimated } from "../components/AdDashboardAnimated";

const SITE_URL = "https://www.jefferissoftware.co.uk";

export const metadata: Metadata = {
  title: "AI-Optimised Ads",
  description:
    "Smarter ad campaigns powered by AI. Google Ads, Meta, and more — targeted, optimised, and built to bring you actual leads. Not vanity metrics.",
  alternates: { canonical: `${SITE_URL}/ads` },
  openGraph: {
    title: "AI-Optimised Ads | Jefferis Software Solutions",
    description:
      "Smarter ad campaigns powered by AI. Google Ads, Meta, and more — targeted, optimised, and built to bring you actual leads.",
    url: `${SITE_URL}/ads`,
  },
};

const BOOKING_URL =
  "https://outlook.office.com/bookwithme/user/b44ea33c0eb847a3a69babfcdc453315@jefferissoftware.co.uk?anonymous&ismsaljsauthenabled&ep=plink";

const CAPABILITIES = [
  {
    Icon: Brain,
    title: "AI-Written Ad Copy",
    description:
      "We use AI to generate, test, and refine ad copy that actually converts. Hundreds of variations tested so you don't waste budget on guesswork.",
  },
  {
    Icon: Target,
    title: "Precision Targeting",
    description:
      "We find the people actively searching for what you sell. Hyper-local, intent-based targeting that puts your ads in front of buyers — not browsers.",
  },
  {
    Icon: LineChart,
    title: "Real-Time Optimisation",
    description:
      "Campaigns are monitored and adjusted continuously. Budgets shift to what's working, and underperformers get cut fast.",
  },
  {
    Icon: MousePointerClick,
    title: "Landing Page Alignment",
    description:
      "Your ads match your landing pages. We make sure the click-through experience is seamless so leads don't bounce at the last second.",
  },
  {
    Icon: Eye,
    title: "Transparent Reporting",
    description:
      "No vanity metrics. You see exactly what you're spending, what's converting, and what each lead costs. Plain English, not marketing jargon.",
  },
  {
    Icon: Sparkles,
    title: "Multi-Platform Campaigns",
    description:
      "Google Ads, Meta, Instagram — we run campaigns where your customers actually are, not where agencies make the most commission.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Discovery & research",
    body: "We learn your business, your customers, and your competitors. Then we find the gaps they're missing.",
    Icon: MessageSquare,
  },
  {
    step: "02",
    title: "Campaign build",
    body: "AI generates ad variations, we set up targeting, and build out campaigns designed to convert from day one.",
    Icon: Layers,
  },
  {
    step: "03",
    title: "Launch & optimise",
    body: "Campaigns go live. We monitor daily, cut what's not working, and scale what is. Your budget works harder every week.",
    Icon: Rocket,
  },
  {
    step: "04",
    title: "Report & refine",
    body: "Regular performance reports with real numbers. We adjust strategy based on data, not hunches.",
    Icon: BarChart3,
  },
];

const PLATFORMS = [
  "Google Ads",
  "Google Shopping",
  "Meta Ads",
  "Instagram Ads",
  "Retargeting",
  "Local Service Ads",
];

const adsSchema = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "AI-Optimised Ads",
        item: `${SITE_URL}/ads`,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI-Optimised Advertising",
    description:
      "Smarter ad campaigns powered by AI. Google Ads, Meta, and more — targeted, optimised, and built to generate real leads for UK businesses.",
    provider: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/ads`,
    areaServed: { "@type": "Country", name: "United Kingdom" },
  },
];

export default function AdsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(adsSchema) }}
      />
      <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors">
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-coral-500 via-pink-500 to-coral-500 z-50" />

        <NavHeader />

        {/* Hero */}
        <RevealSection className="relative pt-12 md:pt-20 pb-20 md:pb-32 overflow-hidden">
          {/* Ambient background */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-coral-500/[0.04] dark:bg-coral-500/[0.03] rounded-full blur-3xl translate-x-1/3 -translate-y-1/4" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-500/[0.04] dark:bg-pink-500/[0.03] rounded-full blur-3xl -translate-x-1/3 translate-y-1/4" />
          </div>

          <div className="mx-auto max-w-6xl px-5 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left: text */}
              <div>
                <p
                  data-reveal
                  style={{ "--d": 0 } as React.CSSProperties}
                  className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400"
                >
                  AI-Optimised Ads
                </p>
                <h1
                  data-reveal
                  style={
                    { "--d": 120, "--reveal-y": "16px" } as React.CSSProperties
                  }
                  className="text-4xl font-extrabold leading-[1.12] text-zinc-900 dark:text-white sm:text-5xl lg:text-[3.5rem] mb-6"
                >
                  Stop burning money on{" "}
                  <span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-coral-600 to-pink-600"
                    data-gradient
                    style={{ "--gd": 500 } as React.CSSProperties}
                  >
                    ads that don&apos;t work.
                  </span>
                </h1>
                <p
                  data-reveal
                  style={{ "--d": 240 } as React.CSSProperties}
                  className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed mb-10"
                >
                  Automated, monitored ads that deliver. Better
                  targeting. Better copy. Better results handled for you.
                </p>
                <div
                  data-reveal
                  style={{ "--d": 360 } as React.CSSProperties}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-coral-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-coral-600/25 hover:bg-coral-700 hover:scale-[1.02] transition-all"
                  >
                    <Calendar className="h-4 w-4" />
                    Book a free strategy call
                  </a>
                  <a
                    href="#how-it-works"
                    className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-coral-600 dark:hover:text-coral-400 transition-colors"
                  >
                    See how it works &rarr;
                  </a>
                </div>
              </div>

              {/* Right: ad performance mockup */}
              <div
                data-reveal
                style={{ "--d": 300 } as React.CSSProperties}
                className="hidden lg:block relative py-6 px-8"
              >
                <div className="absolute -inset-6 bg-gradient-to-tr from-coral-100/40 dark:from-coral-950/30 to-pink-100/40 dark:to-pink-950/30 rounded-3xl blur-2xl -z-10" />

                {/* Dashboard mockup */}
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-900 shadow-2xl overflow-hidden">
                  {/* Title bar */}
                  <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-800">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-amber-400" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                    <span className="ml-3 text-xs text-zinc-500 font-mono">
                      ad-dashboard
                    </span>
                  </div>
                  {/* Animated dashboard metrics */}
                  <AdDashboardAnimated />
                </div>

                {/* Floating cards */}
                <div className="absolute -bottom-4 -left-6 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl px-4 py-3 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      3.2x avg ROAS
                    </p>
                    <p className="text-[10px] text-zinc-400">
                      Return on ad spend
                    </p>
                  </div>
                </div>

                <div className="absolute -top-3 -right-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl px-4 py-3 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-coral-100 dark:bg-coral-950 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-coral-600 dark:text-coral-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      AI-optimised
                    </p>
                    <p className="text-[10px] text-zinc-400">
                      24/7 campaign tuning
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ScrollArrow target="capabilities" />
        </RevealSection>

        {/* Capabilities */}
        <RevealSection id="capabilities" className="py-16 md:py-24 border-t border-zinc-100 dark:border-zinc-900">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="text-center mb-14">
              <p
                data-reveal
                style={{ "--d": 0 } as React.CSSProperties}
                className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400"
              >
                What you get
              </p>
              <h2
                data-reveal
                style={{ "--d": 80 } as React.CSSProperties}
                className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 md:text-4xl mb-4"
              >
                Ads that actually{" "}
                <span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-coral-600 to-pink-600"
                  data-gradient
                  style={{ "--gd": 400 } as React.CSSProperties}
                >
                  bring in leads.
                </span>
              </h2>
              <p
                data-reveal
                style={{ "--d": 160 } as React.CSSProperties}
                className="text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto"
              >
                No fluff. No vanity metrics. Just campaigns built to put your
                phone ringing and your inbox full.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CAPABILITIES.map((cap, i) => (
                <div
                  key={cap.title}
                  data-reveal
                  style={{ "--d": 240 + i * 80 } as React.CSSProperties}
                  className="group rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-7 hover:border-coral-200 dark:hover:border-coral-800 hover:shadow-lg hover:shadow-coral-500/5 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-coral-50 dark:bg-coral-950/50 group-hover:bg-coral-100 dark:group-hover:bg-coral-900/50 transition-colors">
                    <cap.Icon className="h-5 w-5 text-coral-600 dark:text-coral-400" />
                  </div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* Platforms */}
        <RevealSection className="py-12 md:py-16 border-t border-zinc-100 dark:border-zinc-900">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div
              data-reveal
              style={{ "--d": 0 } as React.CSSProperties}
              className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 shrink-0">
                We run ads on
              </p>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:border-coral-300 dark:hover:border-coral-700 hover:text-coral-600 dark:hover:text-coral-400 transition-colors duration-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Process */}
        <RevealSection
          id="how-it-works"
          className="py-16 md:py-24 border-t border-zinc-100 dark:border-zinc-900"
        >
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="text-center mb-14">
              <p
                data-reveal
                style={{ "--d": 0 } as React.CSSProperties}
                className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400"
              >
                How it works
              </p>
              <h2
                data-reveal
                style={{ "--d": 80 } as React.CSSProperties}
                className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 md:text-4xl mb-4"
              >
                From zero to leads in{" "}
                <span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-coral-600 to-pink-600"
                  data-gradient
                  style={{ "--gd": 400 } as React.CSSProperties}
                >
                  under a week.
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROCESS.map((step, i) => (
                <div
                  key={step.step}
                  data-reveal
                  style={{ "--d": 160 + i * 120 } as React.CSSProperties}
                  className="relative"
                >
                  {/* Connector line (desktop) */}
                  {i < PROCESS.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-[calc(50%+28px)] right-[-28px] h-px bg-zinc-200 dark:bg-zinc-800" />
                  )}

                  <div className="text-center">
                    <div className="mx-auto mb-5 h-14 w-14 rounded-2xl bg-coral-600 flex items-center justify-center shadow-lg shadow-coral-600/20">
                      <step.Icon className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-coral-500 mb-2">
                      Step {step.step}
                    </p>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* Included in Growth */}
        <RevealSection className="py-16 md:py-24 border-t border-zinc-100 dark:border-zinc-900">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div
              data-reveal
              style={{ "--d": 0 } as React.CSSProperties}
              className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 md:p-12 relative overflow-hidden"
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-coral-500/[0.04] rounded-full blur-3xl" />
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 mb-3">
                    Already included
                  </p>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white mb-4">
                    AI ads come with every Growth plan.
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                    No extra cost. If you&apos;re on the Growth plan at
                    &pound;149/mo, AI-optimised ads are already part of your
                    package alongside SEO, blog posts, and Google Business
                    management.
                  </p>
                  <Link
                    href="/packages"
                    className="inline-flex items-center gap-2 text-sm font-bold text-coral-600 dark:text-coral-400 hover:text-coral-700 dark:hover:text-coral-300 transition-colors"
                  >
                    See all packages
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "AI ad copy", icon: Brain },
                    { label: "2-weekly reports", icon: BarChart3 },
                    { label: "Budget optimisation", icon: TrendingUp },
                    { label: "Multi-platform", icon: Layers },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 p-5 text-center hover:border-coral-200 dark:hover:border-coral-700 transition-colors"
                    >
                      <item.icon className="h-5 w-5 text-coral-600 dark:text-coral-400 mx-auto mb-2" />
                      <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* CTA */}
        <RevealSection className="py-16 md:py-24 border-t border-zinc-100 dark:border-zinc-900">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div
              data-reveal
              style={{ "--d": 0 } as React.CSSProperties}
              className="rounded-3xl bg-gradient-to-br from-coral-600 to-pink-700 p-8 md:p-14 relative overflow-hidden"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.08),_transparent_60%)]" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral-200 mb-3">
                    Ready to stop wasting ad spend?
                  </p>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
                    Let&apos;s get your ads working.
                  </h2>
                  <p className="text-coral-100 text-sm leading-relaxed max-w-md mb-8">
                    Free strategy call. We&apos;ll look at what you&apos;re
                    currently doing (or not doing), find the quick wins, and tell
                    you exactly what we&apos;d do differently. No obligation.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-coral-700 shadow-xl hover:bg-coral-50 hover:scale-[1.02] transition-all"
                    >
                      <Calendar className="h-4 w-4" />
                      Book a free strategy call
                    </a>
                    <Link
                      href="/packages"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-8 py-4 text-sm font-bold text-white hover:bg-white/10 transition-colors"
                    >
                      See packages
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className="hidden lg:flex justify-center">
                  <div className="grid grid-cols-2 gap-3 max-w-xs">
                    {[
                      { label: "No lock-in contracts", icon: "✓" },
                      { label: "Transparent spend", icon: "£" },
                      { label: "AI-powered copy", icon: "🧠" },
                      { label: "Real leads, not clicks", icon: "📞" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl bg-white/10 border border-white/10 p-4 text-center"
                      >
                        <p className="text-2xl mb-1">{item.icon}</p>
                        <p className="text-xs font-semibold text-white/90">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </main>
    </>
  );
}
