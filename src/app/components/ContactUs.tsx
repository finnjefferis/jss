"use client";

import { useState, useRef } from "react";
import { Check, Copy, Mail, MessageCircle, ArrowRight } from "lucide-react";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@jefferissoftware.co.uk");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative mb-24 overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50/50 px-6 py-12 md:px-12 md:py-16">
      
      {/* Background Decor (Subtle Glow) */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-indigo-50 blur-3xl opacity-60 mix-blend-multiply" />
      
      <div className="relative mx-auto flex max-w-5xl flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
        
        {/* LEFT: The "Pitch" & Reassurance */}
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Accepting new projects for {new Date().toLocaleString('default', { month: 'long' })}
            </div>
            
            <h3 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
              Let's clear the chaos.
            </h3>
            <p className="mt-4 text-base text-zinc-600 max-w-lg mx-auto lg:mx-0">
              You don't need another generic agency. You need a partner who speaks your language. 
              Send me a message and let's see if we're a good fit.
            </p>
          </div>

          {/* "What happens next" List - Removes Anxiety */}
          <div className="flex flex-col gap-3 items-center lg:items-start">
             <StepItem text="1. We chat briefly about your goals (No pressure)." />
             <StepItem text="2. I give you a fixed-price proposal." />
             <StepItem text="3. We build it, launch it, and grow it." />
          </div>
        </div>


        {/* RIGHT: The Interaction Card */}
        <div className="w-full max-w-md flex-1">
          <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl shadow-indigo-500/5 md:p-8">
            
            {/* Header */}
            <div className="mb-6 flex items-center gap-4 border-b border-zinc-100 pb-6">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-zinc-100 border border-zinc-200">
                 {/* Placeholder for your face - highly recommended to add a real image later */}
                 <div className="h-full w-full flex items-center justify-center bg-indigo-100 text-indigo-600 font-bold text-lg">
                    FJ
                 </div>
                 {/* <Image src="/finn-face.jpg" alt="Finn" width={48} height={48} /> */}
              </div>
              <div>
                <p className="font-bold text-zinc-900">Finn Jefferis</p>
                <p className="text-xs text-zinc-500">Developer & Lead Strategist</p>
              </div>
            </div>

            {/* Primary Action (WhatsApp) */}
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">Fastest Response</p>
              <a
                href="https://wa.me/447887034503?text=Hi%20Finn%2C%20I%27d%20like%20to%20discuss%20a%20project."
                className="group relative flex w-full items-center justify-center gap-3 rounded-xl bg-indigo-600 px-6 py-4 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Chat on WhatsApp</span>
                <ArrowRight className="h-4 w-4 opacity-0 -ml-4 transition-all group-hover:opacity-100 group-hover:ml-0" />
              </a>
              <p className="text-center text-[10px] text-zinc-400">
                Typical reply time: &lt; 2 hours
              </p>
            </div>

            {/* Secondary Action (Email Copy) */}
            <div className="mt-6 pt-6 border-t border-zinc-100">
               <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-400">Email Me</p>
               <div className="flex items-center gap-2">
                 <a 
                   href="mailto:hello@jefferissoftware.co.uk"
                   className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm font-medium text-zinc-700 hover:border-indigo-200 hover:text-indigo-700 transition-colors truncate"
                 >
                   hello@jefferissoftware.co.uk
                 </a>
                 <button 
                   onClick={handleCopyEmail}
                   className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-500 transition-all hover:border-indigo-200 hover:text-indigo-600 active:scale-95"
                   aria-label="Copy email address"
                 >
                   {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                 </button>
               </div>
               {copied && (
                  <p className="mt-2 text-center text-[10px] text-emerald-600 animate-in fade-in slide-in-from-top-1">
                    Email copied to clipboard!
                  </p>
               )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

function StepItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-zinc-600">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
        <Check className="h-3.5 w-3.5" />
      </div>
      <span>{text}</span>
    </div>
  );
}