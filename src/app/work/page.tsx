import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NavHeader } from "../components/NavHeader";
import { Footer } from "../components/Footer";
import { PROJECTS } from "./projects";

const SITE_URL = "https://www.jefferissoftware.co.uk";

export const metadata: Metadata = {
  title: "Our Work — Websites & Systems for Small Businesses",
  description:
    "Websites and business systems built for trades, clubs, studios and professional services across Sussex and the UK. Real projects, with the live sites to prove it.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Our Work | Jefferis Software Solutions",
    description:
      "Websites and business systems built for small businesses across Sussex and the UK.",
    url: `${SITE_URL}/work`,
  },
};

// Newest first; software projects sit after the websites.
const ORDER = ["padelquarter", "northstar", "dsoil", "edivert", "naxco", "ivy", "jmrt", "toolbox", "carbon"] as const;

export default function WorkIndexPage() {
  const projects = ORDER.map((slug) => PROJECTS[slug]);
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Our Work",
    url: `${SITE_URL}/work`,
    hasPart: projects.map((p) => ({
      "@type": "CreativeWork",
      name: p.title,
      url: `${SITE_URL}/work/${p.slug}`,
      description: p.summary,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <NavHeader />
      <main className="mx-auto max-w-6xl px-5 md:px-8 lg:px-10 py-12 md:py-20">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">Work</p>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 md:text-4xl">
            Real projects,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-600 to-pink-600">real results.</span>
          </h1>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400">
            Websites and business systems for trades, clubs, studios and professional services,
            most of them within an hour of Hove. Every live site is linked, so you can judge the
            work on the real thing rather than a mock-up.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/work/${p.slug}`}
                className="group block h-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="relative aspect-[16/10] w-full bg-zinc-100 dark:bg-zinc-800">
                  <Image src={p.image} alt={`${p.title} — ${p.role}`} fill className="object-cover object-top" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                </div>
                <div className="p-5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-coral-600 dark:text-coral-400">{p.role}</p>
                  <h2 className="mt-1 text-lg font-bold text-zinc-900 dark:text-zinc-100">{p.title}</h2>
                  <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{p.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-coral-600 dark:text-coral-400 group-hover:gap-2.5 transition-all">
                    Case study <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-16 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-8 text-center">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Want yours on this page?</h2>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">Four questions and you get a straight answer on price.</p>
          <a href="/#plan" className="mt-6 inline-flex items-center justify-center rounded-xl bg-coral-600 px-8 py-3.5 text-sm font-bold text-white shadow-md hover:bg-coral-700 transition-colors">
            Start your project
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
