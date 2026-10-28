import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { NavHeader } from "../components/NavHeader";
import { Footer } from "../components/Footer";
import { PROJECTS } from "../work/projects";

const SITE_URL = "https://www.jefferissoftware.co.uk";
const WHATSAPP = "https://wa.me/447887034503";

export const metadata: Metadata = {
  title: "Web Design in Brighton & Hove for Small Businesses",
  description:
    "Hove-based web designer building fast, mobile-first websites for trades, clubs, studios and professional services across Brighton, Hove and Sussex. Fixed prices from £699, hosting and support included.",
  alternates: { canonical: "/web-design-brighton-hove" },
  openGraph: {
    title: "Web Design in Brighton & Hove | Jefferis Software Solutions",
    description:
      "Fast, mobile-first websites for small businesses across Brighton, Hove and Sussex. Fixed prices from £699.",
    url: `${SITE_URL}/web-design-brighton-hove`,
  },
};

const PACKAGES = [
  { name: "Starter", price: "£699", monthly: "£29/mo", blurb: "A sharp one-page site that says what you do and gets the phone ringing.", slug: "starter" },
  { name: "CMS", price: "£1,199", monthly: "£29/mo", blurb: "Multi-page with a content system, so you can edit pages and post news yourself.", slug: "business" },
  { name: "System", price: "£2,500", monthly: "£79/mo", blurb: "The website plus the software behind it: quotes, invoices, jobs and messages in one place.", slug: "system" },
  { name: "Commerce", price: "£2,000+", monthly: "£99/mo", blurb: "A store with payments, product management and order confirmations built in.", slug: "commerce" },
];

const LOCAL_WORK = ["northstar", "dsoil", "padelquarter", "naxco"] as const;

const FAQS = [
  {
    q: "Do you only work with businesses in Brighton and Hove?",
    a: "No. I'm based in Hove, so meeting in person anywhere along the Sussex coast is easy, but most of the work happens over email, WhatsApp and short calls, and clients are spread from Portsmouth to London.",
  },
  {
    q: "What does a small business website cost?",
    a: "Fixed prices, published on the packages page: £699 for a Starter site, £1,199 with a content system, and £2,500 when you want the software that runs the business behind it. Hosting and support are a flat monthly fee on top.",
  },
  {
    q: "Will the site show up on Google?",
    a: "Every site ships with the basics done properly: fast loading, mobile-first layout, titles and descriptions written for the searches your customers actually make, structured data, a sitemap, and local wording for the areas you cover. Ranking takes time and reviews; the build makes sure nothing holds you back.",
  },
  {
    q: "Do you handle hosting, the domain and email?",
    a: "Yes. Hosting, SSL and daily backups are part of the monthly fee, and I can set up the domain and email so you don't have to. Everything stays in your name.",
  },
  {
    q: "How long does it take?",
    a: "A Starter or CMS site usually goes from first call to launch within a few weeks, depending on how quickly the photos and words come together. System builds take longer because the software is scoped around how your business runs.",
  },
];

export default function BrightonHovePage() {
  const work = LOCAL_WORK.map((s) => PROJECTS[s]);
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Web Design in Brighton & Hove",
      serviceType: "Web design and development",
      provider: { "@id": `${SITE_URL}/#business` },
      areaServed: [
        { "@type": "City", name: "Brighton and Hove" },
        { "@type": "AdministrativeArea", name: "East Sussex" },
        { "@type": "AdministrativeArea", name: "West Sussex" },
      ],
      url: `${SITE_URL}/web-design-brighton-hove`,
      offers: PACKAGES.map((p) => ({
        "@type": "Offer",
        name: `${p.name} website`,
        price: p.price.replace(/[£,+]/g, ""),
        priceCurrency: "GBP",
        url: `${SITE_URL}/packages/${p.slug}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Web design in Brighton & Hove", item: `${SITE_URL}/web-design-brighton-hove` },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <NavHeader />
      <main className="mx-auto max-w-6xl px-5 md:px-8 lg:px-10 py-12 md:py-20">
        {/* Hero */}
        <section className="max-w-3xl">
          <p className="mb-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
            <MapPin className="h-3.5 w-3.5" /> Hove, East Sussex
          </p>
          <h1 className="text-4xl font-black leading-tight tracking-tight text-zinc-900 dark:text-zinc-100 md:text-5xl">
            Web design in Brighton &amp; Hove for businesses that need{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-600 to-pink-600">the phone to ring.</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
            I build websites for trades, clubs, studios and professional services across
            Brighton, Hove and the rest of Sussex. Fast, mobile-first, written to convert,
            and backed by hosting and support so you never have to think about the technical side.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="/#plan" className="inline-flex items-center justify-center rounded-xl bg-coral-600 px-8 py-4 text-sm font-bold text-white shadow-md hover:bg-coral-700 transition-colors">
              Get a price in four questions
            </a>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-xl border border-zinc-300 dark:border-zinc-700 px-8 py-4 text-sm font-bold text-zinc-800 dark:text-zinc-200 hover:border-coral-400 transition-colors">
              WhatsApp me
            </a>
          </div>
        </section>

        {/* What you get */}
        <section className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">What every site comes with</h2>
            <p className="mt-3 text-zinc-500 dark:text-zinc-400">
              The things a local business actually needs from a website, done on every build rather than sold as extras.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              "Mobile-first design that loads fast on a phone",
              "Copy written around what your customers search for",
              "Click-to-call, WhatsApp and enquiry forms that reach you",
              "Google Business Profile and local search set up properly",
              "Reviews, accreditations and trust signals above the fold",
              "Hosting, SSL and daily backups included",
              "Privacy and cookie pages that comply with UK law",
              "Cookieless visitor analytics you can actually read",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-coral-600" /> {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Packages */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Fixed prices, no surprises</h2>
          <p className="mt-3 max-w-2xl text-zinc-500 dark:text-zinc-400">
            Every package is a one-off build fee plus a flat monthly amount for hosting and support.
            The full breakdown is on the <Link href="/packages" className="text-coral-600 dark:text-coral-400 font-semibold hover:underline">packages page</Link>.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PACKAGES.map((p) => (
              <Link key={p.slug} href={`/packages/${p.slug}`} className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 hover:border-coral-300 dark:hover:border-coral-700 transition-colors">
                <p className="text-[11px] font-bold uppercase tracking-wider text-coral-600 dark:text-coral-400">{p.name}</p>
                <p className="mt-2 text-3xl font-black text-zinc-900 dark:text-zinc-100">{p.price}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">+ {p.monthly} hosting &amp; support</p>
                <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{p.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-coral-600 dark:text-coral-400 group-hover:gap-2.5 transition-all">
                  Details <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Local work */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Recent work along the south coast</h2>
          <p className="mt-3 max-w-2xl text-zinc-500 dark:text-zinc-400">
            Plumbers, oil tank specialists, a padel club and a property maintenance firm. All live, all linked from their case studies.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {work.map((p) => (
              <Link key={p.slug} href={`/work/${p.slug}`} className="group block rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative aspect-[16/10] bg-zinc-100 dark:bg-zinc-800">
                  <Image src={p.image} alt={`${p.title} website`} fill className="object-cover object-top" sizes="(max-width: 640px) 100vw, 25vw" />
                </div>
                <div className="p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-coral-600 dark:text-coral-400">{p.role}</p>
                  <h3 className="mt-1 font-bold text-zinc-900 dark:text-zinc-100">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/work" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-coral-600 dark:text-coral-400 hover:underline">
            See all work <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        {/* How it works */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">How it works</h2>
          <ol className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-4">
            {[
              ["01", "A short call", "We talk through what the site has to do for you and where the work comes from today."],
              ["02", "Design", "You see the homepage design before anything is built, and we adjust it until it feels right."],
              ["03", "Build", "The site goes together with your photos and words, tested on real phones, with analytics wired in."],
              ["04", "Launch and support", "Domain pointed, Google told, and I stay on hand for changes as the business grows."],
            ].map(([n, t, b]) => (
              <li key={n} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
                <p className="text-xs font-bold text-coral-600 dark:text-coral-400">{n}</p>
                <h3 className="mt-2 font-bold text-zinc-900 dark:text-zinc-100">{t}</h3>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{b}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section className="mt-20 max-w-3xl">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Questions local businesses ask</h2>
          <dl className="mt-8 divide-y divide-zinc-200 dark:divide-zinc-800">
            {FAQS.map((f) => (
              <div key={f.q} className="py-5">
                <dt className="font-bold text-zinc-900 dark:text-zinc-100">{f.q}</dt>
                <dd className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* CTA */}
        <section className="mt-20 rounded-2xl bg-zinc-900 dark:bg-zinc-100 p-10 text-center">
          <h2 className="text-2xl font-bold text-white dark:text-zinc-900">Based in Hove. Happy to meet for a coffee.</h2>
          <p className="mt-2 text-zinc-300 dark:text-zinc-600">Or answer four questions and get a price straight away.</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="/#plan" className="inline-flex items-center justify-center rounded-xl bg-coral-600 px-8 py-3.5 text-sm font-bold text-white hover:bg-coral-700 transition-colors">Start your project</a>
            <a href="mailto:hello@jefferissoftware.co.uk" className="inline-flex items-center justify-center rounded-xl border border-zinc-600 dark:border-zinc-300 px-8 py-3.5 text-sm font-bold text-white dark:text-zinc-900 hover:border-coral-400 transition-colors">hello@jefferissoftware.co.uk</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
