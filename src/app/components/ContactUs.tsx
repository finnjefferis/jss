"use client";

import { useState } from "react";
import { Check, Copy, MessageCircle, ArrowRight, Mail, Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Karl Couling",
    initial: "K",
    color: "#EF6C00",
    role: "Naxco Services",
    text: "JSS have done a great job at updating my website. I have asked them to manage the social media also. Good service.",
  },
  {
    name: "Clare Gale",
    initial: "C",
    color: "#7C3AED",
    role: "Local Guide",
    text: "Finley is very professional and easy to talk to. He quickly grasped the problem and found a timely solution to resolve it. I would not hesitate to recommend Finley and he will be my first contact should I need help in the future. Highly recommended!",
  },
];

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@jefferissoftware.co.uk");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-16 md:py-28 bg-white dark:bg-zinc-950 overflow-hidden transition-colors">

      {/* Background Decor */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[90%] bg-gradient-to-b from-indigo-50/60 dark:from-indigo-950/30 to-transparent blur-3xl opacity-60" />

      <div className="mx-auto max-w-3xl px-5 md:px-8 relative z-10">

        {/* Headline */}
        <div className="text-center mb-10 md:mb-14">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
            Ready to start?
          </p>
          <h2 className="text-3xl font-bold leading-tight text-zinc-900 dark:text-zinc-100 md:text-5xl lg:text-6xl mb-4">
            Stop chasing leads. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              Start growing.
            </span>
          </h2>
          <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl mx-auto">
            Build systems that bring you work while you sleep.
          </p>
        </div>

        {/* Reviews */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {REVIEWS.map((review) => (
            <div
              key={review.name}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="h-9 w-9 shrink-0 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: review.color }}
                >
                  {review.initial}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">{review.name}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{review.role}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-4">
                &quot;{review.text}&quot;
              </p>
            </div>
          ))}
        </div>

        {/* Google rating */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">5.0</span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">on Google</span>
        </div>

        {/* Contact Card */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-b from-indigo-100 dark:from-indigo-950/50 to-transparent rounded-3xl blur-xl opacity-70 -z-10" />

          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 md:p-8 shadow-xl">

            {/* WhatsApp */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2.5 px-0.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Fastest Response</p>
                <span className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-900">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-bold text-emerald-700 dark:text-emerald-400 uppercase">Online</span>
                </span>
              </div>
              <a
                href="https://wa.me/447887034503?text=Hi%20Finn%2C%20I%27d%20like%20to%20discuss%20a%20project."
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-indigo-600 px-5 py-4 text-base font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
              >
                <MessageCircle className="h-5 w-5 fill-white/20 shrink-0" />
                <span>Chat on WhatsApp</span>
                <ArrowRight className="h-5 w-5 opacity-50 -ml-4 transition-all group-hover:opacity-100 group-hover:ml-0" />
              </a>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px bg-zinc-100 dark:bg-zinc-800 flex-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300 dark:text-zinc-600">Or Email</span>
              <div className="h-px bg-zinc-100 dark:bg-zinc-800 flex-1" />
            </div>

            {/* Email */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 p-1.5">
              <div className="flex items-center gap-2.5 flex-1 px-2">
                <Mail className="h-4 w-4 text-zinc-400 shrink-0" />
                <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 truncate">hello@jefferissoftware.co.uk</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="h-9 w-full sm:w-auto px-4 flex items-center justify-center gap-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-500 shadow-sm hover:text-indigo-600 hover:border-indigo-200 dark:hover:border-indigo-800 active:scale-95 transition-all"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>

        {/* Accepting projects badge */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 px-4 py-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
            <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            Accepting projects for {new Date().toLocaleString('default', { month: 'long' })}
          </div>
        </div>

      </div>
    </section>
  );
}
