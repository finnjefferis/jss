"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useMemo } from "react";
import { Megaphone, Globe, Wrench } from "lucide-react";
type WordPair = { from: string; to: string };

const WORD_PAIRS: WordPair[] = [
  { from: "clicks",     to: "enquiries." },
  { from: "visits",     to: "bookings." },
  { from: "chaos",      to: "clarity." },
  { from: "DIY",        to: "done-for-you." },
 
];



export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-5 md:px-8 lg:px-10">
      {/* Top Bar */}
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-500"></div>

<header className="flex items-center justify-between gap-6 py-6 border-b border-zinc-400">
  {/* LEFT — LOGO */}
  <h1 className="flex items-center text-xl gap-2 text-sm font-semibold tracking-wide">
    
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



  {/* RIGHT — WHATSAPP BUTTON */}
  <a
    href="https://wa.me/447939309355"
    className="hidden md:inline-flex rounded-md bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:from-indigo-700 hover:to-indigo-600"
  >
    Contact Us
  </a>
</header>



   {/* Hero */}
<section className="relative mb-10 grid min-h-[60vh] grid-cols-1 items-center gap-10 md:min-h-[50vh] md:grid-cols-2">
  {/* LEFT (Text) */}
         {/* LEFT (Text) */}
        <HeroText />

  <HeroVisual />
</section>


<section id="services" className="mb-24 md:mb-28">
  <div className="mb-3 flex items-center gap-2">
    <span className="h-1 w-6 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500" />
    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
      What I can handle for you
    </p>
  </div>

  <h3 className="mb-3 text-2xl font-semibold md:text-3xl">Services</h3>
  <p className="mb-8 max-w-2xl text-base text-zinc-600">
    For busy owners who already do great work — you just need a strong online prescence to reflect that.
  </p>

  {/* Free Audit Banner */}
  <div className="mb-10 rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-sky-50 p-5 shadow-lg shadow-indigo-500/10 md:flex md:items-center md:justify-between md:gap-6 md:p-6">
    <div>
      <h4 className="text-lg font-bold text-zinc-900">🎁 Claim Your Free Website Audit</h4>
      <p className="mt-1 text-sm text-zinc-700">
        Send me your website link and I’ll reply with a short list of fixes to get you
        more enquiries. No jargon, no pressure — just clear, practical improvements.
      </p>
    </div>
    <a
      href="https://wa.me/447939309355?text=Hi%20Finn%2C%20I'd%20like%20a%20free%20website%20audit."
      className="mt-4 inline-flex shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:from-indigo-700 hover:to-indigo-600 md:mt-0"
    >
      Claim Free Audit
    </a>
  </div>

  {/* Three Service Cards */}
  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
    
    {/* Social Media */}
    <div className="group rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          <Megaphone className="h-5 w-5" />
        </div>
        <h4 className="text-base font-semibold text-zinc-900">
          Social Media Management
        </h4>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-zinc-600">
        Weekly posts, captions, and scheduling handled for you. Approve content once a month,
        then get back to actually running your business.
      </p>

      <div className="mt-4 border-t border-zinc-100 pt-4 mb-4">
        <p className="text-sm font-medium text-zinc-500">
          Starts from <span className="font-semibold text-zinc-800">£119 / month</span>
        </p>
      </div>

      <a
        href="https://wa.me/447939309355?text=Hi%20Finn%2C%20I'm%20interested%20in%20Social%20Media%20management.%20Can%20we%20talk%3F"
        className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:from-indigo-700 hover:to-indigo-600"
      >
        Enquire via WhatsApp
      </a>
    </div>

    {/* Websites */}
    <div className="group rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          <Globe className="h-5 w-5" />
        </div>
        <h4 className="text-base font-semibold text-zinc-900">
          Website Design & Refresh
        </h4>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-zinc-600">
        Modern websites that build trust and clearly show how to contact you.
        I handle copy, layout, and basic SEO so you look professional from day one.
      </p>

      <div className="mt-4 border-t border-zinc-100 pt-4 mb-4">
        <p className="text-sm font-medium text-zinc-500">
          Starts from <span className="font-semibold text-zinc-800">£269 (one-off)</span>
        </p>
      </div>

      <a
        href="https://wa.me/447939309355?text=Hi%20Finn%2C%20I'd%20like%20a%20website%20designed%20or%20refreshed.%20Can%20you%20advise%3F"
        className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:from-indigo-700 hover:to-indigo-600"
      >
        Talk Websites on WhatsApp
      </a>
    </div>

{/* 3. Bespoke Software */}
<div className="group rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
  <div className="flex items-center gap-3">
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
      <Wrench className="h-5 w-5" />
    </div>
    <h4 className="text-base font-semibold text-zinc-900">
      Bespoke Software & Automation
    </h4>
  </div>

  <p className="mt-3 text-sm leading-relaxed text-zinc-600">
    Internal platforms, data tools, and full-stack applications built around how 
    your business actually works — not how an off-the-shelf app forces you to.
  </p>

  

  <div className="mt-4 border-t border-zinc-100 pt-4 mb-4">
    <p className="text-sm font-medium text-zinc-500">
      <span className="font-semibold text-zinc-800">Quote required</span>
    </p>
  </div>

  <a
    href="https://wa.me/447939309355?text=Hi%20Finn%2C%20I'd%20like%20to%20discuss%20a%20bespoke%20software%20project."
    className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:from-indigo-700 hover:to-indigo-600"
  >
    Talk Software on WhatsApp
  </a>
</div>

  </div>
</section>




          <RecentWorkSection />
  <ContactSection />
      {/* Footer */}
      
      <footer className="border-t py-8 text-center text-xs text-zinc-500">
        
        © {new Date().getFullYear()} Jefferis Software Solutions
      </footer>
    </main>
  );
}


export  function HeroText() {
 const [sequence, setSequence] = useState<WordPair[]>(WORD_PAIRS);
  const [pairIndex, setPairIndex] = useState(0);

  // Typewriter state
  const [textFrom, setTextFrom] = useState("");
  const [textTo, setTextTo] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // 1) CALCULATE LONGEST WORDS FOR LAYOUT STABILITY
  const { maxFrom, maxTo } = useMemo(() => {
    return WORD_PAIRS.reduce(
      (acc, pair) => ({
  
        maxFrom: pair.from.length > acc.maxFrom.length ? pair.from : acc.maxFrom,
        maxTo: pair.to.length > acc.maxTo.length ? pair.to : acc.maxTo,
      }),
      { maxFrom: "", maxTo: "" } 
    );
  }, []);

  // 3) TYPEWRITER LOOP
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
        // Deleting phase
        setTextFrom((prev) => prev.slice(0, -1));
        setTextTo((prev) => prev.slice(0, -1));
        setTypingSpeed(50); 

        if (isFullyDeleted) {
          setIsDeleting(false);
          setPairIndex((prev) => prev + 1);
          setTypingSpeed(100);
        }
      } else {
        // Typing phase
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
      <p className=" text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
        Websites & social for small businesses
      </p>

      <h2 className=" hero-delay-2 cal-sans mt-8 text-4xl font-semibold leading-tight md:text-5xl">
        Turn{' '}
        
      
        <span className="relative inline-grid  grid-cols-1 text-center min-w-[6ch]">
        
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
          {/* GHOST */}
          <span className="invisible col-start-1 row-start-1 whitespace-pre">
            {maxTo}
          </span>
          {/* REAL TEXT */}
          <span className="col-start-1 row-start-1 text-indigo-600">
            {textTo}
             {(pairIndex !== sequence.length - 1 || isDeleting || textTo !== currentPairTo(sequence, pairIndex)) && (
               <span className="animate-pulse font-light text-indigo-300">|</span>
            )}
          </span>
        </span>
      </h2>

      <p className="hero-line hero-delay-3 mt-10 mb-8 text-l text-zinc-600 md:text-base">
        Simple, fast websites and social that bring you new work. Projects from £119.
      </p>

      <div className="hero-line hero-delay-4 mt-12 flex flex-wrap gap-2 text-xs text-zinc-500">
        {['Trades & home services', 'Cafés & shops', 'Solo founders', 'E-Commerce'].map((tag) => (
          <span key={tag} className="rounded-full border border-zinc-200 px-3 py-1">
            {tag}
          </span>
        ))}
      </div>

      <div className="hero-line hero-delay-5 mt-16 mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href="https://wa.me/447939309355?text=Hi%20Finn%2C%20I'd%20like%20a%20FREE%20website%20audit."
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

  return (
    <section id="recent-work" className="mb-24 md:mb-28">
      <div className="mb-3 flex items-center gap-2">
        <span className="h-1 w-6 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500" />
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
          A few things I’ve worked on
        </p>
      </div>

      <h3 className="mb-8 text-2xl font-semibold md:mb-10 md:text-3xl">
        Recent Work
      </h3>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {/* Naxco */}
        <article
          className="group cursor-pointer"
          onClick={() => setActiveProject("naxco")}
        >
          <div className="relative mb-4 h-64 w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-md">
            <Image src="/naxco1.png" alt="Naxco" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-0 transition group-hover:opacity-100" />
          </div>
          <h4 className="text-lg font-semibold text-zinc-900">Naxco Services</h4>
          <p className="mt-1 text-sm text-zinc-600">
            Improved clarity, trust signals & enquiry flow.
          </p>
        </article>
     <article
          className="group cursor-pointer"
          onClick={() => setActiveProject("toolbox")}
        >
          <div className="relative mb-4 h-64 w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-md">
            <Image
              src="/gtoolbox.png"
              alt="Toolbox"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-0 transition group-hover:opacity-100" />
          </div>
          <h4 className="text-lg font-semibold text-zinc-900">
            Toolbox Platform
          </h4>
          <p className="mt-1 text-sm text-zinc-600">
            .NET dashboard for cost & procurement insights.
          </p>
        </article>
        {/* Carbon Calculator */}
        <article
          className="group cursor-pointer"
          onClick={() => setActiveProject("carbon")}
        >
          <div className="relative mb-4 h-64 w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-md">
            <Image
              src="/calc.png"
              alt="Carbon Calculator"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-0 transition group-hover:opacity-100" />
          </div>
          <h4 className="text-lg font-semibold text-zinc-900">
            Carbon Calculator
          </h4>
          <p className="mt-1 text-sm text-zinc-600">
            Streamlined workflow & CRM syncing.
          </p>
        </article>

        {/* Toolbox */}
   
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
              A .NET dashboard used by procurement teams to monitor cost savings
              and supplier performance in one place.
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
      <div className="relative z-10 w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl md:p-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-zinc-200 bg-white/80 p-1 text-xs text-zinc-500 hover:bg-zinc-50"
          aria-label="Close"
        >
          ✕
        </button>
        {children}
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
          afterSrc="/naxnew.jpg"
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

function ContactSection() {
  return (
    <section className="mb-24 rounded-2xl border border-zinc-200 bg-zinc-50/60 px-6 py-10 text-center md:px-10">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
        Ready when you are
      </p>
      <h3 className="mt-3 text-2xl font-semibold md:text-3xl">Get in touch</h3>
      <p className="mt-3 text-sm text-zinc-600 md:text-base">
        Send a WhatsApp message anytime — I&apos;ll reply with a simple next step, and
        if helpful, a rough idea of cost.
      </p>

      <a
        href="https://wa.me/447939309355"
        className="mt-8 inline-flex items-center justify-center rounded-md bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:from-indigo-700 hover:to-indigo-600"
      >
        Message on WhatsApp
      </a>

      <p className="mt-4 text-sm text-zinc-500">
        Based in Worthing · Proudly Serving Sussex and beyond
      </p>
    </section>
  );
}


function HeroVisual() {
  return (
    <div className="relative w-full max-w-md rounded-2xl border border-zinc-200 bg-white/80 p-5 shadow-xl shadow-indigo-500/10">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_10%_0,rgba(79,70,229,0.12),transparent_55%),radial-gradient(circle_at_90%_100%,rgba(56,189,248,0.12),transparent_55%)]" />

      <div className="relative flex flex-col gap-4">
        {/* Fake browser bar */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </div>
          <div className="flex-1">
            <div className="mx-auto h-6 max-w-[70%] rounded-full border border-zinc-200/80 bg-zinc-50/70 px-3 text-[10px] text-zinc-400">
              jefferissoftware.co.uk / dashboard
            </div>
          </div>
        </div>

        {/* Main stat row */}
        <div className="mt-1 grid grid-cols-[1.4fr_1fr] gap-4">
          {/* Left: “chart” */}
          <div className="rounded-xl border border-zinc-100 bg-zinc-50/80 p-3">
            <p className="text-[11px] font-medium text-zinc-500">
              Enquiries this month
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-zinc-900">42</span>
              <span className="text-[11px] font-medium text-emerald-600">
                +38% vs last month
              </span>
            </div>

            {/* simple bar “chart” */}
            <div className="mt-3 flex items-end gap-1.5">
              {[30, 45, 55, 40, 65, 80, 72].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-full bg-gradient-to-t from-indigo-200 to-indigo-500/80"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* Right: KPI cards */}
          <div className="flex flex-col gap-2.5">
            <div className="rounded-lg border border-zinc-100 bg-white/90 p-2.5">
              <p className="text-[11px] text-zinc-500">Website visitors</p>
              <p className="mt-0.5 text-sm font-semibold text-zinc-900">
                1,280 <span className="text-[10px] text-emerald-600">+21%</span>
              </p>
              <div className="mt-1 h-1.5 rounded-full bg-zinc-100">
                <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-indigo-500 to-sky-400" />
              </div>
            </div>

            <div className="rounded-lg border border-zinc-100 bg-white/90 p-2.5">
              <p className="text-[11px] text-zinc-500">Enquiry rate</p>
              <p className="mt-0.5 text-sm font-semibold text-zinc-900">
                3.3% <span className="text-[10px] text-emerald-600">↑ better than avg</span>
              </p>
              <div className="mt-1 flex items-center gap-1.5 text-[10px] text-zinc-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>After refresh</span>
              </div>
            </div>

            <div className="rounded-lg border border-zinc-100 bg-indigo-50/90 p-2.5">
              <p className="text-[11px] text-indigo-700">Sources</p>
              <div className="mt-1 flex flex-wrap gap-1.5 text-[10px] font-medium">
                <span className="rounded-full bg-white/90 px-2 py-0.5 text-zinc-700">
                  Google Maps
                </span>
                <span className="rounded-full bg-white/90 px-2 py-0.5 text-zinc-700">
                  Facebook Ads
                </span>
                <span className="rounded-full bg-white/90 px-2 py-0.5 text-zinc-700">
                  Instagram
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom banner */}
        <div className="mt-1 flex items-center justify-between rounded-xl border border-zinc-100 bg-zinc-50/80 px-3 py-2.5">
          <p className="text-[11px] text-zinc-500">
            “Since the new site, enquiries are actually trackable.”
          </p>
          <span className="text-[10px] font-medium text-zinc-400">
            Client snapshot
          </span>
        </div>
      </div>
    </div>
  );
}
