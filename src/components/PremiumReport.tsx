import Link from "next/link";
import {
  FACTOR_INFO,
  MAX_SCORE_PER_FACTOR,
  type DiagnosisResult,
} from "@/lib/existential";
import { compilePremiumReport } from "@/lib/premiumReport";
import { REPORT_PRICE_JPY } from "@/lib/report-product";
import { buildResultPath } from "@/lib/result-url";
import { RadarChart } from "./RadarChart";
import { ReportPrintButton } from "./ReportPrintButton";

interface PremiumReportProps {
  result: DiagnosisResult;
  purchasedAt: Date;
  sessionId: string;
}

export function PremiumReport({
  result,
  purchasedAt,
  sessionId,
}: PremiumReportProps) {
  const report = compilePremiumReport(result, { purchasedAt, sessionId });
  const { scores } = result;
  const purchasedLabel = purchasedAt.toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <article className="premium-report mx-auto w-full max-w-3xl">
      <div className="print:hidden">
        <ReportPrintButton />
      </div>

      <header className="premium-cover premium-chapter mb-10 border border-border bg-surface px-8 py-10 shadow-[var(--shadow)] sm:px-12 sm:py-14">
        <p className="mb-4 text-[10px] font-medium tracking-[0.42em] text-accent uppercase">
          Premium Appraisal Document
        </p>
        <h1 className="mb-6 font-serif text-3xl font-semibold leading-tight tracking-wide text-heading sm:text-[2.125rem]">
          {report.documentTitle}
        </h1>
        <div className="mb-8 grid gap-2 border-y border-border-subtle py-5 text-sm text-muted sm:grid-cols-2 sm:gap-x-8">
          <p>
            <span className="text-subtle">発行日</span>
            <span className="ml-3 text-foreground">{report.issuedOn}</span>
          </p>
          <p className="sm:text-right">
            <span className="text-subtle">セッションID</span>
            <span className="ml-3 break-all font-mono text-xs text-foreground">
              {report.sessionId}
            </span>
          </p>
          <p>
            <span className="text-subtle">決済完了</span>
            <span className="ml-3 text-foreground">{purchasedLabel}</span>
          </p>
          <p className="sm:text-right">
            <span className="text-subtle">鑑定料</span>
            <span className="ml-3 text-foreground">
              {REPORT_PRICE_JPY.toLocaleString("ja-JP")}円（税込）
            </span>
          </p>
        </div>

        <div className="mb-6">
          <p className="mb-1 text-[11px] tracking-[0.28em] text-subtle">
            鑑定類型
          </p>
          <h2 className="font-serif text-2xl font-semibold text-heading sm:text-3xl">
            {report.typeName}
          </h2>
          <p className="mt-2 text-xs tracking-[0.22em] text-subtle uppercase">
            {report.typeNameEn}
          </p>
        </div>
        <p className="font-serif text-lg leading-relaxed text-heading">
          {report.tagline}
        </p>
      </header>

      <section className="premium-chapter mb-10 border border-border bg-surface px-8 py-8 sm:px-10">
        <h2 className="mb-4 font-serif text-lg font-semibold text-heading">
          四因子配置概要
        </h2>
        <div className="mb-6 flex items-center justify-center rounded-xl border border-border-subtle bg-card p-4">
          <RadarChart scores={scores} />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {report.factorPlacements.map((item) => (
            <div
              key={item.factor}
              className="rounded-lg border border-border-subtle bg-card px-4 py-3"
            >
              <div className="mb-1 flex items-baseline justify-between gap-2">
                <span
                  className="text-sm font-semibold"
                  style={{ color: FACTOR_INFO[item.factor].color }}
                >
                  {item.name}
                </span>
                <span className="text-[11px] text-subtle">
                  第{item.rank}位
                </span>
              </div>
              <p className="text-xs text-muted">
                {item.score}/{MAX_SCORE_PER_FACTOR} ・ {item.percentile}%（
                {item.bandLabel}）
              </p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-[15px] leading-[1.95] text-foreground">
          {report.disclaimer}
        </p>
      </section>

      {report.chapters.map((chapter) => (
        <section
          key={chapter.number}
          className="premium-chapter mb-10 border border-border bg-surface px-8 py-9 sm:px-10 sm:py-11"
        >
          <div className="mb-6 border-b border-border-subtle pb-5">
            <p className="mb-2 text-[11px] font-medium tracking-[0.32em] text-accent">
              第{chapter.number}章
            </p>
            <h2 className="font-serif text-2xl font-semibold leading-snug text-heading sm:text-[1.75rem]">
              {chapter.title}
            </h2>
            <p className="mt-2 text-sm tracking-wide text-subtle">
              {chapter.subtitle}
            </p>
          </div>

          <p className="mb-6 font-serif text-[1.05rem] leading-relaxed text-heading">
            {chapter.lead}
          </p>

          {chapter.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="mb-5 text-[15px] leading-[1.95] text-foreground last:mb-0"
            >
              {paragraph}
            </p>
          ))}

          {chapter.callouts.map((callout) => (
            <aside
              key={callout.heading}
              className="premium-callout my-6 rounded-xl border border-border-subtle bg-card px-5 py-5"
            >
              <h3 className="mb-3 font-serif text-base font-semibold text-heading">
                {callout.heading}
              </h3>
              <ul className="space-y-2 text-[15px] leading-relaxed text-foreground">
                {callout.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-accent" aria-hidden>
                      ◆
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          ))}

          {chapter.anchor ? (
            <aside className="premium-anchor mt-8 rounded-xl border border-accent/35 bg-accent-soft px-6 py-6">
              <h3 className="mb-3 font-serif text-base font-semibold text-heading">
                {chapter.anchor.heading}
              </h3>
              <p className="text-[15px] leading-[1.95] text-foreground">
                {chapter.anchor.body}
              </p>
            </aside>
          ) : null}

          {chapter.weeks.length > 0 ? (
            <div className="mt-2 space-y-6">
              {chapter.weeks.map((weekPlan) => (
                <div
                  key={weekPlan.week}
                  className="premium-week break-inside-avoid rounded-xl border border-border-subtle bg-card px-5 py-5"
                >
                  <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <p className="text-[11px] font-medium tracking-[0.28em] text-accent">
                      第{weekPlan.week}週
                    </p>
                    <h3 className="font-serif text-lg font-semibold text-heading">
                      {weekPlan.title}
                    </h3>
                    <span className="text-xs text-subtle">{weekPlan.theme}</span>
                  </div>
                  <p className="mb-4 text-[15px] leading-[1.9] text-foreground">
                    {weekPlan.reflection}
                  </p>
                  <ol className="list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-foreground">
                    {weekPlan.actions.map((action) => (
                      <li key={action}>{action}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          ) : null}
        </section>
      ))}

      <footer className="premium-chapter mb-10 border border-border bg-surface px-8 py-8 sm:px-10">
        <h2 className="mb-4 font-serif text-xl font-semibold text-heading">
          結語
        </h2>
        <p className="mb-6 text-[15px] leading-[1.95] text-foreground">
          {report.closing}
        </p>
        <p className="text-xs leading-relaxed text-subtle">{report.disclaimer}</p>
      </footer>

      <div className="flex flex-col gap-3 print:hidden">
        <ReportPrintButton />
        <Link
          href={buildResultPath(result)}
          className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-transparent px-6 py-4 text-lg font-semibold text-foreground transition-colors hover:bg-ghost-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-ring-offset"
        >
          診断結果へ戻る
        </Link>
        <Link
          href={`/types/${result.type.id}`}
          className="inline-flex w-full items-center justify-center rounded-xl bg-button px-6 py-4 text-lg font-semibold tracking-wide text-button-fg transition-colors hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-ring-offset"
        >
          このタイプを詳しく見る
        </Link>
      </div>
    </article>
  );
}
