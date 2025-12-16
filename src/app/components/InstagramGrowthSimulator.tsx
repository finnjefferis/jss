"use client";

import { useEffect, useState, useRef } from "react";
import { Heart, TrendingUp } from "lucide-react";

type Stage = "gap" | "build" | "report" | string | null;

export function InstagramGrowthSimulator({ stage, children }: { stage: Stage; children?: React.ReactNode }) {
  // --- STATE ---
  const [displayFollowers, setDisplayFollowers] = useState(0);
  const [postsFilled, setPostsFilled] = useState(0);
  const [showReport, setShowReport] = useState(false);

  // Targets (What we want to reach)
  const targetFollowers = useRef(142);
  const targetPosts = useRef(0);

  // Current Animation Values (Float precision for smoothness)
  const currentFollowers = useRef(142);
  const currentPosts = useRef(0);

  // Animation Loop Ref - Fixed TS initialization
  const requestRef = useRef<number | null>(null);

  // --- 1. SET TARGETS BASED ON STAGE ---
  useEffect(() => {
    if (stage === "gap") {
      targetFollowers.current = 0;
      targetPosts.current = 0;
      setShowReport(false);
    } 
    else if (stage === "build") {
      targetFollowers.current = 142; 
      targetPosts.current = 5;
      setShowReport(false);
    } 
    else if (stage === "report") {
      targetFollowers.current = 2850;
      targetPosts.current = 9;
      setShowReport(true);
    }
  }, [stage]);

  // --- 2. THE ANIMATION LOOP (LERP) ---
  const animate = () => {
    // A. Smoothly interpolate Followers
    const diffFollowers = targetFollowers.current - currentFollowers.current;
    
    if (Math.abs(diffFollowers) < 1) {
      currentFollowers.current = targetFollowers.current;
    } else {
      currentFollowers.current += diffFollowers * 0.05;
    }
    setDisplayFollowers(Math.floor(currentFollowers.current));

    // B. Smoothly interpolate Posts
    const diffPosts = targetPosts.current - currentPosts.current;
    if (Math.abs(diffPosts) < 0.1) {
      currentPosts.current = targetPosts.current;
    } else {
      currentPosts.current += diffPosts * 0.08; 
    }
    setPostsFilled(Math.floor(currentPosts.current));

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // --- RENDER ---
  return (
    <div className="relative mx-auto w-full max-w-xs overflow-hidden rounded-[2.5rem] border-[8px] border-zinc-900 bg-white shadow-2xl shadow-indigo-500/20">
      {children && (
         <div className="absolute bottom-4 inset-x-4 z-30 animate-in fade-in slide-in-from-bottom-2 duration-500">
           {children}
         </div>
       )}
      {/* POP-UP REPORT CARD */}
      <div className={`
        absolute inset-0 z-20 flex items-center justify-center bg-black/5 backdrop-blur-[2px] transition-all duration-700
        ${showReport ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
      `}>
        <div className="w-4/5 rounded-xl bg-white p-4 shadow-2xl ring-1 ring-zinc-900/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-zinc-400">Monthly Report</p>
              <p className="text-sm font-bold text-zinc-900">Performance</p>
            </div>
          </div>
          <div className="space-y-2">
             <ReportRow label="Reach" value="+14.2k" />
             <ReportRow label="Engage." value="+850%" />
             <ReportRow label="Leads" value="24" highlight />
          </div>
        </div>
      </div>

      {/* Fake Status Bar */}
      <div className="flex h-6 w-full items-center justify-between px-6 pt-2">
        <div className="h-2 w-12 rounded-full bg-zinc-100"></div>
        <div className="flex gap-1">
          <div className="h-2 w-3 rounded-full bg-zinc-100"></div>
        </div>
      </div>

      {/* Header Profile Area */}
      <div className="mt-4 flex items-center justify-between px-5">
        <div className={`
          relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-sm transition-all duration-700
          ${postsFilled > 0 ? "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-0.5" : "bg-zinc-100"}
        `}>
          <div className="h-full w-full rounded-full bg-zinc-50 relative overflow-hidden flex items-center justify-center" >
             {/* Profile Pic scales in */}
             <div className={`h-full w-full bg-zinc-200 transition-all duration-500 ${postsFilled > 0 ? "scale-100 opacity-100" : "scale-0 opacity-0"}`} />
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-1 justify-around pl-4">
          <StatBox label="Posts" value={postsFilled} />
          <StatBox label="Followers" value={displayFollowers.toLocaleString()} highlight={displayFollowers > 1000} />
          <StatBox label="Following" value="16" />
        </div>
      </div>

      {/* Bio Lines */}
      <div className="mt-4 space-y-1 px-5 text-xs font-medium text-zinc-800 leading-tight min-h-[50px]">
         <div className={`h-2.5 w-32 rounded bg-zinc-100 transition-all duration-500 ${postsFilled > 1 ? "opacity-0 h-0" : "opacity-100"}`} />
         <div className={`h-2.5 w-24 rounded bg-zinc-100 transition-all duration-500 ${postsFilled > 1 ? "opacity-0 h-0" : "opacity-100"}`} />
         
         <div className={`transition-all duration-700 ${postsFilled > 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <p>🚀 Scaling local service biz</p>
            <p>👇 Get the Growth System</p>
         </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-3 flex gap-2 px-5">
        <a 
          href="#contact"
          className={`flex-1 rounded-lg py-2 text-center text-xs font-bold text-white shadow-sm transition-all duration-500 
          ${postsFilled > 0 ? "bg-indigo-600 hover:bg-indigo-700" : "bg-zinc-300 pointer-events-none"}`}
        >
          Learn More
        </a>
        <div className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 py-2 text-center text-xs font-semibold text-zinc-700">
          Message
        </div>
      </div>

      {/* The Grid */}
      <div className="mt-6 grid grid-cols-3 gap-0.5 pb-8">
        {Array.from({ length: 9 }).map((_, i) => (
          <div 
            key={i} 
            className={`
              relative aspect-square w-full transition-all duration-500 overflow-hidden
              ${i < postsFilled ? "bg-zinc-100 scale-100 opacity-100" : "bg-zinc-50 scale-95 opacity-20"}
            `}
          >
            {i < postsFilled && (
              <div className={`
                 absolute inset-0 opacity-80 animate-in zoom-in duration-500
                 ${i % 2 === 0 ? "bg-indigo-100" : "bg-purple-100"}
              `}>
                 <div className="absolute bottom-1 left-1">
                    <Heart className="h-3 w-3 fill-white text-white/50" />
                 </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StatBox({ label, value, highlight }: { label: string, value: string | number, highlight?: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <span className={`text-sm font-bold transition-colors duration-300 ${highlight ? "text-indigo-600 scale-110" : "text-zinc-900"}`}>
        {value}
      </span>
      <span className="text-[10px] text-zinc-500">{label}</span>
    </div>
  );
}

function ReportRow({ label, value, highlight }: { label: string, value: string, highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-zinc-500">{label}</span>
      <span className={`font-semibold ${highlight ? "text-emerald-600" : "text-zinc-900"}`}>{value}</span>
    </div>
  )
}