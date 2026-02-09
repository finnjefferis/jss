"use client";

import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Karl Couling",
    initial: "K",
    color: "#EF6C00",
    role: "Naxco Services",
    text: "JSS have done a great job at updating my website. I have asked them to manage the social media also. Good service.",
  },
  {
    name: "Clare Gale",
    initial: "C",
    color: "#7C3AED",
    role: "Local Guide",
    text: "Finley is very professional and easy to talk to. He quickly grasped the problem and found a timely solution to resolve it. I would not hesitate to recommend Finley and he will be my first contact should I need help in the future. Highly recommended!",
  },
];

export function ReviewsSection() {
  return (
    <section className="py-16 md:py-24 bg-zinc-50/50 dark:bg-zinc-900/30">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="text-center mb-12">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            Client Reviews
          </p>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 md:text-4xl">
            Don&apos;t take our word for it.
          </h2>
        </div>

        {/* Google rating summary */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">5.0</span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">on Google</span>
        </div>

        {/* Reviews grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
          {REVIEWS.map((review) => (
            <div
              key={review.name}
              className="break-inside-avoid rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="h-10 w-10 shrink-0 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: review.color }}
                >
                  {review.initial}
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{review.name}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{review.role}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                &quot;{review.text}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
