"use client";

import { useState, useRef, useEffect } from "react";
import { WebsiteTransformSimulator } from "./WebsiteTransformSimulator";

const STEPS = [
  {
    id: "gap",
    title: "1. Audit Your Site",
    text: "I review your current website and find what's costing you customers."
  },
  {
    id: "build",
    title: "2. Design & Build",
    text: "I design a clean, modern site from scratch — fast, mobile-first, built to convert."
  },
  {
    id: "report",
    title: "3. Prove Results",
    text: "You get real data showing how your new website is performing."
  }
];

export function MobileGrowthSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);

  const triggersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    triggersRef.current.forEach((trigger, index) => {
      if (!trigger) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(index);
            }
          });
        },
        {
          rootMargin: "-45% 0px -45% 0px",
          threshold: 0,
        }
      );

      observer.observe(trigger);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const activeStep = STEPS[activeIndex];

  return (
    <div className="lg:hidden relative">

      {/* STICKY STAGE */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* Card at top */}
        <div className="w-full px-4 mb-3 z-20 shrink-0">
          <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-zinc-200/60 dark:border-zinc-700/60 ring-1 ring-zinc-900/5 dark:ring-zinc-700/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm transition-all duration-300">
                {activeStep.title}
              </h3>
              <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest">
                {activeIndex + 1} / 3
              </span>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed min-h-[28px] transition-all duration-300">
              {activeStep.text}
            </p>

            {/* Progress Bar */}
            <div className="mt-2 h-1 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all duration-500 ease-out"
                style={{ width: `${((activeIndex + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="relative z-10 shrink-0">
          <WebsiteTransformSimulator stage={activeStep.id} />
        </div>
      </div>

      {/* INVISIBLE TRIGGERS */}
      <div className="relative -mt-[100vh] z-0">
        {STEPS.map((_, i) => (
          <div
            key={i}
            ref={(el) => { triggersRef.current[i] = el; }}
            className="h-[120vh] w-full pointer-events-none"
          />
        ))}
        <div className="h-[30vh] w-full pointer-events-none" />
      </div>

    </div>
  );
}
