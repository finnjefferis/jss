"use client";

import { ScanEye, Link, TrendingUp, ArrowDown, ArrowUpRight } from "lucide-react";

export function ValueProposition() {
  return (
    <section className="mb-20">
      {/* Header */}
      <div className="text-center md:text-left mb-12">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-indigo-600 mb-3">
          The Missing Link
        </p>
        <h2 className="text-3xl font-bold text-zinc-900 md:text-4xl leading-tight">
          You're an expert at your trade. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500 animate-pulse">
            But the internet doesn't know it yet.
          </span>
        </h2>
        <p className="mt-5 max-w-2xl text-base text-zinc-600 leading-relaxed">
          You do fantastic work, but you are missing out on the entire digital world. 
          I analyze where you are invisible, build the systems to get you seen, and make the connection painless.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        
        {/* CARD 1: IDENTIFY (Proof: Google Maps Views) */}
        <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-indigo-100">
          <div className="relative z-10 flex h-full flex-col transition-transform duration-500 group-hover:-translate-y-2">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
              <ScanEye className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900">1. I spot the gaps</h3>
            <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
              I review your current setup to see where you are losing customers. Whether it's a slow site, zero Google presence, or a confusing booking process, I find the leak.
            </p>
            
            {/* THE PROOF (Hidden on desktop initially, revealed on hover) */}
            <div className="mt-6 pt-4 border-t border-dashed border-zinc-200 opacity-100 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 delay-75">
               <p className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400 mb-2">Real Result</p>
               <div className="flex items-center gap-3">
                 <div className="flex flex-col">
                    <span className="text-xs text-zinc-500">Local Electrician</span>
                    <span className="text-2xl font-bold text-zinc-900">34 <span className="text-zinc-400 text-sm font-normal">→</span> 890</span>
                 </div>
                 <div className="ml-auto text-right">
                    <span className="block text-[10px] text-zinc-400">Google Maps Views</span>
                    <span className="text-xs font-bold text-emerald-600 flex items-center justify-end gap-1">
                      +2,500% <ArrowUpRight className="h-3 w-3" />
                    </span>
                 </div>
               </div>
            </div>
          </div>
          
          {/* Subtle background gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-50/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        {/* CARD 2: BUILD (Proof: Page Speed) */}
        <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-indigo-100">
          <div className="relative z-10 flex h-full flex-col transition-transform duration-500 group-hover:-translate-y-2">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
              <Link className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900">2. I build the connection</h3>
            <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
              I build you a bespoke <strong>Growth System</strong>—a fast website + active social media—that connects your real-world quality to online customers. 
            </p>

             {/* THE PROOF */}
             <div className="mt-6 pt-4 border-t border-dashed border-zinc-200 opacity-100 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 delay-100">
               <p className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400 mb-2">Real Result</p>
               <div className="flex items-center gap-3">
                 <div className="flex flex-col">
                    <span className="text-xs text-zinc-500">HR Consultant</span>
                    <span className="text-2xl font-bold text-zinc-900">6s <span className="text-zinc-400 text-sm font-normal">→</span> 0.6s</span>
                 </div>
                 <div className="ml-auto text-right">
                    <span className="block text-[10px] text-zinc-400">Site Load Speed</span>
                    <span className="text-xs font-bold text-emerald-600 flex items-center justify-end gap-1">
                      10x Faster <ArrowUpRight className="h-3 w-3" />
                    </span>
                 </div>
               </div>
            </div>
          </div>
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-50/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        {/* CARD 3: REPORT (Proof: Leads) */}
        <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-indigo-100">
          <div className="relative z-10 flex h-full flex-col transition-transform duration-500 group-hover:-translate-y-2">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900">3. I prove the results</h3>
            <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
              You don't just pay a fee and hope for the best. Every month, you get a clear report showing exactly how your new system is performing and where your leads came from.
            </p>

             {/* THE PROOF */}
             <div className="mt-6 pt-4 border-t border-dashed border-zinc-200 opacity-100 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 delay-150">
               <p className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400 mb-2">Real Result</p>
               <div className="flex items-center gap-3">
                 <div className="flex flex-col">
                    <span className="text-xs text-zinc-500">Car Valeting</span>
                    <span className="text-2xl font-bold text-zinc-900">2 <span className="text-zinc-400 text-sm font-normal">→</span> 14</span>
                 </div>
                 <div className="ml-auto text-right">
                    <span className="block text-[10px] text-zinc-400">Monthly Enquiries</span>
                    <span className="text-xs font-bold text-emerald-600 flex items-center justify-end gap-1">
                      +600% <ArrowUpRight className="h-3 w-3" />
                    </span>
                 </div>
               </div>
            </div>
          </div>
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-50/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      </div>

      {/* Visual Connector to Pricing - Purple Bouncy Arrow */}
      <div className="mt-10 flex justify-center">
        <div className="flex flex-col items-center gap-2 text-indigo-600/80">
           <span className="text-[10px] font-semibold uppercase tracking-widest">See the plans</span>
           <ArrowDown className="h-5 w-5 animate-bounce text-indigo-600" />
        </div>
      </div>
    </section>
  );
}