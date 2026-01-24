"use client";

import { useState, useEffect, useRef } from "react";
import { Check, Copy, MessageCircle, ArrowRight, Star, Mail, ChevronLeft, ChevronRight } from "lucide-react";

const REVIEWS = [
  {
    name: "Karl Couling",
    initial: "K",
    color: "#EF6C00",
    text: "JSS have done a great job at updating my website. I have asked them to manage the social media also. Good service",
    badge: "New",
  },
  {
    name: "Clare Gale",
    initial: "C",
    color: "#7C3AED",
    text: "Finley is very professional and easy to talk to. He quickly grasped the problem and found a timely solution to resolve it. I would not hesitate to recommend Finley and he will be my first contact should I need help in the future. Highly recommended!",
    badge: "Local Guide",
  },
];

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [isReviewVisible, setIsReviewVisible] = useState(false);
  const [activeReview, setActiveReview] = useState(0);
  const reviewRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@jefferissoftware.co.uk");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToReview = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const width = scrollRef.current.clientWidth;
    scrollRef.current.scrollBy({ left: direction === 'left' ? -width : width, behavior: 'smooth' });
  };

  // Track which review is visible
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const width = container.clientWidth;
      const index = Math.round(scrollLeft / width);
      setActiveReview(Math.min(index, REVIEWS.length - 1));
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsReviewVisible(true);
          if (reviewRef.current) observer.unobserve(reviewRef.current);
        }
      },
      { threshold: 0.2 }
    );
    if (reviewRef.current) observer.observe(reviewRef.current);
    return () => {
        if (reviewRef.current) observer.unobserve(reviewRef.current);
    };
  }, []);

  return (
    <section id="contact" className="relative py-20 md:py-28 bg-white overflow-hidden">

      {/* Background Decor */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[90%] bg-gradient-to-b from-indigo-50/60 to-transparent blur-3xl opacity-60" />

      <div className="mx-auto max-w-6xl px-5 md:px-8 relative z-10 flex flex-col items-center">

        {/* === TOP ROW: WIDE TEXT === */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
            Ready to start?
          </p>

          <h2 className="text-4xl font-bold leading-tight text-zinc-900 md:text-6xl lg:text-7xl mb-6">
            Stop chasing leads. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              Start growing.
            </span>
          </h2>

          <p className="text-base md:text-xl text-zinc-600 leading-relaxed mb-10 max-w-2xl mx-auto">
            Build systems that bring you work while you sleep.
          </p>

          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-10">
             <StepPill text="1. Quick Chat" />
             <StepPill text="2. Fixed Proposal" />
             <StepPill text="3. Launch & Grow" />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700 uppercase tracking-wide text-center">
            <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            Accepting projects for {new Date().toLocaleString('default', { month: 'long' })}
          </div>
        </div>


        {/* === BOTTOM ROW: CONTACT CARD === */}
        <div className="w-full max-w-2xl relative">
          <div className="absolute -inset-1 bg-gradient-to-b from-indigo-100 to-transparent rounded-[2.5rem] blur-xl opacity-70 -z-10" />

          <div className="relative overflow-hidden rounded-[2.5rem] border border-zinc-200 bg-white p-6 md:p-10 shadow-2xl shadow-indigo-500/10">

            {/* Swipeable Reviews */}
            <div ref={reviewRef} className="mb-8 relative">
              <div
                ref={scrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 no-scrollbar -mx-6 px-6 md:-mx-10 md:px-10"
              >
                {REVIEWS.map((r, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-full snap-center [scroll-snap-stop:always]"
                  >
                    <div className="bg-zinc-50/50 p-6 rounded-3xl border border-zinc-100 relative overflow-hidden h-[200px] flex flex-col">
                      <div className="flex items-center gap-3 mb-3 relative z-10">
                        <div
                          className="h-10 w-10 shrink-0 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm ring-2 ring-white/50"
                          style={{ backgroundColor: r.color }}
                        >
                          {r.initial}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-zinc-900 leading-none">{r.name}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, j) => (
                                <Star key={j} className={`h-3 w-3 fill-amber-400 text-amber-400 ${isReviewVisible ? 'animate-in zoom-in-50 fade-in duration-300' : 'opacity-0'}`} style={{ animationDelay: `${j * 100}ms` }} />
                              ))}
                            </div>
                            <span className="text-[10px] text-zinc-400 font-medium">{r.badge}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-zinc-600 leading-relaxed italic relative z-10 overflow-y-auto flex-1">
                        &quot;{r.text}&quot;
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => scrollToReview('left')}
                  className="p-2 rounded-full bg-zinc-100 text-zinc-500 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="flex gap-2">
                  {REVIEWS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 rounded-full transition-all ${i === activeReview ? 'w-6 bg-indigo-600' : 'w-2 bg-zinc-200'}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => scrollToReview('right')}
                  className="p-2 rounded-full bg-zinc-100 text-zinc-500 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                  aria-label="Next review"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3 px-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Fastest Response</p>
                <span className="flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-bold text-emerald-700 uppercase">Online</span>
                </span>
              </div>
              <a
                href="https://wa.me/447887034503?text=Hi%20Finn%2C%20I%27d%20like%20to%20discuss%20a%20project."
                className="group relative flex w-full items-center justify-center gap-3 rounded-2xl bg-indigo-600 px-6 py-5 text-base font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
              >
                <MessageCircle className="h-6 w-6 fill-white/20 shrink-0" />
                <span>Chat on WhatsApp</span>
                <ArrowRight className="h-5 w-5 opacity-50 -ml-4 transition-all group-hover:opacity-100 group-hover:ml-0" />
              </a>
            </div>

            {/* Email */}
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="h-px bg-zinc-100 flex-1" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300">Or Email Me</span>
                <div className="h-px bg-zinc-100 flex-1" />
              </div>

              <div className="group flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-2 sm:p-1.5 transition-colors hover:border-indigo-200 hover:bg-white">

                <div className="flex items-center gap-3 flex-1 px-2 sm:px-0">
                  <div className="h-10 w-10 flex shrink-0 items-center justify-center bg-white rounded-lg border border-zinc-200 shadow-sm text-zinc-400 group-hover:text-indigo-600 transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-zinc-700 break-all sm:break-normal">hello@jefferissoftware.co.uk</span>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="h-10 w-full sm:w-auto px-4 flex items-center justify-center gap-2 rounded-lg bg-white border border-zinc-200 text-xs font-bold text-zinc-500 shadow-sm hover:text-indigo-600 hover:border-indigo-200 active:scale-95 transition-all"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

function StepPill({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-bold text-zinc-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50/50">
      <Check className="h-4 w-4 text-indigo-600" />
      <span>{text}</span>
    </div>
  );
}
