"use client";

import { useState, useEffect, useCallback } from "react";
import { Check, Copy, MessageCircle, ArrowRight, Mail, Star, ChevronLeft, ChevronRight } from "lucide-react";

const REVIEWS = [
  {
    name: "Stewart Dunne",
    initial: "S",
    color: "#1E88E5",
    role: "Local Guide",
    text: "Working with Finlay and the Team at Jefferis Software this past few weeks has been a great experience. From our first meeting I felt Finlay understood what we are trying to achieve and whilst he followed the brief, he also added valuable suggestions that have enhanced our site both in web browser and especially on smart phones. He also was able to adopt software to meet our particular needs and leave my team with a better daily operating platform. The project completed on time and to budget - also a great win for us. I highly recommend the Jefferis Software team for your future website developments.",
  },
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
  const [reviewIndex, setReviewIndex] = useState(0);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@jefferissoftware.co.uk");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const prevReview = useCallback(() => {
    setReviewIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  }, []);

  const nextReview = useCallback(() => {
    setReviewIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  }, []);

  // Auto-advance every 8 seconds
  useEffect(() => {
    const timer = setInterval(nextReview, 8000);
    return () => clearInterval(timer);
  }, [nextReview]);

  const review = REVIEWS[reviewIndex];

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

        {/* Review Carousel */}
        <div className="mb-10">
          <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 overflow-hidden">
            {/* Sliding track */}
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${reviewIndex * 100}%)` }}
            >
              {REVIEWS.map((r) => (
                <div key={r.name} className="w-full shrink-0 p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="h-10 w-10 shrink-0 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: r.color }}
                    >
                      {r.initial}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{r.name}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{r.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="min-h-[180px] md:min-h-[140px]">
                    <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      &quot;{r.text}&quot;
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between px-6 md:px-8 pb-5 pt-0">
              <div className="flex gap-1.5">
                {REVIEWS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setReviewIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === reviewIndex ? "w-6 bg-indigo-600" : "w-1.5 bg-zinc-300 dark:bg-zinc-600"}`}
                  />
                ))}
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={prevReview}
                  className="h-8 w-8 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-indigo-600 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={nextReview}
                  className="h-8 w-8 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-indigo-600 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
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
