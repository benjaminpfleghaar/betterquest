"use client";

import { useEffect, useState } from "react";

export default function CopyButton({ slug }: { slug: string }) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;

    const timeout = setTimeout(() => {
      setIsCopied(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isCopied]);

  const copyLinkToClipboard = async () => {
    setIsCopied(true);
    await navigator.clipboard.writeText(`/${slug}`);
  };

  return (
    <button type="button" onClick={copyLinkToClipboard}>
      {isCopied ? "Copied!" : "Copy link"}
    </button>
  );
}
