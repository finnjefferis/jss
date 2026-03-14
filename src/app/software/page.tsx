import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BackButton } from "../work/[slug]/BackButton";
import { Check, ArrowRight, BarChart3, Cpu, Zap, Database, RefreshCw, FileText, Users, Music2, Rss, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Software Development",
  description: "Bespoke internal tools, dashboards, CRM integrations and automation for UK businesses. Built to save time and surface real data.",
};

const CAPABILITIES = [
  {
    Icon: BarChart3,
    title: "Dashboards & Reporting",
    description: "Turn your raw data into something you can actually act on. Custom dashboards that surface the numbers that matter.",
  },
  {
    Icon: Database,
    title: "CRM & API Integrations",
    description: "Connect your tools. Sync data between your CRM, website, and third-party platforms automatically.",
  },
  {
    Icon: RefreshCw,
    title: "Workflow Automation",
    description: "Eliminate repetitive manual tasks. We map your process and build software that handles it for you.",
  },
  {
    Icon: FileText,
    title: "Document Generation",
    description: "Branded PDF reports, quotes, contracts — generated automatically from your data and sent where they need to go.",
  },
  {
    Icon: Cpu,
    title: "Booking & Client Portals",
    description: "Custom booking systems, client-facing portals, and self-service tools built around how you actually work.",
  },
  {
    Icon: Zap,
    title: "AI & Smart Tooling",
    description: "Practical AI integrations that save real hours. Not hype — tools that solve specific problems in your workflow.",
  },
];

type Project =
  | { type: "image"; title: string; role: string; summary: string; tags: string[]; image: string; href: string }
  | { type: "platform"; title: string; role: string; summary: string; tags: string[]; href: string; status: string; features: { Icon: React.ElementType; label: string }[] };

const PROJECTS: Project[] = [
  {
    type: "platform",
    title: "Ivy Arch Community",
    role: "Community Platform",
    summary: "A full-stack platform for the local music scene — musician profiles, band discovery, a community feed, direct messaging, and OAuth authentication. Built on Next.js 15 and Payload CMS with a PostgreSQL database.",
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
    summary: "A .NET procurement dashboard tracking millions in cost savings across multiple suppliers. Real-time data, management reporting, and multi-supplier aggregation.",
    tags: [".NET MVC", "Data", "Reporting"],
    image: "/gtoolbox.png",
    href: "/work/toolbox",
  },
  {
    type: "image",
    title: "Carbon Calculator",
    role: "Web Application",
    summary: "Interactive carbon footprint tool generating branded PDF reports and syncing results directly to the client CRM. Built in React with live API integration.",
    tags: ["React", "CRM Sync", "PDF Gen"],
    image: "/calc.png",
    href: "/work/carbon",
  },
];

const PROCESS = [
  { step: "01", title: "Discovery call", body: "We talk through your problem, your workflow, and what good looks like. No jargon." },
  { step: "02", title: "Scoped proposal", body: "You get a fixed-price proposal with a clear scope. No surprises mid-build." },
  { step: "03", title: "Build & review", body: "We build in stages and check in regularly. You see progress early and often." },
  { step: "04", title: "Handover & support", body: "Full handover with documentation. Ongoing support available if you need it." },
];

export default function SoftwarePage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors">

      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 z-50" />

      <div className="mx-auto max-w-6xl px-5 md:px-8 pt-8 pb-4">
        <BackButton />
      </div>

      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-rose-500/8 dark:bg-rose-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-pink-500/8 dark:bg-pink-500/5 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-5 md:px-8 relative z-10">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400">
              Custom Software
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.15] text-zinc-900 dark:text-white sm:text-5xl lg:text-6xl mb-6">
              Your workflow is broken.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">
                We fix it with software.
              </span>
            </h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed mb-10">
              Off-the-shelf tools only get you so far. When your workflow has outgrown them, bespoke software is the answer. We build internal tools, dashboards, and automations that slot into how you actually work.
            </p>
            <a
              href="https://wa.me/447887034503?text=Hi%20Finn%2C%20I%20have%20a%20custom%20software%20project%20in%20mind."
              className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-rose-600/25 hover:bg-rose-700 hover:scale-[1.02] transition-all"
            >
              Discuss your project
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 md:py-20 border-t border-zinc-100 dark:border-zinc-900">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-16">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">What we build</p>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 md:text-3xl leading-tight">
                Tools that solve real problems.
              </h2>
            </div>
            <div className="mt-10 lg:mt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CAPABILITIES.map((cap) => (
                <div key={cap.title} className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 dark:bg-rose-950/50">
                    <cap.Icon className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                  </div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">{cap.title}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{cap.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 md:py-20 border-t border-zinc-100 dark:border-zinc-900">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-16">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">Recent work</p>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 md:text-3xl leading-tight">
                Software we&apos;ve shipped.
              </h2>
            </div>
            <div className="mt-10 lg:mt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROJECTS.map((project) => (
                <Link key={project.title} href={project.href} className="group block rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-500/10 transition-all">
                  {project.type === "image" ? (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                      <Image src={project.image} alt={project.title} fill className="object-cover object-top transition duration-500 group-hover:scale-105" />
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="backdrop-blur-md bg-white/90 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-rose-700 border border-rose-100 shadow-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-900 dark:bg-zinc-950 flex flex-col justify-between p-6">
                      <div className="pointer-events-none absolute inset-0">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/15 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-600/10 rounded-full blur-2xl" />
                      </div>
                      <div className="relative flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-950/80 text-rose-300 border border-rose-800">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="relative grid grid-cols-2 gap-3">
                        {project.features.map(({ Icon, label }) => (
                          <div key={label} className="flex items-center gap-2.5">
                            <div className="flex-shrink-0 h-7 w-7 rounded-lg bg-rose-950/80 border border-rose-800 flex items-center justify-center">
                              <Icon className="h-3.5 w-3.5 text-rose-400" />
                            </div>
                            <span className="text-xs font-medium text-zinc-300">{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">{project.role}</p>
                      {project.type === "platform" && (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                          {project.status}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-rose-600 transition-colors">{project.title}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">{project.summary}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-rose-600 dark:text-rose-400">
                      View case study <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20 border-t border-zinc-100 dark:border-zinc-900">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-16">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">How it works</p>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 md:text-3xl leading-tight">
                Simple process, no surprises.
              </h2>
            </div>
            <div className="mt-10 lg:mt-0 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {PROCESS.map((step) => (
                <div key={step.step} className="flex gap-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6">
                  <span className="text-3xl font-extrabold text-zinc-100 dark:text-zinc-800 tabular-nums leading-none mt-0.5 select-none">{step.step}</span>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">{step.title}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 border-t border-zinc-100 dark:border-zinc-900">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="rounded-2xl border border-rose-100 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/30 p-10 md:p-14 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 mb-3">Get started</p>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 md:text-3xl mb-3">
              Got a process that needs fixing?
            </h2>
            <p className="text-base text-zinc-500 dark:text-zinc-400 mb-8 max-w-lg mx-auto">
              Tell us what it is. We&apos;ll tell you honestly whether software can help, and what it would take to build it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/447887034503?text=Hi%20Finn%2C%20I%20have%20a%20custom%20software%20project%20in%20mind."
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-rose-600/25 hover:bg-rose-700 hover:scale-[1.02] transition-all"
              >
                Start the conversation
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/#recent-work"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-700 px-8 py-4 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:border-rose-300 hover:text-rose-600 transition-all"
              >
                See all projects
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
