"use client";

import { useState, useEffect, useRef } from "react";
import { ScanEye, Link, TrendingUp, ArrowDown, ArrowUpRight } from "lucide-react";

const CARDS = [
  {
    id: "gap",
    icon: ScanEye,
    title: "1. I spot the gaps",
    description: "I review your current setup to see where you are losing customers. Whether it's a slow site, zero Google presence, or a confusing booking process, I find the leak.",
    proof: {
      label: "Local Electrician",
      metricName: "Google Maps Views",
      before: "34",
      after: "890",
      change: "+2,500%",
      color: "text-emerald-600",
    },
  },
  {
    id: "build",
    icon: Link,
    title: "2. I build the connection",
    description: "I build you a bespoke Growth System—a fast website + active social media—that connects your real-world quality to online customers.",
    proof: {
      label: "HR Consultant",
      metricName: "Site Load Speed",
      before: "6s",
      after: "0.6s",
      change: "10x Faster",
      color: "text-emerald-600",
    },
  },
  {
    id: "report",
    icon: TrendingUp,
    title: "3. I prove the results",
    description: "You don't just pay a fee and hope for the best. Every month, you get a clear report showing exactly how your new system is performing.",
    proof: {
      label: "Car Valeting",
      metricName: "Monthly Enquiries",
      before: "2",
      after: "14",
      change: "+600%",
      color: "text-emerald-600",
    },
  },
];

export function ValueProposition() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="mb-20">
      {/* Header */}
      <div className="text-center md:text-left mb-12">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-indigo-600 mb-3">
          The Missing Link
        </p>
        <h2 className="text-3xl font-bold text-zinc-900 md:text-4xl leading-tight">
          You're an expert at your trade. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500 animate-pulse">
            But the internet doesn't know it yet.
          </span>
        </h2>
        <p className="mt-5 max-w-2xl text-base text-zinc-600 leading-relaxed">
          You do fantastic work, but you are missing out on the entire digital world. 
          I analyze where you are invisible, build the systems to get you seen, and make the connection painless.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {CARDS.map((card) => (
          <ValueCard 
            key={card.id} 
            card={card} 
            isActive={activeId === card.id} 
            setActiveId={setActiveId}
          />
        ))}
      </div>

      {/* Visual Connector to Pricing */}
      <div className="mt-10 flex justify-center">
        <div className="flex flex-col items-center gap-2 text-indigo-600/80">
           <span className="text-[10px] font-semibold uppercase tracking-widest">See the plans</span>
           <ArrowDown className="h-5 w-5 animate-bounce text-indigo-600" />
        </div>
      </div>
    </section>
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
    // 1. Mobile check
    const isMobile = window.matchMedia("(hover: none)").matches;
    if (!isMobile) return;

    // 2. The "Center Line" Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(card.id);
          }
        });
      },
      { 
        // KEY CHANGE: This creates a narrow band in the middle of the screen (from 45% to 55%).
        // The card MUST touch this middle band to trigger.
        // This ensures strictly one card is active at a time, even when scrolling fast.
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0 
      }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [card.id, setActiveId]);

  return (
    <div
      ref={cardRef}
      className={`
        group relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all duration-500
        
        /* DESKTOP HOVER */
        md:hover:shadow-xl md:hover:border-indigo-100 md:hover:-translate-y-1

        /* MOBILE ACTIVE */
        ${isActive ? "shadow-xl border-indigo-100 -translate-y-1" : "border-zinc-200"}
      `}
    >
      <div className="relative z-10 flex h-full flex-col">
        {/* Icon */}
        <div 
          className={`
            mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-colors
            
            /* Desktop Hover */
            md:group-hover:bg-indigo-600 md:group-hover:text-white

            /* Mobile Active */
            ${isActive ? "bg-indigo-600 text-white" : ""}
          `}
        >
          <Icon className="h-6 w-6" />
        </div>

        <h3 className="text-lg font-bold text-zinc-900">{card.title}</h3>
        <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
          {card.description}
        </p>

        {/* THE PROOF */}
        <div 
          className={`
            mt-6 pt-4 border-t border-dashed border-zinc-200 transition-all duration-500 delay-75
            
            /* Desktop Logic */
            md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0

            /* Mobile Logic */
            ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 md:opacity-0"}
          `}
        >
          <p className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400 mb-2">Real Result</p>
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-xs text-zinc-500">{card.proof.label}</span>
              <span className="text-2xl font-bold text-zinc-900">
                {card.proof.before} <span className="text-zinc-400 text-sm font-normal">→</span> {card.proof.after}
              </span>
            </div>
            <div className="ml-auto text-right">
              <span className="block text-[10px] text-zinc-400">{card.proof.metricName}</span>
              <span className={`text-xs font-bold flex items-center justify-end gap-1 ${card.proof.color}`}>
                {card.proof.change} <ArrowUpRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle background gradient */}
      <div 
        className={`
          absolute inset-0 bg-gradient-to-b from-transparent to-indigo-50/50 transition-opacity duration-500
          
          /* Desktop Hover */
          md:opacity-0 md:group-hover:opacity-100

          /* Mobile Active */
          ${isActive ? "opacity-100" : "opacity-0"}
        `} 
      />
    </div>
  );
}