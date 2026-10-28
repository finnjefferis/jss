export type ProjectSlug = "naxco" | "edivert" | "ivy" | "jmrt" | "toolbox" | "carbon" | "dsoil" | "padelquarter" | "northstar";

export type Project = {
  slug: ProjectSlug;
  title: string;
  role: string;
  tags: string[];
  summary: string;
  image: string;
  externalLink?: string;
  challenge: string;
  outcomes: string[];
  beforeSrc?: string;
  afterSrc?: string;
  afterImage?: string;
};

export const PROJECTS: Record<ProjectSlug, Project> = {
  naxco: {
    slug: "naxco",
    title: "Naxco Services",
    role: "Website Refresh",
    tags: ["Design", "Dev", "Copy"],
    summary: "Complete homepage rebuild for a local trades business. Focused on trust, clarity, and conversion.",
    image: "/naxco1.png",
    externalLink: "https://naxco.co.uk",
    challenge:
      "Naxco is a local property maintenance company. Their old site was text-heavy, hard to navigate on mobile, and wasn't generating leads. The goal was to make it immediately clear what they do, build trust fast, and make it dead simple to book.",
    outcomes: ["Clarify service offering", "Add trust signals", "Easy WhatsApp booking"],
    beforeSrc: "/naxold.png",
    afterSrc: "/naxnew.png",
  },
  edivert: {
    slug: "edivert",
    title: "eDivert",
    role: "Website Refresh",
    tags: ["Design", "Dev", "SEO"],
    summary: "Modern refresh for a virtual assistant company. The old site wasn't converting. Now it does.",
    image: "/edivertnew.png",
    externalLink: "https://www.edivert.co.uk/",
    challenge:
      "eDivert is a virtual assistant and personal assistant company. Their old website wasn't working for them. Outdated design, poor mobile experience, and no enquiries coming through. We refreshed it so it actually converts.",
    outcomes: ["Modern, professional design", "Mobile-first approach", "Clear calls to action"],
    beforeSrc: "/edivbefore.png",
    afterSrc: "/edivafter.png",
    afterImage: "/edivafter.png",
  },
  ivy: {
    slug: "ivy",
    title: "Ivy Arch Studios",
    role: "Website Refresh",
    tags: ["Design", "Dev", "SEO"],
    summary: "New website for a local practice room featuring booking system.",
    image: "/ivyarch.png",
    externalLink: "https://www.ivyarchstudios.co.uk",
    challenge:
      "Ivy Arch Studios needed a website that reflected the quality of their practice rooms and made it easy for musicians and creatives to find availability and book a session.",
    outcomes: ["Clean, creative design", "Integrated booking flow", "Mobile-first"],
  },
  jmrt: {
    slug: "jmrt",
    title: "JMRT Photo",
    role: "Website + CMS",
    tags: ["Design", "Dev", "SEO"],
    summary: "Bespoke website for a local photographer with a full CMS so the client can update their content regularly.",
    image: "/jmrt.png",
    externalLink: "https://jmrt-photo.vercel.app/",
    challenge:
      "JMRT needed a portfolio site that was as sharp as their photography, and importantly, one they could manage themselves. We built a custom CMS so they can add shoots, update galleries, and keep the site fresh without touching code.",
    outcomes: ["Bespoke CMS", "Gallery management", "Fast image delivery"],
  },
  toolbox: {
    slug: "toolbox",
    title: "Toolbox Platform",
    role: "Bespoke Software",
    tags: [".NET MVC", "Data", "Reporting"],
    summary: "A .NET procurement dashboard for tracking millions in cost savings across multiple suppliers.",
    image: "/gtoolbox.png",
    challenge:
      "A large organisation needed a centralised platform to track procurement activity across multiple suppliers. The tool needed to surface cost savings in real time, generate reports, and give management a clear picture of spend.",
    outcomes: ["Real-time savings tracking", "Multi-supplier data aggregation", "Management reporting"],
  },
  carbon: {
    slug: "carbon",
    title: "Carbon Calculator",
    role: "Bespoke Software",
    tags: ["React", "CRM Sync", "PDF Gen"],
    summary: "Interactive tool for generating carbon footprint reports and syncing data to the client CRM.",
    image: "/calc.png",
    challenge:
      "The client needed a way to generate branded carbon footprint reports for their customers and automatically push the data back into their CRM. Built as a React web app with PDF export and live CRM sync.",
    outcomes: ["PDF report generation", "Live CRM sync", "Branded output"],
  },
  dsoil: {
    slug: "dsoil",
    title: "D&S Oil Tanks",
    role: "Website Refresh",
    tags: ["Design", "Dev", "SEO"],
    summary: "New website for a West Sussex oil tank replacement specialist. Built to win trust fast and turn 35 years of reputation into quotes.",
    image: "/dsoil.png",
    externalLink: "https://dsoiltanks.co.uk",
    challenge:
      "D&S Oil Tanks have been replacing tanks across West Sussex for 35+ years with flawless Checkatrade reviews — but the old web presence didn't reflect that. The new site had to land trust in seconds, make the free survey offer impossible to miss, and convert quote-curious visitors into booked surveys.",
    outcomes: ["Trust signals front and centre", "Clear free-quote CTA", "Local SEO for West Sussex"],
  },
  padelquarter: {
    slug: "padelquarter",
    title: "Padel Quarter",
    role: "Website + Club System",
    tags: ["Design", "Dev", "CRM"],
    summary: "New website for a new padel club in Portsmouth — court booking, coaching, memberships and a club hub to run it all from.",
    image: "/padelquarter.png",
    externalLink: "https://padelquarter.net",
    challenge:
      "Padel Quarter opened at The Admiral Park in Portsmouth with no web presence at all. They needed a site that felt as premium as the club — real video of the courts, a booking button on every screen, coaching and membership pages — and, behind it, somewhere to keep members, enquiries and reviews in one place as the club grew.",
    outcomes: ["Video-led, premium design", "Book-a-court on every screen", "Club hub for members, enquiries and reviews"],
  },
  northstar: {
    slug: "northstar",
    title: "Northstar Plumbing & Heating",
    role: "Website",
    tags: ["Design", "Dev", "SEO"],
    summary: "One-page site for a Gas Safe plumbing and heating firm in West Sussex. Trust signals first, phone number everywhere.",
    image: "/northstar.png",
    externalLink: "https://northstarenergy.co.uk",
    challenge:
      "Northstar had an old site on a shared host that said nothing about who they were. The new one leads with the things a homeowner checks first — Google reviews, Checkatrade score, Gas Safe registration — puts the phone number where it can't be missed, and lays out plumbing, heating and renewables with the areas they cover.",
    outcomes: ["Trust signals above the fold", "Click-to-call on every screen", "Local SEO for West Sussex"],
  },
};
