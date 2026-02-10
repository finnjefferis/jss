"use client";

import { useEffect, useState, useRef } from "react";
import { TrendingUp, Zap, Globe, Search } from "lucide-react";

type Stage = "gap" | "build" | "report" | string | null;

export function WebsiteTransformSimulator({ stage, children }: { stage: Stage; children?: React.ReactNode }) {
  const [animProgress, setAnimProgress] = useState(0);
  const requestRef = useRef<number | null>(null);
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);

  useEffect(() => {
    if (stage === "gap") targetProgress.current = 0;
    else if (stage === "build") targetProgress.current = 50;
    else if (stage === "report") targetProgress.current = 100;
  }, [stage]);

  useEffect(() => {
    const animate = () => {
      const diff = targetProgress.current - currentProgress.current;
      if (Math.abs(diff) < 0.5) {
        currentProgress.current = targetProgress.current;
      } else {
        currentProgress.current += diff * 0.04;
      }
      setAnimProgress(currentProgress.current);
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const isGap = animProgress < 25;
  const isBuild = animProgress >= 25 && animProgress < 75;
  const isReport = animProgress >= 75;

  return (
    <div className="relative mx-auto w-full max-w-[20rem]">
      {/* Phone Frame */}
      <div className="relative overflow-hidden rounded-[2.5rem] border-[6px] border-zinc-900 dark:border-zinc-700 bg-zinc-900 dark:bg-zinc-800 shadow-2xl shadow-zinc-900/40 dark:shadow-black/50">

        {/* Notch / Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 w-24 h-6 bg-zinc-900 dark:bg-zinc-700 rounded-b-2xl" />

        {/* Status Bar */}
        <div className="relative bg-zinc-900 dark:bg-zinc-800 px-6 pt-2 pb-1 flex items-end justify-between z-40">
          <span className="text-[9px] font-semibold text-white/70">9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-[2px]">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-[3px] rounded-full bg-white/70" style={{ height: `${i * 2 + 2}px` }} />
              ))}
            </div>
            <div className="h-2.5 w-5 rounded-sm border border-white/70 flex items-center justify-end pr-[1px] ml-1">
              <div className="h-1.5 w-3 rounded-[1px] bg-emerald-400" />
            </div>
          </div>
        </div>

        {/* Safari-style URL bar */}
        <div className="bg-zinc-900 dark:bg-zinc-800 px-3 pb-2">
          <div className="h-7 rounded-xl bg-zinc-800 dark:bg-zinc-700 flex items-center justify-center gap-1.5 px-3">
            {isReport ? (
              <Globe className="h-3 w-3 text-emerald-400 shrink-0" />
            ) : (
              <Search className="h-3 w-3 text-zinc-500 shrink-0" />
            )}
            <span className={`text-[10px] font-medium transition-all duration-500 ${isReport ? "text-white/90" : "text-zinc-500"}`}>
              {isReport ? "yourbusiness.co.uk" : isBuild ? "yourbusiness.co.uk" : "Search or enter website"}
            </span>
          </div>
        </div>

        {/* Screen Content */}
        <div className="relative bg-white dark:bg-zinc-900 min-h-[320px] overflow-hidden">

          {/* ====== STAGE 1: NO WEBSITE ====== */}
          <div className={`absolute inset-0 transition-all duration-700 ${isGap ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <div className="h-16 w-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-5">
                <Globe className="h-8 w-8 text-zinc-300 dark:text-zinc-600" />
              </div>
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-2">
                No website found
              </p>
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 leading-relaxed mb-6">
                Your business isn&apos;t showing up online. Potential customers are finding your competitors instead.
              </p>
              <div className="w-full space-y-2.5">
                <div className="flex items-center gap-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900 px-3 py-2">
                  <div className="h-2 w-2 rounded-full bg-red-400 shrink-0" />
                  <span className="text-[10px] text-red-600 dark:text-red-400 font-medium">No Google presence</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900 px-3 py-2">
                  <div className="h-2 w-2 rounded-full bg-red-400 shrink-0" />
                  <span className="text-[10px] text-red-600 dark:text-red-400 font-medium">Customers can&apos;t find you</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900 px-3 py-2">
                  <div className="h-2 w-2 rounded-full bg-red-400 shrink-0" />
                  <span className="text-[10px] text-red-600 dark:text-red-400 font-medium">Losing work to competitors</span>
                </div>
              </div>
            </div>
          </div>

          {/* ====== STAGE 2: BUILDING ====== */}
          <div className={`absolute inset-0 transition-all duration-700 ${isBuild ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            {/* Wireframe nav */}
            <div className="px-4 py-3 border-b border-dashed border-indigo-200 dark:border-indigo-800">
              <div className="flex items-center justify-between">
                <div className="h-3 w-16 rounded bg-indigo-200 dark:bg-indigo-800" />
                <div className="flex gap-2">
                  <div className="h-2 w-6 bg-indigo-100 dark:bg-indigo-900 rounded" />
                  <div className="h-2 w-6 bg-indigo-100 dark:bg-indigo-900 rounded" />
                  <div className="h-2 w-6 bg-indigo-100 dark:bg-indigo-900 rounded" />
                </div>
              </div>
            </div>

            <div className="p-4">
              {/* Wireframe hero */}
              <div className="border-2 border-dashed border-indigo-200 dark:border-indigo-800 rounded-xl p-5 mb-3">
                <div className="space-y-2 mb-3">
                  <div className="h-3 w-3/4 rounded bg-indigo-200 dark:bg-indigo-800 animate-pulse" />
                  <div className="h-3 w-1/2 rounded bg-indigo-200 dark:bg-indigo-800 animate-pulse" />
                </div>
                <div className="space-y-1.5 mb-3">
                  <div className="h-1.5 w-full rounded bg-indigo-100 dark:bg-indigo-900" />
                  <div className="h-1.5 w-4/5 rounded bg-indigo-100 dark:bg-indigo-900" />
                </div>
                <div className="h-7 w-20 rounded-lg bg-indigo-400 dark:bg-indigo-600 animate-pulse" />
              </div>

              {/* Wireframe cards */}
              <div className="grid grid-cols-2 gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="border border-dashed border-indigo-200 dark:border-indigo-800 rounded-lg p-2.5 animate-pulse" style={{ animationDelay: `${i * 150}ms` }}>
                    <div className="h-6 w-6 rounded bg-indigo-100 dark:bg-indigo-900 mb-1.5" />
                    <div className="h-1.5 w-full rounded bg-indigo-100 dark:bg-indigo-900 mb-1" />
                    <div className="h-1.5 w-3/4 rounded bg-indigo-100 dark:bg-indigo-900" />
                  </div>
                ))}
              </div>
            </div>

            {/* Build progress */}
            <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 p-3">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <p className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300">Building your new site...</p>
              </div>
              <div className="h-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900 overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full animate-pulse" style={{ width: "65%" }} />
              </div>
            </div>
          </div>

          {/* ====== STAGE 3: FINISHED SITE ====== */}
          <div className={`absolute inset-0 transition-all duration-700 ${isReport ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            {/* Modern nav */}
            <div className="px-4 py-2.5 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="h-4 w-4 rounded bg-indigo-600" />
                  <span className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200">YourBrand</span>
                </div>
                <div className="h-5 w-14 bg-indigo-600 rounded-md flex items-center justify-center">
                  <span className="text-[7px] text-white font-bold">Contact</span>
                </div>
              </div>
            </div>

            {/* Modern hero */}
            <div className="p-3">
              <div className="bg-gradient-to-br from-indigo-50 dark:from-indigo-950/40 to-violet-50 dark:to-violet-950/40 rounded-xl p-4 mb-2.5">
                <div className="space-y-1.5 mb-2.5">
                  <div className="h-2.5 w-3/4 rounded bg-zinc-800 dark:bg-zinc-200" />
                  <div className="h-2.5 w-1/2 rounded bg-indigo-600" />
                </div>
                <div className="space-y-1 mb-2.5">
                  <div className="h-1.5 w-full rounded bg-zinc-300 dark:bg-zinc-600" />
                  <div className="h-1.5 w-4/5 rounded bg-zinc-300 dark:bg-zinc-600" />
                </div>
                <div className="h-6 w-16 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <span className="text-[7px] text-white font-bold">Get Started</span>
                </div>
              </div>

              {/* Feature row */}
              <div className="grid grid-cols-3 gap-1.5 mb-2.5">
                {[
                  { color: "bg-indigo-500", label: "Fast" },
                  { color: "bg-violet-500", label: "Modern" },
                  { color: "bg-emerald-500", label: "Converts" },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 p-2 text-center">
                    <div className={`h-4 w-4 mx-auto rounded ${item.color} mb-1`} />
                    <div className="text-[7px] font-bold text-zinc-600 dark:text-zinc-300">{item.label}</div>
                  </div>
                ))}
              </div>

              {/* Testimonial snippet */}
              <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 p-2.5">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-5 w-5 rounded-full bg-indigo-100 dark:bg-indigo-900" />
                  <div className="flex gap-[2px]">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-2 w-2 rounded-full bg-amber-400" />
                    ))}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
                  <div className="h-1.5 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
                </div>
              </div>
            </div>

            {/* Results badge */}
            <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 p-3">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300">Results after launch</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">0.6s</p>
                  <p className="text-[7px] text-emerald-600/70">Load time</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">+400%</p>
                  <p className="text-[7px] text-emerald-600/70">Enquiries</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">#1</p>
                  <p className="text-[7px] text-emerald-600/70">Google local</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Home indicator bar */}
        <div className="bg-zinc-900 dark:bg-zinc-800 py-2 flex justify-center">
          <div className="h-1 w-28 rounded-full bg-white/30" />
        </div>
      </div>

      {/* Children overlay (for mobile swiper card) */}
      {children && (
        <div className="absolute bottom-8 inset-x-2 z-30 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {children}
        </div>
      )}
    </div>
  );
}
