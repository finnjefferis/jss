"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Lightbulb, Key, Zap, ArrowRight, ChevronDown, X } from "lucide-react";
import Link from "next/link";
import { NavHeader } from "../../components/NavHeader";
import { Footer } from "../../components/Footer";
import { INDUSTRIES, searchIndustries, type IndustryTip } from "./data";

export default function IndustryTipsPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<IndustryTip | null>(null);
  const [suggestions, setSuggestions] = useState<IndustryTip[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length >= 2) {
      const matches = searchIndustries(query);
      setSuggestions(matches);
      setShowSuggestions(matches.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function selectIndustry(industry: IndustryTip) {
    setSelected(industry);
    setQuery(industry.name);
    setShowSuggestions(false);
    setResultsVisible(false);

    // Animate results in after a short delay
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setResultsVisible(true);
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      });
    });
  }

  function clear() {
    setSelected(null);
    setQuery("");
    setResultsVisible(false);
    inputRef.current?.focus();
  }

  return (
    <>
      <NavHeader />
      <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors">

        {/* Hero / Search section */}
        <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
          {/* Background orbs */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-coral-500/5 dark:bg-coral-500/3 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-pink-500/5 dark:bg-pink-500/3 rounded-full blur-3xl" />
          </div>

          <div className="mx-auto max-w-3xl px-5 md:px-8 relative z-10 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400">
              Free Tool
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-zinc-900 dark:text-white md:text-5xl lg:text-6xl mb-5">
              Get tips for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-500 to-pink-500">
                your industry.
              </span>
            </h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto mb-12 leading-relaxed">
              Enter your industry below. We&apos;ll give you the keywords, tips, and quick wins
              to get your business found online.
            </p>

            {/* Search bar */}
            <div ref={dropdownRef} className="relative max-w-xl mx-auto">
              <div className={`relative flex items-center rounded-2xl border-2 bg-white dark:bg-zinc-900 transition-all duration-300 shadow-lg ${
                showSuggestions || selected
                  ? "border-coral-500 shadow-coral-500/10"
                  : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
              }`}>
                <Search className="absolute left-5 h-5 w-5 text-zinc-400 dark:text-zinc-500" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    if (selected) setSelected(null);
                  }}
                  onFocus={() => {
                    if (suggestions.length > 0) setShowSuggestions(true);
                  }}
                  placeholder="Search your industry (e.g. plumber, salon, restaurant...)"
                  className="w-full rounded-2xl bg-transparent py-5 pl-14 pr-12 text-base text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none"
                  autoComplete="off"
                />
                {query && (
                  <button
                    onClick={clear}
                    className="absolute right-5 h-6 w-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Suggestions dropdown */}
              {showSuggestions && (
                <div className="absolute left-0 right-0 top-full mt-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl overflow-hidden z-50">
                  {suggestions.map((ind) => (
                    <button
                      key={ind.id}
                      onClick={() => selectIndustry(ind)}
                      className="flex w-full items-center gap-3 px-5 py-3.5 text-left hover:bg-coral-50 dark:hover:bg-coral-950/30 transition-colors"
                    >
                      <Search className="h-4 w-4 text-zinc-400 shrink-0" />
                      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">{ind.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Browse all hint */}
            {!selected && (
              <BrowseAll onSelect={selectIndustry} />
            )}
          </div>
        </section>

        {/* Results */}
        {selected && (
          <section
            ref={resultsRef}
            className={`pb-20 md:pb-32 transition-all duration-700 ${
              resultsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="mx-auto max-w-5xl px-5 md:px-8">

              {/* Keywords */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <Key className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Keywords to target</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      What your customers are searching for. Replace [town] with your location.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selected.keywords.map((kw) => (
                    <div
                      key={kw}
                      className="flex items-center gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 py-3.5 group hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                    >
                      <Search className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300 font-medium">{kw}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-coral-500 to-pink-600 flex items-center justify-center">
                    <Lightbulb className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Tips for {selected.name}</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Actionable advice to improve your online presence.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {selected.tips.map((tip, i) => (
                    <div
                      key={tip.title}
                      className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 hover:border-coral-300 dark:hover:border-coral-700 transition-colors"
                    >
                      <div className="h-8 w-8 rounded-lg bg-coral-50 dark:bg-coral-950/50 flex items-center justify-center mb-4">
                        <span className="text-sm font-bold text-coral-600 dark:text-coral-400">{i + 1}</span>
                      </div>
                      <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-2 leading-snug">{tip.title}</h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{tip.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Wins */}
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Quick wins</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Things you can do today to make a difference.
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 divide-y divide-zinc-100 dark:divide-zinc-800 overflow-hidden">
                  {selected.quickWins.map((win) => (
                    <div key={win} className="flex items-start gap-4 px-6 py-4">
                      <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                        <Zap className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{win}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="relative rounded-3xl border border-zinc-200 dark:border-zinc-700/50 bg-white dark:bg-zinc-900 p-8 md:p-12 text-center overflow-hidden">
                <div className="pointer-events-none absolute -inset-1 bg-gradient-to-br from-coral-400/10 via-transparent to-pink-400/10 rounded-[2rem] blur-xl" />
                <div className="relative">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">{selected.ctaText}</p>
                  <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-2 md:text-3xl">
                    Want us to do this for you?
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 max-w-md mx-auto">
                    Book a free 30-minute call and we&apos;ll audit your current site, explain what&apos;s holding you back,
                    and tell you exactly what we&apos;d do differently.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      href="/#contact"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-coral-600 hover:bg-coral-700 px-8 py-4 text-sm font-bold text-white transition-colors"
                    >
                      Book a free call
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/#services"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-700 px-8 py-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors"
                    >
                      See packages & pricing
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  );
}

function BrowseAll({ onSelect }: { onSelect: (ind: IndustryTip) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-8">
      <button
        onClick={() => setOpen(!open)}
        className="mx-auto flex items-center gap-2 text-sm font-medium text-zinc-400 dark:text-zinc-500 hover:text-coral-500 dark:hover:text-coral-400 transition-colors"
      >
        Or browse all industries
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="mt-4 flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
          {INDUSTRIES.map((ind) => (
            <button
              key={ind.id}
              onClick={() => onSelect(ind)}
              className="rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:border-coral-400 dark:hover:border-coral-500 hover:text-coral-600 dark:hover:text-coral-400 transition-colors"
            >
              {ind.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
