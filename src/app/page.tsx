export default function Page() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-20">

      {/* HEADER */}
      <header className="flex items-center justify-between py-4 mb-20">
        <h1 className="text-base font-semibold">Jefferis Software Solutions</h1>
        <a 
          href="https://wa.me/447939309355"
          className="text-sm bg-black text-white px-4 py-2 rounded-md"
        >
          WhatsApp
        </a>
      </header>

      {/* HERO */}
   {/* HERO */}
<section className="text-center mb-32">
  
  <h2 className="text-4xl font-semibold">
    Jefferis Software Solutions
  </h2>
  <p>
     Professional web presence from £119
  </p>

  <a
    href="https://wa.me/447939309355"
    className="mt-8 inline-block bg-black text-white px-6 py-3 rounded-md"
  >
    Message Me
  </a>
</section>

<section className="mb-32">
  <h3 className="text-2xl font-semibold mb-12">Services</h3>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-base leading-relaxed">

    {/* Social Media */}
    <div className="group border border-zinc-200 rounded-lg p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-1 cursor-pointer">
      <h4 className="font-semibold text-zinc-900">
        Social Media — from £119/mo
      </h4>

      <div className="mt-3 max-h-20 overflow-hidden group-hover:max-h-[200px] transition-all duration-300">
        <p className="text-zinc-600">
          Keep your business active online without the hassle.
          I create posts, write captions, and schedule everything for you.
          You approve once a month — then relax.
        </p>
      </div>

      <a
        href="https://wa.me/447939309355"
        className="mt-6 inline-block bg-black text-white px-4 py-2 rounded-md text-sm"
      >
        Enquire via WhatsApp
      </a>
    </div>

    {/* Websites */}
    <div className="group border border-zinc-200 rounded-lg p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-1 cursor-pointer">
      <h4 className="font-semibold text-zinc-900">
        Website Refresh / New — from £269
      </h4>

      <div className="mt-3 max-h-20 overflow-hidden group-hover:max-h-[200px] transition-all duration-300">
        <p className="text-zinc-600">
          Clean, simple websites that make your business look trustworthy and
          easy to contact. I handle everything — you just send your logo and details.
        </p>
      </div>

      <a
        href="https://wa.me/447939309355"
        className="mt-6 inline-block bg-black text-white px-4 py-2 rounded-md text-sm"
      >
        Enquire via WhatsApp
      </a>
    </div>

    {/* Custom Tools */}
    <div className="group border border-zinc-200 rounded-lg p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-1 cursor-pointer">
      <h4 className="font-semibold text-zinc-900">
        Custom Tools / Dashboards — quoted
      </h4>

      <div className="mt-3 max-h-20 overflow-hidden group-hover:max-h-[200px] transition-all duration-300">
        <p className="text-zinc-600">
          Booking forms, quote tools, CRM workflows — built to save you time
          and reduce admin. Tailored to how your business actually works.
        </p>
      </div>

      <a
        href="https://wa.me/447939309355"
        className="mt-6 inline-block bg-black text-white px-4 py-2 rounded-md text-sm"
      >
        Enquire via WhatsApp
      </a>
    </div>

  </div>
</section>




      {/* WORK */}
      <section className="mb-32">
        <h3 className="text-2xl font-semibold mb-12">Recent Work</h3>

        <div className="space-y-24">

          {/* PROJECT 1 */}
          <div>
            <div className="w-full h-64 bg-zinc-200 rounded-md mb-4" /> {/* IMAGE PLACEHOLDER */}
            <h4 className="text-lg font-semibold text-zinc-900">Naxco Services</h4>
            <p className="mt-2 text-zinc-600">
              Rebuilt their site to improve clarity and trust.
            </p>
          </div>

          {/* PROJECT 2 */}
          <div>
            <div className="w-full h-64 bg-zinc-200 rounded-md mb-4" />
            <h4 className="text-lg font-semibold text-zinc-900">Carbon Calculator</h4>
            <p className="mt-2 text-zinc-600">
              Streamlined input flow and CRM syncing for faster reporting.
            </p>
          </div>

          {/* PROJECT 3 */}
          <div>
            <div className="w-full h-64 bg-zinc-200 rounded-md mb-4" />
            <h4 className="text-lg font-semibold text-zinc-900">Toolbox Platform</h4>
            <p className="mt-2 text-zinc-600">
              A .NET dashboard built for simple cost-saving and procurement insights.
            </p>
          </div>

        </div>
      </section>

      {/* CONTACT */}
      <section className="text-center mb-32">
        <h3 className="text-2xl font-semibold">Get in Touch</h3>
        <p className="mt-4 text-zinc-600">Send a message anytime — quick reply.</p>

        <a
          href="https://wa.me/447939309355"
          className="mt-8 inline-block bg-black text-white px-6 py-3 rounded-md"
        >
          Message on WhatsApp
        </a>

        <p className="mt-4 text-sm text-zinc-500">
          Based in Worthing · Serving West Sussex
        </p>
      </section>

      <footer className="py-8 text-center text-xs text-zinc-500 border-t">
        © {new Date().getFullYear()} Jefferis Software Solutions
      </footer>

    </main>
  );
}
