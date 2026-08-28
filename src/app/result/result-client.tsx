"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { ResultScreen } from "@/components/ResultScreen";
import { parseResultSearchParams } from "@/lib/result-url";

const PANEL =
  "rounded-2xl border border-border bg-surface p-8 shadow-[var(--shadow)] backdrop-blur-sm sm:p-10";

export function ResultFromQuery() {
  const searchParams = useSearchParams();
  const result = parseResultSearchParams(searchParams);

  if (!result) {
    return (
      <PageShell>
        <div className={PANEL}>
          <p className="mb-3 text-[11px] font-medium tracking-[0.28em] text-accent">
            診断結果
          </p>
          <h1 className="mb-4 font-serif text-2xl font-semibold text-heading">
            結果を表示できません
          </h1>
          <p className="mb-8 text-[15px] leading-relaxed text-foreground">
            URLのスコアが不足しているか、値が不正です。診断を最初から行うか、共有されたURLが正しいかを確認してください。
          </p>
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center rounded-xl bg-button px-6 py-4 text-lg font-semibold tracking-wide text-button-fg transition-colors hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-ring-offset"
          >
            診断トップへ戻る
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <ResultScreen result={result} />
    </PageShell>
  );
}
