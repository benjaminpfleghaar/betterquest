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
  const shareData = {
    title: "betterquest",
    text: issue,
    url: "Link",
  };

  const shareLink = async () => {
    try {
      await navigator.share(shareData);
    } catch (error) {
      console.error("Failed to share:", error);
      toast.error("Failed to share link");
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText("Link");
      toast.success("Link copied to clipboard");
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      toast.error("Failed to copy link");
    }
  };

  return (
    <ul className="flex flex-row justify-center gap-2 lg:flex-col lg:justify-start">
      <li className="flex items-center gap-2">
        <button
          type="button"
          className="flex size-12 cursor-pointer items-center justify-center rounded-full border border-stone-200 bg-white"
          onClick={shareLink}
        >
          <Share2 size={16} />
          <span className="sr-only">Share Link</span>
        </button>
      </li>
      <li className="flex items-center gap-2">
        <Link
          href={`https://maps.apple.com/place?coordinate=${lat}%2C${lon}`}
          className="flex size-12 items-center justify-center rounded-full border border-stone-200 bg-white"
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
          className="flex size-12 cursor-pointer items-center justify-center rounded-full border border-stone-200 bg-white"
          onClick={copyLink}
        >
          <Link2 size={16} />
          <span className="sr-only">Copy Link</span>
        </button>
      </li>
    </ul>
  );
}
