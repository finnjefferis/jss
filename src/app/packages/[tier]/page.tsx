import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BackButton } from "../../work/[slug]/BackButton";
import {
  Check, ArrowRight, Calendar, Clock,
  Zap, BarChart3, ShoppingBag, X, Quote,
} from "lucide-react";

const BOOKING_URL =
  "https://outlook.office.com/bookwithme/user/b44ea33c0eb847a3a69babfcdc453315@jefferissoftware.co.uk?anonymous&ismsaljsauthenabled&ep=plink";

type PackageData = {
  name: string;
  price: string;
  tagline: string;
  Icon: React.ComponentType<{ className?: string }>;
  headline: string;
  subheadline: string;
  trustSignals: string[];
  example: {
    clientName: string;
    clientType: string;
    image: string;
    slug: string;
    story: string;
    result: string;
    note?: string;
    quote: string;
    tags: string[];
  };
  includes: { title: string; description: string }[];
  process: { step: string; title: string; body: string; duration: string }[];
  perfectFor: string[];
  notFor: string[];
  faqs: { q: string; a: string }[];
};

const PACKAGES: Record<string, PackageData> = {
  starter: {
    name: "Starter",
    price: "£295",
    tagline: "Get online fast.",
    Icon: Zap,
    headline: "A clean, professional site. Live in under two weeks.",
    subheadline:
      "Fixed scope, fixed price. No CMS to learn. Just a great site that works hard for your business from day one — plus we set up your Google Business profile.",
    trustSignals: ["Fixed price, no surprises", "7–10 day delivery", "Google Business setup included"],
    example: {
      clientName: "Naxco Services",
      clientType: "Property maintenance",
      image: "/naxnew.png",
      slug: "naxco",
      story:
        "Naxco is a local property maintenance company. Their old site was text-heavy, hard to navigate on mobile, and simply wasn't generating leads. We rebuilt it from scratch — clarified what they do, added trust signals, and made it dead simple to get in touch.",
      result: "A site they're proud to hand out on a business card, live in under 10 days.",
      quote: "Professional, fast, and genuinely made a difference to how we come across online.",
      tags: ["Design", "Dev", "Copy"],
    },
    includes: [
      { title: "Up to 5 pages", description: "Home, About, Services, Contact — whatever you need, up to five pages built and polished." },
      { title: "Mobile-first design", description: "Looks sharp on every screen. Over 60% of web traffic is mobile — we build for it first." },
      { title: "Contact form", description: "Simple, reliable enquiry form wired directly to your inbox." },
      { title: "Basic SEO setup", description: "Page titles, meta descriptions, and a clean structure that Google can index properly." },
      { title: "Google Business setup", description: "We set up or optimise your Google Business profile so you show up in local searches and Maps." },
      { title: "7–10 day delivery", description: "From kickoff to live site in under two weeks. No dragging it out." },
    ],
    process: [
      { step: "01", title: "Discovery call", body: "30 minutes. We talk through your business, your goals, and exactly what the site needs to do. No jargon.", duration: "30 min" },
      { step: "02", title: "Scope & proposal", body: "You get a written scope and a fixed price. You know what you're getting before we start. No surprises.", duration: "1 day" },
      { step: "03", title: "Design & build", body: "We build the site and keep you in the loop. You'll see a staging version before anything goes live.", duration: "5–7 days" },
      { step: "04", title: "Review", body: "You review the site and give feedback. One round of revisions included.", duration: "1–2 days" },
      { step: "05", title: "Launch", body: "We handle deployment, point everything at your domain, and set up your Google Business profile. You go live.", duration: "1 day" },
    ],
    perfectFor: [
      "New businesses getting online for the first time",
      "Trades and service businesses that need a professional presence fast",
      "Businesses replacing an old, broken, or embarrassing site",
      "Anyone who wants it done properly without overthinking it",
    ],
    notFor: [
      "Businesses that need to update their own content regularly (see Business)",
      "E-commerce or product-based businesses (see Commerce)",
    ],
    faqs: [
      { q: "What if I need more than 5 pages?", a: "Additional pages are scoped at £75 each, or you might be better suited to the Business package which includes up to 8 pages." },
      { q: "Can I update the site myself?", a: "Not on this package. Starter is a fixed, hand-coded site. If you want to edit content yourself, the Business package includes a full CMS." },
      { q: "What do I need to provide?", a: "Your logo, any photos you want to use, and a rough idea of what you want the site to say. We can help with copy if needed." },
      { q: "Is hosting included?", a: "All sites include ongoing hosting, SSL, and maintenance at £29/month. This covers everything — you don't need to worry about servers or renewals." },
      { q: "Can I pay in instalments?", a: "Yes. We offer a 3-month payment plan on all packages — no interest, no fuss." },
    ],
  },

  business: {
    name: "Business",
    price: "£795",
    tagline: "Built to grow.",
    Icon: BarChart3,
    headline: "A professional site you can actually keep up to date.",
    subheadline:
      "Everything in Starter, plus a CMS so you can edit your own content without touching code — and a blog to build your SEO over time.",
    trustSignals: ["Full CMS included", "Up to 8 pages", "2 rounds of revisions"],
    example: {
      clientName: "eDivert",
      clientType: "Virtual assistant services",
      image: "/edivertnew.png",
      slug: "edivert",
      story:
        "eDivert is a virtual assistant and personal assistant company with real expertise and a strong client base. Their website didn't reflect any of that. Outdated design, poor mobile experience, no clear calls to action. We rebuilt it so it actually converts — and gave them CMS access so they can keep it fresh themselves.",
      result: "Modern, conversion-focused design. They now manage their own content without touching code.",
      quote: "Our old site was an embarrassment. The new one we're actually proud to share.",
      tags: ["Design", "Dev", "CMS", "SEO"],
    },
    includes: [
      { title: "Everything in Starter", description: "All five pages, mobile-first design, contact form, SEO setup, Google Business, and fast delivery." },
      { title: "CMS access", description: "Edit your content, swap images, and update copy whenever you need to — no developer required." },
      { title: "Blog or news section", description: "Publish articles, case studies, or updates. One of the most effective long-term SEO strategies." },
      { title: "Editable service pages", description: "Update your services, pricing, or offers whenever things change without waiting on anyone." },
      { title: "Recorded training session", description: "A full walkthrough of the CMS recorded so you can refer back any time — or share with your team." },
      { title: "Priority support", description: "Faster response times and first in line for any fixes or updates you need." },
    ],
    process: [
      { step: "01", title: "Discovery call", body: "We talk through your business, goals, and what content you'll want to manage yourself.", duration: "30–45 min" },
      { step: "02", title: "Scope & proposal", body: "Fixed-price proposal with full written scope. You know exactly what you're getting before we start.", duration: "1–2 days" },
      { step: "03", title: "Design & build", body: "We build the site and wire up the CMS. You'll review a staging version before anything goes live.", duration: "7–10 days" },
      { step: "04", title: "Review & revisions", body: "Two rounds of revisions to get everything right.", duration: "2–3 days" },
      { step: "05", title: "Training & handover", body: "Recorded CMS walkthrough so you can update the site confidently going forward.", duration: "1 day" },
      { step: "06", title: "Launch", body: "We deploy, handle DNS, and make sure everything is live and working.", duration: "1 day" },
    ],
    perfectFor: [
      "Businesses that want to post blogs or news updates regularly",
      "Service businesses with changing offers, pricing, or availability",
      "Anyone who wants to reduce reliance on a developer for day-to-day content changes",
      "Businesses investing in organic SEO over the long term",
    ],
    notFor: [
      "Businesses that just need a static brochure site (Starter is cheaper and faster)",
      "Businesses selling products online (see Commerce)",
    ],
    faqs: [
      { q: "Which CMS do you use?", a: "We typically use Sanity — it's clean, fast, and genuinely easy to use. We'll walk you through it in the training session." },
      { q: "Can I upgrade from Starter to Business later?", a: "It's possible but more expensive than starting with Business. If you think you'll want CMS access, start here." },
      { q: "How many pages are included?", a: "Up to 8 pages. Additional pages can be added at £75 each." },
      { q: "What does priority support mean?", a: "Business clients get a same-day response where possible and are first in line for any fix or update requests." },
      { q: "Is hosting included?", a: "All sites include ongoing hosting, SSL, and maintenance at £29/month. This covers everything — you don't need to worry about servers or renewals." },
      { q: "Can I pay in instalments?", a: "Yes. We offer a 3-month payment plan on all packages — no interest, no fuss." },
    ],
  },

  commerce: {
    name: "Commerce",
    price: "£1,495+",
    tagline: "Built to sell.",
    Icon: ShoppingBag,
    headline: "A store that handles itself.",
    subheadline:
      "Full e-commerce with payments, inventory management, and automations that mean less time on admin — and more time on your business.",
    trustSignals: ["Stripe payments included", "Full product management", "Ongoing support available"],
    example: {
      clientName: "Ivy Arch Studios",
      clientType: "Practice room hire",
      image: "/ivyarch.png",
      slug: "ivy",
      story:
        "Ivy Arch Studios needed a website that reflected the quality of their practice rooms and made it easy for musicians and creatives to find availability and book a session. We built them a site with an integrated booking flow, clean creative design, and a fully mobile-optimised experience.",
      result: "A site that matches the quality of what they offer — with bookings built right in.",
      note: "This engagement also included Project Ivy — a bespoke booking management system built alongside the site.",
      quote: "Good work quickly done diligently and effectively.",
      tags: ["Design", "Dev", "Booking", "SEO"],
    },
    includes: [
      { title: "Everything in Business", description: "Full site, CMS, blog, editable pages, training, and priority support — all included." },
      { title: "E-commerce setup", description: "Product listings, categories, and filters. A shop that's easy to browse and straightforward to buy from." },
      { title: "Payment integration", description: "Stripe by default — secure, reliable, and trusted by customers. Other providers available." },
      { title: "Product management", description: "Add, edit, or remove products yourself from the CMS. No developer needed for catalogue changes." },
      { title: "Order confirmations", description: "Automated emails to customers when they place an order. Professional from day one." },
      { title: "Ongoing support available", description: "Commerce sites evolve. We offer retainer support for businesses that want it." },
    ],
    process: [
      { step: "01", title: "Discovery call", body: "We scope the full store: products, categories, payment flow, and any automation you need.", duration: "45–60 min" },
      { step: "02", title: "Scoped proposal", body: "Fixed-price quote based on your catalogue size and requirements. We give you an accurate number before you commit to anything.", duration: "2–3 days" },
      { step: "03", title: "Design & build", body: "We build the store and test every part of the purchase flow end-to-end before you see it.", duration: "10–14 days" },
      { step: "04", title: "Review & testing", body: "You test the store fully. We fix anything and fine-tune the experience.", duration: "2–3 days" },
      { step: "05", title: "Training & handover", body: "We walk you through managing products, orders, and the CMS.", duration: "1 day" },
      { step: "06", title: "Launch", body: "Full deployment, DNS, payment gateway activation, and a final end-to-end checkout test.", duration: "1 day" },
    ],
    perfectFor: [
      "Businesses selling physical or digital products",
      "Service businesses with bookable packages or online payment",
      "Businesses moving from Etsy, Shopify, or a poorly performing store",
      "Businesses that want their shop integrated with the rest of their site",
    ],
    notFor: [
      "Businesses with very large catalogues (500+ products) — contact us first to discuss scope",
      "Businesses not yet ready to sell online",
    ],
    faqs: [
      { q: "Why does the price say £1,495+?", a: "Commerce projects vary based on catalogue size, integrations, and automation. £1,495 is the starting point — we'll scope your project accurately before you commit to anything." },
      { q: "Which payment provider do you use?", a: "Stripe is our default — it's reliable, well-supported, and trusted by customers. We can integrate others if needed." },
      { q: "Can I manage products myself?", a: "Yes. Product management is built into the CMS so you can add, update, or remove products without touching code." },
      { q: "Do you offer ongoing support?", a: "Yes. Commerce clients can opt into a monthly support retainer for updates, new features, and technical help." },
      { q: "Is hosting included?", a: "All sites include ongoing hosting, SSL, and maintenance at £29/month. This covers everything — you don't need to worry about servers or renewals." },
      { q: "Can I pay in instalments?", a: "Yes. We offer a 3-month payment plan on all packages — no interest, no fuss." },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(PACKAGES).map((tier) => ({ tier }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tier: string }>;
}): Promise<Metadata> {
  const { tier } = await params;
  const pkg = PACKAGES[tier];
  if (!pkg) return {};
  return {
    title: `${pkg.name} Website Package — ${pkg.price}`,
    description: `${pkg.headline} ${pkg.subheadline}`,
  };
}

export default async function PackagePage({
  params,
}: {
  params: Promise<{ tier: string }>;
}) {
  const { tier } = await params;
  const pkg = PACKAGES[tier];
  if (!pkg) notFound();

  const { Icon } = pkg;

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 z-50" />

      <div className="mx-auto max-w-6xl px-5 md:px-8 pt-8 pb-4">
        <BackButton />
      </div>

      {/* Hero */}
      <section className="relative py-14 md:py-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-rose-500/6 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-sky-500/6 rounded-full blur-3xl" />
        </div>
        <div className="mx-auto max-w-6xl px-5 md:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-16 lg:items-start">
            {/* Left: headline + CTA */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 dark:bg-rose-950/50">
                  <Icon className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
                  {pkg.name} package
                </p>
              </div>
              <h1 className="text-3xl font-extrabold leading-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-5xl mb-5">
                {pkg.headline}
              </h1>
              <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8 max-w-xl">
                {pkg.subheadline}
              </p>
              <div className="flex flex-wrap gap-2.5 mb-8">
                {pkg.trustSignals.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                    <Check className="h-3 w-3 text-rose-500" />
                    {s}
                  </span>
                ))}
              </div>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-rose-600/25 hover:bg-rose-700 hover:scale-[1.02] transition-all"
              >
                <Calendar className="h-4 w-4" />
                Book your free discovery call
              </a>
            </div>

            {/* Right: package summary card */}
            <div className="hidden lg:flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
              <div className="bg-rose-600 px-6 py-5">
                <p className="text-3xl font-extrabold text-white">{pkg.price}</p>
                <p className="text-sm text-rose-200 mt-1">{pkg.tagline}</p>
              </div>
              <div className="px-6 py-5 space-y-3">
                {pkg.includes.slice(0, 5).map((item) => (
                  <div key={item.title} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 shrink-0 mt-0.5 text-rose-500" />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">{item.title}</span>
                  </div>
                ))}
                {pkg.includes.length > 5 && (
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 pl-6">
                    + {pkg.includes.length - 5} more below
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-14 md:py-20 border-t border-zinc-100 dark:border-zinc-900">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mb-10">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
              What&apos;s included
            </p>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 md:text-3xl">
              Everything in the {pkg.name} package.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pkg.includes.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-5"
              >
                <div className="flex-shrink-0 mt-0.5 h-5 w-5 rounded-full bg-rose-100 dark:bg-rose-950 flex items-center justify-center">
                  <Check className="h-3 w-3 text-rose-600 dark:text-rose-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">{item.title}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real example */}
      <section className="py-14 md:py-20 border-t border-zinc-100 dark:border-zinc-900">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mb-10">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
              Seen in practice
            </p>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 md:text-3xl">
              What a {pkg.name} site looks like.
            </h2>
          </div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-10 lg:items-start">
            {/* Screenshot */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden mb-8 lg:mb-0">
              <div className="relative aspect-[4/3] w-full bg-zinc-100 dark:bg-zinc-900">
                <Image
                  src={pkg.example.image}
                  alt={pkg.example.clientName}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                  {pkg.example.tags.map((tag) => (
                    <span key={tag} className="bg-white px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-rose-700 border border-rose-100 shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Story + quote */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1">
                  {pkg.example.clientType}
                </p>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                  {pkg.example.clientName}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                  {pkg.example.story}
                </p>
                <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  {pkg.example.result}
                </p>
                {pkg.example.note && (
                  <p className="mt-3 text-xs text-zinc-400 dark:text-zinc-500 italic border-l-2 border-zinc-200 dark:border-zinc-700 pl-3">
                    {pkg.example.note}
                  </p>
                )}
              </div>
              <div className="rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900 p-5">
                <Quote className="h-5 w-5 text-rose-300 dark:text-rose-700 mb-3" />
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed italic mb-3">
                  &ldquo;{pkg.example.quote}&rdquo;
                </p>
                <p className="text-xs font-bold text-rose-600 dark:text-rose-400">
                  &mdash; {pkg.example.clientName}
                </p>
              </div>
              <Link
                href={`/work/${pkg.example.slug}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 transition-colors"
              >
                View full case study
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-14 md:py-20 border-t border-zinc-100 dark:border-zinc-900">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-16">
            <div className="mb-10 lg:mb-0">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
                The process
              </p>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 md:text-3xl">
                Exactly what happens after you book.
              </h2>
            </div>
            <div className="relative">
              <div className="absolute left-5 top-5 bottom-5 w-px bg-zinc-200 dark:bg-zinc-800" />
              <div className="space-y-6">
                {pkg.process.map((step) => (
                  <div key={step.step} className="flex gap-5">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-rose-600 flex items-center justify-center text-xs font-bold text-white tabular-nums z-10 relative">
                      {step.step}
                    </div>
                    <div className="flex-1 pt-1.5 pb-2">
                      <div className="flex items-center gap-3 mb-1.5">
                        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{step.title}</h3>
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-zinc-400 dark:text-zinc-500">
                          <Clock className="h-3 w-3" />
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect for / Not for */}
      <section className="py-14 md:py-20 border-t border-zinc-100 dark:border-zinc-900">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mb-10">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
              Is this right for you?
            </p>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 md:text-3xl">
              {pkg.name} works best when&hellip;
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-emerald-100 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20 p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-5">
                Great fit
              </p>
              <ul className="space-y-3.5">
                {pkg.perfectFor.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                    <Check className="h-4 w-4 shrink-0 mt-0.5 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-5">
                Probably not the right fit
              </p>
              <ul className="space-y-3.5">
                {pkg.notFor.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                    <X className="h-4 w-4 shrink-0 mt-0.5 text-zinc-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-20 border-t border-zinc-100 dark:border-zinc-900">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-16">
            <div className="mb-10 lg:mb-0">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
                FAQ
              </p>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 md:text-3xl mb-2">
                Common questions.
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Anything else? Ask on the discovery call.
              </p>
            </div>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {pkg.faqs.map((faq) => (
                <div key={faq.q} className="py-6">
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">{faq.q}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 border-t border-zinc-100 dark:border-zinc-900">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-rose-600 to-pink-700 p-8 md:p-14 text-center relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.08),_transparent_60%)]" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-200 mb-3">
              Ready to get started?
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
              Book your free discovery call.
            </h2>
            <p className="text-rose-100 text-sm leading-relaxed max-w-md mx-auto mb-8">
              30 minutes. No sales pressure. We talk through your project, confirm it&apos;s the right fit, and map out exactly what happens next. If it&apos;s not right for you, we&apos;ll say so.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-rose-700 shadow-xl hover:bg-rose-50 hover:scale-[1.02] transition-all"
            >
              <Calendar className="h-4 w-4" />
              Schedule a time that works for you
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-5 text-xs text-rose-300">
              Prefer a different way?{" "}
              <Link href="/#contact" className="underline hover:text-white transition-colors">
                Get in touch here.
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
