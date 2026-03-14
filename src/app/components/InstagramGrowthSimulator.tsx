"use client";

import { useEffect, useRef, useState } from "react";
import { TrendingUp } from "lucide-react";

type Stage = "gap" | "build" | "report" | string | null;

/** Eased rAF counter — replaces anime.js object animation */
function useAnimatedCounters(stage: Stage) {
  const [followers, setFollowers] = useState(0);
  const [posts, setPosts] = useState(0);

  useEffect(() => {
    let target = { f: 0, p: 0 };
    if (stage === "build") { target = { f: 142, p: 5 }; }
    else if (stage === "report") { target = { f: 2850, p: 9 }; }

    const startF = followers;
    const startP = posts;
    const duration = 1200;
    const start = performance.now();

    let raf: number;
    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      // outExpo easing
      const e = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setFollowers(Math.floor(startF + (target.f - startF) * e));
      setPosts(Math.floor(startP + (target.p - startP) * e));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  return { followers, posts };
}

export function InstagramGrowthSimulator({ stage, children }: { stage: Stage; children?: React.ReactNode }) {
  const { followers, posts } = useAnimatedCounters(stage);
  const [showReport, setShowReport] = useState(false);
  const [reportAnim, setReportAnim] = useState<"enter" | "exit" | "none">("none");
  const prevStage = useRef<Stage>(null);

  useEffect(() => {
    if (stage === "report" && prevStage.current !== "report") {
      setShowReport(true);
      setReportAnim("enter");
    } else if (stage !== "report" && prevStage.current === "report") {
      setReportAnim("exit");
      const t = setTimeout(() => { setShowReport(false); setReportAnim("none"); }, 400);
      prevStage.current = stage;
      return () => clearTimeout(t);
    }
    prevStage.current = stage;
  }, [stage]);

  const hasContent = posts > 0;
  const hasBio = posts > 1;

  return (
    <div className="relative mx-auto w-full max-w-xs overflow-hidden rounded-[2.5rem] border-[8px] border-zinc-900 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 shadow-2xl shadow-coral-500/20">

      {/* Fake Status Bar */}
      <div className="flex h-6 w-full items-center justify-between px-6 pt-2">
        <div className="h-2 w-12 rounded-full bg-zinc-100 dark:bg-zinc-800"></div>
        <div className="flex gap-1">
          <div className="h-2 w-3 rounded-full bg-zinc-100"></div>
        </div>
      </div>

      {/* Header Profile Area */}
      <div className="mt-4 flex items-center justify-between px-5">
        <div className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-sm transition-colors duration-500 ${hasContent ? "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-0.5" : "bg-zinc-100"}`}>
          <div className="h-full w-full rounded-full bg-zinc-50 dark:bg-zinc-800 relative overflow-hidden flex items-center justify-center">
             <div className={`h-full w-full bg-zinc-200 transition-all duration-500 ${hasContent ? "scale-100 opacity-100" : "scale-0 opacity-0"}`} />
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-1 justify-around pl-4">
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{posts}</span>
            <span className="text-[10px] text-zinc-500">Posts</span>
          </div>
          <div className="flex flex-col items-center">
            <span className={`text-sm font-bold transition-colors duration-300 ${followers > 1000 ? "text-coral-600 scale-110" : "text-zinc-900 dark:text-zinc-100"}`}>
              {followers.toLocaleString()}
            </span>
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
         <div className={`transition-all duration-400 ${hasBio ? "opacity-0 h-0" : "opacity-100"}`}>
           <div className="h-2.5 w-32 rounded bg-zinc-100 dark:bg-zinc-800 mb-1" />
           <div className="h-2.5 w-24 rounded bg-zinc-100 dark:bg-zinc-800" />
         </div>
         <div className={`transition-all duration-400 ${hasBio ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <p>Scaling local service businesses</p>
            <p>Get the Growth System</p>
         </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-3 flex gap-2 px-5">
        <a href="#contact" className={`flex-1 rounded-lg py-2 text-center text-xs font-bold text-white shadow-sm transition-colors duration-300 ${hasContent ? "bg-coral-600 hover:bg-coral-700" : "bg-zinc-300 pointer-events-none"}`}>
          Learn More
        </a>
        <div className="flex-1 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 py-2 text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          Message
        </div>
      </div>

      {/* The Grid */}
      <div className="mt-6 grid grid-cols-3 gap-0.5 pb-8">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className={`relative aspect-square w-full overflow-hidden bg-zinc-50 transition-all duration-500 ${i < posts ? "scale-100 opacity-100" : "scale-95 opacity-20"}`}
          >
            {i < posts && (
              <div className={`absolute inset-0 opacity-80 ${i % 2 === 0 ? "bg-coral-100" : "bg-pink-100"}`} />
            )}
          </div>
        ))}
      </div>

      {/* CHILDREN */}
      {children && (
         <div className="absolute bottom-4 inset-x-4 z-30">
           {children}
         </div>
       )}

      {/* POP-UP REPORT CARD */}
      {showReport && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/5 backdrop-blur-[2px]"
          style={{
            animation: reportAnim === "enter"
              ? "report-enter 700ms cubic-bezier(0.16,1,0.3,1) 400ms both"
              : reportAnim === "exit"
              ? "report-exit 400ms cubic-bezier(0.5,0,0.75,0) both"
              : undefined,
          }}
        >
          <div className="w-4/5 mx-auto rounded-xl bg-zinc-50 dark:bg-zinc-900 p-4 shadow-2xl ring-1 ring-zinc-900/5 dark:ring-zinc-700/50">
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
      )}

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
