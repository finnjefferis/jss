"use client";

import { useState, useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { InstagramGrowthSimulator } from "./InstagramGrowthSimulator";

const STEPS = [
  { 
    id: "gap", 
    title: "1. Spot the Gaps", 
    text: "I audit your current setup to see exactly where you're losing customers." 
  },
  { 
    id: "build", 
    title: "2. Build Connection", 
    text: "We fill your profile with high-quality content that builds trust immediately." 
  },
  { 
    id: "report", 
    title: "3. Prove Results", 
    text: "You get monthly reports showing real leads, not just vanity metrics." 
  }
];

export function MobileGrowthSwiper() {
  const [index, setIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  
  const activeStep = STEPS[index];

  // Touch state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const startInteraction = () => {
    setHasStarted(true);
  };

  const next = () => {
    if (!hasStarted) {
      startInteraction();
      return;
    }
    setIndex((i) => (i + 1) % STEPS.length);
  }

  const prev = () => {
    if (!hasStarted) return;
    setIndex((i) => (i - 1 + STEPS.length) % STEPS.length);
  }

  // --- SWIPE HANDLERS ---
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      next(); 
    } else if (distance < -minSwipeDistance) {
      prev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="lg:hidden px-4 mb-20 w-full flex justify-center">
      {/* FIX: Use a standard style tag instead of 'jsx'. 
        This prevents Next.js from adding random class names that cause hydration errors.
      */}
      <style>{`
        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>

      <div 
        className="relative w-full max-w-[20rem] touch-pan-y select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={!hasStarted ? startInteraction : undefined}
      >
        
        {/* The Simulator */}
        <InstagramGrowthSimulator stage={activeStep.id}>
          
          {/* === CONTENT CARD (Hidden initially) === */}
          <div className={`
             bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-zinc-200/60 ring-1 ring-zinc-900/5 relative z-30 mx-2 mb-4 transition-all duration-500
             ${hasStarted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
          `}>
            <h3 className="font-bold text-zinc-900 text-sm">{activeStep.title}</h3>
            <p className="text-xs text-zinc-600 mt-1 leading-relaxed min-h-[40px]">{activeStep.text}</p>
            
            {/* Controls */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-200/50">
               <div className="flex gap-1.5">
                 {STEPS.map((_, i) => (
                   <div 
                     key={i} 
                     className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-6 bg-indigo-600" : "w-1.5 bg-zinc-300"}`} 
                   />
                 ))}
               </div>
               
               <div className="flex items-center gap-3">
                 <button 
                   onClick={(e) => { e.stopPropagation(); prev(); }}
                   className="text-zinc-400 hover:text-zinc-600 active:scale-95 transition p-1"
                 >
                   <ChevronLeft className="h-4 w-4" />
                 </button>
                 <button 
                   onClick={(e) => { e.stopPropagation(); next(); }}
                   className="text-indigo-600 font-bold text-xs flex items-center gap-0.5 active:scale-95 transition"
                 >
                   Next <ChevronRight className="h-3 w-3" />
                 </button>
               </div>
            </div>
          </div>

        </InstagramGrowthSimulator>

        {/* === INTRO CUE (Floating, no full background) === */}
        <div 
          className={`
            absolute inset-0 z-40 flex flex-col items-center justify-center transition-all duration-500
            ${!hasStarted ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
           {/* Bouncing Container - using inline style for animation to avoid class mismatches */}
           <div 
             className="flex flex-col items-center cursor-pointer"
             style={{ animation: 'gentle-bounce 2s infinite ease-in-out' }}
           >
             
             {/* Icon Circle */}
             <div className="bg-indigo-600 p-3 rounded-full shadow-xl ring-4 ring-white/50 mb-3">
                 <ChevronRight className="h-6 w-6 text-white stroke-[3px]" />
             </div>
             
             {/* Text Pill (White background to ensure contrast against simulator, Purple Text) */}
             <div className="bg-white/95 px-4 py-1.5 rounded-full shadow-md border border-indigo-100 backdrop-blur-sm">
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
                    Swipe to grow
                </p>
             </div>
             
           </div>
        </div>
        
      </div>
    </div>
  );
}