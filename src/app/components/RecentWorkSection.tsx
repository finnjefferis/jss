"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { useReveal } from "../hooks/useReveal";

type ProjectKey = "naxco" | "edivert" | "carbon" | "toolbox" | "ivy" | "jmrt";

const PROJECTS = [
  {
    key: "edivert" as ProjectKey,
    title: "eDivert",
    role: "Website Refresh",
    summary: "Modern refresh for a virtual assistant company. The old site wasn't converting. Now it does.",
    image: "/edivertnew.png",
    alt: "eDivert website",
    tags: ["Design", "Dev", "SEO"],
    href: "/work/edivert",
  },
  {
    key: "ivy" as ProjectKey,
    title: "Ivy Arch Studios",
    role: "Website Refresh",
    summary: "New website for a local practice room featuring booking system.",
    image: "/ivyarch.png",
    alt: "Ivy Arch Studios website",
    tags: ["Design", "Dev", "SEO"],
    href: "/work/ivy",
  },
  {
    key: "jmrt" as ProjectKey,
    title: "JMRT Photo",
    role: "Website + CMS",
    summary: "Bespoke website for a local photographer featuring a full CMS system allowing the client to update their content regularly.",
    image: "/jmrt.png",
    alt: "JMRT website",
    tags: ["Design", "Dev", "SEO"],
    href: "/work/jmrt",
  },
  {
    key: "naxco" as ProjectKey,
    title: "Naxco Services",
    role: "Website Refresh",
    summary: "Complete homepage rebuild for a local trades business. Focused on trust, clarity, and conversion.",
    image: "/naxco1.png",
    alt: "Naxco Services website",
    tags: ["Design", "Dev", "Copy"],
    href: "/work/naxco",
  },
  {
    key: "toolbox" as ProjectKey,
    title: "Toolbox Platform",
    role: "Bespoke Software",
    summary: "A .NET procurement dashboard for tracking millions in cost savings across multiple suppliers.",
    image: "/gtoolbox.png",
    alt: "Toolbox platform dashboard",
    tags: [".NET MVC", "Data", "Reporting"],
    href: "/work/toolbox",
  },
  {
    key: "carbon" as ProjectKey,
    title: "Carbon Calculator",
    role: "Bespoke Software",
    summary: "Interactive tool for generating carbon footprint reports and syncing data to the client CRM.",
    image: "/calc.png",
    alt: "Carbon calculator application",
    tags: ["React", "CRM Sync", "PDF Gen"],
    href: "/work/carbon",
  },
];

export function RecentWorkSection() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useReveal<HTMLDivElement>(0.3);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const goTo = useCallback((idx: number) => {
    const next = Math.max(0, Math.min(idx, PROJECTS.length - 1));
    setActive(next);
    setCanPrev(next > 0);
    setCanNext(next < PROJECTS.length - 1);
  }, []);

  // Sync scroll position on swipe (mobile)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const card = track.querySelector("[data-card]") as HTMLElement | null;
        if (!card) { ticking = false; return; }
        const gap = 24;
        const w = card.offsetWidth + gap;
        const idx = Math.round(track.scrollLeft / w);
        goTo(idx);
        ticking = false;
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [goTo]);

  // Scroll track to active card on button click (desktop uses transform, mobile uses scrollLeft)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Only programmatic-scroll on mobile where we use native scroll
    if (window.innerWidth < 768) {
      const card = track.querySelector("[data-card]") as HTMLElement | null;
      if (!card) return;
      const gap = 24;
      track.scrollTo({ left: active * (card.offsetWidth + gap), behavior: "smooth" });
    }
  }, [active]);

  return (
    <section id="recent-work" className="mb-24 md:mb-32 py-16 md:py-24 overflow-hidden">

      {/* Header row */}
      <div ref={headerRef} className="mx-auto max-w-6xl px-5 md:px-8 mb-10 md:mb-14">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p data-reveal style={{ "--d": 0 } as React.CSSProperties} className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
              Selected Projects
            </p>
            <h2 data-reveal style={{ "--d": 80 } as React.CSSProperties} className="text-3xl font-bold leading-tight text-zinc-900 dark:text-zinc-100 md:text-4xl">
              Digital products that{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-600 to-pink-600 inline-block" data-gradient style={{ "--gd": 300 } as React.CSSProperties}>
                deliver.
              </span>
            </h2>
          </div>

          {/* Desktop nav arrows — inline in the header, Apple-store style */}
          <div data-reveal style={{ "--d": 160 } as React.CSSProperties} className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={() => goTo(active - 1)}
              disabled={!canPrev}
              aria-label="Previous project"
              className="flex items-center justify-center h-11 w-11 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => goTo(active + 1)}
              disabled={!canNext}
              aria-label="Next project"
              className="flex items-center justify-center h-11 w-11 rounded-full bg-coral-600 text-white shadow-sm shadow-coral-600/20 transition-all hover:bg-coral-700 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Cards — CSS transform carousel on md+, native scroll on mobile */}
      <div className="relative">

        {/* Desktop: overflow-visible sliding track */}
        <div className="hidden md:block overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out pl-[max(1.25rem,calc((100vw-72rem)/2+2rem))]"
            style={{ transform: `translateX(-${active * (440 + 24)}px)` }}
          >
            {PROJECTS.map((project, i) => (
              <div key={project.key} data-card className="w-[440px] shrink-0">
                <ProjectCard project={project} isActive={i === active} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: native horizontal scroll */}
        <div
          ref={trackRef}
          className="md:hidden flex gap-6 overflow-x-auto snap-x snap-mandatory px-5 pb-2 no-scrollbar overscroll-x-contain"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {PROJECTS.map((project, i) => (
            <div key={project.key} data-card className="w-[85vw] shrink-0 snap-center [scroll-snap-stop:always]">
              <ProjectCard project={project} isActive={i === active} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile dots */}
      <div className="flex justify-center gap-1.5 md:hidden mt-5">
        {PROJECTS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to project ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-coral-600" : "w-1.5 bg-zinc-200 dark:bg-zinc-700"}`}
          />
        ))}
      </div>

      {/* Counter — Apple-style "1 / 6" */}
      <div className="hidden md:flex justify-center mt-8">
        <p className="text-sm font-medium text-zinc-400 dark:text-zinc-500 tabular-nums">
          {active + 1} / {PROJECTS.length}
        </p>
      </div>
    </section>
  );
}

function ProjectCard({ project, isActive }: { project: (typeof PROJECTS)[number]; isActive: boolean }) {
  return (
    <Link href={project.href} className="block h-full">
      <article
        className={`group relative h-full flex flex-col overflow-hidden rounded-2xl border bg-white dark:bg-zinc-900 transition-all duration-500 ${
          isActive
            ? "border-coral-200 dark:border-coral-800 shadow-xl shadow-coral-500/10 md:scale-100"
            : "border-zinc-200 dark:border-zinc-800 shadow-md md:scale-[0.97] md:opacity-60"
        } md:hover:shadow-2xl md:hover:shadow-coral-500/15`}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={project.image}
            alt={project.alt}
            fill
            sizes="(max-width: 768px) 85vw, 440px"
            className="object-cover transition duration-700 group-hover:scale-105"
            loading={project.key === "edivert" ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-coral-700 border border-coral-100 shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5 md:p-6">
          <p className="text-[10px] font-bold uppercase tracking-wider text-coral-600 dark:text-coral-400 mb-1">{project.role}</p>
          <h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-coral-600 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 mb-4">
            {project.summary}
          </p>
          <div className="mt-auto flex items-center gap-2 text-sm font-bold text-coral-600">
            <span className="border-b-2 border-coral-100 group-hover:border-coral-600 transition-colors pb-0.5">
              View Case Study
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </article>
    </Link>
  );
}
