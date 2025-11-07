"use client";

import Image from "next/image";

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-5 md:px-8 lg:px-10">

      {/* Top Bar */}
      <header className="flex items-center justify-between gap-4 py-6">
        <h1 className="text-sm font-semibold tracking-wide">
          Jefferis Software Solutions
        </h1>
        <a
          href="https://wa.me/447939309355"
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
        >
          WhatsApp
        </a>
      </header>

   <section className="relative mb-16 grid grid-cols-1 items-start mt-8 gap-10 md:grid-cols-2">

  {/* LEFT (Text) */}
  <div className="md:pt-6 md:pb-10">   {/* ← adds breathing room on desktop */}
    <h2 className="text-4xl font-semibold leading-tight md:text-5xl">
      Jefferis Software Solutions
    </h2>
    <p className="mt-3 text-zinc-600">
      Professional, personal online presence — from £119.
    </p>

    {/* CTA — desktop only */}
    <a
      href="https://wa.me/447939309355?text=Hi%20Finn%2C%20I'd%20like%20a%20FREE%20website%20audit."
      className="mt-8 hidden md:inline-block rounded-md bg-black px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800"
    >
      Book a free website audit today
    </a>
  </div>




  {/* RIGHT SIDE (Hero Visual, Desktop) */}
{/* Desktop visual (draw-on wireframe) */}
<div className="hidden md:flex mt-12 items-center justify-center h-56 w-full rounded-xl border border-zinc-200 overflow-hidden">
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 480 245"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-zinc-300"
  >
    {/* Header */}
    <rect
      x="20" y="14" width="440" height="48" rx="6" pathLength="100"
      className="wire wire-1"
      strokeDasharray="1" strokeDashoffset="1"
    />

    {/* Left Content */}
    <rect
      x="20" y="78" width="285" height="150" rx="6" pathLength="100"
      className="wire wire-2"
      strokeDasharray="1" strokeDashoffset="1"
    />

    {/* Right Column */}
    <rect
      x="325" y="78" width="135" height="28" rx="6" pathLength="100"
      className="wire wire-3"
      strokeDasharray="1" strokeDashoffset="1"
    />
    <rect
      x="325" y="116" width="135" height="28" rx="6" pathLength="100"
      className="wire wire-4"
      strokeDasharray="1" strokeDashoffset="1"
    />
    <rect
      x="325" y="154" width="135" height="28" rx="6" pathLength="100"
      className="wire wire-5"
      strokeDasharray="1" strokeDashoffset="1"
    />
    <rect
      x="325" y="192" width="135" height="28" rx="6" pathLength="100"
      className="wire wire-6"
      strokeDasharray="1" strokeDashoffset="1"
    />
  </svg>
</div>



{/* MOBILE PHONE HERO */}
<div className="md:hidden mt-6">

  {/* Phone Frame */}
  <div className="relative w-full h-72 rounded-[28px] border border-zinc-200 bg-white/70 backdrop-blur-sm shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">

    <svg
      viewBox="0 0 360 720"
      className="absolute inset-0 text-zinc-300"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >

      {/* Outer phone shell */}
      <rect x="6" y="6" width="348" height="708" rx="38" className="mw mw-1" pathLength="1" />

      {/* Top speaker notch */}
      <rect x="150" y="20" width="60" height="8" rx="4" className="mw mw-2" pathLength="1" />

      {/* Screen soft fill */}
      <rect x="20" y="48" width="320" height="650" rx="20" className="fill-soft fill-m1" />

      {/* Header block */}
      <rect x="40" y="70" width="280" height="60" rx="10" className="mw mw-3" pathLength="1" />
      <line x1="60" y1="100" x2="300" y2="100" className="shimmer" />

      {/* Left content area */}
      <rect x="40" y="150" width="180" height="380" rx="14" className="mw mw-4" pathLength="1" />
      <rect x="55" y="170" width="155" height="20" rx="6" className="mw mw-5" pathLength="1" />
      <rect x="55" y="200" width="130" height="14" rx="6" className="mw mw-6" pathLength="1" />
      <rect x="55" y="230" width="160" height="14" rx="6" className="mw mw-7" pathLength="1" />
      <rect x="55" y="260" width="120" height="14" rx="6" className="mw mw-8" pathLength="1" />

      {/* Right stacked cards */}
      <rect x="235" y="150" width="85" height="36" rx="8" className="mw mw-9" pathLength="1" />
      <rect x="235" y="200" width="85" height="36" rx="8" className="mw mw-10" pathLength="1" />
      <rect x="235" y="250" width="85" height="36" rx="8" className="mw mw-11" pathLength="1" />

      {/* Soft fills for cards */}
      <rect x="235" y="150" width="85" height="36" rx="8" className="fill-soft fill-m2" />
      <rect x="235" y="200" width="85" height="36" rx="8" className="fill-soft fill-m3" />
      <rect x="235" y="250" width="85" height="36" rx="8" className="fill-soft fill-m4" />
    </svg>
  </div>

  {/* CTA (No WhatsApp Icon, Clean Button) */}
  <a
    href="https://wa.me/447939309355?text=Hi%20Finn%2C%20I'd%20like%20a%20website%20audit."
    className="mt-6 block w-full rounded-md bg-black px-6 py-3 text-center text-sm font-medium text-white hover:bg-zinc-800"
  >
    Book a Free Website Audit
  </a>

</div>

</section>


      {/* Services */}
      <section className="mb-24 md:mb-28">
        <h3 className="mb-8 text-2xl font-semibold md:mb-12">Services</h3>

        {/* Free Audit Banner */}
        <div className="mb-8 rounded-lg border border-zinc-200 bg-white p-5 md:mb-10 md:flex md:items-center md:justify-between md:gap-6 md:p-6">
          <div>
            <h4 className="font-semibold text-zinc-900">Free Website Audit</h4>
            <p className="mt-2 text-sm text-zinc-600">
              I’ll review your site and send clear improvements you can apply today. No jargon, no pressure.
            </p>
          </div>
          <a
            href="https://wa.me/447939309355?text=Hi%20Finn%2C%20I'd%20like%20a%20free%20website%20audit."
            className="mt-4 inline-block shrink-0 rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 md:mt-0"
          >
            Book free audit
          </a>
        </div>

        {/* Three Service Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Social */}
          <div className="rounded-lg border border-zinc-200 bg-white p-6">
            <h4 className="font-semibold text-zinc-900">
              Social Media — from £119/mo
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              Weekly posts, captions & scheduling handled for you.
              You approve once a month — then relax.
            </p>
            <a
              href="https://wa.me/447939309355?text=I'm%20interested%20in%20Social%20Media%20Management."
              className="mt-6 inline-block rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Enquire via WhatsApp
            </a>
          </div>

          {/* Websites */}
          <div className="rounded-lg border border-zinc-200 bg-white p-6">
            <h4 className="font-semibold text-zinc-900">
              Website Refresh / New — from £269
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              Clean, modern websites that build trust and make contact easy.
              I handle everything — you just send your logo.
            </p>
            <a
              href="https://wa.me/447939309355?text=I'm%20interested%20in%20a%20website%20refresh."
              className="mt-6 inline-block rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Enquire via WhatsApp
            </a>
          </div>

          {/* Tools */}
          <div className="rounded-lg border border-zinc-200 bg-white p-6">
            <h4 className="font-semibold text-zinc-900">
              Custom Tools / Dashboards — quoted
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              Booking systems, quote calculators & admin automation for your exact workflow.
            </p>
            <a
              href="https://wa.me/447939309355?text=I'm%20interested%20in%20a%20custom%20tool."
              className="mt-6 inline-block rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Enquire via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Recent Work */}
      <section className="mb-24 md:mb-28">
        <h3 className="mb-8 text-2xl font-semibold md:mb-12">Recent Work</h3>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Naxco */}
          <article>
            <div className="relative mb-4 h-64 w-full overflow-hidden rounded-lg border border-zinc-200">
              <Image src="/naxco1.png" alt="Naxco" fill className="object-cover" />
            </div>
            <h4 className="text-lg font-semibold text-zinc-900">Naxco Services</h4>
            <p className="mt-1 text-zinc-600">Improved clarity, trust signals & enquiry flow.</p>
          </article>

          {/* Carbon Calculator */}
          <article>
            <div className="relative mb-4 h-64 w-full overflow-hidden rounded-lg border border-zinc-200">
              <Image src="/carbon.png" alt="Carbon Calculator" fill className="object-cover" />
            </div>
            <h4 className="text-lg font-semibold text-zinc-900">Carbon Calculator</h4>
            <p className="mt-1 text-zinc-600">Streamlined workflow & CRM syncing.</p>
          </article>

          {/* Toolbox */}
          <article>
            <div className="relative mb-4 h-64 w-full overflow-hidden rounded-lg border border-zinc-200">
              <Image src="/toolbox.png" alt="Toolbox" fill className="object-cover" />
            </div>
            <h4 className="text-lg font-semibold text-zinc-900">Toolbox Platform</h4>
            <p className="mt-1 text-zinc-600">.NET dashboard for cost & procurement insights.</p>
          </article>
        </div>
      </section>

      {/* Contact */}
      <section className="mb-24 text-center">
        <h3 className="text-2xl font-semibold">Get in Touch</h3>
        <p className="mt-3 text-zinc-600">Send a message anytime — quick reply.</p>

        <a
          href="https://wa.me/447939309355"
          className="mt-8 inline-block rounded-md bg-black px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Message on WhatsApp
        </a>

        <p className="mt-4 text-sm text-zinc-500">
          Based in Worthing · Serving West Sussex
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} Jefferis Software Solutions
      </footer>
    </main>
  );
}
