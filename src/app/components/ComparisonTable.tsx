"use client";

import { Paintbrush, Code2, Megaphone, LifeBuoy, Database, ArrowRight, Check } from "lucide-react";

export function ComparisonTable() {
  return (
    <section className="mx-auto mb-24 max-w-6xl px-4">
      
      {/* Section Header */}
      <div className="mb-12 border-t border-zinc-200 pt-12 text-center md:text-left">
        <h3 className="text-2xl font-bold text-zinc-900">
          The "A La Carte" Menu
        </h3>
        <p className="mt-2 text-base text-zinc-600">
          Prefer to mix and match? Build your own package with fixed-price services.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        
        {/* CARD 1: Social Media Only (MOVED FIRST) */}
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md md:p-8">
          <div className="mb-6 flex items-center gap-4 border-b border-zinc-100 pb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Megaphone className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-zinc-900">Social Media Only</h4>
              <p className="text-xs text-zinc-500">No website included.</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Service 1 */}
            <div className="group rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 transition hover:border-indigo-100 hover:bg-indigo-50/30">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-zinc-900 text-sm">Basic Presence</p>
                  <p className="text-sm font-bold text-zinc-900 mt-1">£149/mo</p>
                </div>
                <a href="https://wa.me/447887034503?text=I'm%20interested%20in%20Basic%20Socials%20for%20%C2%A3149%2Fmo" className="text-[11px] font-medium text-indigo-600 hover:underline">Start Basic</a>
              </div>
              <p className="mt-3 text-xs text-zinc-500 leading-relaxed">
                Perfect for keeping the lights on. We write and schedule <strong>4 posts per month</strong> so your page never looks abandoned. Includes hashtag research.
              </p>
            </div>

            {/* Service 2 */}
            <div className="group rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 transition hover:border-indigo-100 hover:bg-indigo-50/30">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-zinc-900 text-sm">Active Brand</p>
                  <p className="text-sm font-bold text-zinc-900 mt-1">£239/mo</p>
                </div>
                <a href="https://wa.me/447887034503?text=I'm%20interested%20in%20Active%20Socials%20for%20%C2%A3239%2Fmo" className="text-[11px] font-medium text-indigo-600 hover:underline">Start Active</a>
              </div>
              <p className="mt-3 text-xs text-zinc-500 leading-relaxed">
                For growth. <strong>8-12 posts per month</strong> plus we handle community engagement (replying to comments) to actually drive local leads.
              </p>
            </div>
          </div>
        </div>

        {/* CARD 2: One-Off Web Projects */}
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md md:p-8">
          <div className="mb-6 flex items-center gap-4 border-b border-zinc-100 pb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Code2 className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-zinc-900">Web Projects</h4>
              <p className="text-xs text-zinc-500">You own the code & design.</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Service 1 */}
             <div className="group rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 transition hover:border-indigo-100 hover:bg-indigo-50/30">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-zinc-900 text-sm">Website Refresh</p>
                  <p className="text-sm font-bold text-zinc-900 mt-1">From £699</p>
                </div>
                <a href="https://wa.me/447887034503?text=I'm%20interested%20in%20a%20Website%20Refresh" className="text-[11px] font-medium text-indigo-600 hover:underline">Book Refresh</a>
              </div>
              <p className="mt-3 text-xs text-zinc-500 leading-relaxed">
                We fix the mobile layout, improve the fonts, and sharpen your calls-to-action on your existing site. Quick turnaround.
              </p>
            </div>

            {/* Service 2 */}
            <div className="group rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 transition hover:border-indigo-100 hover:bg-indigo-50/30">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-zinc-900 text-sm">New Build (Next.js)</p>
                  <p className="text-sm font-bold text-zinc-900 mt-1">From £1,799</p>
                </div>
                <a href="https://wa.me/447887034503?text=I'd%20like%20to%20buy%20a%20New%20Website%20outright" className="text-[11px] font-medium text-indigo-600 hover:underline">Book Build</a>
              </div>
              <p className="mt-3 text-xs text-zinc-500 leading-relaxed">
                The Ferrari of websites. A custom coded Next.js site (super fast) designed to rank on Google. You own the source code 100%.
              </p>
            </div>
          </div>
        </div>

        {/* CARD 3: Care Plans (Hosting) */}
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md md:p-8">
          <div className="mb-6 flex items-center gap-4 border-b border-zinc-100 pb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <LifeBuoy className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-zinc-900">Site Care & Hosting</h4>
              <p className="text-xs text-zinc-500">For sites I build or manage.</p>
            </div>
          </div>

          <div className="space-y-6">
             <div className="group rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 transition hover:border-indigo-100 hover:bg-indigo-50/30">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-zinc-900 text-sm">Core Hosting</p>
                  <p className="text-sm font-bold text-zinc-900 mt-1">£19/mo</p>
                </div>
                <a href="https://wa.me/447887034503?text=I%20need%20Core%20Hosting" className="text-[11px] font-medium text-indigo-600 hover:underline">Select Core</a>
              </div>
              <p className="mt-3 text-xs text-zinc-500 leading-relaxed">
                Sleep easy. Includes SSL security, daily backups, and 99.9% uptime monitoring. We fix technical issues before you even notice them.
              </p>
            </div>

            <div className="group rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 transition hover:border-indigo-100 hover:bg-indigo-50/30">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-zinc-900 text-sm">Pro Support</p>
                  <p className="text-sm font-bold text-zinc-900 mt-1">£39/mo</p>
                </div>
                <a href="https://wa.me/447887034503?text=I%20need%20Pro%20Support" className="text-[11px] font-medium text-indigo-600 hover:underline">Select Pro</a>
              </div>
              <p className="mt-3 text-xs text-zinc-500 leading-relaxed">
                Like having an IT department. Includes everything in Core + <strong>1 hour of developer time</strong> per month for content updates or tweaks.
              </p>
            </div>
          </div>
        </div>

        {/* CARD 4: Bespoke Software (PURPLE) */}
        <div className="rounded-3xl border border-indigo-800 bg-gradient-to-br from-indigo-900 to-indigo-800 p-6 shadow-md shadow-indigo-900/20 transition-all hover:shadow-xl md:p-8 text-white relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
          
          <div className="relative mb-6 flex items-center gap-4 border-b border-indigo-700 pb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white border border-white/20">
              <Database className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-white">Bespoke Software</h4>
              <p className="text-xs text-indigo-200">Enterprise & Internal Tools.</p>
            </div>
          </div>

          <div className="relative space-y-4">
            <div className="flex flex-col gap-3">
              <p className="text-sm text-indigo-100 leading-relaxed">
                Need more than a website? I build custom <strong>Dashboards, Procurement Systems, and Client Portals</strong> using .NET and Next.js.
              </p>
              <ul className="space-y-2 text-xs text-indigo-200">
                 <li className="flex items-center gap-2"><Check className="h-3 w-3 text-indigo-400"/> Automate manual admin tasks</li>
                 <li className="flex items-center gap-2"><Check className="h-3 w-3 text-indigo-400"/> Secure Client Logins</li>
                 <li className="flex items-center gap-2"><Check className="h-3 w-3 text-indigo-400"/> API Integrations</li>
              </ul>
              
              <div className="mt-6 flex items-center justify-between border-t border-indigo-700/50 pt-4">
                <span className="text-sm font-semibold text-white">Custom Quote</span>
                <a 
                   href="https://wa.me/447887034503?text=Hi%20Finn%2C%20I%20have%20a%20complex%20software%20project."
                   className="rounded-lg bg-white px-4 py-2 text-xs font-bold text-indigo-900 transition hover:bg-indigo-50"
                >
                  Discuss Project
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Logic Nudge */}
      <div className="mt-8 flex justify-center">
         <p className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-medium text-indigo-700">
            💡 <strong>Hint:</strong> The Partner Plan (£189/mo) includes the Website, Hosting, AND Socials.
         </p>
      </div>

    </section>
  );
}