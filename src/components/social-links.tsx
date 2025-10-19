"use client";

import Link from "next/link";
import { toast } from "sonner";
import { Link2, Map, Share2 } from "lucide-react";

interface SocialLinksProps {
  lat: number;
  lon: number;
  issue: string;
}

export default function SocialLinks({ lat, lon, issue }: SocialLinksProps) {
  const shareLink = async () => {
    try {
      await navigator.share({
        title: "betterquest",
        text: issue,
        url: window.location.href,
      });
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;

      console.error("Share failed:", err);
      toast.error("Failed to share link");
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    } catch (err) {
      console.error("Copy failed:", err);
      toast.error("Failed to copy link");
    }
  };

  return (
    <ul className="flex flex-row justify-center gap-2 md:flex-col md:justify-start">
      <li className="flex items-center gap-2">
        <button
          type="button"
          className="flex size-12 cursor-pointer items-center justify-center rounded-full border border-stone-200 bg-white outline-offset-2 outline-blue-500 focus-visible:outline-2"
          onClick={shareLink}
        >
          <Share2 size={16} />
          <span className="sr-only">Share Link</span>
        </button>
      </li>
      <li className="flex items-center gap-2">
        <Link
          href={`https://maps.apple.com/place?coordinate=${lat}%2C${lon}`}
          className="flex size-12 items-center justify-center rounded-full border border-stone-200 bg-white outline-offset-2 outline-blue-500 focus-visible:outline-2"
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          <Map size={16} />
          <span className="sr-only">Copy Link</span>
        </Link>
      </li>
      <li className="flex items-center gap-2">
        <button
          type="button"
          className="flex size-12 cursor-pointer items-center justify-center rounded-full border border-stone-200 bg-white outline-offset-2 outline-blue-500 focus-visible:outline-2"
          onClick={copyLink}
        >
          <Link2 size={16} />
          <span className="sr-only">Copy Link</span>
        </button>
      </li>
    </ul>
  );
}
