"use client";

import Image from "next/image";

export function AboutMeSection() {
  return (
    <section className="relative py-16 md:py-24 bg-white dark:bg-zinc-950 transition-colors">
      <div className="mx-auto max-w-6xl px-5 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — Photo */}
          <div className="relative w-full max-w-sm mx-auto lg:max-w-none">
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-100 dark:from-indigo-950/40 to-violet-100 dark:to-violet-950/40 rounded-3xl blur-2xl opacity-60 -z-10" />
            <div className="relative w-full h-72 md:h-80 lg:h-96 overflow-hidden rounded-2xl bg-zinc-200 dark:bg-zinc-800 shadow-xl">
              <Image
                src="/finlays.jpg"
                alt="Finlay Jefferis"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 400px, 500px"
              />
            </div>

            {/* Floating credential */}
            <div className="absolute -bottom-4 right-4 md:-right-4 z-10 rounded-xl border border-white/60 dark:border-zinc-700/60 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-4 py-3 shadow-lg">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <div>
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-none">Accepting projects</p>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {new Date().toLocaleString("default", { month: "long" })} availability open
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Bio */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
              About me
            </p>
            <h2 className="text-3xl font-bold leading-tight text-zinc-900 dark:text-zinc-100 md:text-4xl mb-6">
              Hi, I&apos;m Finlay.
            </h2>
            <div className="space-y-4 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <p>
                I&apos;m the person behind Jefferis Software Solutions. When you work with me, you deal directly
                with the person designing and building your site. No account managers, no outsourcing, no middle-men.
              </p>
              <p>
                I specialise in helping small businesses look professional online. Whether that&apos;s a brand new
                website, a refresh of an outdated one, or bespoke software to streamline how you work. I handle the lot.
              </p>
              <p>
                Based in the UK, I&apos;ve worked with tradespeople, consultants, photographers, and startups. I keep
                things simple, honest, and focused on getting you results.
              </p>
            </div>

            {/* Stats row */}
            <div className="mt-10 grid grid-cols-3 gap-3">
              {[
                { value: "20+", label: "Sites built" },
                { value: "5+", label: "Years exp." },
                { value: "100%", label: "Direct contact" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 text-center">
                  <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{stat.value}</p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
