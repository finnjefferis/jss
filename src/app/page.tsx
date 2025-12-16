"use client";

import Image from "next/image";
import { useEffect, useState, useMemo, useRef } from "react"; 
import { PricingTiers } from "./components/PricingTiers";
import { ValueProposition } from "./components/ValueProposition";
import { ContactSection } from './components/ContactUs';
import { MobileGrowthSwiper } from "./components/HeroVisualMobile";
// Note: If you have HeroText / HeroVisuals in separate files, import them. 
// Since they were in the same file in your snippet, I kept them below.

type WordPair = { from: string; to: string };

const WORD_PAIRS: WordPair[] = [
  { from: "clicks",     to: "enquiries." },
  { from: "visits",     to: "bookings." },
  { from: "chaos",      to: "clarity." },
  { from: "DIY",        to: "done-for-you." },
];

// 1. Create a reusable "Cage" component for the narrow sections
function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto max-w-6xl px-5 md:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}

export default function Page() {
  // --- STATE FOR MOBILE MENU ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Helper to close menu when a link is clicked
  const handleLinkClick = () => setIsMenuOpen(false);

  return (
    <main className="min-h-screen w-full bg-white relative">
      
      {/* Top Bar */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-500 z-50"></div>

      <Container>
        <header className="relative flex items-center justify-between gap-6 py-6 border-b border-zinc-200 z-40">
          <h1 className="flex items-center md:text-xl gap-2 text-sm font-semibold tracking-wide">
            <div className="relative h-10 w-9 shrink-0">
              <Image
                src="/jsslogo.png"
                alt="Jefferis Software Solutions logo"
                fill
                sizes="40px"
                priority
                className="rounded-lg"
              />
            </div>
            <span className="h-4 w-4 rounded-full bg-indigo-500"></span>
            Jefferis Software Solutions
          </h1>
          
          {/* DESKTOP CONTACT BUTTON (Hidden on mobile) */}
          <a
            href="https://wa.me/447887034503"
            className="hidden md:inline-flex rounded-md bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-indigo-700 hover:to-indigo-600"
          >
            Contact Us
          </a>

          {/* MOBILE MENU TOGGLE (Visible on mobile only) */}
          <button 
            className="md:hidden p-2 -mr-2 text-zinc-600 hover:bg-zinc-100 rounded-md transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              // Close Icon (X)
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Menu Icon (Hamburger)
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </header>
        
        {/* MOBILE MENU DROPDOWN */}
        {/* This sits absolutely positioned below the header */}
        {isMenuOpen && (
          <div className="absolute left-0 right-0 top-[88px] z-50 border-b border-zinc-200 bg-white/95 backdrop-blur-md shadow-xl md:hidden animate-in slide-in-from-top-2 duration-200">
             <Container>
               <nav className="flex flex-col py-6 gap-4 text-center">
                 <a href="#process" onClick={handleLinkClick} className="text-sm font-medium text-zinc-600 hover:text-indigo-600 py-2">
                   The Process
                 </a>
                 <a href="#services" onClick={handleLinkClick} className="text-sm font-medium text-zinc-600 hover:text-indigo-600 py-2">
                   Services
                 </a>
                 <a href="#recent-work" onClick={handleLinkClick} className="text-sm font-medium text-zinc-600 hover:text-indigo-600 py-2">
                   Recent Work
                 </a>
                 <hr className="border-zinc-100 my-1" />
                 <a
                    href="https://wa.me/447887034503"
                    onClick={handleLinkClick}
                    className="inline-flex w-full justify-center rounded-md bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-3 text-sm font-medium text-white shadow-sm"
                  >
                    Contact Us
                  </a>
               </nav>
             </Container>
          </div>
        )}

     
        <section className="relative mb-10 md:mt-12 pb-16 grid min-h-[60vh] grid-cols-1 items-center gap-10 md:min-h-[50vh] md:grid-cols-2">
          <HeroText />
          <HeroVisualDesktop />

          {/* TINY BOUNCING ARROW */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pb-4">
            <a 
              href="#process" 
              className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-700 animate-bounce"
              aria-label="Scroll down"
            >
              <svg 
                className="h-4 w-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </section>
        
      </Container>

      <ValueProposition />

      <Container>
        <section id="services" className="mb-28 ">
          <PricingTiers /> 
        </section>

        <RecentWorkSection />
        <ContactSection />
      </Container>

      <footer className="border-t border-zinc-200 py-8 text-center text-xs text-zinc-500">
        <Container>
          © {new Date().getFullYear()} Jefferis Software Solutions
        </Container>
      </footer>
    </main>
  );
}

export function HeroText() {
  const [sequence, setSequence] = useState<WordPair[]>(WORD_PAIRS);
  const [pairIndex, setPairIndex] = useState(0);
  const [textFrom, setTextFrom] = useState("");
  const [textTo, setTextTo] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  
  const { maxFrom, maxTo } = useMemo(() => {
    return WORD_PAIRS.reduce(
      (acc, pair) => ({
        maxFrom: pair.from.length > acc.maxFrom.length ? pair.from : acc.maxFrom,
        maxTo: pair.to.length > acc.maxTo.length ? pair.to : acc.maxTo,
      }),
      { maxFrom: "", maxTo: "" } 
    );
  }, []);

  useEffect(() => {
    const currentPair = sequence[pairIndex];
    const isLastPair = pairIndex === sequence.length - 1;
    
    const handleTyping = () => {
      const fullFrom = currentPair.from;
      const fullTo = currentPair.to;

      const isFullFrom = textFrom === fullFrom;
      const isFullTo = textTo === fullTo;
      const isFullyTyped = isFullFrom && isFullTo;
      const isFullyDeleted = textFrom === '' && textTo === '';

      if (isDeleting) {
        setTextFrom((prev) => prev.slice(0, -1));
        setTextTo((prev) => prev.slice(0, -1));
        setTypingSpeed(50); 
        if (isFullyDeleted) {
          setIsDeleting(false);
          setPairIndex((prev) => prev + 1);
          setTypingSpeed(100);
        }
      } else {
        if (!isFullFrom) setTextFrom(fullFrom.slice(0, textFrom.length + 1));
        if (!isFullTo) setTextTo(fullTo.slice(0, textTo.length + 1));
        setTypingSpeed(100);
        if (isFullyTyped) {
          if (isLastPair) return; 
          setTimeout(() => setIsDeleting(true), 2000); 
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [textFrom, textTo, isDeleting, pairIndex, sequence, typingSpeed]);

  return (
    <div className="mt-12 md:pt-6 md:pb-10">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
        Websites & social for local businesses
      </p>

      {/* UPDATED: Increased text size to 6xl on md and 7xl on lg */}
      <h2 className="hero-delay-2 cal-sans mt-8 text-4xl font-semibold leading-tight md:text-6xl lg:text-6xl">
        Turn{' '}
        
        <span className="relative inline-grid grid-cols-1 text-center min-w-[6ch]">
          <span className="invisible col-start-1 row-start-1 whitespace-pre">
            {maxFrom}
          </span>
       
          <span className="col-start-1 row-start-1 text-zinc-700">
            {textFrom}
            {(pairIndex !== sequence.length - 1 || isDeleting || textFrom !== currentPairFrom(sequence, pairIndex)) && (
               <span className="animate-pulse font-light text-zinc-400">|</span>
            )}
          </span>
        </span>{' '}
        
        into{' '}
        
        <span className="relative inline-grid grid-cols-1 text-left min-w-[8ch]">
          <span className="invisible col-start-1 row-start-1 whitespace-pre">
            {maxTo}
          </span>
          <span className="col-start-1 row-start-1 text-indigo-600">
            {textTo}
             {(pairIndex !== sequence.length - 1 || isDeleting || textTo !== currentPairTo(sequence, pairIndex)) && (
               <span className="animate-pulse font-light text-indigo-300">|</span>
            )}
          </span>
        </span>
      </h2>

      {/* UPDATED: Fixed typo 'text-l' to 'text-lg' and increased desktop size to 'md:text-xl' */}
      <p className="hero-line hero-delay-3 mt-10 mb-8 text-lg text-zinc-600 md:text-xl md:leading-relaxed max-w-lg">
        Simple, fast websites and social that bring you new work. 
      </p>

      <div className="hero-line hero-delay-4 mb-6 md:hidden">
        <HeroLighthouseRowMobile />
      </div>

      <div className="hidden md:flex hero-line hero-delay-4 mt-12 flex flex-wrap gap-2 text-xs text-zinc-500">
        {['Trades & home services', 'Cafés & shops', 'Solo founders', 'E-Commerce'].map((tag) => (
          <span key={tag} className="rounded-full border border-zinc-200 px-3 py-1">
            {tag}
          </span>
        ))}
      </div>

      <div className="hero-line hero-delay-5 mt-16 mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href="https://wa.me/447887034503?text=Hi%20Finn%2C%20I'd%20like%20a%20FREE%20website%20audit."
          className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:from-indigo-700 hover:to-indigo-600"
        >
          Book a free website audit
        </a>
        <a
          href="#recent-work"
          className="text-sm font-medium md:mt-0 mt-8 text-zinc-700 underline underline-offset-4"
        >
          See recent projects
        </a>
      </div>
    </div>
  );
}
  
  // Helpers to prevent undefined access during render
  function currentPairFrom(seq: WordPair[], idx: number) {
    return seq[idx] ? seq[idx].from : '';
  }
  function currentPairTo(seq: WordPair[], idx: number) {
    return seq[idx] ? seq[idx].to : '';
  }
  
  type ProjectKey = "naxco" | "carbon" | "toolbox" | null;
  
  
  function RecentWorkSection() {
    const [activeProject, setActiveProject] = useState<ProjectKey>(null);
  
    const projects: {
      key: Exclude<ProjectKey, null>;
      title: string;
      role: string;
      summary: string;
      image: string;
      alt: string;
      tags: string[];
    }[] = [
      {
        key: "naxco",
        title: "Naxco Services",
        role: "Website refresh · Local trades",
        summary:
          "Homepage rebuild for a local property maintenance business, focused on clearer messaging and stronger calls-to-action.",
        image: "/naxco1.png",
        alt: "Naxco Services website",
        tags: ["Homepage refresh", "Trust signals", "WhatsApp enquiries"],
      },
      {
        key: "toolbox",
        title: "Toolbox Platform",
        role: "Internal platform · Procurement",
        summary:
          "A .NET dashboard for finance and procurement teams to track cost savings and supplier performance in one place.",
        image: "/gtoolbox.png",
        alt: "Toolbox platform dashboard",
        tags: [".NET MVC", "Reporting views", "Cost savings"],
      },
      {
        key: "carbon",
        title: "Carbon Calculator",
        role: "Web app · Sustainability",
        summary:
          "A web application for generating carbon reports from activity data and syncing results into the client’s CRM.",
        image: "/calc.png",
        alt: "Carbon calculator application",
        tags: ["Guided form flow", "PDF reports", "CRM syncing"],
      },
    ];
  
    const [activeIndex, setActiveIndex] = useState(0);
  
    // width of each slide as % of viewport width
    // 100 on mobile, ~85 on desktop so the next card peeks
    const [slideWidth, setSlideWidth] = useState(100);
  
    useEffect(() => {
      const update = () => {
        if (window.innerWidth >= 1024) {
          setSlideWidth(85); // show next card peeking
        } else {
          setSlideWidth(100); // full-width on mobile/tablet
        }
      };
  
      update();
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }, []);
  
    // swipe state
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);
  
    const goTo = (index: number) => {
      const total = projects.length;
      const normalised = ((index % total) + total) % total;
      setActiveIndex(normalised);
    };
  
    const goNext = () => goTo(activeIndex + 1);
    const goPrev = () => goTo(activeIndex - 1);
  
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
      touchStartX.current = e.touches[0].clientX;
      touchEndX.current = null;
    };
  
    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
      touchEndX.current = e.touches[0].clientX;
    };
  
    const handleTouchEnd = () => {
      if (touchStartX.current === null || touchEndX.current === null) return;
      const delta = touchStartX.current - touchEndX.current;
      const threshold = 40;
      if (Math.abs(delta) > threshold) {
        if (delta > 0) {
          goNext(); // swipe left
        } else {
          goPrev(); // swipe right
        }
      }
      touchStartX.current = null;
      touchEndX.current = null;
    };
  
  
  const offset = activeIndex * slideWidth;
  
  
    return (
      <section id="recent-work" className="mb-24 md:mb-28">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-1 w-6 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500" />
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
            A few things I’ve worked on
          </p>
        </div>
  
        <h3 className="mb-6 text-2xl font-semibold md:mb-8 md:text-3xl">
          Recent Work
        </h3>
  
        <div className="relative">
          {/* Prev / Next buttons (desktop) */}
          <button
            type="button"
            onClick={goPrev}
            className="pointer-events-auto absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 p-3 text-base text-white shadow-md shadow-indigo-500/40 transition hover:from-indigo-700 hover:to-indigo-600 md:flex"
            aria-label="Previous project"
          >
            ‹
          </button>
  
          <button
            type="button"
            onClick={goNext}
            className="pointer-events-auto absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 p-3 text-base text-white shadow-md shadow-indigo-500/40 transition hover:from-indigo-700 hover:to-indigo-600 md:flex"
            aria-label="Next project"
          >
            ›
          </button>
  
          {/* Viewport */}
          <div
            className="overflow-hidden px-1 sm:px-2 md:px-6 lg:px-10"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Track */}
            <div
              className="flex"
              style={{
                transition: "transform 650ms cubic-bezier(.22,.61,.36,1)",
                transform: `translateX(-${offset}%)`,
              }}
            >
              {projects.map((project) => (
                <div
                  key={project.key}
                  // IMPORTANT: build className as a single deterministic string
                  className={[
                    "w-full",
                    "flex-shrink-0",
                    "px-1",
                    "sm:px-2",
                    "md:px-4",
                  ].join(" ")}
                  style={{
                    minWidth: `${slideWidth}%`,
                    maxWidth: `${slideWidth}%`,
                  }}
                >
                  <article
                    className="group flex h-full cursor-pointer flex-col rounded-2xl border border-zinc-200 bg-white/90 p-4 shadow-sm ring-0 transition hover:-translate-y-1 hover:shadow-md hover:ring-1 hover:ring-indigo-100 md:p-5"
                    onClick={() => setActiveProject(project.key)}
                  >
                    <div className="relative mb-4 h-52 w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 shadow-sm md:h-56">
                      <Image
                        src={project.image}
                        alt={project.alt}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.02]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent opacity-0 transition group-hover:opacity-100" />
                    </div>
  
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-indigo-500">
                      {project.role}
                    </p>
                    <h4 className="mt-1 text-lg font-semibold text-zinc-900">
                      {project.title}
                    </h4>
                    <p className="mt-2 text-sm text-zinc-600">
                      {project.summary}
                    </p>
  
                    <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-zinc-500">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
  
                    <div className="flex-1" />
  
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveProject(project.key);
                      }}
                      className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:from-indigo-700 hover:to-indigo-600"
                    >
                      View case details
                    </button>
                  </article>
                </div>
              ))}
            </div>
          </div>
  
          {/* Dots */}
          <div className="mt-4 flex justify-center gap-2">
            {projects.map((project, index) => (
              <button
                key={project.key}
                type="button"
                onClick={() => goTo(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeIndex
                    ? "w-6 bg-indigo-600"
                    : "w-2.5 bg-zinc-300 hover:bg-zinc-400"
                }`}
                aria-label={`Go to ${project.title}`}
              />
            ))}
          </div>
        </div>
  
        {/* Modals */}
        {activeProject === "naxco" && (
          <ProjectModal onClose={() => setActiveProject(null)}>
            <NaxcoModalContent />
          </ProjectModal>
        )}
  
        {activeProject === "carbon" && (
          <ProjectModal onClose={() => setActiveProject(null)}>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-zinc-900">
                Carbon Calculator
              </h3>
              <p className="text-sm text-zinc-600">
                A web application that lets users enter activity data, generates a
                carbon report and syncs the results into the client&apos;s CRM.
              </p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-600">
                <li>Guided form flow for non-technical users.</li>
                <li>Automatic PDF report generation.</li>
                <li>Pushes data into the client CRM for follow-up and tracking.</li>
              </ul>
            </div>
          </ProjectModal>
        )}
  
        {activeProject === "toolbox" && (
          <ProjectModal onClose={() => setActiveProject(null)}>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-zinc-900">
                Toolbox Platform
              </h3>
              <p className="text-sm text-zinc-600">
                A .NET dashboard used by procurement teams to monitor cost
                savings and supplier performance in one place.
              </p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-600">
                <li>Live cost saving summaries by supplier and category.</li>
                <li>Exportable views for board reports.</li>
                <li>Built to integrate with existing data exports.</li>
              </ul>
            </div>
          </ProjectModal>
        )}
      </section>
    );
  }
  
  
  type ProjectModalProps = {
    onClose: () => void;
    children: React.ReactNode;
  };
  
  function ProjectModal({ onClose, children }: ProjectModalProps) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
        <div
          className="absolute inset-0"
          onClick={onClose}
          aria-hidden="true"
        />
        <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl">
          {/* subtle top accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-500" />
          <div className="relative p-6 md:p-8">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full border border-zinc-200 bg-white/80 p-1 text-xs text-zinc-500 shadow-sm transition hover:bg-zinc-50"
              aria-label="Close"
            >
              ✕
            </button>
            {children}
          </div>
        </div>
      </div>
    );
  }
  
  function NaxcoModalContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start">
          <div className="flex-1 space-y-3">
            <h3 className="text-lg font-semibold text-zinc-900">
              Naxco Services — website refresh
            </h3>
            <a className="text-blue-500 hover:text-blue-600" href="https://naxco-site.vercel.app/">
              https://naxco-site.vercel.app/
            </a>
            <p className="text-sm text-zinc-600">
              Local services business with a dated site and unclear calls to action.
              I rebuilt the homepage to better explain what they do and make it easy
              to call or message.
            </p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-600">
              <li>Clear service breakdown and stronger trust signals.</li>
              <li>Prominent WhatsApp / contact options above the fold.</li>
              <li>Simpler layout that works well on mobile.</li>
            </ul>
          </div>
        </div>
  
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            Before / after
          </p>
          <p className="text-sm text-zinc-600">
            Drag the handle to compare the refreshed design (left) with the old version.
          </p>
          <BeforeAfterSlider
            beforeSrc="/naxold.png"
            afterSrc="/naxnew.png"
            altBefore="Naxco old website"
            altAfter="Naxco refreshed website"
          />
        
        </div>
      </div>
    );
  }
  
  type BeforeAfterSliderProps = {
    beforeSrc: string;
    afterSrc: string;
    altBefore: string;
    altAfter: string;
  };
  
  function BeforeAfterSlider({
    beforeSrc,   // old site
    afterSrc,    // new design
    altBefore,
    altAfter,
  }: BeforeAfterSliderProps) {
    const [position, setPosition] = useState(55); // % of NEW (after) shown on the left
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isDraggingRef = useRef(false);
  
    const updatePositionFromClientX = (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const clamped = Math.max(0, Math.min(rect.width, x));
      setPosition((clamped / rect.width) * 100);
    };
  
    const handleMouseDown = (e: React.MouseEvent) => {
      isDraggingRef.current = true;
      updatePositionFromClientX(e.clientX);
    };
  
    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDraggingRef.current) return;
      updatePositionFromClientX(e.clientX);
    };
  
    const handleMouseUpOrLeave = () => {
      isDraggingRef.current = false;
    };
  
    const handleTouchStart = (e: React.TouchEvent) => {
      isDraggingRef.current = true;
      updatePositionFromClientX(e.touches[0].clientX);
    };
  
    const handleTouchMove = (e: React.TouchEvent) => {
      if (!isDraggingRef.current) return;
      updatePositionFromClientX(e.touches[0].clientX);
    };
  
    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };
  
    return (
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
        <div className="mb-3 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
          <span>Before / after</span>
          <span className="text-[10px] text-zinc-400">Drag the handle</span>
        </div>
  
        <div
          ref={containerRef}
          className="relative h-64 w-full overflow-hidden rounded-xl bg-zinc-900 cursor-col-resize"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* OLD SITE — full-width base layer */}
          <div className="absolute inset-0">
            <Image
              src={beforeSrc}
              alt={altBefore}
              fill
              className="object-contain"
              sizes="100vw"
              style={{ backgroundColor: "white" }}
            />
          </div>
  
          {/* NEW DESIGN — full-width, but clipped with clip-path so it stays the SAME SIZE */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: `inset(0 ${100 - position}% 0 0)`, // show left portion only
            }}
          >
            <Image
              src={afterSrc}
              alt={altAfter}
              fill
              className="object-contain"
              sizes="100vw"
              style={{ backgroundColor: "white" }}
            />
  
            {/* optional soft fade on the boundary */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-zinc-900/60 via-zinc-900/20 to-transparent" />
          </div>
  
          {/* LABELS */}
          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-emerald-500/90 px-3 py-1 text-[11px] font-medium text-white">
            New design
          </span>
          <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-zinc-950/85 px-3 py-1 text-[11px] font-medium text-zinc-100">
            Old site
          </span>
  
          {/* HANDLE */}
          <div
            className="pointer-events-none absolute inset-y-4 sm:inset-y-6"
            style={{ left: `${position}%`, transform: "translateX(-50%)" }}
          >
            <div className="flex h-full items-center">
              <div className="h-full w-[2px] bg-white/80 shadow-[0_0_0_1px_rgba(15,23,42,0.6)]" />
              <div className="pointer-events-auto -ml-[18px] flex flex-col items-center">
                <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 p-1 shadow-lg shadow-indigo-600/40">
                  <span className="flex h-8 w-8 items-center justify-center text-xs font-semibold text-white">
                    ⇆
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <p className="mt-3 text-[11px] text-zinc-500">
          Left: refreshed homepage · Right: original site
        </p>
      </div>
    );
  }
  
  
  
  // Shared core slider (logic + handle + images)
  function NaxcoBeforeAfterSlider({ card }: { card?: boolean }) {
    const [position, setPosition] = useState(5); // 0–100, almost all old site
    const [userInteracted, setUserInteracted] = useState(false);
  
    const updatePosition = (
      clientX: number,
      element: HTMLDivElement | null
    ) => {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const x = clientX - rect.left;
      const clamped = Math.max(0, Math.min(rect.width, x));
      setPosition((clamped / rect.width) * 100);
    };
  
    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      setUserInteracted(true); // cancel auto anim if user grabs it
      const el = e.currentTarget;
      el.setPointerCapture(e.pointerId);
      updatePosition(e.clientX, el);
    };
  
    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      if (!el.hasPointerCapture(e.pointerId)) return;
      updatePosition(e.clientX, el);
    };
  
    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.releasePointerCapture(e.pointerId);
    };
  
    // Ease-out-back for bounce, clamped so it doesn’t overshoot the track
    const easeOutBack = (t: number) => {
      const c1 = 1.3;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };
  
    useEffect(() => {
      if (userInteracted) return;
  
      const start = 5;       // mostly old
      const end = 100;        // stop just inside right edge
      const delay = 1100;    // ~1.1s pause
      const duration = 1500; // ~1.5s slide
  
      let frameId: number | undefined;
      let timeoutId: number | undefined;
      let startTime: number | null = null;
  
      const startAnimation = () => {
        startTime = performance.now();
  
        const animate = (now: number) => {
          if (userInteracted) return;
  
          const elapsed = now - (startTime as number);
          const t = Math.min(1, elapsed / duration);
  
          const easedRaw = easeOutBack(t);
          const eased = Math.max(0, Math.min(1, easedRaw));
  
          const value = start + (end - start) * eased;
          setPosition(value);
  
          if (t < 1) {
            frameId = requestAnimationFrame(animate);
          }
        };
  
        frameId = requestAnimationFrame(animate);
      };
  
      timeoutId = window.setTimeout(startAnimation, delay);
  
      return () => {
        if (timeoutId) window.clearTimeout(timeoutId);
        if (frameId) cancelAnimationFrame(frameId);
      };
    }, [userInteracted]);
  
    const sliderClass =
      "relative mt-2 h-64 md:h-72 w-full overflow-hidden rounded-xl bg-zinc-900 cursor-col-resize select-none touch-none";
  
    // Wrapper styling: card on desktop, softer section on mobile
    const wrapperClass = card
      ? "relative w-full max-w-lg rounded-2xl border border-zinc-200 bg-white/80 p-4 shadow-xl shadow-indigo-500/10"
      : "relative w-full rounded-2xl border border-zinc-200 bg-white p-4 shadow-lg shadow-indigo-500/10";
  
    return (
      <div className={wrapperClass}>
        {/* subtle glow */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_10%_0,rgba(79,70,229,0.12),transparent_55%),radial-gradient(circle_at_90%_100%,rgba(56,189,248,0.12),transparent_55%)]" />
  
        <div className="relative flex flex-col gap-3">
          {/* fake browser chrome */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-400" />
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </div>
            <div className="flex-1">
              <div className="mx-auto h-6 max-w-[70%] rounded-full border border-zinc-200/80 bg-zinc-50/70 px-3 text-[10px] text-zinc-400">
                Naxco Services — homepage refresh
              </div>
            </div>
          </div>
  
          {/* slider “screen” */}
          <div
            className={sliderClass}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {/* OLD SITE — base */}
            <div className="absolute inset-0">
              <Image
                src="/naxold.png"
                alt="Naxco old website"
                fill
                priority
                className="object-contain pointer-events-none"
                sizes="(min-width: 768px) 50vw, 100vw"
                style={{ backgroundColor: "white" }}
              />
            </div>
  
            {/* NEW SITE — clipped to the handle position */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <Image
                src="/naxnew.png"
                alt="Naxco refreshed website"
                fill
                priority
                className="object-contain pointer-events-none"
                sizes="(min-width: 768px) 50vw, 100vw"
                style={{ backgroundColor: "white" }}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-zinc-900/60 via-zinc-900/20 to-transparent" />
            </div>
  
            {/* HANDLE – purple line with bulge */}
            <div
              className="pointer-events-none absolute inset-y-4 sm:inset-y-6"
              style={{
                left: `calc(${position}% - 0.5px)`,
                transform: "translateX(-50%)",
              }}
            >
              <div className="flex h-full items-center justify-center">
                <div className="relative flex h-full items-center">
                  {/* purple vertical line */}
                  <div className="h-full w-[5px] rounded-full bg-gradient-to-b from-indigo-600 via-indigo-500 to-indigo-400 shadow-[0_0_0_1px_rgba(15,23,42,0.5)]" />
                  {/* central bulge */}
                  <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-indigo-600 shadow-lg shadow-indigo-600/50">
                    <span className="text-xs font-semibold text-white animate-pulse">
                      ⇆
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <NaxcoLighthouseRow position={position} />
          {!card && (
            <p className="text-[11px] text-zinc-500">
              Starts on the original homepage, then eases into the refreshed design.
            </p>
          )}
        </div>
      </div>
    );
  }
  
  // DESKTOP: lives in the hero grid, right column
  function HeroVisualDesktop() {
    return (
      <div className="relative hidden items-center justify-center md:flex">
        <NaxcoBeforeAfterSlider card />
      </div>
    );
  }
  
  // MOBILE: full-width section underneath the hero
  function HeroVisualMobile() {
    return (
  <section className="mb-12 md:hidden text-center">
    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
      Before & After
    </p>
  
    <h3 className="mt-2 text-xl font-semibold text-zinc-900">
       A clearer website for more enquiries.
    </h3>
  
    <div className="mt-4">
      <NaxcoPhoneSliderMobile />
    </div>
  
  <p className="mt-4   text-zinc-600">
    Your site can work harder for you.
  </p>
  
  <a
    href="https://wa.me/447887034503?text=Hi%20Finn%2C%20let’s%20improve%20my%20site."
    className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-3 text-sm font-medium text-white shadow-md  hover:from-indigo-700 hover:to-indigo-600 active:scale-[0.97]"
  >
    Let's make that change.
  </a>
  
  </section>
  
    );
  }
  
  
  function NaxcoLighthouseRow({ position }: { position: number }) {
    const metrics = [
      { label: "Performance", from: 71, to: 98 },
      { label: "Accessibility", from: 86, to: 100 },
      { label: "Best Practices", from: 100, to: 100 },
      { label: "SEO", from: 82, to: 100 },
    ];
  
    const updatedMetrics = metrics.map((metric) => {
      const range = metric.to - metric.from;
      const updatedScore = metric.from + (range * position) / 100;
      return { ...metric, adjustedScore: Math.round(updatedScore) };
    });
  
    return (
      <div className="mt-4">
        <div className="flex flex-wrap items-center justify-center gap-6">
          {updatedMetrics.map((metric) => (
            <LighthouseMetric
              key={metric.label}
              label={metric.label}
              adjustedScore={metric.adjustedScore}
            />
          ))}
        </div>
        <p className="mt-2 text-center text-[10px] text-zinc-400">
          Scores as per{" "}
          <a
            href="https://pagespeed.web.dev/"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            PageSpeed Insights
          </a>
          .
        </p>
      </div>
    );
  }
  
  type LighthouseMetricProps = {
    label: string;
    adjustedScore: number;
    compact?: boolean;
  };
  
  function LighthouseMetric({ label, adjustedScore, compact }: LighthouseMetricProps) {
    const value = Math.max(0, Math.min(100, adjustedScore));
    const degrees = (value / 100) * 360;
  
    // Lighthouse-style colour: red < 50, amber 50–89, green 90+
    const ringColor = value >= 90 ? "#22c55e" : value >= 50 ? "#f59e0b" : "#ef4444";
    const textColor = value >= 90 ? "#15803d" : value >= 50 ? "#b45309" : "#b91c1c";
  
    const circleSize = compact ? "h-10 w-10" : "h-14 w-14";
    const innerInset = compact ? "inset-[4px]" : "inset-[5px]";
    const valueTextClass = compact ? "text-xs font-semibold" : "text-base font-semibold";
    const labelTextClass = compact
      ? "mt-0.5 text-[9px] text-zinc-600 text-center leading-tight"
      : "text-xs text-zinc-700";
  
    return (
      <div className="flex flex-col items-center gap-1">
        <div className={`relative ${circleSize}`}>
          {/* pale background like Lighthouse */}
          <div className="absolute inset-0 rounded-full bg-[#fffbeb]" />
          {/* coloured arc */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(${ringColor} ${degrees}deg, transparent 0deg)`,
            }}
          />
          {/* inner white disc */}
          <div className={`absolute ${innerInset} flex items-center justify-center rounded-full bg-white`}>
            <span className={valueTextClass} style={{ color: textColor }}>
              {value}
            </span>
          </div>
        </div>
        <span className={labelTextClass}>{label}</span>
      </div>
    );
  }
  function HeroLighthouseRowMobile() {
    const metrics = [
      { label: "Performance", from: 43, to: 98 },
      { label: "Access.", from: 60, to: 100 },
      { label: "Best Prac.", from: 75, to: 100 },
      { label: "SEO", from: 25, to: 100 },
    ];
  
    const [values, setValues] = useState(metrics.map((m) => m.from));
  
    useEffect(() => {
      const delay = 1150;   // 1.15s showing low scores
      const duration = 2000; // ms for the count-up
      let frameId: number;
      let startTime: number | null = null;
      let timeoutId: number;
  
      const animate = (now: number) => {
        if (startTime === null) startTime = now;
        const elapsed = now - startTime;
        const tRaw = elapsed / duration;
        const t = Math.min(1, tRaw);
  
        // ease-out
        const eased = 1 - Math.pow(1 - t, 3);
  
        setValues(
          metrics.map((m) =>
            Math.round(m.from + (m.to - m.from) * eased)
          )
        );
  
        if (t < 1) {
          frameId = requestAnimationFrame(animate);
        }
      };
  
      timeoutId = window.setTimeout(() => {
        frameId = requestAnimationFrame(animate);
      }, delay);
  
      return () => {
        window.clearTimeout(timeoutId);
        if (frameId) cancelAnimationFrame(frameId);
      };
    }, []);
  
    return (
      <div className="flex w-full flex-col items-center">
        <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
          Typical site improvement
        </p>
  
        {/* 1×4 row, centred with inner max-width so it never kisses the screen edges */}
        <div className="flex w-full max-w-xs items-center justify-between gap-2 mx-auto">
          {metrics.map((m, index) => (
            <LighthouseMetric
              key={m.label}
              label={m.label}
              adjustedScore={values[index]}
              compact
            />
          ))}
        </div>
  
        <p className="mt-4 text-[9px] text-zinc-400">
          Based on a real homepage refresh (PageSpeed Insights).
        </p>
      </div>
    );
  }
  function NaxcoPhoneSliderMobile() {
    const [position, setPosition] = useState(5); // 0–100
    const [userInteracted, setUserInteracted] = useState(false);
    const [autoPlay, setAutoPlay] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
  
    // Scroll-trigger: start autoPlay when phone enters viewport
    useEffect(() => {
      if (!wrapperRef.current) return;
  
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            setAutoPlay(true);
            observer.disconnect(); // trigger once
          }
        },
        {
          threshold: 0.35, // ~1/3 of it visible
        }
      );
  
      observer.observe(wrapperRef.current);
  
      return () => observer.disconnect();
    }, []);
  
    const updatePositionFromClientX = (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const clamped = Math.max(0, Math.min(rect.width, x));
      setPosition((clamped / rect.width) * 100);
    };
  
    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      setUserInteracted(true);
      const el = e.currentTarget;
      el.setPointerCapture(e.pointerId);
      updatePositionFromClientX(e.clientX);
    };
  
    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      if (!el.hasPointerCapture(e.pointerId)) return;
      updatePositionFromClientX(e.clientX);
    };
  
    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.releasePointerCapture(e.pointerId);
    };
  
    // Ease-out-back for bounce, clamped so it doesn’t overshoot the track
    const easeOutBack = (t: number) => {
      const c1 = 1.3;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };
  
    // Auto animation: only when autoPlay=true AND user hasn’t dragged
    useEffect(() => {
      if (!autoPlay || userInteracted) return;
  
      const start = 5;
      const end = 97;
      const delay = 1100; // small pause after entering view
      const duration = 1500;
  
      let frameId: number | undefined;
      let timeoutId: number | undefined;
      let startTime: number | null = null;
  
      const startAnimation = () => {
        startTime = performance.now();
  
        const animate = (now: number) => {
          if (userInteracted) return; // abort if user grabs it
  
          const elapsed = now - (startTime as number);
          const t = Math.min(1, elapsed / duration);
  
          const easedRaw = easeOutBack(t);
          const eased = Math.max(0, Math.min(1, easedRaw));
  
          const value = start + (end - start) * eased;
          setPosition(value);
  
          if (t < 1) {
            frameId = requestAnimationFrame(animate);
          }
        };
  
        frameId = requestAnimationFrame(animate);
      };
  
      timeoutId = window.setTimeout(startAnimation, delay);
  
      return () => {
        if (timeoutId) window.clearTimeout(timeoutId);
        if (frameId) cancelAnimationFrame(frameId);
      };
    }, [autoPlay, userInteracted]);
  
    return (
      <div
        ref={wrapperRef}
        className="mx-auto w-full max-w-xs rounded-[2.5rem] border border-zinc-800 bg-zinc-950 p-2 shadow-xl shadow-black/40"
      >
        {/* top notch / speaker */}
        <div className="mx-auto mb-2 h-4 w-24 rounded-full bg-black/60" />
  
        {/* “screen” */}
      <div
    ref={containerRef}
    className="relative w-full aspect-[1/1.67] overflow-hidden rounded-3xl bg-black cursor-col-resize select-none touch-none"
  
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* OLD SITE — base */}
          <div className="absolute inset-0">
            <Image
              src="/naxoldmobile.jpg"
              alt="Naxco old website"
              fill
              priority
              className="object-contain"
              sizes="100vw"
              style={{ backgroundColor: "white" }}
            />
          </div>
  
          {/* NEW SITE — clipped to handle position */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <Image
              src="/naxnewmobile.jpg"
              alt="Naxco refreshed website"
              fill
              priority
              className="object-contain"
              sizes="100vw"
              style={{ backgroundColor: "white" }}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-zinc-900/60 via-zinc-900/20 to-transparent" />
          </div>
  
          {/* HANDLE – line + pill, no text */}
          <div
            className="pointer-events-none absolute inset-y-6"
            style={{
              left: `calc(${position}% - 0.5px)`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="flex h-full items-center justify-center">
              <div className="relative flex h-full items-center">
                <div className="h-full w-[4px] rounded-full bg-white/80 shadow-[0_0_0_1px_rgba(15,23,42,0.7)]" />
                <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-lg shadow-black/40">
                  <span className="text-xs font-semibold text-zinc-900">
                    ⇆
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
