import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { ComparisonSlider } from "./ComparisonSlider";
import { BackButton } from "./BackButton";
import { ExternalLink, Check, Users, Music2, MessageSquare, Rss, ShieldCheck, Layers } from "lucide-react";

import { PROJECTS, type ProjectSlug } from "../projects";

export async function generateStaticParams() {
  return Object.keys(PROJECTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS[slug as ProjectSlug];
  if (!project) return {};
  const title = `${project.title}: ${project.role}`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: `${title} | Jefferis Software Solutions`,
      description: project.summary,
      url: `/work/${slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS[slug as ProjectSlug];
  if (!project) notFound();

  const isSoftware = project.slug === "toolbox" || project.slug === "carbon";

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors">

      {/* Top bar */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-coral-500 via-pink-500 to-coral-500 z-50" />

      {/* Nav */}
      <div className="mx-auto max-w-4xl px-5 md:px-8 pt-8 pb-4">
        <BackButton />
      </div>

      <article className="mx-auto max-w-4xl px-5 md:px-8 pb-24">

        {/* Header */}
        <header className="mb-12 pt-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-coral-50 dark:bg-coral-950/50 text-coral-700 dark:text-coral-300 border border-coral-100 dark:border-coral-900">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-3 leading-tight">
            {project.title}
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
            {project.summary}
          </p>
        </header>

        {/* Hero image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl mb-16 bg-zinc-100 dark:bg-zinc-900">
          <Image src={project.image} alt={project.title} fill className="object-cover object-top" priority />
        </div>

        {/* Challenge + Outcomes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 mb-3">The Challenge</p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base">
              {project.challenge}
            </p>
            {project.externalLink && (
              <a
                href={project.externalLink}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-coral-600 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-coral-700 transition-all"
              >
                Visit live site <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 mb-3">
              {isSoftware ? "What we built" : "What we focused on"}
            </p>
            <ul className="space-y-3">
              {project.outcomes.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-coral-100 dark:bg-coral-950 text-coral-600 dark:text-coral-400">
                    <Check className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Before/after slider (web projects only) */}
        {project.beforeSrc && project.afterSrc && (
          <div className="mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 mb-3">Before & After</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Drag the slider to see the transformation.</p>
            <ComparisonSlider beforeSrc={project.beforeSrc} afterSrc={project.afterSrc} />
          </div>
        )}

        {/* Ivy Arch Community — Project Ivy */}
        {project.slug === "ivy" && (
          <div className="mb-16">
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              {/* Header bar */}
              <div className="bg-zinc-900 dark:bg-zinc-950 px-8 py-7 border-b border-zinc-700 dark:border-zinc-800">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 mb-2">
                  Going further
                </p>
                <h2 className="text-2xl font-extrabold text-white mb-2">Ivy Arch Community</h2>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">
                  Alongside the studio website, we&apos;re building a dedicated platform for the local music scene — a space for musicians to find each other, form bands, share opportunities, and connect. Built for Ivy Arch, open to the community.
                </p>
              </div>

              {/* Feature grid */}
              <div className="p-8 bg-white dark:bg-zinc-900">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {[
                    { Icon: Users, title: "Musician profiles", body: "Every member lists their instruments, proficiency levels, musician type, and whether they're looking to join a band. Discoverable by other musicians." },
                    { Icon: Music2, title: "Band discovery", body: "Bands have full profiles — genres, member rosters, open positions with required skill levels. Musicians can request to join; bands can invite members." },
                    { Icon: Rss, title: "Community feed", body: "Members post opportunities: looking for musicians, jam sessions, gigs, or general updates. Filterable by category and surfaced by relevance." },
                    { Icon: MessageSquare, title: "Direct messaging", body: "Full inbox for direct messages, band join requests, jam scheduling, and invites. Email notifications for new messages." },
                    { Icon: ShieldCheck, title: "OAuth authentication", body: "Sign in with Google, Facebook, or Apple. Secure JWT sessions with rate-limited login and automatic lockout." },
                    { Icon: Layers, title: "Powered by Payload CMS", body: "Built on Payload 3 with a PostgreSQL database. Full admin panel, media uploads via Vercel Blob, and a GraphQL API under the hood." },
                  ].map(({ Icon, title, body }) => (
                    <div key={title} className="flex gap-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5">
                      <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-coral-50 dark:bg-coral-950 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-coral-600 dark:text-coral-400" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">{title}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stack + status row */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="flex flex-wrap gap-2">
                    {["Next.js 15", "Payload CMS", "PostgreSQL", "Tailwind CSS", "Vercel Blob", "OAuth"].map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                    In development
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="rounded-2xl border border-coral-100 dark:border-coral-900 bg-coral-50/50 dark:bg-coral-950/30 p-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 mb-3">
            {isSoftware ? "Need something similar?" : "Want results like this?"}
          </p>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            {isSoftware ? "Let's build your tool." : "Let's refresh your site."}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 max-w-sm mx-auto">
            {isSoftware
              ? "We build internal tools, dashboards, and automations that save time and surface real data."
              : "A focused project, delivered fast, with measurable results."}
          </p>
          <a
            href="https://wa.me/447887034503?text=Hi%20Finn%2C%20I%27d%20like%20to%20discuss%20a%20project."
            className="inline-flex items-center gap-2 rounded-xl bg-coral-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-coral-600/25 hover:bg-coral-700 hover:scale-[1.02] transition-all"
          >
            Discuss your project
          </a>
        </div>

      </article>
    </main>
  );
}
