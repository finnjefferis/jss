// components/BeforeAfterSlider.tsx
import { useState } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  alt: string;
}

export function BeforeAfterSlider({ beforeSrc, afterSrc, alt }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100">
      {/* Aspect Ratio Container (adjust aspect-video or h-[400px] as needed) */}
      <div className="relative aspect-video w-full">
        
        {/* 1. The "After" Image (Background) */}
        <Image src={afterSrc} alt={`After ${alt}`} fill className="object-cover" />

        {/* 2. The "Before" Image (Foreground, clipped) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src={beforeSrc}
            alt={`Before ${alt}`}
            fill
            className="object-cover"
          />
        </div>

        {/* 3. The Drag Handle Line */}
        <div
          className="absolute inset-y-0 z-20 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-indigo-500 p-1.5 shadow-sm">
             {/* Simple arrows icon */}
            <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 9l-4 3 4 3m8-3l4 3-4 3" />
            </svg>
          </div>
        </div>

        {/* 4. The Interaction Layer (Range Input) */}
        {/* This sits on top, invisible, and handles the touch/drag physics natively */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
          aria-label="Compare before and after images"
        />
        
        {/* Labels */}
        <span className="pointer-events-none absolute left-3 top-3 z-10 rounded bg-black/60 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
          Before
        </span>
        <span className="pointer-events-none absolute right-3 top-3 z-10 rounded bg-black/60 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
          After
        </span>
      </div>
    </div>
  );
}