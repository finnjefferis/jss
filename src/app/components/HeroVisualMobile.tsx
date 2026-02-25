"use client";

import { useState, useRef, useEffect } from "react";
import { WebsiteTransformSimulator } from "./WebsiteTransformSimulator";

const STEPS = [
  {
    id: "gap",
    title: "Find the gaps.",
    text: "We audit your site and find what's costing you customers.",
    step: "01",
  },
  {
    id: "build",
    title: "Build it right.",
    text: "Clean, fast, mobile-first. Designed to convert.",
    step: "02",
  },
  {
    id: "report",
    title: "Prove it works.",
    text: "Real data. More traffic, more enquiries, more growth.",
    step: "03",
  },
];

export function MobileGrowthSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);

  const triggersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const triggers = triggersRef.current;
      if (!triggers[0]) return;

      const viewportCenter = window.innerHeight / 2;

      // Find which trigger's center is closest to viewport center
      let targetIndex = 0;
      let closestDist = Infinity;

      triggers.forEach((trigger, i) => {
        if (!trigger) return;
        const rect = trigger.getBoundingClientRect();
        const triggerCenter = rect.top + rect.height / 2;
        const dist = Math.abs(triggerCenter - viewportCenter);
        if (dist < closestDist) {
          closestDist = dist;
          targetIndex = i;
        }
      });

      // Only advance/retreat by 1 step at a time — never skip stages
      setActiveIndex((prev) => {
        if (targetIndex > prev) return prev + 1;
        if (targetIndex < prev) return prev - 1;
        return prev;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeStep = STEPS[activeIndex];

  return (
    <div className="lg:hidden relative">

      {/* STICKY STAGE */}
      <div className="sticky top-0 h-[100svh] flex flex-col items-center pt-6 overflow-hidden">

        {/* Card at top */}
        <div className="w-full px-4 mb-4 z-20 shrink-0">
          <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-zinc-200/60 dark:border-zinc-700/60 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
                {activeStep.step}
              </span>
              <div className="flex gap-1">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${i <= activeIndex ? "w-6 bg-indigo-600" : "w-3 bg-zinc-200 dark:bg-zinc-700"}`}
                  />
                ))}
              </div>
            </div>

            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg leading-tight transition-all duration-300">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                {activeStep.title}
              </span>
            </h3>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1 min-h-[48px] transition-all duration-300">
              {activeStep.text}
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="relative z-10">
          <WebsiteTransformSimulator stage={activeStep.id} />

          {/* Swipe down indicator — hangs off bottom of phone */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-30 animate-bounce pointer-events-none">
            <div className="flex items-center gap-2 bg-indigo-600 rounded-full px-5 py-2.5 shadow-xl shadow-indigo-600/40">
              <span className="text-xs font-bold uppercase tracking-wider text-white">Scroll</span>
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* INVISIBLE TRIGGERS */}
      <div className="relative -mt-[100svh] z-0">
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
