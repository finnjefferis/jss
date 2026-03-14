"use client";

import Link from "next/link";
import { Check, ArrowRight, Zap, BarChart3, ShoppingBag, Cpu } from "lucide-react";
import { useState, useEffect, useRef } from "react";

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return mobile;
}

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
  const [mobileFocused, setMobileFocused] = useState(false);
  const [iconVisible, setIconVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
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

  // Mobile: light up card when centered in viewport
  useEffect(() => {
    if (!isMobile) { setMobileFocused(false); return; }
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setMobileFocused(entry.isIntersecting),
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile]);

  const active = hovered || mobileFocused;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex flex-col rounded-3xl border-2 p-6 md:p-8 transition-all duration-300 cursor-default
        ${active
          ? "border-rose-600 bg-rose-600 shadow-2xl shadow-rose-600/30 -translate-y-1"
          : tier.highlight
            ? "border-rose-400 dark:border-rose-500 bg-zinc-50 dark:bg-zinc-900 shadow-xl shadow-rose-500/15 md:-translate-y-1"
            : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900"
        }`}
    >
      {tier.highlight && !active && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-rose-600 text-white px-4 py-1 text-xs font-bold uppercase tracking-wide shadow-md whitespace-nowrap">
          Most Popular
        </div>
      )}

      {/* Icon */}
      <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-500
        ${iconVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"}
        ${active ? "bg-white/20" : "bg-rose-50 dark:bg-rose-950/50"}
      `}>
        <Icon className={`h-6 w-6 transition-colors duration-300 ${active ? "text-white" : "text-rose-600 dark:text-rose-400"}`} />
      </div>

      <div className="mb-5">
        <p className={`text-xs font-bold uppercase tracking-wider mb-1 transition-colors duration-300 ${active ? "text-rose-200" : "text-rose-600 dark:text-rose-400"}`}>
          {tier.name}
        </p>
        <p className={`text-4xl font-extrabold mb-1 transition-colors duration-300 ${active ? "text-white" : "text-zinc-900 dark:text-zinc-100"}`}>
          {tier.price}
        </p>
        <p className={`text-sm font-semibold mb-3 transition-colors duration-300 ${active ? "text-rose-100" : "text-zinc-500 dark:text-zinc-400"}`}>
          {tier.tagline}
        </p>
        <p className={`text-sm leading-relaxed transition-colors duration-300 ${active ? "text-rose-100" : "text-zinc-500 dark:text-zinc-400"}`}>
          {tier.description}
        </p>
      </div>

      <div className={`h-px w-full mb-5 transition-colors duration-300 ${active ? "bg-rose-500" : "bg-zinc-100 dark:bg-zinc-800"}`} />

      <ul className="flex-1 space-y-3 mb-7">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm">
            <Check className={`h-4 w-4 shrink-0 mt-0.5 transition-colors duration-300 ${active ? "text-rose-200" : "text-rose-600 dark:text-rose-400"}`} />
            <span className={`transition-colors duration-300 ${active ? "text-rose-50" : "text-zinc-700 dark:text-zinc-300"}`}>{f}</span>
          </li>
        ))}
      </ul>

      <div className="space-y-2">
        <Link
          href={`/packages/${tier.id}`}
          className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold transition-all duration-300
            ${active
              ? "bg-white text-rose-600 hover:bg-rose-50 shadow-lg"
              : "bg-rose-600 text-white hover:bg-rose-700 shadow-md shadow-rose-600/20"
            }`}
        >
          {tier.cta}
          <ArrowRight className="h-4 w-4" />
        </Link>
        {tier.note && (
          <p className={`text-center text-[11px] transition-colors duration-300 ${active ? "text-rose-300" : "text-zinc-400 dark:text-zinc-500"}`}>
            {tier.note}
          </p>
        )}
      </div>
    </div>
  );
}

function SoftwareCallout() {
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) { setFocused(false); return; }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFocused(entry.isIntersecting),
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <Link
      ref={ref}
      href="/software"
      className={`group rounded-2xl border bg-zinc-50 dark:bg-zinc-900 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 hover:border-rose-300 dark:hover:border-rose-700 hover:shadow-md transition-all duration-300 ${
        focused
          ? "border-rose-400 dark:border-rose-500 shadow-md shadow-rose-500/10"
          : "border-zinc-200 dark:border-zinc-800"
      }`}
    >
      <div className={`flex-shrink-0 h-14 w-14 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
        focused ? "bg-rose-100 dark:bg-rose-900" : "bg-rose-50 dark:bg-rose-950"
      } group-hover:bg-rose-100 dark:group-hover:bg-rose-900`}>
        <Cpu className="h-7 w-7 text-rose-600 dark:text-rose-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">Custom Software</p>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">Development is the easy bit.</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Deploying it securely and marketing it correctly — that&apos;s where most projects fall apart. That&apos;s exactly where we shine.
        </p>
      </div>
      <div className="flex-shrink-0">
        <span className={`inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition-all duration-300 whitespace-nowrap group-hover:border-rose-300 dark:group-hover:border-rose-600 group-hover:text-rose-600 dark:group-hover:text-rose-400 ${
          focused
            ? "border-rose-300 dark:border-rose-600 text-rose-600 dark:text-rose-400"
            : "border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300"
        }`}>
          See what we build
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">
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
        <SoftwareCallout />

      </div>
    </section>
  );
}
