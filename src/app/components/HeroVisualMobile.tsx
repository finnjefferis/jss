"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react"; // Changed to Down arrow
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollCue, setShowScrollCue] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalHeight = rect.height;

      // Calculate progress: 0 when top enters view, 1 when bottom leaves view
      // We want to track specifically when the sticky element is "active"
      
      // How far have we scrolled INTO the container?
      const scrolledDistance = -rect.top;
      // The scrollable distance effectively available for switching steps
      const effectiveScrollHeight = totalHeight - viewportHeight;

      if (effectiveScrollHeight <= 0) return;

      // Normalize between 0 and 1
      let progress = scrolledDistance / effectiveScrollHeight;
      progress = Math.max(0, Math.min(1, progress));

      // Map progress to steps (0 to 2)
      // 0.00 - 0.33 -> Step 0
      // 0.33 - 0.66 -> Step 1
      // 0.66 - 1.00 -> Step 2
      const newIndex = Math.floor(progress * STEPS.length);
      const boundedIndex = Math.min(STEPS.length - 1, Math.max(0, newIndex));

      setActiveIndex(boundedIndex);
      
      // Hide the cue once they start scrolling deep into it
      if (progress > 0.05) {
        setShowScrollCue(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeStep = STEPS[activeIndex];

  return (
    // 1. OUTER TRACK: 300vh height ensures we have "space" to scroll through 3 steps
    // The negative margin accounts for spacing in your parent layout if needed
    <div ref={containerRef} className="relative h-[300vh] -mt-20 mb-20">
      
      <style>{`
        @keyframes gentle-bounce-vertical {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>

      {/* 2. STICKY CONTAINER: Locks to the screen center while parent scrolls */}
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        
        {/* The Phone visual wrapper */}
        <div className="relative w-full max-w-[20rem]">
          
          <InstagramGrowthSimulator stage={activeStep.id}>
            
            {/* CONTENT CARD */}
            <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-zinc-200/60 ring-1 ring-zinc-900/5 relative z-30 mx-2 mb-4 transition-all duration-300">
              <div className="flex items-center justify-between mb-1">
                 <h3 className="font-bold text-zinc-900 text-sm transition-all duration-300">{activeStep.title}</h3>
                 <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest">{activeIndex + 1} / 3</span>
              </div>
              
              <p className="text-xs text-zinc-600 leading-relaxed min-h-[40px] transition-all duration-300">
                {activeStep.text}
              </p>
              
              {/* Progress Bar instead of dots for Scrollytelling feel */}
              <div className="mt-3 h-1 w-full rounded-full bg-zinc-100 overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-500 ease-out"
                  style={{ width: `${((activeIndex + 1) / STEPS.length) * 100}%` }}
                />
              </div>
            </div>

          </InstagramGrowthSimulator>

          {/* SCROLL CUE OVERLAY */}
          {/* Fades out once user starts scrolling */}
          <div 
            className={`
              absolute inset-0 z-40 flex flex-col items-center justify-center transition-opacity duration-500 pointer-events-none
              ${showScrollCue ? "opacity-100" : "opacity-0"}
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
    </div>
  );
}