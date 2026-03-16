import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { NavHeader } from "../components/NavHeader";
import { RevealSection } from "../components/RevealSection";
import {
  ArrowRight,
  BarChart3,
  Cpu,
  Zap,
  Database,
  RefreshCw,
  FileText,
  Users,
  Music2,
  Rss,
  MessageSquare,
  Calendar,
  Code2,
  Layers,
  Shield,
} from "lucide-react";

const SITE_URL = "https://www.jefferissoftware.co.uk";

export const metadata: Metadata = {
  title: "Custom Software Development",
  description:
    "Bespoke internal tools, dashboards, CRM integrations and automation for UK businesses. Built to save time and surface real data.",
  alternates: { canonical: `${SITE_URL}/software` },
  openGraph: {
    title: "Custom Software Development | Jefferis Software Solutions",
    description:
      "Bespoke internal tools, dashboards, CRM integrations and automation for UK businesses. Built to save time and surface real data.",
    url: `${SITE_URL}/software`,
  },
};

const BOOKING_URL =
  "https://outlook.office.com/bookwithme/user/b44ea33c0eb847a3a69babfcdc453315@jefferissoftware.co.uk?anonymous&ismsaljsauthenabled&ep=plink";

const CAPABILITIES = [
  {
    Icon: BarChart3,
    title: "Dashboards & Reporting",
    description:
      "Turn your raw data into something you can actually act on. Custom dashboards that surface the numbers that matter.",
  },
  {
    Icon: Database,
    title: "CRM & API Integrations",
    description:
      "Connect your tools. Sync data between your CRM, website, and third-party platforms automatically.",
  },
  {
    Icon: RefreshCw,
    title: "Workflow Automation",
    description:
      "Eliminate repetitive manual tasks. We map your process and build software that handles it for you.",
  },
  {
    Icon: FileText,
    title: "Document Generation",
    description:
      "Branded PDF reports, quotes, contracts — generated automatically from your data and sent where they need to go.",
  },
  {
    Icon: Cpu,
    title: "Booking & Client Portals",
    description:
      "Custom booking systems, client-facing portals, and self-service tools built around how you actually work.",
  },
  {
    Icon: Zap,
    title: "AI & Smart Tooling",
    description:
      "Practical AI integrations that save real hours. Not hype — tools that solve specific problems in your workflow.",
  },
];

type Project =
  | {
      type: "image";
      title: string;
      role: string;
      summary: string;
      tags: string[];
      image: string;
      href: string;
    }
  | {
      type: "platform";
      title: string;
      role: string;
      summary: string;
      tags: string[];
      href: string;
      status: string;
      features: { Icon: React.ElementType; label: string }[];
    };

const PROJECTS: Project[] = [
  {
    type: "platform",
    title: "Ivy Arch Community",
    role: "Community Platform",
    summary:
      "A full-stack platform for the local music scene — musician profiles, band discovery, a community feed, direct messaging, and OAuth authentication. Built on Next.js 15 and Payload CMS with a PostgreSQL database.",
    tags: ["Next.js 15", "Payload CMS", "PostgreSQL"],
    href: "/work/ivy",
    status: "In development",
    features: [
      { Icon: Users, label: "Musician profiles" },
      { Icon: Music2, label: "Band discovery" },
      { Icon: Rss, label: "Community feed" },
      { Icon: MessageSquare, label: "Direct messaging" },
    ],
  },
  {
    type: "image",
    title: "Toolbox Platform",
    role: "Procurement Dashboard",
    summary:
      "A .NET procurement dashboard tracking millions in cost savings across multiple suppliers. Real-time data, management reporting, and multi-supplier aggregation.",
    tags: [".NET MVC", "Data", "Reporting"],
    image: "/gtoolbox.png",
    href: "/work/toolbox",
  },
  {
    type: "image",
    title: "Carbon Calculator",
    role: "Web Application",
    summary:
      "Interactive carbon footprint tool generating branded PDF reports and syncing results directly to the client CRM. Built in React with live API integration.",
    tags: ["React", "CRM Sync", "PDF Gen"],
    image: "/calc.png",
    href: "/work/carbon",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Discovery call",
    body: "We talk through your problem, your workflow, and what good looks like. No jargon.",
    Icon: MessageSquare,
  },
  {
    step: "02",
    title: "Scoped proposal",
    body: "You get a fixed-price proposal with a clear scope. No surprises mid-build.",
    Icon: FileText,
  },
  {
    step: "03",
    title: "Build & review",
    body: "We build in stages and check in regularly. You see progress early and often.",
    Icon: Code2,
  },
  {
    step: "04",
    title: "Handover & support",
    body: "Full handover with documentation. Ongoing support available if you need it.",
    Icon: Shield,
  },
];

const TECH = [
  "React", "Next.js", ".NET", "Node.js", "PostgreSQL", "TypeScript",
  "Stripe", "REST APIs", "Tailwind CSS", "Vercel",
];

const softwareSchema = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Custom Software",
        item: `${SITE_URL}/software`,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Custom Software Development",
    description:
      "Bespoke internal tools, dashboards, CRM integrations and workflow automation for UK businesses.",
    provider: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/software`,
    areaServed: { "@type": "Country", name: "United Kingdom" },
  },
];

export default function SoftwarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors">
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-coral-500 via-pink-500 to-coral-500 z-50" />

        <NavHeader />

        {/* Hero */}
        <RevealSection className="relative pt-12 md:pt-20 pb-20 md:pb-32 overflow-hidden">
          {/* Ambient background */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-coral-500/[0.04] dark:bg-coral-500/[0.03] rounded-full blur-3xl translate-x-1/3 -translate-y-1/4" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-500/[0.04] dark:bg-pink-500/[0.03] rounded-full blur-3xl -translate-x-1/3 translate-y-1/4" />
          </div>

          <div className="mx-auto max-w-6xl px-5 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left: text */}
              <div>
                <p data-reveal style={{ "--d": 0 } as React.CSSProperties} className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400">
                  Custom Software
                </p>
                <h1 data-reveal style={{ "--d": 120, "--reveal-y": "16px" } as React.CSSProperties} className="text-4xl font-extrabold leading-[1.12] text-zinc-900 dark:text-white sm:text-5xl lg:text-[3.5rem] mb-6">
                  Off-the-shelf tools{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-600 to-pink-600" data-gradient style={{ "--gd": 500 } as React.CSSProperties}>
                    only get you so far.
                  </span>
                </h1>
                <p data-reveal style={{ "--d": 240 } as React.CSSProperties} className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed mb-10">
                  When your workflow has outgrown spreadsheets and duct-taped
                  SaaS tools, bespoke software is the answer. We build internal
                  tools, dashboards, and automations that slot into how you
                  actually work.
                </p>
                <div data-reveal style={{ "--d": 360 } as React.CSSProperties} className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-coral-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-coral-600/25 hover:bg-coral-700 hover:scale-[1.02] transition-all"
                  >
                    <Calendar className="h-4 w-4" />
                    Book a discovery call
                  </a>
                  <a
                    href="#projects"
                    className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-coral-600 dark:hover:text-coral-400 transition-colors"
                  >
                    See what we&apos;ve built &rarr;
                  </a>
                </div>
              </div>

              {/* Right: visual */}
              <div data-reveal style={{ "--d": 300 } as React.CSSProperties} className="hidden lg:block relative">
                <div className="absolute -inset-6 bg-gradient-to-tr from-coral-100/40 dark:from-coral-950/30 to-pink-100/40 dark:to-pink-950/30 rounded-3xl blur-2xl -z-10" />

                {/* Terminal-style mockup */}
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-900 shadow-2xl overflow-hidden">
                  {/* Title bar */}
                  <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-800">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-amber-400" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                    <span className="ml-3 text-xs text-zinc-500 font-mono">
                      your-project
                    </span>
                  </div>
                  {/* Code lines */}
                  <div className="p-5 font-mono text-sm leading-relaxed">
                    <p>
                      <span className="text-pink-400">const</span>{" "}
                      <span className="text-blue-300">dashboard</span>{" "}
                      <span className="text-zinc-500">=</span>{" "}
                      <span className="text-emerald-400">buildFor</span>
                      <span className="text-zinc-400">(</span>
                      <span className="text-amber-300">&apos;your-business&apos;</span>
                      <span className="text-zinc-400">)</span>
                    </p>
                    <p className="mt-1.5 text-zinc-600">
                      {"// "}No templates. No compromises.
                    </p>
                    <p className="mt-3">
                      <span className="text-pink-400">await</span>{" "}
                      <span className="text-blue-300">dashboard</span>
                      <span className="text-zinc-400">.</span>
                      <span className="text-emerald-400">connect</span>
                      <span className="text-zinc-400">(</span>
                      <span className="text-amber-300">&apos;your-crm&apos;</span>
                      <span className="text-zinc-400">)</span>
                    </p>
                    <p className="mt-1.5">
                      <span className="text-pink-400">await</span>{" "}
                      <span className="text-blue-300">dashboard</span>
                      <span className="text-zinc-400">.</span>
                      <span className="text-emerald-400">automate</span>
                      <span className="text-zinc-400">(</span>
                      <span className="text-amber-300">&apos;the-boring-stuff&apos;</span>
                      <span className="text-zinc-400">)</span>
                    </p>
                    <p className="mt-3">
                      <span className="text-emerald-400">console</span>
                      <span className="text-zinc-400">.</span>
                      <span className="text-emerald-400">log</span>
                      <span className="text-zinc-400">(</span>
                      <span className="text-amber-300">&apos;Hours saved: ∞&apos;</span>
                      <span className="text-zinc-400">)</span>{" "}
                      <span className="text-zinc-600">{"// "}practically</span>
                    </p>
                  </div>
                </div>

                {/* Floating cards */}
                <div className="absolute -bottom-4 -left-6 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl px-4 py-3 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                    <Layers className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      3 projects shipped
                    </p>
                    <p className="text-[10px] text-zinc-400">
                      Real software, real results
                    </p>
                  </div>
                </div>

                <div className="absolute -top-3 -right-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl px-4 py-3 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-coral-100 dark:bg-coral-950 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-coral-600 dark:text-coral-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      Fixed pricing
                    </p>
                    <p className="text-[10px] text-zinc-400">
                      No scope creep surprises
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Capabilities */}
        <RevealSection className="py-16 md:py-24 border-t border-zinc-100 dark:border-zinc-900">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="text-center mb-14">
              <p data-reveal style={{ "--d": 0 } as React.CSSProperties} className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
                What we build
              </p>
              <h2 data-reveal style={{ "--d": 80 } as React.CSSProperties} className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 md:text-4xl mb-4">
                Tools that solve{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-600 to-pink-600" data-gradient style={{ "--gd": 400 } as React.CSSProperties}>
                  real problems.
                </span>
              </h2>
              <p data-reveal style={{ "--d": 160 } as React.CSSProperties} className="text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
                We don&apos;t build software for the sake of it. Every project starts
                with a real problem and ends with a tool you&apos;ll actually use.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CAPABILITIES.map((cap, i) => (
                <div
                  key={cap.title}
                  data-reveal
                  style={{ "--d": 240 + i * 80 } as React.CSSProperties}
                  className="group rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-7 hover:border-coral-200 dark:hover:border-coral-800 hover:shadow-lg hover:shadow-coral-500/5 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-coral-50 dark:bg-coral-950/50 group-hover:bg-coral-100 dark:group-hover:bg-coral-900/50 transition-colors">
                    <cap.Icon className="h-5 w-5 text-coral-600 dark:text-coral-400" />
                  </div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* Tech Stack */}
        <RevealSection className="py-12 md:py-16 border-t border-zinc-100 dark:border-zinc-900">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div data-reveal style={{ "--d": 0 } as React.CSSProperties} className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 shrink-0">
                Built with
              </p>
              <div className="flex flex-wrap gap-2">
                {TECH.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:border-coral-300 dark:hover:border-coral-700 hover:text-coral-600 dark:hover:text-coral-400 transition-colors duration-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Projects */}
        <RevealSection
          id="projects"
          className="py-16 md:py-24 border-t border-zinc-100 dark:border-zinc-900"
        >
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="text-center mb-14">
              <p data-reveal style={{ "--d": 0 } as React.CSSProperties} className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
                Recent work
              </p>
              <h2 data-reveal style={{ "--d": 80 } as React.CSSProperties} className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 md:text-4xl">
                Software we&apos;ve shipped.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS.map((project, i) => (
                <Link
                  key={project.title}
                  href={project.href}
                  data-reveal
                  style={{ "--d": 160 + i * 120 } as React.CSSProperties}
                  className="group flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden hover:border-coral-300 dark:hover:border-coral-700 hover:shadow-xl hover:shadow-coral-500/10 hover:-translate-y-1 transition-all duration-300"
                >
                  {project.type === "image" ? (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                      <Image
                        src={project.image}
                        alt={`${project.title} — ${project.role}`}
                        fill
                        className="object-cover object-top transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-coral-700 border border-coral-100 shadow-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900 dark:bg-zinc-950 flex flex-col justify-between p-5">
                      <div className="pointer-events-none absolute inset-0">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-coral-600/15 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-36 h-36 bg-pink-600/10 rounded-full blur-2xl" />
                      </div>
                      <div className="relative flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-coral-950/80 text-coral-300 border border-coral-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="relative grid grid-cols-2 gap-2.5">
                        {project.features.map(({ Icon, label }) => (
                          <div
                            key={label}
                            className="flex items-center gap-2"
                          >
                            <div className="flex-shrink-0 h-7 w-7 rounded-lg bg-coral-950/80 border border-coral-800 flex items-center justify-center">
                              <Icon className="h-3.5 w-3.5 text-coral-400" />
                            </div>
                            <span className="text-xs font-medium text-zinc-300">
                              {label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex-1 p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-coral-600 dark:text-coral-400">
                        {project.role}
                      </p>
                      {project.type === "platform" && (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                          {project.status}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-coral-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4 flex-1">
                      {project.summary}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-coral-600 dark:text-coral-400">
                      View case study{" "}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* Process */}
        <RevealSection className="py-16 md:py-24 border-t border-zinc-100 dark:border-zinc-900">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="text-center mb-14">
              <p data-reveal style={{ "--d": 0 } as React.CSSProperties} className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
                How it works
              </p>
              <h2 data-reveal style={{ "--d": 80 } as React.CSSProperties} className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 md:text-4xl mb-4">
                Simple process.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-600 to-pink-600" data-gradient style={{ "--gd": 400 } as React.CSSProperties}>
                  No surprises.
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROCESS.map((step, i) => (
                <div key={step.step} data-reveal style={{ "--d": 160 + i * 120 } as React.CSSProperties} className="relative">
                  {/* Connector line (desktop) */}
                  {i < PROCESS.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-[calc(50%+28px)] right-[-28px] h-px bg-zinc-200 dark:bg-zinc-800" />
                  )}

                  <div className="text-center">
                    <div className="mx-auto mb-5 h-14 w-14 rounded-2xl bg-coral-600 flex items-center justify-center shadow-lg shadow-coral-600/20">
                      <step.Icon className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-coral-500 mb-2">
                      Step {step.step}
                    </p>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* CTA */}
        <RevealSection className="py-16 md:py-24 border-t border-zinc-100 dark:border-zinc-900">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div data-reveal style={{ "--d": 0 } as React.CSSProperties} className="rounded-3xl bg-gradient-to-br from-coral-600 to-pink-700 p-8 md:p-14 relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.08),_transparent_60%)]" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral-200 mb-3">
                    Got a process that needs fixing?
                  </p>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
                    Let&apos;s talk about it.
                  </h2>
                  <p className="text-coral-100 text-sm leading-relaxed max-w-md mb-8">
                    Tell us what&apos;s broken. We&apos;ll tell you honestly
                    whether software can help, what it would take to build it,
                    and give you a fixed-price proposal. No obligation.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-coral-700 shadow-xl hover:bg-coral-50 hover:scale-[1.02] transition-all"
                    >
                      <Calendar className="h-4 w-4" />
                      Book a discovery call
                    </a>
                    <Link
                      href="/packages"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-8 py-4 text-sm font-bold text-white hover:bg-white/10 transition-colors"
                    >
                      See website packages
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className="hidden lg:flex justify-center">
                  <div className="grid grid-cols-2 gap-3 max-w-xs">
                    {[
                      { label: "Fixed pricing", icon: "£" },
                      { label: "Ongoing support", icon: "↻" },
                      { label: "Full documentation", icon: "📄" },
                      { label: "Your code, your IP", icon: "✓" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl bg-white/10 border border-white/10 p-4 text-center"
                      >
                        <p className="text-2xl mb-1">{item.icon}</p>
                        <p className="text-xs font-semibold text-white/90">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </main>
    </>
  );
}
