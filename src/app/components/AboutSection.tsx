"use client";

import Image from "next/image";
import { Code2, Globe, Cpu, Users } from "lucide-react";

const STATS = [
  { icon: Globe, value: "20+", label: "Sites launched" },
  { icon: Users, value: "15+", label: "Happy clients" },
  { icon: Code2, value: "5+", label: "Years experience" },
  { icon: Cpu, value: "3", label: "Services offered" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT — Photo */}
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-100 dark:from-indigo-950/40 to-violet-100 dark:to-violet-950/40 rounded-3xl blur-2xl opacity-60 -z-10" />
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 shadow-xl">
              {/* Placeholder — replace /finn.jpg with your actual photo */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500">
                <svg className="h-20 w-20 mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                <span className="text-xs font-medium">Your photo here</span>
              </div>
              {/* Uncomment when you have your photo:
              <Image src="/finn.jpg" alt="Finn Jefferis" fill className="object-cover" sizes="(max-width: 1024px) 400px, 500px" />
              */}
            </div>

            {/* Floating credential */}
            <div className="absolute -bottom-4 -right-4 md:-right-8 z-10 rounded-xl border border-white/60 dark:border-zinc-700/60 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-4 shadow-lg">
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Available now</p>
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Accepting new projects</p>
              <div className="mt-1.5 flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs text-emerald-600 font-medium">Online</span>
              </div>
            </div>
          </div>

          {/* RIGHT — Bio */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
              About
            </p>
            <h2 className="text-3xl font-bold leading-tight text-zinc-900 dark:text-zinc-100 md:text-4xl mb-6">
              Hi, I&apos;m Finn.
            </h2>
            <div className="space-y-4 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <p>
                I&apos;m the person behind Jefferis Software Solutions. When you work with me, you deal directly with the person designing and building your site — no account managers, no outsourcing, no middle-men.
              </p>
              <p>
                I specialise in helping small businesses look professional online. Whether that&apos;s a brand new website, a refresh of an outdated one, or bespoke software to streamline how you work — I handle the lot.
              </p>
              <p>
                Based in the UK, I&apos;ve worked with tradespeople, consultants, photographers, and startups. I keep things simple, honest, and focused on getting you results.
              </p>
            </div>

            {/* Stats row */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 p-4 text-center">
                    <Icon className="h-5 w-5 mx-auto mb-2 text-indigo-600 dark:text-indigo-400" />
                    <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{stat.value}</p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
