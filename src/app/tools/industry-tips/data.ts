export type IndustryTip = {
  id: string;
  name: string;
  aliases: string[];
  keywords: string[];
  tips: { title: string; body: string }[];
  quickWins: string[];
  ctaText: string;
};

export const INDUSTRIES: IndustryTip[] = [
  {
    id: "plumber",
    name: "Plumbing & Heating",
    aliases: ["plumber", "plumbing", "heating", "boiler", "gas engineer", "central heating", "radiator", "pipe"],
    keywords: [
      "emergency plumber near me",
      "boiler repair [town]",
      "local plumber [town]",
      "gas engineer near me",
      "central heating installation",
      "bathroom fitter [town]",
      "leak repair near me",
      "power flush [town]",
    ],
    tips: [
      {
        title: "Your Google Business Profile is your #1 lead source",
        body: "Most plumbing customers search \"plumber near me\" on their phone. A complete Google Business Profile with photos, reviews, and correct hours will put you in the local map pack — the top 3 results that get 75% of clicks.",
      },
      {
        title: "Get reviews after every job",
        body: "Send a text with a direct link to your Google review page within 2 hours of finishing. Businesses with 20+ reviews rank significantly higher in local search. A simple \"Thanks for choosing us — would you mind leaving a quick review?\" converts well.",
      },
      {
        title: "Create pages for each service you offer",
        body: "Don't lump everything onto one page. Create separate pages for boiler repair, bathroom fitting, emergency callouts, etc. Each page should target a specific keyword so Google knows exactly what you do.",
      },
    ],
    quickWins: [
      "Add your phone number to the top of every page — make it clickable on mobile",
      "Add schema markup for LocalBusiness with your service area",
      "Post before/after photos of completed jobs to Google Business weekly",
      "List all the towns and postcodes you cover on your service area page",
    ],
    ctaText: "We've helped trades businesses like Naxco Services go from 2 to 14 enquiries a month.",
  },
  {
    id: "electrician",
    name: "Electrical Services",
    aliases: ["electrician", "electrical", "sparky", "rewire", "fuse box", "consumer unit", "lighting", "ev charger", "ev charging"],
    keywords: [
      "electrician near me",
      "emergency electrician [town]",
      "consumer unit upgrade [town]",
      "EV charger installation",
      "rewire cost [town]",
      "electrical inspection [town]",
      "lighting installation [town]",
      "smart home electrician",
    ],
    tips: [
      {
        title: "Certifications build instant trust online",
        body: "Display your NICEIC, NAPIT, or Part P registration prominently on your homepage and Google Business Profile. Customers searching for electricians are safety-conscious — showing accreditations reduces their hesitation to book.",
      },
      {
        title: "EV charger installation is a growing keyword",
        body: "Searches for \"EV charger installation\" have grown 300%+ in the last 2 years. If you offer this service, create a dedicated landing page targeting it. Include pricing guidance, brands you install, and grant information.",
      },
      {
        title: "Emergency pages rank fast with local intent",
        body: "Create an \"Emergency Electrician in [Town]\" page. These high-intent keywords convert extremely well because the searcher needs help now. Include your response time and a prominent click-to-call button.",
      },
    ],
    quickWins: [
      "Add your certifications (NICEIC, Part P) as images in your site header",
      "Create a FAQ page answering common electrical questions",
      "List your response time on every page (e.g., \"Same-day callouts\")",
      "Add photos of your work with proper alt text describing the job",
    ],
    ctaText: "We build websites that turn local searches into booked jobs.",
  },
  {
    id: "restaurant",
    name: "Restaurant & Café",
    aliases: ["restaurant", "cafe", "coffee shop", "takeaway", "food", "dining", "bistro", "pizzeria", "fish and chips", "pub", "bar", "gastropub"],
    keywords: [
      "best restaurants in [town]",
      "restaurants near me",
      "[cuisine type] restaurant [town]",
      "book a table [town]",
      "takeaway near me",
      "lunch spots [town]",
      "sunday roast [town]",
      "private dining [town]",
    ],
    tips: [
      {
        title: "Your menu needs to be on your website, not just a PDF",
        body: "Google can't read text inside PDF or image menus. Publish your menu as actual text on a dedicated page. This lets Google index every dish, so when someone searches \"best pizza in [town]\" your restaurant can appear.",
      },
      {
        title: "Online reservation links boost conversions",
        body: "If you use a booking system, put the reservation link above the fold on every page. Visitors who can book instantly are far less likely to leave and try a competitor. Even a simple \"Call to book\" with a click-to-call link helps.",
      },
      {
        title: "Post photos of your food, not your building",
        body: "The most-clicked Google Business photos for restaurants are food shots. Upload high-quality images of your dishes at least monthly. Name the files descriptively (e.g., \"stone-baked-margherita-pizza.jpg\") for image search SEO.",
      },
    ],
    quickWins: [
      "Add opening hours in text on your homepage (not just Google Business)",
      "Embed Google Maps on your contact page for easy directions",
      "Add structured data for Restaurant with menu, priceRange, and servesCuisine",
      "Respond to every Google review — positive or negative — within 48 hours",
    ],
    ctaText: "We help restaurants and cafés fill more tables with better websites.",
  },
  {
    id: "salon",
    name: "Hair & Beauty Salon",
    aliases: ["salon", "hairdresser", "barber", "beauty", "nails", "nail tech", "lashes", "brows", "spa", "massage", "aesthetics", "skin", "facial", "waxing"],
    keywords: [
      "hair salon near me",
      "best hairdresser [town]",
      "balayage [town]",
      "barber near me",
      "nail salon [town]",
      "beauty treatments [town]",
      "lash extensions [town]",
      "bridal hair [town]",
    ],
    tips: [
      {
        title: "Before-and-after galleries sell your work",
        body: "Potential clients want to see results. Create a gallery page with before-and-after shots of your best transformations. Tag each with the treatment name and location for SEO. This is your most powerful conversion tool.",
      },
      {
        title: "Online booking is now expected, not optional",
        body: "Salons with online booking get significantly more appointments. If you use a platform like Fresha or Timely, embed the booking widget directly on your site so clients never leave your page.",
      },
      {
        title: "Instagram is not a replacement for a website",
        body: "Your Instagram feed is great for inspiration, but it doesn't rank in Google. A website lets you appear when people search \"hair salon in [town]\". Embed your Instagram feed on your site to get the best of both worlds.",
      },
    ],
    quickWins: [
      "Add a \"Book Now\" button in the top-right corner of every page",
      "List your full price list as text (not an image) on a dedicated page",
      "Add your address and parking info to make visiting easy",
      "Ask happy clients to leave Google reviews — aim for 5+ per month",
    ],
    ctaText: "We've helped salons and beauty businesses grow their bookings online.",
  },
  {
    id: "personal-trainer",
    name: "Personal Trainer & Fitness",
    aliases: ["personal trainer", "pt", "fitness", "gym", "yoga", "pilates", "crossfit", "bootcamp", "coach", "strength", "conditioning", "workout"],
    keywords: [
      "personal trainer near me",
      "personal trainer [town]",
      "online PT programs",
      "weight loss coach [town]",
      "yoga classes [town]",
      "fitness bootcamp [town]",
      "strength training [town]",
      "1-to-1 personal training",
    ],
    tips: [
      {
        title: "Transformation stories outperform everything",
        body: "Dedicate a page to client transformations with real photos, timeframes, and testimonials. These pages rank well for terms like \"personal trainer results\" and convert visitors who are on the fence about starting.",
      },
      {
        title: "Offer a free resource to capture leads",
        body: "Create a free downloadable guide (\"7-Day Home Workout Plan\" or \"Beginner's Nutrition Guide\") in exchange for an email address. This builds your mailing list and gives you a warm audience to market your services to.",
      },
      {
        title: "Video content massively boosts trust",
        body: "Short exercise demos or training tips on your website show your expertise and personality. People hire personal trainers they connect with. Even simple phone-recorded videos work — authenticity beats production quality.",
      },
    ],
    quickWins: [
      "Add a clear \"Book a Free Consultation\" CTA above the fold",
      "Include your qualifications and insurance on your about page",
      "Create separate pages for different services (1-to-1, group, online)",
      "Add your availability/timetable as text so Google can index it",
    ],
    ctaText: "We build websites that turn browsers into booked sessions.",
  },
  {
    id: "photographer",
    name: "Photography",
    aliases: ["photographer", "photography", "wedding photographer", "portrait", "headshot", "event photographer", "product photography", "newborn"],
    keywords: [
      "wedding photographer [town]",
      "portrait photographer near me",
      "corporate headshots [town]",
      "event photographer [town]",
      "newborn photography [town]",
      "product photography [town]",
      "family photographer [town]",
      "photography packages [town]",
    ],
    tips: [
      {
        title: "Optimize your images or lose visitors",
        body: "Photographers' sites are image-heavy by nature. Use WebP format, lazy loading, and responsive sizes. A site that takes 8 seconds to load loses 50% of visitors. Compress images to under 200KB without visible quality loss.",
      },
      {
        title: "Create portfolio pages by category",
        body: "Don't dump all your work on one page. Separate galleries for weddings, portraits, events, etc. let Google rank you for specific searches like \"wedding photographer [town]\" and help visitors find relevant work fast.",
      },
      {
        title: "Alt text on images is free SEO",
        body: "Every portfolio image should have descriptive alt text (e.g., \"bride and groom first dance at [venue name]\"). Google Images drives significant traffic for photographers, and alt text is how you appear there.",
      },
    ],
    quickWins: [
      "Add your location and travel radius to your homepage",
      "Include starting prices or \"packages from £X\" to qualify leads",
      "Embed a contact form on your portfolio pages, not just the contact page",
      "Add structured data for LocalBusiness with your photography specialty",
    ],
    ctaText: "We built JMRT Photo's website with a full CMS so they can showcase new work instantly.",
  },
  {
    id: "cleaning",
    name: "Cleaning Services",
    aliases: ["cleaning", "cleaner", "domestic cleaning", "commercial cleaning", "office cleaning", "carpet cleaning", "window cleaning", "deep clean", "end of tenancy"],
    keywords: [
      "cleaning company near me",
      "office cleaning [town]",
      "domestic cleaner [town]",
      "end of tenancy cleaning [town]",
      "carpet cleaning [town]",
      "deep cleaning service [town]",
      "commercial cleaning [town]",
      "window cleaner [town]",
    ],
    tips: [
      {
        title: "Service area pages are your biggest SEO opportunity",
        body: "Create individual pages for each town or area you serve (e.g., \"Cleaning Services in [Town]\"). These pages target hyper-local searches and can each rank independently, multiplying your visibility across your service area.",
      },
      {
        title: "Trust signals matter more than design",
        body: "Cleaning involves entering someone's home or business. Display DBS checks, insurance details, and real customer reviews prominently. A \"Meet the Team\" section with photos builds the trust needed to convert visitors.",
      },
      {
        title: "Offer instant quotes to capture leads",
        body: "A simple quote form (property size, service type, frequency) generates leads 24/7. Even a rough price range on your site helps — visitors who know your ballpark pricing are more likely to enquire.",
      },
    ],
    quickWins: [
      "Add a checklist of what's included in each cleaning package",
      "Display your insurance and DBS check status on the homepage",
      "Create a page for each service (domestic, commercial, end of tenancy, etc.)",
      "Add a \"Get a Free Quote\" form on every page",
    ],
    ctaText: "We help service businesses get found by local customers online.",
  },
  {
    id: "builder",
    name: "Construction & Building",
    aliases: ["builder", "construction", "building", "renovation", "extension", "loft conversion", "roofing", "roofer", "bricklayer", "joiner", "carpenter", "kitchen fitter", "bathroom fitter", "landscaper", "landscaping", "garden", "fencing", "paving", "driveway", "plasterer", "decorator", "painter"],
    keywords: [
      "builders near me",
      "house extension [town]",
      "loft conversion [town]",
      "kitchen fitter [town]",
      "roofing contractor [town]",
      "landscaper near me",
      "driveway installer [town]",
      "home renovation [town]",
    ],
    tips: [
      {
        title: "Project galleries with details convert browsers into enquiries",
        body: "For every completed project, show before-and-after photos, a brief scope description, the timeline, and location. This isn't just a portfolio — it's proof. Potential customers want to see you've done similar work nearby.",
      },
      {
        title: "Pricing transparency reduces tyre-kickers",
        body: "You don't need exact prices, but ranges help. \"Extensions typically start from £30,000\" filters out unrealistic budgets and attracts serious enquiries. Pages with pricing information rank well because they answer a high-intent search.",
      },
      {
        title: "Accreditations and guarantees close deals",
        body: "Display Federation of Master Builders, TrustMark, or trade body logos. Include your guarantee policy. These trust signals are the difference between someone enquiring with you versus the builder who's £500 cheaper.",
      },
    ],
    quickWins: [
      "Add before-and-after sliders for your best projects",
      "Create pages for each service (extensions, loft conversions, kitchens, etc.)",
      "List all areas you cover with links to area-specific pages",
      "Add testimonials with full names and project types",
    ],
    ctaText: "We help trades and construction businesses win more work online.",
  },
  {
    id: "accountant",
    name: "Accounting & Finance",
    aliases: ["accountant", "accounting", "bookkeeper", "bookkeeping", "tax", "vat", "payroll", "financial advisor", "mortgage broker", "insurance broker"],
    keywords: [
      "accountant near me",
      "small business accountant [town]",
      "tax return help [town]",
      "bookkeeper [town]",
      "payroll services [town]",
      "VAT returns [town]",
      "self-assessment [town]",
      "contractor accountant",
    ],
    tips: [
      {
        title: "Blog about tax deadlines and changes",
        body: "Content around \"when is the self-assessment deadline\" or \"changes to VAT rules 2025\" gets massive seasonal search traffic. This positions you as the expert and brings warm leads to your site every January and April.",
      },
      {
        title: "Niche down your marketing, even if you serve everyone",
        body: "Pages targeting specific audiences (\"accountant for landlords\", \"contractor accountant\") convert far better than generic pages. You can serve everyone while marketing to specific niches.",
      },
      {
        title: "Free tools and calculators generate leads",
        body: "A simple \"Take-Home Pay Calculator\" or \"VAT Calculator\" on your site attracts high-intent visitors who are already thinking about their finances. Add a CTA to book a free consultation alongside the tool.",
      },
    ],
    quickWins: [
      "Add a \"Book a Free Consultation\" button in your navigation",
      "List your specific services (payroll, VAT, self-assessment) as separate pages",
      "Publish 1-2 blog posts per month around tax tips and deadlines",
      "Add structured data for ProfessionalService with your specialties",
    ],
    ctaText: "We help professional services firms attract more clients online.",
  },
  {
    id: "ecommerce",
    name: "E-Commerce & Online Shop",
    aliases: ["ecommerce", "e-commerce", "online shop", "online store", "retail", "shop", "shopify", "woocommerce", "product", "dropshipping", "clothing", "fashion", "jewellery"],
    keywords: [
      "buy [product type] online UK",
      "[product type] shop UK",
      "best [product type] UK",
      "[brand name] alternative",
      "[product type] for [use case]",
      "free delivery [product type]",
      "[product type] sale UK",
      "handmade [product type] UK",
    ],
    tips: [
      {
        title: "Product page SEO is where e-commerce is won or lost",
        body: "Every product needs a unique title, description, and at least 3 images. Don't copy manufacturer descriptions — write your own. Include the product name, key features, and use cases naturally. This is what ranks in Google Shopping and organic search.",
      },
      {
        title: "Site speed directly impacts your revenue",
        body: "A 1-second delay in page load reduces conversions by 7%. Compress images, use a CDN, and minimise JavaScript. For e-commerce, speed isn't just UX — it's money. Aim for under 2 seconds on mobile.",
      },
      {
        title: "Collection pages target browsing intent",
        body: "Pages like \"Women's Earrings\" or \"Organic Skincare\" target how people actually shop. Make these pages rich with filters, descriptions, and internal links. They often rank higher than individual product pages.",
      },
    ],
    quickWins: [
      "Add trust badges (SSL, payment icons, returns policy) near your checkout button",
      "Implement Product structured data on every product page",
      "Add customer reviews/ratings to product pages",
      "Create a clear returns and shipping policy page linked from the footer",
    ],
    ctaText: "Our Commerce package is built for businesses ready to sell online.",
  },
  {
    id: "solicitor",
    name: "Legal Services",
    aliases: ["solicitor", "lawyer", "law firm", "legal", "conveyancing", "family law", "immigration", "personal injury", "employment law", "will", "probate"],
    keywords: [
      "solicitor near me",
      "conveyancing solicitor [town]",
      "family law solicitor [town]",
      "employment lawyer [town]",
      "immigration solicitor [town]",
      "making a will [town]",
      "personal injury claims",
      "free legal advice [town]",
    ],
    tips: [
      {
        title: "Practice area pages are essential for SEO",
        body: "Each area of law you practise needs its own detailed page. \"Family Law\" and \"Conveyancing\" are entirely different searches with different intent. A single \"Services\" page will never rank for either.",
      },
      {
        title: "Content that answers common legal questions wins",
        body: "People search for answers before they search for a solicitor. Pages like \"How long does conveyancing take?\" or \"What happens in a divorce?\" attract visitors at the start of their journey — then convert them into clients.",
      },
      {
        title: "Compliance and trust are non-negotiable",
        body: "Display your SRA number, professional indemnity insurance, and any accreditations (Lexcel, CQS). Legal consumers are cautious — these details reduce the perceived risk of instructing you.",
      },
    ],
    quickWins: [
      "Add your SRA registration number and link to the SRA website",
      "Create a FAQ section for each practice area",
      "Add a \"Book a Free Initial Consultation\" CTA on every page",
      "Publish case studies (anonymised) showing outcomes you've achieved",
    ],
    ctaText: "We help professional services firms build trust and attract clients online.",
  },
  {
    id: "estate-agent",
    name: "Estate Agency & Property",
    aliases: ["estate agent", "property", "lettings", "letting agent", "property management", "real estate", "house sale", "rental"],
    keywords: [
      "estate agents [town]",
      "houses for sale [town]",
      "letting agents [town]",
      "property management [town]",
      "sell my house [town]",
      "free property valuation [town]",
      "rental properties [town]",
      "best estate agent [town]",
    ],
    tips: [
      {
        title: "A free valuation tool is your best lead magnet",
        body: "\"Free property valuation\" is one of the highest-converting keywords in the industry. Create a dedicated landing page with a simple form (address, property type, bedrooms). Follow up within 2 hours for best conversion rates.",
      },
      {
        title: "Area guides build local authority",
        body: "Create detailed guides for each area you cover — schools, transport links, average prices, local amenities. These rank well, establish you as the local expert, and keep potential sellers on your site longer.",
      },
      {
        title: "Google reviews dominate agent selection",
        body: "Homeowners compare agents by reviews more than anything else. Systematically ask every completed sale or let to leave a review. Aim for 50+ Google reviews to dominate local search results.",
      },
    ],
    quickWins: [
      "Add a \"Free Valuation\" button to your homepage hero section",
      "Create area guide pages for every location you cover",
      "Display your average sale time and asking price achieved percentage",
      "Add RealEstateAgent structured data to your site",
    ],
    ctaText: "We help estate agents stand out in a crowded local market.",
  },
  {
    id: "dentist",
    name: "Dental & Medical Practice",
    aliases: ["dentist", "dental", "doctor", "gp", "surgery", "optician", "physiotherapy", "physio", "chiropractor", "osteopath", "clinic", "private healthcare", "cosmetic dentist"],
    keywords: [
      "dentist near me",
      "emergency dentist [town]",
      "teeth whitening [town]",
      "private dentist [town]",
      "dental implants [town]",
      "invisalign [town]",
      "NHS dentist accepting patients [town]",
      "cosmetic dentist [town]",
    ],
    tips: [
      {
        title: "Treatment pages with pricing win high-intent searches",
        body: "Patients search for specific treatments with pricing intent (\"invisalign cost [town]\"). Create a page for each treatment with a clear explanation, expected costs, and a booking CTA. These pages convert extremely well.",
      },
      {
        title: "Patient reviews must be visible and recent",
        body: "Healthcare is a trust-critical purchase. Display reviews prominently and encourage new ones weekly. A practice with 5 reviews from 2022 looks less trustworthy than one with 50 reviews from the last 6 months.",
      },
      {
        title: "\"Accepting new patients\" is a conversion trigger",
        body: "If you're accepting new patients, say so on every page. Many people assume practices are full. A simple banner or badge saying \"Now accepting new patients — book online\" removes a major barrier to enquiry.",
      },
    ],
    quickWins: [
      "Add online booking functionality (or at minimum a request form)",
      "Display \"Now accepting new patients\" prominently if applicable",
      "Create treatment pages with transparent pricing",
      "Add MedicalBusiness structured data with your specialties",
    ],
    ctaText: "We help healthcare practices attract and retain patients online.",
  },
];

export function searchIndustries(query: string): IndustryTip[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return INDUSTRIES.filter((ind) => {
    if (ind.name.toLowerCase().includes(q)) return true;
    return ind.aliases.some((alias) => alias.includes(q) || q.includes(alias));
  });
}
