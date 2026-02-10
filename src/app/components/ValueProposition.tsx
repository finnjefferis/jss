"use client";

import { useState, useEffect, useRef } from "react";
import { ScanEye, Paintbrush, TrendingUp } from "lucide-react";
import { WebsiteTransformSimulator } from "./WebsiteTransformSimulator";
import { MobileGrowthSwiper } from "./HeroVisualMobile";

const CARDS = [
  {
    id: "gap",
    icon: ScanEye,
    title: "1. I audit your site",
    description: "I review your current website and find exactly what's costing you customers — slow load times, confusing layout, no mobile experience, or missing calls to action.",
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
    id: "build",
    icon: Paintbrush,
    title: "2. I design & build",
    description: "I design a clean, modern site from scratch — no templates, no page builders. Fast, mobile-first, and built to actually convert visitors into enquiries.",
    proof: {
      label: "eDivert",
      metricName: "Bounce Rate",
      before: "78%",
      after: "32%",
      change: "-59%",
      color: "text-emerald-600",
    },
  },
  {
    id: "report",
    icon: TrendingUp,
    title: "3. I prove the results",
    description: "You don't just get a pretty site and a wave goodbye. You get real data showing how your new website is performing — traffic, enquiries, speed, and rankings.",
    proof: {
      label: "Naxco Services",
      metricName: "Monthly Enquiries",
      before: "2",
      after: "14",
      change: "+600%",
      color: "text-emerald-600",
    },
  },
];

export function ValueProposition() {
  const [activeId, setActiveId] = useState<string>("gap");

  return (
    <section className="relative py-16 md:py-24 bg-white dark:bg-zinc-950 transition-colors" id="process">
      <div className="pointer-events-none absolute -left-48 top-40 h-96 w-96 rounded-full bg-indigo-50/80 dark:bg-indigo-950/40 blur-3xl mix-blend-multiply dark:mix-blend-normal opacity-70" />
      
      <div className="mx-auto w-full max-w-[1440px] px-2 md:px-8 lg:px-12 relative z-10">
        
        {/* GRID: 40% Left / 60% Right (Desktop Only Structure) */}
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-4 lg:gap-0 items-start">
          

          {/* === LEFT COLUMN (Visual - Desktop Sticky) === */}
          <div className="hidden lg:flex sticky top-0 h-screen self-start flex-col justify-center items-center lg:items-end lg:pr-24">
            <div className="relative w-full max-w-[26rem] lg:max-w-[28rem]">
               <WebsiteTransformSimulator stage={activeId} />
               <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-indigo-100 dark:from-indigo-950 to-purple-50 dark:to-purple-950 blur-2xl rounded-full opacity-60 transform scale-110" />
            </div>
          </div>

          {/* === MOBILE SWIPER (Replaces Visual + Cards on Mobile) === */}
          <div className="block lg:hidden -mt-4">
             <MobileGrowthSwiper />
          </div>

          {/* === RIGHT COLUMN (Content - Desktop Scroll) === */}
          {/* Hidden on mobile because the swiper handles the content now */}
          <div className="hidden lg:flex flex-col justify-center items-start lg:pl-0 relative z-20">
            
            {/* DESKTOP HEADER (Sticky) */}
            <div className="mb-12 w-full pt-10 lg:pt-20 sticky top-0 z-30 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm pb-8 transition-all">
              <SectionHeader />
              
              {/* Optional: A subtle gradient fade at the bottom of the sticky header */}
              <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-b from-white dark:from-zinc-950 to-transparent translate-y-full pointer-events-none" />
            </div>
            
            <div className="w-full max-w-2xl pb-[20vh]">
              {CARDS.map((card) => (
                <ValueCard 
                  key={card.id} 
                  card={card} 
                  isActive={activeId === card.id} 
                  setActiveId={setActiveId}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// Reusable Header Component
function SectionHeader() {
  return (
    <>
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-600">
        The Process
      </p>
      <h2 className="mb-6 text-3xl font-bold leading-tight text-zinc-900 dark:text-zinc-100 md:text-5xl lg:text-6xl">
        Expert at your trade? <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
          Let's tell the world.
        </span>
      </h2>
      <p className="text-base text-zinc-600 dark:text-zinc-400 md:text-lg leading-relaxed max-w-xl">
        You do fantastic work, but you're invisible to local customers. 
        I fix the broken parts of your digital engine so you can stop chasing leads and start choosing them.
      </p>
    </>
  );
}

function ValueCard({ 
  card, 
  isActive, 
  setActiveId 
}: { 
  card: typeof CARDS[0]; 
  isActive: boolean;
  setActiveId: (id: string) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = card.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(card.id);
          }
        });
      },
      { 
        rootMargin: "-25% 0px -25% 0px", 
        threshold: 0.2
      }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [card.id, setActiveId]);

  return (
    <div
      ref={cardRef}
      className={`min-h-[90vh] flex items-center p-4 lg:p-8 transition-all duration-700 ease-in-out
        ${isActive ? "opacity-100 translate-x-0" : "opacity-40 translate-x-4 grayscale"}
      `}
    >
      <div 
        onMouseEnter={() => setActiveId(card.id)}
        className={`
          w-full rounded-3xl border p-8 shadow-xl transition-all duration-500 bg-white dark:bg-zinc-900
          ${isActive ? "border-indigo-100 dark:border-indigo-900 ring-1 ring-indigo-50 dark:ring-indigo-950" : "border-transparent shadow-none"}
        `}
      >
        <div className="flex flex-col gap-6">
          <div 
            className={`
              inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-300
              ${isActive ? "bg-indigo-600 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400"}
            `}
          >
            <Icon className="h-7 w-7" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">{card.title}</h3>
            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {card.description}
            </p>
          </div>

          <div className={`
             mt-2 flex items-center justify-between border-t border-dashed pt-4
             ${isActive ? "border-indigo-200 dark:border-indigo-800" : "border-zinc-200 dark:border-zinc-700"}
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
    </div>
  );
}