"use client";

import { useState, useEffect, useRef } from "react";
import { ScanEye, Link, TrendingUp, ArrowUpRight, ArrowDown } from "lucide-react";
import { InstagramGrowthSimulator } from "./InstagramGrowthSimulator"; 

const CARDS = [
  {
    id: "gap",
    icon: ScanEye,
    title: "1. I spot the gaps",
    description: "I review your current setup to see where you are losing customers. Whether it's a slow site, zero Google presence, or a confusing booking process, I find the leak.",
    proof: {
      label: "Local Electrician",
      metricName: "Google Maps Views",
      before: "34",
      after: "890",
      change: "+2,500%",
      color: "text-emerald-600",
    },
  },
  {
    id: "build",
    icon: Link,
    title: "2. I build the connection",
    description: "I build you a bespoke Growth System—a fast website + active social media—that connects your real-world quality to online customers.",
    proof: {
      label: "HR Consultant",
      metricName: "Site Load Speed",
      before: "6s",
      after: "0.6s",
      change: "10x Faster",
      color: "text-emerald-600",
    },
  },
  {
    id: "report",
    icon: TrendingUp,
    title: "3. I prove the results",
    description: "You don't just pay a fee and hope for the best. Every month, you get a clear report showing exactly how your new system is performing.",
    proof: {
      label: "Car Valeting",
      metricName: "Monthly Enquiries",
      before: "2",
      after: "14",
      change: "+600%",
      color: "text-emerald-600",
    },
  },
];

export function ValueProposition() {
  const [activeId, setActiveId] = useState<string>("gap");

  return (
    <section className="relative py-16 md:py-24 bg-white" id="process">
      <div className="pointer-events-none absolute -left-48 top-40 h-96 w-96 rounded-full bg-indigo-50/80 blur-3xl mix-blend-multiply opacity-70" />
      
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-8 lg:px-12 relative z-10">
        
        {/* FIX: Changed grid-cols-2 to explicit 40% / 60% split */}
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 lg:gap-0 items-start">
          
          {/* === LEFT COLUMN (Visual) === */}
          <div className="hidden lg:flex sticky top-0 h-screen self-start flex-col justify-center items-center lg:items-center lg:pl-8">
            <div className="relative w-full max-w-[26rem] lg:max-w-[28rem]">
               <div className="absolute -right-4 top-10 z-20 hidden xl:block animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                  <div className="rounded-xl border border-white/50 bg-white/80 p-4 shadow-xl backdrop-blur-md">
                     <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Total Reach</p>
                     <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-zinc-900">+14k</span>
                        <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                     </div>
                  </div>
               </div>
               <InstagramGrowthSimulator stage={activeId} />
               <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-indigo-100 to-purple-50 blur-2xl rounded-full opacity-60 transform scale-110" />
            </div>
          </div>

          <div className="block lg:hidden mb-8">
             <div className="flex justify-center">
               <div className="w-full max-w-[20rem]">
                 <InstagramGrowthSimulator stage={activeId} />
               </div>
             </div>
          </div>

          {/* === RIGHT COLUMN (Content) === */}
          <div className="flex flex-col justify-center items-start lg:pl-10 relative z-20">
            <div className="mb-12 w-full pt-10 lg:pt-20">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-600">
                The Process
              </p>
              <h2 className="mb-6 text-3xl font-bold leading-tight text-zinc-900 md:text-5xl lg:text-6xl">
                Expert at your trade? <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                  Let's tell the world.
                </span>
              </h2>
              <p className="text-base text-zinc-600 md:text-lg leading-relaxed max-w-xl">
                You do fantastic work, but you're invisible to local customers. 
                I fix the three broken parts of your digital engine so you can stop chasing leads and start choosing them.
              </p>
            </div>
            
            <div className="w-full max-w-2xl pb-24">
              {CARDS.map((card) => (
                <ValueCard 
                  key={card.id} 
                  card={card} 
                  isActive={activeId === card.id} 
                  setActiveId={setActiveId}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-0 flex justify-center lg:justify-end lg:pr-32">
          <a href="#pricing" className="flex flex-col items-center gap-2 text-indigo-600/80 hover:text-indigo-700 transition cursor-pointer group">
             <span className="text-[10px] font-semibold uppercase tracking-widest">See pricing</span>
             <ArrowDown className="h-5 w-5 animate-bounce text-indigo-600 group-hover:translate-y-1 transition" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ValueCard({ 
  card, 
  isActive, 
  setActiveId 
}: { 
  card: typeof CARDS[0]; 
  isActive: boolean;
  setActiveId: (id: string) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = card.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(card.id);
          }
        });
      },
      { 
        rootMargin: "-25% 0px -25% 0px", 
        threshold: 0.2
      }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [card.id, setActiveId]);

  return (
    <div
      ref={cardRef}
      className={`min-h-[50vh] flex items-center p-4 lg:p-8 transition-all duration-700 ease-in-out
        ${isActive ? "opacity-100 translate-x-0" : "opacity-40 translate-x-4 grayscale"}
      `}
    >
      <div 
        onMouseEnter={() => setActiveId(card.id)}
        className={`
          w-full rounded-3xl border p-8 shadow-xl transition-all duration-500 bg-white
          ${isActive ? "border-indigo-100 ring-1 ring-indigo-50" : "border-transparent shadow-none"}
        `}
      >
        <div className="flex flex-col gap-6">
          <div 
            className={`
              inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-300
              ${isActive ? "bg-indigo-600 text-white" : "bg-zinc-100 text-zinc-400"}
            `}
          >
            <Icon className="h-7 w-7" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-zinc-900 mb-3">{card.title}</h3>
            <p className="text-base leading-relaxed text-zinc-600">
              {card.description}
            </p>
          </div>

          <div className={`
             mt-2 flex items-center justify-between border-t border-dashed pt-4
             ${isActive ? "border-indigo-200" : "border-zinc-200"}
          `}>
             <div>
               <span className="text-[10px] uppercase text-zinc-400 font-bold tracking-wider">Metric</span>
               <p className="font-semibold text-zinc-700 text-sm">{card.proof.metricName}</p>
             </div>
             <div className="text-right">
                <span className={`block text-xl font-bold ${isActive ? card.proof.color : "text-zinc-400"}`}>
                   {card.proof.change}
                </span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}