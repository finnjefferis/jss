"use client";

import { Linkedin } from "lucide-react";

export function LinkedInShareButton({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <a
      href={shareUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg bg-[#0A66C2] px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#004182] transition-colors"
      aria-label={`Share "${title}" on LinkedIn`}
    >
      <Linkedin className="h-4 w-4" />
      Share on LinkedIn
    </a>
  );
}
