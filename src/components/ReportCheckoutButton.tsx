"use client";

import { useState } from "react";
import Link from "next/link";
import type { PersonalityTypeId } from "@/lib/existential";
import { REPORT_PRICE_JPY } from "@/lib/report-product";

interface ReportCheckoutButtonProps {
  type: PersonalityTypeId;
  c: number;
  e: number;
  a: number;
  u: number;
}

const PRICE_LABEL = `¥${REPORT_PRICE_JPY.toLocaleString("ja-JP")}`;

export function ReportCheckoutButton({
  type,
  c,
  e,
  a,
  u,
}: ReportCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, c, e, a, u }),
      });
      const data: unknown = await response.json();
      const url =
        typeof data === "object" &&
        data !== null &&
        "url" in data &&
        typeof data.url === "string"
          ? data.url
          : null;

      if (!response.ok || !url) {
        const message =
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof data.error === "string"
            ? data.error
            : "決済画面を開けませんでした。";
        throw new Error(message);
      }

      window.location.assign(url);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "決済画面を開けませんでした。時間をおいて再度お試しください。",
      );
      setLoading(false);
    }
  };

  return (
    <section className="mb-8 overflow-hidden rounded-2xl border border-accent/35 bg-accent-soft p-6 sm:p-8">
      <p className="mb-2 text-[11px] font-medium tracking-[0.28em] text-accent">
        有料コンテンツ
      </p>
      <h3 className="mb-2 font-serif text-xl font-semibold text-heading sm:text-2xl">
        完全深層鑑定書
      </h3>
      <p className="mb-5 text-[15px] leading-relaxed text-muted">
        無料結果では触れきれない五章構成の本格鑑定テキストと、タイプ別の四週間実践ワーク。印刷・PDF保存用の鑑定書ビュー付きです。
      </p>
      <ul className="mb-6 space-y-1.5 text-sm text-foreground">
        <li className="flex gap-2">
          <span className="text-accent" aria-hidden>
            ◆
          </span>
          五章構成の完全版深層鑑定テキスト
        </li>
        <li className="flex gap-2">
          <span className="text-accent" aria-hidden>
            ◆
          </span>
          タイプ別の実存的処方箋と週間の実践
        </li>
        <li className="flex gap-2">
          <span className="text-accent" aria-hidden>
            ◆
          </span>
          印刷 / PDFとして保存できる閲覧ビュー
        </li>
      </ul>
      <button
        type="button"
        onClick={() => {
          void handleCheckout();
        }}
        disabled={loading}
        aria-busy={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-button px-6 py-4 text-lg font-semibold tracking-wide text-button-fg transition-colors hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-ring-offset disabled:cursor-wait disabled:opacity-70"
      >
        {loading ? (
          <>
            <Spinner />
            決済画面へ移動しています…
          </>
        ) : (
          `完全版深層レポートを入手する（${PRICE_LABEL}）`
        )}
      </button>
      {error ? (
        <p className="mt-3 text-center text-sm text-muted" role="alert">
          {error}
        </p>
      ) : null}
      <p className="mt-4 text-center text-[11px] leading-relaxed text-subtle">
        デジタルコンテンツのため、購入後の返品はできません。
        <Link
          href="/legal/tokushoho"
          className="ml-1 underline-offset-4 hover:text-heading hover:underline"
        >
          特定商取引法に基づく表記
        </Link>
      </p>
    </section>
  );
}

function Spinner() {
  return (
    <svg
      className="h-5 w-5 shrink-0 animate-spin"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
      />
      <path
        className="opacity-90"
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8v3a5 5 0 0 0-5 5H4z"
      />
    </svg>
  );
}
