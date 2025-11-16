"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type WordPair = { from: string; to: string };

const WORD_PAIRS: WordPair[] = [
  { from: "clicks",     to: "enquiries." },
  { from: "attention",  to: "customers." },
  { from: "visits",     to: "bookings." },
  { from: "searches",   to: "sales." },
  { from: "visibility", to: "revenue." },

  { from: "DIY",        to: "done-for-you." },
  { from: "chaos",      to: "clarity." },
];

function shufflePairs<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}


export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-5 md:px-8 lg:px-10">
      {/* Top Bar */}
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-500"></div>

   <header className="flex items-center justify-between gap-4 py-6">
  <h1 className="flex items-center gap-2 text-sm font-semibold tracking-wide">
    <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
    Jefferis Software Solutions
  </h1>

 <a
    href="https://wa.me/447939309355"
    className="rounded-md bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-indigo-700 hover:to-indigo-600 transition"
  >
    WhatsApp
  </a>
</header>


   {/* Hero */}
<section className="relative mb-10 grid min-h-[60vh] grid-cols-1 items-center gap-10 md:min-h-[60vh] md:grid-cols-2">
  {/* LEFT (Text) */}
         {/* LEFT (Text) */}
        <HeroText />


  {/* RIGHT (Desktop wireframe) */}
  <div className="relative hidden h-64 w-full items-center justify-center overflow-hidden rounded-xl border border-zinc-100 md:flex md:h-72">
    {/* soft glow */}
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(24,24,27,0.08),_transparent_55%)]" />

    <svg
      width="100%"
      height="100%"
      viewBox="0 0 480 260"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="relative z-10 text-zinc-400"
    >
      {/* Outer browser frame */}
      <rect
        x="16"
        y="14"
        width="448"
        height="232"
        rx="16"
        pathLength="1"
        className="wire wire-1"
      />

      {/* Top bar */}
      <rect
        x="24"
        y="24"
        width="432"
        height="32"
        rx="10"
        pathLength="1"
        className="wire wire-2"
      />

      {/* Browser dots */}
      <circle cx="40" cy="40" r="4" pathLength="1" className="wire wire-3" />
      <circle cx="54" cy="40" r="4" pathLength="1" className="wire wire-4" />
      <circle cx="68" cy="40" r="4" pathLength="1" className="wire wire-5" />

      {/* Address bar */}
      <rect
        x="88"
        y="32"
        width="140"
        height="12"
        rx="6"
        pathLength="1"
        className="wire wire-6"
      />

      {/* Main hero image / content block */}
      <rect
        x="32"
        y="72"
        width="260"
        height="110"
        rx="12"
        pathLength="1"
        className="wire wire-7"
      />

      {/* Lower left text rows */}
      <rect
        x="32"
        y="192"
        width="120"
        height="26"
        rx="7"
        pathLength="1"
        className="wire wire-10"
      />
      <rect
        x="172"
        y="192"
        width="120"
        height="26"
        rx="7"
        pathLength="1"
        className="wire wire-11"
      />

      {/* Right column cards */}
      <rect
        x="312"
        y="72"
        width="136"
        height="40"
        rx="10"
        pathLength="1"
        className="wire wire-12"
      />
      <rect
        x="312"
        y="122"
        width="136"
        height="30"
        rx="8"
        pathLength="1"
        className="wire wire-13"
      />
      <rect
        x="312"
        y="166"
        width="136"
        height="30"
        rx="8"
        pathLength="1"
        className="wire wire-14"
      />
      <rect
        x="312"
        y="210"
        width="136"
        height="30"
        rx="8"
        pathLength="1"
        className="wire wire-15"
      />
    </svg>
  </div>

 
</section>


  {/* Services */}
      <section className="mb-24 md:mb-28">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-1 w-6 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500" />
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
            What I can handle for you
          </p>
        </div>

        <h3 className="mb-3 text-2xl font-semibold md:text-3xl">Services</h3>
        <p className="mb-8 max-w-2xl text-sm text-zinc-600">
          For busy owners who already have the work — you just need your online presence
          to match the quality of what you do.
        </p>

        {/* Free Audit Banner */}
        <div className="mb-10 rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-sky-50 p-5 shadow-[0_1px_3px_rgba(15,23,42,0.05)] md:flex md:items-center md:justify-between md:gap-6 md:p-6">
          <div>
            <h4 className="text-sm font-semibold text-zinc-900">
              Free Website Audit
            </h4>
            <p className="mt-2 text-sm text-zinc-700">
              I’ll review your site and send clear improvements you can apply today.
              No jargon, no pressure, just a simple list of fixes.
            </p>
          </div>
          <a
            href="https://wa.me/447939309355?text=Hi%20Finn%2C%20I'd%20like%20a%20free%20website%20audit."
            className="mt-4 inline-flex shrink-0 items-center justify-center rounded-md bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:from-indigo-700 hover:to-indigo-600 md:mt-0"
          >
            Book free audit
          </a>
        </div>

        {/* Three Service Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Social */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <h4 className="text-sm font-semibold text-zinc-900">
              Social Media — from £119/mo
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              Weekly posts, captions & scheduling handled for you. You approve once a
              month — then get back to your actual job.
            </p>
            <a
              href="https://wa.me/447939309355?text=I'm%20interested%20in%20Social%20Media%20Management."
              className="mt-6 inline-flex rounded-md bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:from-indigo-700 hover:to-indigo-600"
            >
              Enquire via WhatsApp
            </a>
          </div>

          {/* Websites */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <h4 className="text-sm font-semibold text-zinc-900">
              Website Refresh / New — from £269
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              Clean, modern websites that build trust and make it obvious how to
              contact you. I handle copy, layout and basic SEO.
            </p>
            <a
              href="https://wa.me/447939309355?text=I'm%20interested%20in%20a%20website%20refresh."
              className="mt-6 inline-flex rounded-md bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:from-indigo-700 hover:to-indigo-600"
            >
              Enquire via WhatsApp
            </a>
          </div>

          {/* Tools */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <h4 className="text-sm font-semibold text-zinc-900">
              Custom Tools / Dashboards — quoted
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              Booking systems, quote calculators & internal dashboards wired into
              your existing workflow — so things stop living in 10 different places.
            </p>
            <a
              href="https://wa.me/447939309355?text=I'm%20interested%20in%20a%20custom%20tool."
              className="mt-6 inline-flex rounded-md bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:from-indigo-700 hover:to-indigo-600"
            >
              Enquire via WhatsApp
            </a>
          </div>
        </div>
      </section>


      {/* Why people hire me */}
      <section className="mb-20 md:mb-24">
        <h3 className="mb-4 text-2xl font-semibold">Why people hire me</h3>
        <p className="mb-8 max-w-2xl text-sm text-zinc-600">
          Most clients come to me with an out-of-date site, no clear call to action, and no time to fix it.
          My job is to make it easy for customers to understand what you do and contact you in one tap.
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-zinc-200 bg-white p-5">
            <h4 className="text-sm font-semibold text-zinc-900">Simple process</h4>
            <p className="mt-2 text-sm text-zinc-600">
              Short call, content collected in one go, clear timeline. Most sites done in about a week.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-5">
            <h4 className="text-sm font-semibold text-zinc-900">Built for enquiries</h4>
            <p className="mt-2 text-sm text-zinc-600">
              Clear service pages, obvious buttons and WhatsApp / phone CTAs — not just something that “looks nice”.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-5">
            <h4 className="text-sm font-semibold text-zinc-900">Ongoing support</h4>
            <p className="mt-2 text-sm text-zinc-600">
              I stay available for tweaks, updates and questions so you’re not stuck when something changes.
            </p>
          </div>
        </div>
      </section>

      {/* Recent Work */}
      <section id="recent-work" className="mb-24 md:mb-28">
        <h3 className="mb-8 text-2xl font-semibold md:mb-12">Recent Work</h3>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Naxco */}
          <article>
            <div className="relative mb-4 h-64 w-full overflow-hidden rounded-lg border border-zinc-200">
              <Image src="/naxco1.png" alt="Naxco" fill className="object-cover" />
            </div>
            <h4 className="text-lg font-semibold text-zinc-900">Naxco Services</h4>
            <p className="mt-1 text-zinc-600">
              Improved clarity, trust signals & enquiry flow.
            </p>
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
            <p className="mt-1 text-zinc-600">
              .NET dashboard for cost & procurement insights.
            </p>
          </article>
        </div>
      </section>

      {/* Contact */}
      <section className="mb-24 text-center">
        <h3 className="text-2xl font-semibold">Get in Touch</h3>
        <p className="mt-3 text-zinc-600">
          Send a message anytime — quick reply.
        </p>

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
function HeroText() {
  // 1) Initial render: deterministic – SSR-safe
  const [sequence, setSequence] = useState<WordPair[]>(WORD_PAIRS);
  const [index, setIndex] = useState(0);

  // 2) After mount (client-only): shuffle, but always end on DIY/done-for-you
  useEffect(() => {
    const diyPair = WORD_PAIRS.find((p) => p.from === "DIY");
    const others = WORD_PAIRS.filter((p) => p.from !== "DIY");

    if (!diyPair) {
      // fallback: no DIY pair found, just shuffle everything
      setSequence(shufflePairs(WORD_PAIRS));
      setIndex(0);
      return;
    }

    const shuffledOthers = shufflePairs(others);
    setSequence([...shuffledOthers, diyPair]); // DIY is always last
    setIndex(0);
  }, []);

  // 3) Move through all pairs in sequence, then stop on the last one
  useEffect(() => {
    if (index >= sequence.length - 1) return; // already at last, stop

    const timeout = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 2600); // how long each pair shows

    return () => clearTimeout(timeout);
  }, [index, sequence.length]);

  const pair = sequence[index];

  return (
    <div className="md:pt-6 md:pb-10">
      <p className="hero-line hero-delay-1 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
        Websites & social for small businesses
      </p>

      <h2 className="hero-line hero-delay-2 cal-sans mt-3 text-4xl font-semibold leading-tight md:text-5xl">
        Turn{" "}
        <span className="swap-shell text-zinc-700">
          <span className="swap-ghost">visibility</span>
          <span key={pair.from} className="swap-word">
            {pair.from}
          </span>
        </span>{" "}
        into{" "}
        <span className="swap-shell text-indigo-600">
          <span className="swap-ghost">    </span>
          <span key={pair.to} className="swap-word">
            {pair.to}
          </span>
        </span>
      </h2>

      <p className="hero-line hero-delay-3 mt-8 mb-8 text-l text-zinc-600 md:text-base">
        Simple, fast websites and social that bring you new work. Projects from £119.
      </p>

      <div className="hero-line hero-delay-4 mt-4 mb-8 flex flex-wrap gap-2 text-xs text-zinc-500">
        <span className="rounded-full border border-zinc-200 px-3 py-1">
          Trades & home services
        </span>
        <span className="rounded-full border border-zinc-200 px-3 py-1">
          Cafés & shops
        </span>
        <span className="rounded-full border border-zinc-200 px-3 py-1">
          Solo founders
        </span>
          <span className="rounded-full border border-zinc-200 px-3 py-1">
          E-Commerce
        </span>
      </div>

      <div className="hero-line hero-delay-5 mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href="https://wa.me/447939309355?text=Hi%20Finn%2C%20I'd%20like%20a%20FREE%20website%20audit."
          className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:from-indigo-700 hover:to-indigo-600"
        >
          Book a free website audit
        </a>
        <a
          href="#recent-work"
          className="text-sm font-medium md:mt-0 mt-12 text-zinc-700 underline underline-offset-4"
        >
          See recent projects
        </a>
      </div>
    </div>
  );
}


