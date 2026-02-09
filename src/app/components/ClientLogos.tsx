"use client";

const CLIENTS = [
  { name: "Naxco Services", logo: "/naxco-logo.png" },
  { name: "eDivert", logo: "/edivert-logo.png" },
  { name: "Ivy Arch Studios", logo: "/ivy-logo.png" },
  { name: "JMRT Photo", logo: "/jmrt-logo.png" },
  { name: "Carbon Calculator", logo: "/carbon-logo.png" },
];

export function ClientLogos() {
  return (
    <section className="py-10 md:py-14 border-b border-zinc-100 dark:border-zinc-800/50">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-8">
          Trusted by small businesses across the UK
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14">
          {CLIENTS.map((client) => (
            <div
              key={client.name}
              className="flex items-center gap-2.5 opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
            >
              <div className="h-8 w-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500">
                  {client.name.charAt(0)}
                </span>
              </div>
              <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
