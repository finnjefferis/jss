import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "../relay/relay.css";

/* Site-styled staging for the animated Relay scenes (src/app/relay/scenes.tsx).
   The scenes are white app windows lit for a dark backdrop, so they sit on a
   dark tile — the same dark-mockup-on-warm-page motif as the software hero
   terminal and the platform project cards. */

// The recreated app screens are set in Inter, the product's actual face.
const app = Inter({ subsets: ["latin"], variable: "--font-rl-app" });

export function SceneStage({
  children,
  caption,
  header,
  pad = "p-5 md:p-8",
  className = "",
}: {
  children: ReactNode;
  caption?: string;
  header?: ReactNode;
  pad?: string;
  className?: string;
}) {
  return (
    <div
      className={`${app.variable} relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl ${pad} ${className}`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-coral-600/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />
      </div>
      {header && <div className="relative mb-5">{header}</div>}
      <div className="relative">{children}</div>
      {caption && (
        <p className="relative mt-5 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
          {caption}
        </p>
      )}
    </div>
  );
}

export function RelayWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-bold tracking-tight ${className}`}>
      relay<span className="text-coral-500">.</span>
    </span>
  );
}
