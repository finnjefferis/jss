"use client";


import Image from "next/image";
import { ArrowRight, X, ExternalLink, ChevronRight, Check, ArrowLeft } from "lucide-react";
import { useState, useRef, useEffect } from "react";
// --- DATA ---
type ProjectKey = "naxco" | "edivert" | "carbon" | "toolbox" | "ivy" |"jmrt" |  null;

const PROJECTS = [
  {
    key: "edivert" as const,
    title: "eDivert",
    role: "Website Refresh",
    summary: "Modern refresh for a virtual assistant company. The old site wasn't converting — now it does.",
    image: "/edivertnew.png",
    alt: "eDivert website",
    tags: ["Design", "Dev", "SEO"],
    link: 'https://www.edivert.co.uk/'
  },
    {
    key: "ivy" as const,
    title: "Ivy Arch Studios",
    role: "Website Refresh",
    summary: "New website for a local practice room featuring booking system.",
    image: "/ivyarch.png",
    alt: "Ivy Arch Studios website",
    tags: ["Design", "Dev", "SEO"],
    link: 'https://ivy-arch.vercel.app/'
  },
    {
    key: "jmrt" as const,
    title: "JMRT Photo",
    role: "Website Refresh",
    summary: "Bespoke website for a local photographer featuring a full CMS system allowing the client to update their content regularly.",
    image: "/jmrt.png",
    alt: "JMRT website",
    tags: ["Design", "Dev", "SEO"],
    link: 'https://jmrt-photo.vercel.app/'
  },
  {
    key: "naxco" as const,
    title: "Naxco Services",
    role: "Website Refresh",
    summary: "Complete homepage rebuild for a local trades business. Focused on trust, clarity, and conversion.",
    image: "/naxco1.png",
    alt: "Naxco Services website",
    tags: ["Design", "Dev", "Copy"],
    link: "https://naxco.co.uk"
  },
  {
    key: "toolbox" as const,
    title: "Toolbox Platform",
    role: "Dashboard UI",
    summary: "A .NET procurement dashboard for tracking millions in cost savings across multiple suppliers.",
    image: "/gtoolbox.png", 
    alt: "Toolbox platform dashboard",
    tags: [".NET MVC", "Data", "Reporting"],
    link: null
  },
  {
    key: "carbon" as const,
    title: "Carbon Calculator",
    role: "Web Application",
    summary: "Interactive tool for generating carbon footprint reports and syncing data to the client CRM.",
    image: "/calc.png", 
    alt: "Carbon calculator application",
    tags: ["React", "CRM Sync", "PDF Gen"],
    link: null
  },
];

export function RecentWorkSection() {
  const [activeProject, setActiveProject] = useState<ProjectKey>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Manual Scroll Buttons - scroll by card width (600px + 24px gap on desktop)
  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = 624; // 600px card + 24px gap
    scrollRef.current.scrollBy({ left: direction === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' });
  };

  return (
    <section id="recent-work" className="mb-24 md:mb-32 overflow-hidden relative py-12">
      
      {/* Background Decor */}
      <div className="pointer-events-none absolute right-0 top-20 h-96 w-96 bg-indigo-500/5 blur-3xl rounded-full -z-10" />

      {/* Header */}
      <div className="mx-auto max-w-6xl px-5 md:px-8 mb-12">
        <div className="max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
            Selected Projects
          </p>
          <h2 className="text-3xl font-bold leading-tight text-zinc-900 dark:text-zinc-100 md:text-4xl lg:text-5xl">
            Digital products that <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              deliver.
            </span>
          </h2>
        </div>
      </div>

      {/* SLIDER WRAPPER - Relative positioning for the buttons */}
      <div className="relative w-full group/slider">
        
        {/* --- OVERLAY BUTTONS (Desktop Only) --- */}
        {/* Left Button */}
        <button 
          onClick={() => scroll('left')} 
          className="absolute left-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center p-4 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm text-indigo-600 border border-white/20 dark:border-zinc-700/20 shadow-xl shadow-indigo-900/5 hover:scale-110 hover:bg-white dark:hover:bg-zinc-800 transition-all active:scale-95"
          aria-label="Scroll left"
        >
           <ArrowLeft className="h-6 w-6" />
        </button>

        {/* Right Button */}
        <button 
          onClick={() => scroll('right')} 
          className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center p-4 rounded-full bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 hover:scale-110 hover:bg-indigo-700 transition-all active:scale-95"
          aria-label="Scroll right"
        >
           <ArrowRight className="h-6 w-6" />
        </button>

        {/* --- SCROLL CONTAINER --- */}
        <div 
          ref={scrollRef}
          className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth pb-12 pt-4 px-5 md:px-8 gap-6 no-scrollbar overscroll-x-contain"
        >
          {/* Spacer for left alignment on big screens */}
          <div className="hidden xl:block w-[calc((100vw-72rem)/2-2rem)] flex-shrink-0" />

          {PROJECTS.map((project) => (
            <div
              key={project.key}
              className="flex-shrink-0 w-[85vw] md:w-[600px] snap-center [scroll-snap-stop:always]"
            >
              <article 
                onClick={() => setActiveProject(project.key)}
                className="group relative h-full flex flex-col overflow-hidden rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl shadow-indigo-500/5 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/15 cursor-pointer ring-0 hover:ring-2 hover:ring-indigo-500/50"
              >
                {/* Image Area */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  
                  {/* Purple Badge */}
                  <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                     {project.tags.map(tag => (
                        <span key={tag} className="backdrop-blur-md bg-white/95 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-indigo-700 border border-indigo-100 shadow-sm">
                          {tag}
                        </span>
                     ))}
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <h3 className="mb-3 text-2xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-zinc-600 dark:text-zinc-400 mb-6">
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
            </div>
          ))}
          
          {/* Spacer for right alignment */}
          <div className="hidden xl:block w-[calc((100vw-72rem)/2-2rem)] flex-shrink-0" />
        </div>
      </div>

      {/* MODAL ORCHESTRATOR */}
      {activeProject && (
        <ProjectModal 
          isOpen={!!activeProject} 
          onClose={() => setActiveProject(null)}
          project={PROJECTS.find(p => p.key === activeProject)!}
        />
      )}
    </section>
  );
}

function ProjectModal({ isOpen, onClose, project }: { isOpen: boolean; onClose: () => void; project: typeof PROJECTS[0] }) {
  
  // FIX: Use useEffect to manage body scroll locking
  useEffect(() => {
    // Lock scroll when component mounts (modal opens)
    document.body.style.overflow = 'hidden';

    // Unlock scroll when component unmounts (modal closes)
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center sm:p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden rounded-t-[2rem] md:rounded-[2rem] bg-white dark:bg-zinc-900 shadow-2xl animate-in slide-in-from-bottom-8 duration-500">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 py-4 sticky top-0 z-20">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{project.title}</h3>
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide">{project.role}</p>
          </div>
          <button 
            onClick={onClose}
            className="rounded-full bg-zinc-100 dark:bg-zinc-800 p-2 text-zinc-500 dark:text-zinc-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 md:p-10 space-y-10">
          
          {/* NAXCO SPECIFIC CONTENT */}
          {project.key === 'naxco' && (
             <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <div>
                    <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">The Challenge</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                      Naxco is a local property maintenance company. Their old site was text-heavy, hard to navigate on mobile, and wasn't generating leads.
                    </p>
                    <ul className="space-y-3">
                      {["Clarify service offering", "Add Trust Signals", "Easy WhatsApp Booking"].map(item => (
                        <li key={item} className="flex gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                            <Check className="h-3 w-3" />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-indigo-700 transition-all">
                        Visit Live Site <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200 shadow-lg">
                     <Image src="/naxco1.png" alt="Naxco full screen" fill className="object-cover" />
                  </div>
                </div>

                <div className="rounded-3xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 p-6 md:p-8">
                   <div className="mb-6">
                      <h4 className="text-lg font-bold text-indigo-900 dark:text-indigo-300">Before & After</h4>
                      <p className="text-sm text-indigo-600/80">Drag the slider to see the transformation.</p>
                   </div>
                   <ComparisonSlider beforeSrc="/naxold.png" afterSrc="/naxnew.png" />
                </div>
             </div>
          )}

          {/* EDIVERT SPECIFIC CONTENT */}
          {project.key === 'edivert' && (
             <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <div>
                    <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">The Challenge</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                      eDivert is a virtual assistant and personal assistant company. Their old website wasn't working for them — outdated design, poor mobile experience, and no enquiries coming through. We refreshed it so it actually converts.
                    </p>
                    <ul className="space-y-3">
                      {["Modern, professional design", "Mobile-first approach", "Clear calls to action"].map(item => (
                        <li key={item} className="flex gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                            <Check className="h-3 w-3" />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200 shadow-lg">
                     <Image src="/edivafter.png" alt="eDivert new website" fill className="object-cover object-top" />
                  </div>
                </div>

                <div className="rounded-3xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 p-6 md:p-8">
                   <div className="mb-6">
                      <h4 className="text-lg font-bold text-indigo-900 dark:text-indigo-300">Before & After</h4>
                      <p className="text-sm text-indigo-600/80">Drag the slider to see the transformation.</p>
                   </div>
                   <ComparisonSlider beforeSrc="/edivbefore.png" afterSrc="/edivafter.png" />
                </div>
             </div>
          )}

          {/* GENERIC CONTENT FOR OTHER PROJECTS */}
          {project.key !== 'naxco' && project.key !== 'edivert' && (
            <div className="max-w-2xl mx-auto text-center space-y-6">
               <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-zinc-200 shadow-sm">
                  <Image src={project.image} alt={project.title} fill className="object-cover" />
               </div>
               <div>
                  <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Project Overview</h4>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{project.summary}</p>
               </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 md:p-6 text-center shrink-0">
           <button
             onClick={onClose}
             className="w-full md:w-auto rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 px-8 py-3 text-sm font-bold shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-indigo-600 transition-colors"
           >
             Close Project
           </button>
        </div>
      </div>
    </div>
  );
}

function ComparisonSlider({ beforeSrc, afterSrc }: { beforeSrc: string, afterSrc: string }) {
    const [position, setPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
  
    const handleMove = (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setPosition(percentage);
    };
  
    return (
      <div 
        ref={containerRef}
        className="relative h-[250px] md:h-[400px] w-full overflow-hidden rounded-2xl cursor-col-resize select-none border-4 border-white shadow-2xl shadow-indigo-500/10"
        onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onClick={(e) => handleMove(e.clientX)}
      >
        <Image src={beforeSrc} alt="Before" fill className="object-contain bg-white" draggable={false} />
        
        <div className="absolute top-4 right-4 z-10 rounded-full bg-zinc-900/80 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md border border-white/10">Old Site</div>
        
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image src={afterSrc} alt="After" fill className="object-contain bg-white" draggable={false} />
        </div>
        
        <div className="absolute top-4 left-4 z-10 rounded-full bg-indigo-600/90 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md border border-white/10">New Design</div>
  
        {/* Divider Line */}
        <div className="absolute inset-y-0 w-1 bg-white cursor-col-resize shadow-[0_0_20px_rgba(0,0,0,0.5)]" style={{ left: `${position}%` }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-indigo-600 border-2 border-white shadow-lg flex items-center justify-center">
             <div className="flex gap-0.5">
               <ChevronRight className="h-4 w-4 text-white rotate-180" />
               <ChevronRight className="h-4 w-4 text-white" />
             </div>
          </div>
        </div>
      </div>
    );
  }