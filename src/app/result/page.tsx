import type { Metadata } from "next";
import { Suspense } from "react";
import { PageShell } from "@/components/PageShell";
import {
  buildOgImagePath,
  parseResultQuery,
} from "@/lib/result-url";
import { ResultFromQuery } from "./result-client";

const PANEL =
  "rounded-2xl border border-border bg-surface p-8 shadow-[var(--shadow)] backdrop-blur-sm sm:p-10";

interface ResultPageProps {
  searchParams: Promise<{
    type?: string | string[];
    c?: string | string[];
    e?: string | string[];
    a?: string | string[];
    u?: string | string[];
  }>;
}

const FALLBACK_DESCRIPTION =
  "実存的動機診断の結果です。四因子の配置と類型の解説を、共有可能なURLから復元します。";

export async function generateMetadata({
  searchParams,
}: ResultPageProps): Promise<Metadata> {
  const params = await searchParams;
  const result = parseResultQuery(params);

  if (!result) {
    return {
      title: "診断結果",
      description: FALLBACK_DESCRIPTION,
      openGraph: {
        title: "診断結果 | 実存的動機診断",
        description: FALLBACK_DESCRIPTION,
        images: ["/api/og"],
      },
      twitter: {
        card: "summary_large_image",
        title: "診断結果 | 実存的動機診断",
        description: FALLBACK_DESCRIPTION,
        images: ["/api/og"],
      },
    };
  }

  const ogImage = buildOgImagePath(result);
  const title = result.type.name;
  const description = `私のタイプは『${result.type.name}』でした。${result.type.tagline}`;
  const shareTitle = `【実存的動機診断】${result.type.name}`;

  return {
    title,
    description,
    openGraph: {
      title: shareTitle,
      description,
      type: "website",
      locale: "ja_JP",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [ogImage],
    },
  };
}

export default function ResultPage() {
  return (
    <Suspense fallback={<ResultFallback />}>
      <ResultFromQuery />
    </Suspense>
  );
}

function ResultFallback() {
  return (
    <PageShell>
      <div className={PANEL}>
        <p className="text-center text-sm text-muted">結果を読み込んでいます…</p>
      </div>
    </PageShell>
  );
}
