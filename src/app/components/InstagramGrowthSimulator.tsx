"use client";

import { useEffect, useRef } from "react";
import { TrendingUp } from "lucide-react";
import { animate } from "animejs";

type Stage = "gap" | "build" | "report" | string | null;

export function InstagramGrowthSimulator({ stage, children }: { stage: Stage; children?: React.ReactNode }) {
  const counters = useRef({ followers: 0, posts: 0 });
  const followerElRef = useRef<HTMLSpanElement>(null);
  const postElRef = useRef<HTMLSpanElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const bioPlaceholderRef = useRef<HTMLDivElement>(null);
  const profileRingRef = useRef<HTMLDivElement>(null);
  const profileInnerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const prevStage = useRef<Stage>(null);

  useEffect(() => {
    let targetFollowers = 0;
    let targetPosts = 0;
    let showReport = false;

    if (stage === "gap") {
      targetFollowers = 0;
      targetPosts = 0;
    } else if (stage === "build") {
      targetFollowers = 142;
      targetPosts = 5;
    } else if (stage === "report") {
      targetFollowers = 2850;
      targetPosts = 9;
      showReport = true;
    }

    // Animate counters — direct DOM writes, no setState
    animate(counters.current, {
      followers: targetFollowers,
      posts: targetPosts,
      duration: 1200,
      ease: "outExpo",
      onUpdate: () => {
        const f = Math.floor(counters.current.followers);
        const p = Math.floor(counters.current.posts);

        if (followerElRef.current) {
          followerElRef.current.textContent = f.toLocaleString();
          followerElRef.current.className = `text-sm font-bold ${f > 1000 ? "text-rose-600 scale-110" : "text-zinc-900 dark:text-zinc-100"}`;
        }
        if (postElRef.current) {
          postElRef.current.textContent = String(p);
        }

        // Update grid cells
        if (gridRef.current) {
          const cells = gridRef.current.children;
          for (let i = 0; i < cells.length; i++) {
            const cell = cells[i] as HTMLElement;
            if (i < p) {
              cell.classList.remove("scale-95", "opacity-20");
              cell.classList.add("scale-100", "opacity-100");
              if (!cell.querySelector(".grid-fill")) {
                const fill = document.createElement("div");
                fill.className = `grid-fill absolute inset-0 opacity-80 ${i % 2 === 0 ? "bg-rose-100" : "bg-pink-100"}`;
                cell.appendChild(fill);
              }
            } else {
              cell.classList.remove("scale-100", "opacity-100");
              cell.classList.add("scale-95", "opacity-20");
              const fill = cell.querySelector(".grid-fill");
              if (fill) fill.remove();
            }
          }
        }

        // Profile ring
        if (profileRingRef.current) {
          profileRingRef.current.className = `relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-sm ${p > 0 ? "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-0.5" : "bg-zinc-100"}`;
        }
        if (profileInnerRef.current) {
          profileInnerRef.current.className = `h-full w-full bg-zinc-200 ${p > 0 ? "scale-100 opacity-100" : "scale-0 opacity-0"}`;
        }

        // Bio swap
        if (bioPlaceholderRef.current) {
          bioPlaceholderRef.current.style.opacity = p > 1 ? "0" : "1";
          bioPlaceholderRef.current.style.height = p > 1 ? "0" : "";
        }
        if (bioRef.current) {
          bioRef.current.style.opacity = p > 1 ? "1" : "0";
          bioRef.current.style.transform = p > 1 ? "translateY(0)" : "translateY(16px)";
        }

        // CTA button
        if (ctaRef.current) {
          ctaRef.current.className = `flex-1 rounded-lg py-2 text-center text-xs font-bold text-white shadow-sm ${p > 0 ? "bg-rose-600 hover:bg-rose-700" : "bg-zinc-300 pointer-events-none"}`;
        }
      },
    });

    // Report card
    if (showReport && reportRef.current) {
      reportRef.current.style.display = "flex";
      animate(reportRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 700,
        ease: "outExpo",
        delay: 400,
      });
    } else if (reportRef.current && prevStage.current === "report") {
      animate(reportRef.current, {
        opacity: [1, 0],
        translateY: [0, 20],
        duration: 400,
        ease: "inQuart",
        onComplete: () => {
          if (reportRef.current) reportRef.current.style.display = "none";
        },
      });
    }

    prevStage.current = stage;
  }, [stage]);

  return (
    <div className="relative mx-auto w-full max-w-xs overflow-hidden rounded-[2.5rem] border-[8px] border-zinc-900 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 shadow-2xl shadow-rose-500/20">

      {/* Fake Status Bar */}
      <div className="flex h-6 w-full items-center justify-between px-6 pt-2">
        <div className="h-2 w-12 rounded-full bg-zinc-100 dark:bg-zinc-800"></div>
        <div className="flex gap-1">
          <div className="h-2 w-3 rounded-full bg-zinc-100"></div>
        </div>
      </div>

      {/* Header Profile Area */}
      <div className="mt-4 flex items-center justify-between px-5">
        <div ref={profileRingRef} className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-sm bg-zinc-100">
          <div className="h-full w-full rounded-full bg-zinc-50 dark:bg-zinc-800 relative overflow-hidden flex items-center justify-center">
             <div ref={profileInnerRef} className="h-full w-full bg-zinc-200 scale-0 opacity-0" />
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-1 justify-around pl-4">
          <div className="flex flex-col items-center">
            <span ref={postElRef} className="text-sm font-bold text-zinc-900 dark:text-zinc-100">0</span>
            <span className="text-[10px] text-zinc-500">Posts</span>
          </div>
          <div className="flex flex-col items-center">
            <span ref={followerElRef} className="text-sm font-bold text-zinc-900 dark:text-zinc-100">0</span>
            <span className="text-[10px] text-zinc-500">Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">16</span>
            <span className="text-[10px] text-zinc-500">Following</span>
          </div>
        </div>
      </div>

      {/* Bio Lines */}
      <div className="mt-4 space-y-1 px-5 text-xs font-medium text-zinc-800 dark:text-zinc-200 leading-tight min-h-[50px]">
         <div ref={bioPlaceholderRef}>
           <div className="h-2.5 w-32 rounded bg-zinc-100 dark:bg-zinc-800 mb-1" />
           <div className="h-2.5 w-24 rounded bg-zinc-100 dark:bg-zinc-800" />
         </div>
         <div ref={bioRef} style={{ opacity: 0, transform: "translateY(16px)", transition: "none" }}>
            <p>Scaling local service businesses</p>
            <p>Get the Growth System</p>
         </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-3 flex gap-2 px-5">
        <a ref={ctaRef} href="#contact" className="flex-1 rounded-lg py-2 text-center text-xs font-bold text-white shadow-sm bg-zinc-300 pointer-events-none">
          Learn More
        </a>
        <div className="flex-1 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 py-2 text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          Message
        </div>
      </div>

      {/* The Grid */}
      <div ref={gridRef} className="mt-6 grid grid-cols-3 gap-0.5 pb-8">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="relative aspect-square w-full overflow-hidden bg-zinc-50 scale-95 opacity-20" />
        ))}
      </div>

      {/* CHILDREN */}
      {children && (
         <div className="absolute bottom-4 inset-x-4 z-30">
           {children}
         </div>
       )}

      {/* POP-UP REPORT CARD */}
      <div
        ref={reportRef}
        className="absolute inset-0 z-50 items-center justify-center bg-black/5 backdrop-blur-[2px]"
        style={{ opacity: 0, display: "none" }}
      >
        <div className="w-4/5 mx-auto mt-[40%] rounded-xl bg-zinc-50 dark:bg-zinc-900 p-4 shadow-2xl ring-1 ring-zinc-900/5 dark:ring-zinc-700/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-zinc-400">Monthly Report</p>
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Performance</p>
            </div>
          </div>
          <div className="space-y-2">
             <ReportRow label="Reach" value="+14.2k" />
             <ReportRow label="Engage." value="+850%" />
             <ReportRow label="Leads" value="24" highlight />
          </div>
        </div>
      </div>

    </div>
  );
}

function ReportRow({ label, value, highlight }: { label: string, value: string, highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-zinc-500">{label}</span>
      <span className={`font-semibold ${highlight ? "text-emerald-600" : "text-zinc-900 dark:text-zinc-100"}`}>{value}</span>
    </div>
  )
}
