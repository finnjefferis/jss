"use client";

import Link from "next/link";
import { Check, ArrowRight, Zap, BarChart3, ShoppingBag, Cpu } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const TIERS = [
  {
    id: "essential",
    name: "Essential",
    price: "£445",
    tagline: "Get online fast.",
    description: "For businesses that just need a clean, professional presence. Done properly, done fast.",
    Icon: Zap,
    features: [
      "Up to 5 pages",
      "Mobile-first design",
      "Contact form",
      "Basic SEO setup",
      "1 round of revisions",
      "7–10 day delivery",
    ],
    cta: "Get started",
    highlight: false,
    note: "Fixed scope. No CMS.",
  },
  {
    id: "business",
    name: "Business",
    price: "£1,095",
    tagline: "Built to grow.",
    description: "Everything in Essential, plus CMS access so you can keep your site fresh without touching code.",
    Icon: BarChart3,
    features: [
      "Everything in Essential",
      "CMS access (edit your content)",
      "Blog / news section",
      "Editable service pages",
      "Recorded training session",
      "Priority support",
    ],
    cta: "Get started",
    highlight: true,
    note: "Most popular",
  },
  {
    id: "commerce",
    name: "Commerce",
    price: "£1,990+",
    tagline: "Built to sell.",
    description: "For businesses selling products online. Full e-commerce with payments, inventory, and automation.",
    Icon: ShoppingBag,
    features: [
      "Everything in Business",
      "E-commerce setup",
      "Payment integration",
      "Product management",
      "Email confirmations",
      "Ongoing support available",
    ],
    cta: "Discuss your store",
    highlight: false,
    note: "Price varies by scope.",
  },
];

function TierCard({ tier }: { tier: typeof TIERS[0] }) {
  const [hovered, setHovered] = useState(false);
  const [iconVisible, setIconVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { Icon } = tier;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIconVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex flex-col rounded-3xl border-2 p-6 md:p-8 transition-all duration-300 cursor-default
        ${hovered
          ? "border-indigo-600 bg-indigo-600 shadow-2xl shadow-indigo-600/30 -translate-y-1"
          : tier.highlight
            ? "border-indigo-400 dark:border-indigo-500 bg-zinc-50 dark:bg-zinc-900 shadow-xl shadow-indigo-500/15 md:-translate-y-1"
            : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900"
        }`}
    >
      {tier.highlight && !hovered && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 text-white px-4 py-1 text-xs font-bold uppercase tracking-wide shadow-md whitespace-nowrap">
          Most Popular
        </div>
      )}

      {/* Icon */}
      <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-500
        ${iconVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"}
        ${hovered ? "bg-white/20" : "bg-indigo-50 dark:bg-indigo-950/50"}
      `}>
        <Icon className={`h-6 w-6 transition-colors duration-300 ${hovered ? "text-white" : "text-indigo-600 dark:text-indigo-400"}`} />
      </div>

      <div className="mb-5">
        <p className={`text-xs font-bold uppercase tracking-wider mb-1 transition-colors duration-300 ${hovered ? "text-indigo-200" : "text-indigo-600 dark:text-indigo-400"}`}>
          {tier.name}
        </p>
        <p className={`text-4xl font-extrabold mb-1 transition-colors duration-300 ${hovered ? "text-white" : "text-zinc-900 dark:text-zinc-100"}`}>
          {tier.price}
        </p>
        <p className={`text-sm font-semibold mb-3 transition-colors duration-300 ${hovered ? "text-indigo-100" : "text-zinc-500 dark:text-zinc-400"}`}>
          {tier.tagline}
        </p>
        <p className={`text-sm leading-relaxed transition-colors duration-300 ${hovered ? "text-indigo-100" : "text-zinc-500 dark:text-zinc-400"}`}>
          {tier.description}
        </p>
      </div>

      <div className={`h-px w-full mb-5 transition-colors duration-300 ${hovered ? "bg-indigo-500" : "bg-zinc-100 dark:bg-zinc-800"}`} />

      <ul className="flex-1 space-y-3 mb-7">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm">
            <Check className={`h-4 w-4 shrink-0 mt-0.5 transition-colors duration-300 ${hovered ? "text-indigo-200" : "text-indigo-600 dark:text-indigo-400"}`} />
            <span className={`transition-colors duration-300 ${hovered ? "text-indigo-50" : "text-zinc-700 dark:text-zinc-300"}`}>{f}</span>
          </li>
        ))}
      </ul>

      <div className="space-y-2">
        <Link
          href={`/packages/${tier.id}`}
          className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold transition-all duration-300
            ${hovered
              ? "bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg"
              : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/20"
            }`}
        >
          {tier.cta}
          <ArrowRight className="h-4 w-4" />
        </Link>
        {tier.note && (
          <p className={`text-center text-[11px] transition-colors duration-300 ${hovered ? "text-indigo-300" : "text-zinc-400 dark:text-zinc-500"}`}>
            {tier.note}
          </p>
        )}
      </div>
    </div>
  );
}

export function PricingTiers() {
  return (
    <section id="services" className="py-16 md:py-24 bg-zinc-50 dark:bg-zinc-950 transition-colors">
      <div className="mx-auto max-w-6xl px-5 md:px-8">

        <div className="text-center mb-16">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
            Packages & Pricing
          </p>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 md:text-4xl lg:text-5xl mb-4">
            Professional website.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              Live in a week.
            </span>
          </h2>
          <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            Fixed prices. Fixed scope. No surprises. Pick the package that fits, and we&apos;ll have it live before you know it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 md:items-start">
          {TIERS.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>

        {/* Software callout */}
        <Link
          href="/software"
          className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all duration-300"
        >
          <div className="flex-shrink-0 h-14 w-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900 transition-colors duration-300">
            <Cpu className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">Custom Software</p>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">Development is the easy bit.</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Deploying it securely and marketing it correctly — that's where most projects fall apart. That's exactly where we shine.
            </p>
          </div>
          <div className="flex-shrink-0">
            <span className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-700 group-hover:border-indigo-300 dark:group-hover:border-indigo-600 px-5 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all duration-300 whitespace-nowrap">
              See what we build
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </Link>

      </div>
    </section>
  );
}
