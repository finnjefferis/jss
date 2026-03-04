"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useState, useRef, useEffect } from "react";

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
  const [activeCard, setActiveCard] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = 464;
    scrollRef.current.scrollBy({ left: direction === "left" ? -cardWidth : cardWidth, behavior: "smooth" });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth =
        container.firstElementChild?.nextElementSibling
          ? (container.firstElementChild.nextElementSibling as HTMLElement).offsetWidth + 24
          : container.clientWidth * 0.85 + 24;
      setActiveCard(Math.min(Math.round(scrollLeft / cardWidth), PROJECTS.length - 1));
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="recent-work" className="mb-24 md:mb-32 overflow-hidden relative py-12">

      <div className="pointer-events-none absolute right-0 top-20 h-96 w-96 bg-indigo-500/5 blur-3xl rounded-full -z-10" />

      <div className="mx-auto max-w-6xl px-5 md:px-8 mb-12">
        <div className="max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
            Selected Projects
          </p>
          <h2 className="text-3xl font-bold leading-tight text-zinc-900 dark:text-zinc-100 md:text-4xl">
            Digital products that{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              deliver.
            </span>
          </h2>
          <p className="mt-3 text-sm text-zinc-400 dark:text-zinc-500 md:hidden flex items-center gap-2">
            Swipe to explore {PROJECTS.length} projects
            <ArrowRight className="h-3.5 w-3.5 animate-pulse" />
          </p>
        </div>
      </div>

      <div className="relative w-full group/slider">

        <button
          onClick={() => scroll("left")}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center p-4 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm text-indigo-600 border border-white/20 dark:border-zinc-700/20 shadow-xl shadow-indigo-900/5 hover:scale-110 hover:bg-white dark:hover:bg-zinc-800 transition-all active:scale-95"
          aria-label="Scroll left"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center p-4 rounded-full bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 hover:scale-110 hover:bg-indigo-700 transition-all active:scale-95"
          aria-label="Scroll right"
        >
          <ArrowRight className="h-6 w-6" />
        </button>

        <div
          ref={scrollRef}
          className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth pb-12 pt-4 px-5 md:px-8 gap-6 no-scrollbar overscroll-x-contain"
        >
          <div className="hidden xl:block w-[calc((100vw-72rem)/2-2rem)] flex-shrink-0" />

          {PROJECTS.map((project) => (
            <div
              key={project.key}
              className="flex-shrink-0 w-[85vw] md:w-[440px] snap-center [scroll-snap-stop:always]"
            >
              <Link href={project.href} className="block h-full">
                <article className="group relative h-full flex flex-col overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-xl shadow-indigo-500/5 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/15 ring-0 hover:ring-2 hover:ring-indigo-500/50">

                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <Image
                      src={project.image}
                      alt={project.alt}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="backdrop-blur-md bg-white/95 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-indigo-700 border border-indigo-100 shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">{project.role}</p>
                    <h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 mb-4">
                      {project.summary}
                    </p>
                    <div className="mt-auto flex items-center gap-2 text-sm font-bold text-indigo-600">
                      <span className="border-b-2 border-indigo-100 group-hover:border-indigo-600 transition-colors pb-0.5">
                        View Case Study
                      </span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>

                </article>
              </Link>
            </div>
          ))}

          <div className="hidden xl:block w-[calc((100vw-72rem)/2-2rem)] flex-shrink-0" />
        </div>

        <div className="flex justify-center gap-1.5 md:hidden mt-2">
          {PROJECTS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === activeCard ? "w-6 bg-indigo-600" : "w-1.5 bg-zinc-200 dark:bg-zinc-700"}`}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
