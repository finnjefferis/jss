"use client";

import Image from "next/image";

export default function Page() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-8">

      {/* HEADER */}
      <header className="flex items-center justify-between mb-20">
        <h1 className="text-base font-semibold">Jefferis Software Solutions</h1>
        <a
          href="https://wa.me/447939309355"
          className="text-sm bg-black text-white px-4 py-2 rounded-md"
        >
          WhatsApp
        </a>
      </header>

      {/* HERO */}
      <section className="text-center mb-32">
        <h2 className="text-4xl font-semibold">Jefferis Software Solutions</h2>
        <p className="mt-2 text-zinc-600">Professional web presence from £119</p>

        <a
          href="https://wa.me/447939309355?text=Hi%20Finn%2C%20I%27d%20like%20a%20FREE%20website%20audit."
          className="mt-8 inline-block bg-black text-white px-6 py-3 rounded-md"
        >
          Book a free website audit today
        </a>
      </section>

      {/* SERVICES */}
      <section className="mb-32">
        <h3 className="text-2xl font-semibold mb-12">Services</h3>

        {/* FREE AUDIT */}
        <div className="mb-10 border border-zinc-200 rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white">
          <div>
            <h4 className="font-semibold text-zinc-900">Free Website Audit</h4>
            <p className="mt-2 text-zinc-600 text-sm">
              I’ll review your site and send clear improvements you can apply today. No jargon, no pressure.
            </p>
          </div>

          <a
            href="https://wa.me/447939309355?text=Hi%20Finn%2C%20I'd%20like%20a%20free%20website%20audit."
            className="shrink-0 bg-black text-white px-4 py-2 rounded-md text-sm"
          >
            Book free audit
          </a>
        </div>

        {/* SERVICE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-zinc-200 rounded-lg p-6 bg-white">
            <h4 className="font-semibold text-zinc-900">Social Media — from £119/mo</h4>
            <p className="mt-3 text-zinc-600 text-sm leading-relaxed">
              Weekly posts, captions & scheduling handled for you.
              You approve once a month — then relax.
            </p>
            <a
              href="https://wa.me/447939309355?text=I'm%20interested%20in%20Social%20Media%20Management."
              className="mt-6 inline-block bg-black text-white px-4 py-2 rounded-md text-sm"
            >
              Enquire via WhatsApp
            </a>
          </div>

          <div className="border border-zinc-200 rounded-lg p-6 bg-white">
            <h4 className="font-semibold text-zinc-900">Website Refresh / New — from £269</h4>
            <p className="mt-3 text-zinc-600 text-sm leading-relaxed">
              Clean, modern websites that build trust and make contact easy.
              I handle everything — you just send your logo.
            </p>
            <a
              href="https://wa.me/447939309355?text=I'm%20interested%20in%20a%20website%20refresh."
              className="mt-6 inline-block bg-black text-white px-4 py-2 rounded-md text-sm"
            >
              Enquire via WhatsApp
            </a>
          </div>

          <div className="border border-zinc-200 rounded-lg p-6 bg-white">
            <h4 className="font-semibold text-zinc-900">Custom Tools / Dashboards — quoted</h4>
            <p className="mt-3 text-zinc-600 text-sm leading-relaxed">
              Booking systems, quote calculators & admin automation for your exact workflow.
            </p>
            <a
              href="https://wa.me/447939309355?text=I'm%20interested%20in%20a%20custom%20tool."
              className="mt-6 inline-block bg-black text-white px-4 py-2 rounded-md text-sm"
            >
              Enquire via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* RECENT WORK */}
      <section className="mb-32">
        <h3 className="text-2xl font-semibold mb-12">Recent Work</h3>

        <div className="space-y-24">

          <div>
            <div className="relative w-full h-64 rounded-md overflow-hidden mb-4">
              <Image src="/naxco1.png" alt="Naxco" fill className="object-cover" />
            </div>
            <h4 className="text-lg font-semibold text-zinc-900">Naxco Services</h4>
            <p className="mt-1 text-zinc-600">Improved clarity, trust signals & enquiry flow.</p>
          </div>

          <div>
            <div className="relative w-full h-64 rounded-md overflow-hidden mb-4">
              <Image src="/carbon.png" alt="Carbon Calculator" fill className="object-cover" />
            </div>
            <h4 className="text-lg font-semibold text-zinc-900">Carbon Calculator</h4>
            <p className="mt-1 text-zinc-600">Streamlined workflow & CRM syncing.</p>
          </div>

          <div>
            <div className="relative w-full h-64 rounded-md overflow-hidden mb-4">
              <Image src="/toolbox.png" alt="Toolbox" fill className="object-cover" />
            </div>
            <h4 className="text-lg font-semibold text-zinc-900">Toolbox Platform</h4>
            <p className="mt-1 text-zinc-600">.NET dashboard for cost & procurement insights.</p>
          </div>

        </div>
      </section>

      {/* CONTACT */}
      <section className="text-center mb-32">
        <h3 className="text-2xl font-semibold">Get in Touch</h3>
        <p className="mt-4 text-zinc-600">Send a message anytime — quick reply.</p>

        <a href="https://wa.me/447939309355" className="mt-8 inline-block bg-black text-white px-6 py-3 rounded-md">
          Message on WhatsApp
        </a>

        <p className="mt-4 text-sm text-zinc-500">Based in Worthing · Serving West Sussex</p>
      </section>

      <footer className="py-8 text-center text-xs text-zinc-500 border-t">
        © {new Date().getFullYear()} Jefferis Software Solutions
      </footer>

    </main>
  );
}
