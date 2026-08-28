import type { Metadata } from "next";
import Link from "next/link";
import { PremiumReport } from "@/components/PremiumReport";
import { PageShell } from "@/components/PageShell";
import type { DiagnosisResult } from "@/lib/existential";
import { parseResultPayload } from "@/lib/result-url";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "完全深層鑑定書",
  description:
    "決済完了後に閲覧できる、実存的動機診断の完全深層鑑定書です。",
  robots: { index: false, follow: false },
};

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string | string[] }>;
}

const PANEL =
  "rounded-2xl border border-border bg-surface p-8 shadow-[var(--shadow)] backdrop-blur-sm sm:p-10";

type PaidReport =
  | { ok: true; result: DiagnosisResult; purchasedAt: Date }
  | { ok: false; title: string; message: string };

async function loadPaidReport(sessionId: string): Promise<PaidReport> {
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return {
        ok: false,
        title: "決済が完了していません",
        message:
          "支払いが確認できていません。完了後に、このページを開き直してください。",
      };
    }

    const result = parseResultPayload(session.metadata);
    if (!result) {
      return {
        ok: false,
        title: "診断データを復元できません",
        message:
          "決済は確認できましたが、診断データの復元に失敗しました。サポートが必要な場合は、決済完了メールをご確認ください。",
      };
    }

    return {
      ok: true,
      result,
      purchasedAt: new Date(session.created * 1000),
    };
  } catch (error) {
    console.error("Failed to verify Stripe Checkout session:", error);
    return {
      ok: false,
      title: "レポートを表示できません",
      message:
        "決済セッションの検証に失敗しました。時間をおいて再度お試しください。",
    };
  }
}

export default async function ResultSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const params = await searchParams;
  const sessionId = Array.isArray(params.session_id)
    ? params.session_id[0]
    : params.session_id;

  if (!sessionId) {
    return (
      <AccessDenied
        title="レポートを表示できません"
        message="決済セッションが見つかりません。診断結果から、もう一度レポートの購入にお進みください。"
      />
    );
  }

  if (!isStripeConfigured()) {
    return (
      <AccessDenied
        title="レポートを表示できません"
        message="決済の検証設定が整っていないため、レポートを開けません。"
      />
    );
  }

  const report = await loadPaidReport(sessionId);

  if (!report.ok) {
    return <AccessDenied title={report.title} message={report.message} />;
  }

  return (
    <PageShell size="xl" align="start">
      <PremiumReport
        result={report.result}
        purchasedAt={report.purchasedAt}
        sessionId={sessionId}
      />
    </PageShell>
  );
}

function AccessDenied({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <PageShell>
      <div className={PANEL}>
        <p className="mb-3 text-[11px] font-medium tracking-[0.28em] text-accent">
          深層分析レポート
        </p>
        <h1 className="mb-4 font-serif text-2xl font-semibold text-heading">
          {title}
        </h1>
        <p className="mb-8 text-[15px] leading-relaxed text-foreground">
          {message}
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
