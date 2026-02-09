"use client";

import { useState } from "react";
import { Check, Copy, MessageCircle, ArrowRight, Mail } from "lucide-react";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@jefferissoftware.co.uk");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-20 md:py-28 bg-white dark:bg-zinc-950 overflow-hidden transition-colors">

      {/* Background Decor */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[90%] bg-gradient-to-b from-indigo-50/60 dark:from-indigo-950/30 to-transparent blur-3xl opacity-60" />

      <div className="mx-auto max-w-6xl px-5 md:px-8 relative z-10 flex flex-col items-center">

        {/* === TOP ROW: WIDE TEXT === */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
            Ready to start?
          </p>

          <h2 className="text-4xl font-bold leading-tight text-zinc-900 dark:text-zinc-100 md:text-6xl lg:text-7xl mb-6">
            Stop chasing leads. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              Start growing.
            </span>
          </h2>

          <p className="text-base md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-10 max-w-2xl mx-auto">
            Build systems that bring you work while you sleep.
          </p>

          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-10">
             <StepPill text="1. Quick Chat" />
             <StepPill text="2. Fixed Proposal" />
             <StepPill text="3. Launch & Grow" />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700 uppercase tracking-wide text-center">
            <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            Accepting projects for {new Date().toLocaleString('default', { month: 'long' })}
          </div>
        </div>


        {/* === BOTTOM ROW: CONTACT CARD === */}
        <div className="w-full max-w-2xl relative">
          <div className="absolute -inset-1 bg-gradient-to-b from-indigo-100 dark:from-indigo-950/50 to-transparent rounded-[2.5rem] blur-xl opacity-70 -z-10" />

          <div className="relative overflow-hidden rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 md:p-10 shadow-2xl shadow-indigo-500/10">

            {/* WhatsApp */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3 px-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Fastest Response</p>
                <span className="flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-bold text-emerald-700 uppercase">Online</span>
                </span>
              </div>
              <a
                href="https://wa.me/447887034503?text=Hi%20Finn%2C%20I%27d%20like%20to%20discuss%20a%20project."
                className="group relative flex w-full items-center justify-center gap-3 rounded-2xl bg-indigo-600 px-6 py-5 text-base font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
              >
                <MessageCircle className="h-6 w-6 fill-white/20 shrink-0" />
                <span>Chat on WhatsApp</span>
                <ArrowRight className="h-5 w-5 opacity-50 -ml-4 transition-all group-hover:opacity-100 group-hover:ml-0" />
              </a>
            </div>

            {/* Email */}
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="h-px bg-zinc-100 dark:bg-zinc-800 flex-1" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300 dark:text-zinc-600">Or Email Me</span>
                <div className="h-px bg-zinc-100 dark:bg-zinc-800 flex-1" />
              </div>

              <div className="group flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 p-2 sm:p-1.5 transition-colors hover:border-indigo-200 dark:hover:border-indigo-800 hover:bg-white dark:hover:bg-zinc-900">

                <div className="flex items-center gap-3 flex-1 px-2 sm:px-0">
                  <div className="h-10 w-10 flex shrink-0 items-center justify-center bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm text-zinc-400 group-hover:text-indigo-600 transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 break-all sm:break-normal">hello@jefferissoftware.co.uk</span>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="h-10 w-full sm:w-auto px-4 flex items-center justify-center gap-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-500 shadow-sm hover:text-indigo-600 hover:border-indigo-200 dark:hover:border-indigo-800 active:scale-95 transition-all"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

function StepPill({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-5 py-2.5 text-sm font-bold text-zinc-700 dark:text-zinc-300 shadow-sm transition hover:border-indigo-200 dark:hover:border-indigo-800 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30">
      <Check className="h-4 w-4 text-indigo-600" />
      <span>{text}</span>
    </div>
  );
}
