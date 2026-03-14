"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Check, Copy, CalendarDays, ArrowRight, Mail, Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

const BOOKING_URL =
  "https://outlook.office.com/bookwithme/user/b44ea33c0eb847a3a69babfcdc453315@jefferissoftware.co.uk?anonymous&ismsaljsauthenabled&ep=plink";

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
  {
    name: "Ivy Arch Studios",
    initial: "I",
    color: "#10B981",
    role: "Google Review",
    text: "Good work quickly done diligently and effectively.",
  },
];

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useReveal<HTMLElement>(0.1);
  const reviewContainerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setInterval(nextReview, 8000);
    return () => clearInterval(timer);
  }, [nextReview, isVisible]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-zinc-50 dark:bg-zinc-950 overflow-hidden"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-coral-400/30 dark:via-coral-500/50 to-transparent" />
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-coral-500/5 dark:bg-coral-600/8 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-pink-500/5 dark:bg-pink-600/8 rounded-full blur-2xl" />
      </div>

      <div className="mx-auto max-w-6xl px-5 md:px-8 relative z-10">

        {/* Top headline */}
        <div data-reveal style={{ "--d": 0 } as React.CSSProperties} className="text-center mb-16 md:mb-20">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-amber-600 dark:text-amber-500">
            Ready to start?
          </p>
          <h2 className="text-4xl font-extrabold leading-tight text-zinc-900 dark:text-white md:text-5xl lg:text-6xl mb-5">
            Let&apos;s build something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-600 to-pink-600 dark:from-coral-400 dark:to-pink-400 inline-block" data-gradient style={{ "--gd": 400 } as React.CSSProperties}>
              that works.
            </span>
          </h2>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Book a free 30-minute call. We&apos;ll look at your current site, talk through
            what&apos;s holding it back, and tell you honestly what we&apos;d do differently.
          </p>
        </div>

        {/* Reviews */}
        <div
          data-reveal style={{ "--d": 100 } as React.CSSProperties}
          className="max-w-3xl mx-auto mb-12 md:mb-16"
          ref={carouselRef}
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-bold text-zinc-900 dark:text-white">5.0</span>
              <span className="text-sm text-zinc-400 dark:text-zinc-500">on Google</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex gap-1.5">
                {REVIEWS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setReviewIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === reviewIndex ? "w-5 bg-coral-600 dark:bg-coral-500" : "w-1.5 bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400 dark:hover:bg-zinc-500"}`}
                  />
                ))}
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={prevReview}
                  className="h-8 w-8 rounded-lg border border-zinc-200 dark:border-zinc-700/50 bg-white dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500 hover:text-coral-600 dark:hover:text-white hover:border-coral-200 dark:hover:border-coral-500/40 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={nextReview}
                  className="h-8 w-8 rounded-lg border border-zinc-200 dark:border-zinc-700/50 bg-white dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500 hover:text-coral-600 dark:hover:text-white hover:border-coral-200 dark:hover:border-coral-500/40 transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700/50 bg-white dark:bg-zinc-800/80 overflow-hidden shadow-sm dark:shadow-none">
            <div
              ref={reviewContainerRef}
              className="flex review-slide"
              style={{ transform: `translateX(-${reviewIndex * 100}%)` }}
            >
              {REVIEWS.map((r) => (
                <div key={r.name} className="w-full shrink-0 px-6 md:px-10 py-6 md:py-8">
                  <div className="flex flex-col md:flex-row md:items-start gap-5 md:gap-8">
                    <Quote className="h-8 w-8 text-coral-400/20 dark:text-coral-500/25 shrink-0 hidden md:block" />
                    <div className="flex-1 min-w-0">
                      <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed italic line-clamp-4">
                        &quot;{r.text}&quot;
                      </p>
                    </div>
                    <div className="flex items-center gap-3 md:border-l md:border-zinc-200 dark:md:border-zinc-700/40 md:pl-8 shrink-0">
                      <div
                        className="h-10 w-10 shrink-0 rounded-full flex items-center justify-center text-white text-sm font-bold"
                        style={{ backgroundColor: r.color }}
                      >
                        {r.initial}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-zinc-900 dark:text-white whitespace-nowrap">{r.name}</p>
                        <p className="text-xs text-zinc-400 dark:text-zinc-500">{r.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile dots */}
          <div className="flex sm:hidden justify-center gap-1.5 mt-3">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setReviewIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === reviewIndex ? "w-5 bg-coral-600 dark:bg-coral-500" : "w-1.5 bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400 dark:hover:bg-zinc-500"}`}
              />
            ))}
          </div>
        </div>

        {/* CTA Card */}
        <div data-reveal style={{ "--d": 200 } as React.CSSProperties} className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-b from-coral-400/15 dark:from-coral-500/20 via-pink-400/8 dark:via-pink-500/10 to-transparent rounded-[28px] blur-xl opacity-60" />

            <div className="relative rounded-3xl border border-zinc-200 dark:border-zinc-700/50 bg-white dark:bg-zinc-800/90 p-6 md:p-8 shadow-xl dark:shadow-2xl">

              {/* Booking CTA */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <CalendarDays className="h-4 w-4 text-coral-600 dark:text-coral-400" />
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Free discovery call · 30 min
                    </p>
                  </div>
                  <span className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/50">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                      Taking bookings
                    </span>
                  </span>
                </div>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-coral-600 to-coral-500 px-6 py-5 text-lg font-bold text-white shadow-lg shadow-coral-600/25 transition-all duration-300 hover:shadow-xl hover:shadow-coral-600/30 hover:scale-[1.01] active:scale-[0.99] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-coral-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center gap-3">
                    <span>Book a call</span>
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </a>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px bg-zinc-200 dark:bg-zinc-700/50 flex-1" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">or email directly</span>
                <div className="h-px bg-zinc-200 dark:bg-zinc-700/50 flex-1" />
              </div>

              {/* Email row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-700/50 bg-zinc-50 dark:bg-zinc-900/60 p-1.5">
                <div className="flex items-center gap-3 flex-1 px-3">
                  <Mail className="h-4 w-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
                  <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 truncate">
                    hello@jefferissoftware.co.uk
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="h-10 w-full sm:w-auto px-5 flex items-center justify-center gap-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/50 text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-coral-600 dark:hover:text-white hover:border-coral-200 dark:hover:border-coral-500/50 active:scale-95 transition-all duration-200"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              {/* Availability badge */}
              <div className="mt-6 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 dark:border-emerald-800/40 bg-emerald-50 dark:bg-emerald-950/30 px-4 py-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                  <span className="relative flex h-2 w-2 flex-shrink-0">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  Accepting projects for {new Date().toLocaleString("default", { month: "long" })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
