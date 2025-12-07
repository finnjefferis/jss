"use client";

import { CheckCircle2, ShieldCheck, Zap, Star } from "lucide-react";

export function PricingTiers() {
  return (
    <div className="mb-24 space-y-10">
      <div className="text-center md:text-left">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
            Now accepting new partners
          </span>
        </div>
        <h2 className="text-3xl font-bold text-zinc-900 md:text-4xl">
          Don't just "refresh" your site. <br className="hidden md:block"/>
          <span className="text-indigo-600">Rebuild your business.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-base text-zinc-600">
          Most agencies charge £2,000+ upfront. I don't. <br/>
          I build your site for free, then we partner up for a flat monthly fee to handle hosting, updates, and growth.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 md:items-start lg:gap-8">
        
        {/* TIER 1: STANDARD (The Target) */}
        <div className="relative rounded-3xl border-2 border-indigo-600 bg-white p-8 shadow-2xl shadow-indigo-200 ring-4 ring-indigo-50">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-1 text-sm font-bold text-white shadow-md">
            Most Popular Choice
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-bold text-zinc-900">Standard Partner</h3>
            <p className="mt-1 text-sm text-zinc-500">Everything a local business needs to grow.</p>
          </div>

          <div className="mb-4 flex items-baseline gap-1">
            <span className="text-4xl font-bold tracking-tight text-zinc-900">£189</span>
            <span className="text-lg font-medium text-zinc-500">/mo</span>
          </div>
          
          <div className="mb-6 inline-block rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
            £0 Design & Build Fee (Save £2,000)
          </div>

          <p className="mb-6 text-xs text-zinc-500">
            + £99 one-time setup fee to cover domain & licensing.
          </p>

          <div className="my-6 h-px w-full bg-zinc-100" />

          <ul className="mb-8 space-y-4 text-sm text-zinc-700">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-indigo-600" />
              <span><strong>Complete Website Rebuild</strong> (Next.js)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-indigo-600" />
              <span>Hosting, Domain & 24/7 Care</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-indigo-600" />
              <span><strong>Weekly Social Post</strong> (We write & post)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-indigo-600" />
              <span>Google Business Optimization</span>
            </li>
          </ul>

          <a
            href="https://wa.me/447887034503?text=Hi%20Finn%2C%20I%20want%20to%20grab%20a%20Standard%20Partner%20spot%20for%20%C2%A3189."
            className="block w-full rounded-xl bg-indigo-600 px-4 py-3.5 text-center text-sm font-bold text-white shadow-lg transition hover:bg-indigo-700 hover:shadow-indigo-500/25"
          >
            Become a Partner
          </a>
          <p className="mt-3 text-center text-[10px] text-zinc-400">
            12-month minimum contract.
          </p>
        </div>

        {/* TIER 2: GROWTH (The Anchor) */}
        <div className="relative rounded-3xl border border-zinc-200 bg-zinc-50/50 p-8 transition hover:border-zinc-300">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-zinc-900">Growth Partner</h3>
            <p className="mt-1 text-sm text-zinc-500">For businesses aggressive about expansion.</p>
          </div>

          <div className="mb-4 flex items-baseline gap-1">
            <span className="text-4xl font-bold tracking-tight text-zinc-900">£399</span>
            <span className="text-lg font-medium text-zinc-500">/mo</span>
          </div>

          <div className="mb-6 inline-block rounded-md bg-zinc-200 px-2.5 py-1 text-xs font-bold text-zinc-600">
            £0 Design & Build Fee
          </div>

          <p className="mb-6 text-xs text-zinc-500">
            + £99 one-time setup fee.
          </p>

          <div className="my-6 h-px w-full bg-zinc-200" />

          <ul className="mb-8 space-y-4 text-sm text-zinc-700">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-zinc-400" />
              <span>Everything in Standard</span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="h-5 w-5 shrink-0 text-amber-500" />
              <span><strong>Active Socials</strong> (12 posts/mo)</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="h-5 w-5 shrink-0 text-amber-500" />
              <span><strong>SEO Articles</strong> (2/mo) for Google ranking</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="h-5 w-5 shrink-0 text-amber-500" />
              <span>Priority Support (Same day)</span>
            </li>
          </ul>

          <a
            href="https://wa.me/447887034503?text=Hi%20Finn%2C%20tell%20me%20more%20about%20the%20Growth%20tier."
            className="block w-full rounded-xl border border-zinc-200 bg-white px-4 py-3.5 text-center text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50 hover:text-indigo-600"
          >
            Ask about Growth
          </a>
           <p className="mt-3 text-center text-[10px] text-zinc-400">
            12-month minimum contract.
          </p>
        </div>

      </div>
      
      {/* Guarantee Badge */}
      <div className="mx-auto flex max-w-md items-center justify-center gap-3 rounded-full border border-zinc-200 bg-white py-2 px-4 shadow-sm">
        <ShieldCheck className="h-4 w-4 text-emerald-500" />
        <p className="text-xs font-medium text-zinc-600">
          Risk Free: We refund the setup fee if you don't love the design.
        </p>
      </div>
    </div>
  );
}