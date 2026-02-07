"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  
  // Refs for the invisible triggers
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
              if (index > 0) setHasStarted(true);
            }
          });
        },
        {
          // This margin creates a "sweet spot" line across the center of the screen.
          // The trigger only activates when it crosses this center line.
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
    // PARENT: Holds the height for the scroll duration
    <div className="lg:hidden relative">
      
      <style>{`
        @keyframes gentle-bounce-vertical {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>

      {/* 1. THE STICKY STAGE (Visuals) */}
      {/* This stays pinned to the screen while you scroll through the container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        <div className="relative w-full max-w-[20rem] px-4">
           <InstagramGrowthSimulator stage={activeStep.id}>
             {/* CARD OVERLAY */}
             <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-zinc-200/60 dark:border-zinc-700/60 ring-1 ring-zinc-900/5 dark:ring-zinc-700/50 relative z-30 mx-2 mb-4 transition-all duration-300">
                <div className="flex items-center justify-between mb-1">
                   <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm transition-all duration-300">
                     {activeStep.title}
                   </h3>
                   <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest">
                     {activeIndex + 1} / 3
                   </span>
                </div>
                
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed min-h-[40px] transition-all duration-300">
                  {activeStep.text}
                </p>
                
                {/* Progress Bar */}
                <div className="mt-3 h-1 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 transition-all duration-500 ease-out"
                    style={{ width: `${((activeIndex + 1) / STEPS.length) * 100}%` }}
                  />
                </div>
              </div>
           </InstagramGrowthSimulator>

           {/* SCROLL CUE (Fades out after start) */}
           <div 
              className={`
                absolute inset-0 z-40 flex flex-col items-center justify-center transition-opacity duration-500 pointer-events-none
                ${!hasStarted && activeIndex === 0 ? "opacity-100" : "opacity-0"}
              `}
            >
               <div 
                 className="flex flex-col items-center"
                 style={{ animation: 'gentle-bounce-vertical 2s infinite ease-in-out' }}
               >
                 <div className="bg-indigo-600 p-3 rounded-full shadow-xl ring-4 ring-white/50 mb-3">
                     <ChevronDown className="h-6 w-6 text-white stroke-[3px]" />
                 </div>
                 <div className="bg-white/95 px-4 py-1.5 rounded-full shadow-md border border-indigo-100 backdrop-blur-sm">
                    <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
                        Scroll to grow
                    </p>
                 </div>
               </div>
            </div>
        </div>
      </div>

      {/* 2. THE INVISIBLE TRIGGERS (Scroll Track) */}
      {/* These sit "underneath" the sticky visual. As you scroll past them, they trigger the changes. */}
      <div className="relative -mt-[100vh] z-0">
        {STEPS.map((_, i) => (
          <div
            key={i}
            ref={(el) => { triggersRef.current[i] = el; }} // Fixed ref assignment
            className="h-[120vh] w-full pointer-events-none" // 120vh per step for more deliberate scrolling
          />
        ))}
        {/* Extra space at bottom to allow scrolling past the final step smoothly */}
        <div className="h-[30vh] w-full pointer-events-none" />
      </div>

    </div>
  );
}