"use client";

import { useState, useEffect, useRef } from "react";
import { Globe, Search, BarChart3, Activity, Code2 } from "lucide-react";
import { useReveal } from "../hooks/useReveal";
import { WebsiteTransformSimulator } from "./WebsiteTransformSimulator";
import { MobileGrowthSwiper } from "./HeroVisualMobile";

const CARDS = [
  {
    id: "site",
    icon: Globe,
    step: "01",
    title: "Websites that work.",
    description: "Clean, modern, built from scratch. No templates, no page builders. Fast, mobile-first, and designed to actually convert visitors into enquiries.",
    proof: {
      label: "Naxco Services",
      metricName: "Page Load Time",
      before: "8.2s",
      after: "0.6s",
      change: "14x Faster",
      color: "text-emerald-600",
    },
  },
  {
    id: "seo",
    icon: Search,
    step: "02",
    title: "Get found first.",
    description: "Dominate local search with technical SEO, content strategy, and Google Business optimisation. Page one, position one.",
    proof: {
      label: "Naxco Services",
      metricName: "Organic Traffic",
      before: "120/mo",
      after: "1,400/mo",
      change: "+1,067%",
      color: "text-emerald-600",
    },
  },
  {
    id: "marketing",
    icon: BarChart3,
    step: "03",
    title: "Reach the right people.",
    description: "Targeted campaigns across social and paid channels that actually drive leads. Strategy, content, and reporting — all handled.",
    proof: {
      label: "eDivert",
      metricName: "Cost Per Lead",
      before: "\u00a342",
      after: "\u00a39",
      change: "-78%",
      color: "text-emerald-600",
    },
  },
  {
    id: "monitoring",
    icon: Activity,
    step: "04",
    title: "Always watching.",
    description: "24/7 uptime monitoring, performance alerts, and instant incident response. Know about problems before your customers do.",
    proof: {
      label: "Client Average",
      metricName: "Uptime",
      before: "96.2%",
      after: "99.98%",
      change: "99.98%",
      color: "text-emerald-600",
    },
  },
  {
    id: "software",
    icon: Code2,
    step: "05",
    title: "Built just for you.",
    description: "Bespoke tools, dashboards, and applications tailored to how your business actually runs. No off-the-shelf compromises.",
    proof: {
      label: "Client Average",
      metricName: "Manual Work Saved",
      before: "20hrs/wk",
      after: "2hrs/wk",
      change: "-90%",
      color: "text-emerald-600",
    },
  },
];

export function ValueProposition() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useReveal<HTMLDivElement>(0.3);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const refs = cardRefs.current;
        if (!refs[0]) { ticking = false; return; }

        const viewportCenter = window.innerHeight / 2;

        let targetIndex = 0;
        let closestDist = Infinity;

        refs.forEach((ref, i) => {
          if (!ref) return;
          const rect = ref.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          const dist = Math.abs(center - viewportCenter);
          if (dist < closestDist) {
            closestDist = dist;
            targetIndex = i;
          }
        });

        setActiveIndex((prev) => {
          if (targetIndex > prev) return prev + 1;
          if (targetIndex < prev) return prev - 1;
          return prev;
        });
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeId = CARDS[activeIndex].id;

  return (
    <section className="relative py-16 md:py-24 bg-zinc-50 dark:bg-zinc-950 transition-colors" id="process">
      <div className="pointer-events-none absolute -left-48 top-40 h-96 w-96 rounded-full bg-coral-50/60 dark:bg-coral-950/40 blur-2xl opacity-70" />

      <div className="mx-auto w-full max-w-[1440px] px-2 md:px-8 lg:px-12 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-4 lg:gap-0 items-start">

          {/* === LEFT COLUMN (Visual - Desktop Sticky) === */}
          <div className="hidden lg:flex sticky top-0 h-screen self-start flex-col justify-center items-center lg:items-end lg:pr-8">
            <div className="relative w-full max-w-[26rem] lg:max-w-[28rem]">
               <WebsiteTransformSimulator stage={activeId} />
               <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-coral-100 dark:from-coral-950 to-pink-50 dark:to-pink-950 blur-2xl rounded-full opacity-60 transform scale-110" />
            </div>
          </div>

          {/* === MOBILE SWIPER === */}
          <div className="block lg:hidden -mt-4">
             <MobileGrowthSwiper />
          </div>

          {/* === RIGHT COLUMN (Content - Desktop Scroll) === */}
          <div className="hidden lg:flex flex-col justify-center items-center lg:pl-0 relative z-20">

            {/* DESKTOP HEADER (Sticky) */}
            <div ref={headerRef} className="mb-12 w-full max-w-2xl pt-10 lg:pt-20 sticky top-0 z-30 bg-zinc-50 dark:bg-zinc-950 pb-8 transition-colors">
              <SectionHeader />
              <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-b from-white dark:from-zinc-950 to-transparent translate-y-full pointer-events-none" />
            </div>

            <div className="w-full max-w-2xl pb-[20vh]">
              {CARDS.map((card, i) => (
                <div
                  key={card.id}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className={`min-h-[90vh] flex items-center p-4 lg:p-8 transition-all duration-300
                    ${activeIndex === i ? "opacity-100 translate-x-0" : "opacity-20 translate-x-2 pointer-events-none"}
                  `}
                >
                  <ValueCard card={card} isActive={activeIndex === i} />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function SectionHeader() {
  return (
    <>
      <p data-reveal style={{ "--d": 0 } as React.CSSProperties} className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-amber-600">
        What We Do
      </p>
      <h2 data-reveal style={{ "--d": 80 } as React.CSSProperties} className="mb-6 text-3xl font-bold leading-tight text-zinc-900 dark:text-zinc-100 md:text-5xl lg:text-6xl">
        Your complete{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-600 to-pink-600 inline-block" data-gradient style={{ "--gd": 300 } as React.CSSProperties}>
          digital partner.
        </span>
      </h2>
      <p data-reveal style={{ "--d": 160 } as React.CSSProperties} className="text-base text-zinc-600 dark:text-zinc-400 md:text-lg leading-relaxed max-w-xl">
        Sites, SEO, marketing, monitoring, and bespoke software. Everything your business needs to thrive online.
      </p>
    </>
  );
}

function ValueCard({ card, isActive }: { card: typeof CARDS[0]; isActive: boolean }) {
  const Icon = card.icon;

  return (
    <div
      className={`
        w-full rounded-3xl border p-8 shadow-xl transition-all duration-300 bg-zinc-50 dark:bg-zinc-900
        ${isActive ? "border-coral-100 dark:border-coral-900 ring-1 ring-coral-50 dark:ring-coral-950" : "border-transparent shadow-none"}
      `}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div
            className={`
              inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-300
              ${isActive ? "bg-coral-600 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400"}
            `}
          >
            <Icon className="h-7 w-7" />
          </div>
          <span className="text-xs font-bold text-coral-600 dark:text-coral-400 tabular-nums">{card.step}</span>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-600 to-pink-600">
              {card.title}
            </span>
          </h3>
          <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {card.description}
          </p>
        </div>

        <div className={`
           mt-2 flex items-center justify-between border-t border-dashed pt-4
           ${isActive ? "border-coral-200 dark:border-coral-800" : "border-zinc-200 dark:border-zinc-700"}
        `}>
           <div>
             <span className="text-[10px] uppercase text-zinc-400 font-bold tracking-wider">Metric</span>
             <p className="font-semibold text-zinc-700 dark:text-zinc-300 text-sm">{card.proof.metricName}</p>
           </div>
           <div className="text-right">
              <span className={`block text-xl font-bold ${isActive ? card.proof.color : "text-zinc-400"}`}>
                 {card.proof.change}
              </span>
           </div>
        </div>
      </div>
    </div>
  );
}
