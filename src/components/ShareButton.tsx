"use client";

import { useState } from "react";
import { buildXShareText } from "@/lib/result-url";

interface ShareButtonProps {
  typeName: string;
}

const OUTLINE_BUTTON =
  "inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-transparent px-6 py-4 text-lg font-semibold text-foreground transition-colors hover:bg-ghost-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-ring-offset";

export function ShareButton({ typeName }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const openXShare = () => {
    const shareUrl = window.location.href;
    const intent = new URL("https://x.com/intent/tweet");
    intent.searchParams.set("text", buildXShareText(typeName));
    intent.searchParams.set("url", shareUrl);
    window.open(intent.toString(), "_blank", "noopener,noreferrer");
  };

  const copyResultUrl = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <button type="button" onClick={openXShare} className={OUTLINE_BUTTON}>
        <XLogo />
        Xでシェア
      </button>
      <button type="button" onClick={copyResultUrl} className={OUTLINE_BUTTON}>
        {copied ? "結果URLをコピーしました" : "結果URLをコピー"}
      </button>
    </div>
  );
}

function XLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden
      className="shrink-0"
    >
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.847L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  );
}
