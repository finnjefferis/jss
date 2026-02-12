"use client";

import { useState, useEffect, useRef } from "react";
import { CheckCircle2, Megaphone, Monitor, Cpu, ArrowRight } from "lucide-react";

const PILLARS = [
  {
    id: "social",
    title: "Social & Ads",
    description: "Stop shouting into the void. We create a professional online presence that drives real eyes to your business.",
    icon: Megaphone,
    theme: {
      border: "border-pink-500",
      shadow: "shadow-pink-500/15",
      iconBg: "bg-pink-50",
      iconText: "text-pink-600",
      check: "text-pink-500",
      buttonActive: "bg-pink-50 text-pink-600 border-pink-200",
    },
    features: [
      "Professional Brand Presence",
      "Targeted Ad Campaigns",
      "Monthly Growth Reports",
      "Content Strategy Suggestions",
    ],
    cta: "Hi Finn, I need help with my Socials and Ads.",
    buttonText: "Start Growing",
  },
  {
    id: "web",
    popular: true,
    title: "Bespoke Websites",
    description: "High-quality, creative sites designed to elevate your brand. No templates, just fast, responsive code.",
    icon: Monitor,
    theme: {
      border: "border-indigo-600",
      shadow: "shadow-indigo-500/15",
      iconBg: "bg-indigo-50",
      iconText: "text-indigo-600",
      check: "text-indigo-600",
      buttonActive: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
    features: [
      "Bespoke Design",
      "Lightning Fast Loading",
      "Mobile-First Architecture",
      "SEO Optimized Structure",
    ],
    cta: "Hi Finn, I'm looking for a new Bespoke Website.",
    buttonText: "Get a Proposal",
  },
  {
    id: "software",
    title: "Custom Software",
    description: "Solve complex problems. We build integrations and tools that save you time and automate your workflow.",
    icon: Cpu,
    theme: {
      border: "border-sky-500",
      shadow: "shadow-sky-500/15",
      iconBg: "bg-sky-50",
      iconText: "text-sky-600",
      check: "text-sky-500",
      buttonActive: "bg-sky-50 text-sky-600 border-sky-200",
    },
    features: [
      "CRM & API Integrations",
      "AI & Automation Tools",
      "Custom Booking Systems",
      "Secured via Microsoft Azure",
    ],
    cta: "Hi Finn, I have a Custom Software project in mind.",
    buttonText: "Discuss Project",
  },
];

export function PricingTiers() {
  // 'web' is default for Desktop. null is passed to start logic, but logic falls back to 'web'.
  // We track strictly what is being interacted with.
  const [activeId, setActiveId] = useState<string | null>(null);

  // The effective ID is either what is hovered/scrolled, OR 'web' as a fallback
  const effectiveId = activeId || "web";

  return (
    <section className="py-12 md:py-24 ">
      <div className="mb-16 space-y-4 text-center">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 md:text-4xl">
          Three ways I build your business.
        </h2>
        <p className="mx-auto max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
          I don't just "fix computers." I provide the three pillars every modern business needs to survive: 
          Traffic, Presence, and Efficiency.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 md:items-stretch lg:gap-8">
        {PILLARS.map((pillar) => (
          <PillarCard 
            key={pillar.id} 
            pillar={pillar} 
            isActive={effectiveId === pillar.id}
            setActiveId={setActiveId}
          />
        ))}
      </div>
    </section>
  );
}

function PillarCard({ 
  pillar, 
  isActive, 
  setActiveId 
}: { 
  pillar: typeof PILLARS[0]; 
  isActive: boolean;
  setActiveId: (id: string | null) => void;
}) {
  const Icon = pillar.icon;
  const t = pillar.theme;
  const cardRef = useRef<HTMLDivElement>(null);

  // MOBILE SCROLL DETECTION
  useEffect(() => {
    // 1. Check if device supports hover (Desktop). 
    // If it DOES support hover, we abort this logic to prevent scroll hijacking the mouse.
    const isMobile = window.matchMedia("(hover: none)").matches;
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If 60% of the card is visible, make it active
          if (entry.isIntersecting) {
            setActiveId(pillar.id);
          }
        });
      },
      { 
        threshold: 0.6, // Trigger when 60% visible
        rootMargin: "-10% 0px -10% 0px" // Slight buffer
      } 
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [pillar.id, setActiveId]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setActiveId(pillar.id)}
      onMouseLeave={() => setActiveId(null)} // Reverts to "web" via parent logic
      className={`
        group relative flex flex-col rounded-3xl border-2 p-8 
        transition-all duration-300 ease-out 
        ${isActive ? `-translate-y-2 shadow-xl ${t.border} ${t.shadow}` : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50"}
        bg-white dark:bg-zinc-900
      `}
    >
      {/* Popular Badge */}
      {pillar.popular && (
        <div className={`
          absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm transition-opacity duration-300
          ${isActive ? "opacity-100 bg-indigo-600" : "opacity-0"}
        `}>
          Most Popular
        </div>
      )}

      {/* Icon */}
      <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300 ${t.iconBg} ${t.iconText}`}>
        <Icon className="h-6 w-6" />
      </div>

      {/* Header */}
      <div className="mb-4">
        <h3 className={`text-xl font-bold transition-colors duration-300 ${isActive ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-700 dark:text-zinc-300"}`}>
          {pillar.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {pillar.description}
        </p>
      </div>

      <div className="my-6 h-px w-full bg-zinc-100 dark:bg-zinc-800" />

      {/* Features List */}
      <ul className="mb-8 flex-1 space-y-4 text-sm text-zinc-700 dark:text-zinc-300">
        {pillar.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <CheckCircle2 className={`h-5 w-5 shrink-0 transition-colors duration-300 ${isActive ? t.check : "text-zinc-300 dark:text-zinc-600"}`} />
            <span className={isActive ? "text-zinc-700 dark:text-zinc-300" : "text-zinc-500 dark:text-zinc-500"}>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <a
        href={`https://wa.me/447887034503?text=${encodeURIComponent(pillar.cta)}`}
        className={`
          relative flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3.5 
          text-center text-sm font-semibold transition-all duration-300
          ${isActive ? t.buttonActive : "bg-white dark:bg-zinc-900 text-zinc-500 border-zinc-200 dark:border-zinc-700"}
        `}
      >
        <span>{pillar.buttonText}</span>
        <ArrowRight className={`h-4 w-4 transition-transform ${isActive ? "group-hover:translate-x-1" : ""}`} />
      </a>
    </div>
  );
}