"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { ChevronRight } from "lucide-react";

export function ComparisonSlider({ beforeSrc, afterSrc }: { beforeSrc: string; afterSrc: string }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    setPosition(Math.max(0, Math.min(100, (x / rect.width) * 100)));
  };

  return (
    <div
      ref={containerRef}
      className="relative h-[260px] md:h-[420px] w-full overflow-hidden rounded-2xl cursor-col-resize select-none border border-zinc-200 dark:border-zinc-800 shadow-xl"
      onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onClick={(e) => handleMove(e.clientX)}
    >
      <Image src={beforeSrc} alt="Before" fill className="object-contain bg-white" draggable={false} />
      <div className="absolute top-4 right-4 z-10 rounded-full bg-zinc-900/80 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md">
        Old Site
      </div>

      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image src={afterSrc} alt="After" fill className="object-contain bg-white" draggable={false} />
      </div>
      <div className="absolute top-4 left-4 z-10 rounded-full bg-coral-600/90 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md">
        New Design
      </div>

      <div
        className="absolute inset-y-0 w-1 bg-white shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-coral-600 border-2 border-white shadow-lg flex items-center justify-center">
          <div className="flex gap-0.5">
            <ChevronRight className="h-4 w-4 text-white rotate-180" />
            <ChevronRight className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
