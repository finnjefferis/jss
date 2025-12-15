"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";
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
    text: "We fill your profile with high-quality content that builds trust instantly." 
  },
  { 
    id: "report", 
    title: "3. Prove Results", 
    text: "You get monthly reports showing real leads, not just vanity metrics." 
  }
];

export function MobileGrowthSwiper() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const activeStep = STEPS[index];

  // Touch state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const next = () => {
    setIndex((i) => (i + 1) % STEPS.length);
    if (index === 0) setHasInteracted(true);
  }
  const prev = () => {
    setIndex((i) => (i - 1 + STEPS.length) % STEPS.length);
    setHasInteracted(true);
  }

  // Auto-play Loop
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      next();
    }, 4000); 
    return () => clearInterval(timer);
  }, [index, isPaused]);

  // --- SWIPE HANDLERS ---
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setHasInteracted(true);
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) {
      setTimeout(() => setIsPaused(false), 2000);
      return;
    }

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      next(); 
    } else if (distance < -minSwipeDistance) {
      prev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
    
    setTimeout(() => setIsPaused(false), 5000);
  };

  return (
    <div className="lg:hidden px-4 mb-20 w-full flex justify-center">
      <div 
        className="relative w-full max-w-[20rem] touch-pan-y select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        
        {/* The Simulator */}
        <InstagramGrowthSimulator stage={activeStep.id}>
          
          {/* THE OVERLAY CARD */}
          <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-zinc-200/60 ring-1 ring-zinc-900/5 relative z-30">
            <h3 className="font-bold text-zinc-900 text-sm">{activeStep.title}</h3>
            <p className="text-xs text-zinc-600 mt-1 leading-relaxed min-h-[40px]">{activeStep.text}</p>
            
            {/* Controls */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-200/50">
               {/* Dots */}
               <div className="flex gap-1.5">
                 {STEPS.map((_, i) => (
                   <div 
                     key={i} 
                     className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-6 bg-indigo-600" : "w-1.5 bg-zinc-300"}`} 
                   />
                 ))}
               </div>
               
               {/* Manual Next Button */}
               <button 
                 onClick={(e) => { 
                   e.stopPropagation(); 
                   setIsPaused(true);
                   setHasInteracted(true);
                   next(); 
                 }}
                 className="text-xs font-bold text-indigo-600 flex items-center gap-0.5 active:opacity-50"
               >
                 Next <ChevronRight className="h-3 w-3" />
               </button>
            </div>
          </div>

        </InstagramGrowthSimulator>

        {/* === SWIPE CUE (Purple Center) === */}
        {index === 0 && !hasInteracted && (
           <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none animate-in fade-in duration-1000 delay-500">
             {/* The Circle */}
             <div className="bg-indigo-600/90 backdrop-blur-sm p-4 rounded-full shadow-2xl ring-4 ring-indigo-200/50 animate-pulse">
                 <ChevronRight className="h-8 w-8 text-white stroke-[3px]" />
             </div>
           </div>
        )}
        
      </div>
    </div>
  );
}