import Link from "next/link";
import {
  FACTOR_INFO,
  FACTOR_ORDER,
  MAX_SCORE_PER_FACTOR,
  SCORE_BAND_LABEL,
  type DiagnosisResult,
} from "@/lib/existential";
import { compileDeepReport } from "@/lib/deep-report";
import { REPORT_PRICE_JPY, REPORT_PRODUCT_NAME } from "@/lib/report-product";
import { buildResultPath } from "@/lib/result-url";
import { RadarChart } from "./RadarChart";
import { ReportPrintButton } from "./ReportPrintButton";

const PANEL =
  "deep-report rounded-2xl border border-border bg-surface p-8 shadow-[var(--shadow)] backdrop-blur-sm sm:p-10";

interface DeepReportProps {
  result: DiagnosisResult;
  purchasedAt: Date;
}

export function DeepReport({ result, purchasedAt }: DeepReportProps) {
  const report = compileDeepReport(result);
  const { type, scores, percentiles } = result;
  const purchasedLabel = purchasedAt.toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <article className={PANEL}>
      <p className="mb-3 text-[11px] font-medium tracking-[0.28em] text-accent">
        有料コンテンツ
      </p>
      <h1 className="mb-2 font-serif text-3xl font-semibold text-heading sm:text-4xl">
        {REPORT_PRODUCT_NAME}
      </h1>
      <p className="mb-6 text-sm text-muted">
        {type.name}
        <span className="ml-2 text-xs tracking-[0.18em] text-subtle uppercase">
          {type.nameEn}
        </span>
      </p>
      <p className="mb-8 text-xs text-subtle">
        決済完了 {purchasedLabel} ／ {REPORT_PRICE_JPY.toLocaleString("ja-JP")}
        円（税込）
      </p>

      <p className="mb-8 font-serif text-lg text-heading">{type.tagline}</p>

      <div className="mb-8 flex items-center justify-center rounded-xl border border-border-subtle bg-card p-4">
        <RadarChart scores={scores} />
      </div>

      <section className="mb-10">
        {report.opening.map((paragraph) => (
          <p
            key={paragraph.slice(0, 24)}
            className="mb-4 text-[15px] leading-relaxed text-foreground"
          >
            {paragraph}
          </p>
        ))}
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-serif text-xl font-semibold text-heading">
          四因子の深層読解
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FACTOR_ORDER.map((factor) => {
            const info = FACTOR_INFO[factor];
            const reading = report.factorReadings.find(
              (item) => item.factor === factor,
            );
            if (!reading) return null;
            return (
              <div
                key={factor}
                className="rounded-xl border border-border-subtle bg-card p-4"
              >
                <div className="mb-2 flex items-baseline justify-between gap-2">
                  <h3
                    className="text-sm font-semibold"
                    style={{ color: info.color }}
                  >
                    {info.name}
                  </h3>
                  <span className="text-xs text-subtle">
                    {scores[factor]}/{MAX_SCORE_PER_FACTOR}・
                    {percentiles[factor]}%（{SCORE_BAND_LABEL[reading.band]}）
                  </span>
                </div>
                {reading.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 20)}
                    className="mb-2 text-xs leading-relaxed text-muted last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            );
          })}
        </div>
        {report.silentNote ? (
          <p className="mt-4 text-[15px] leading-relaxed text-foreground">
            {report.silentNote}
          </p>
        ) : null}
      </section>

      <section className="mb-10">
        <h2 className="mb-2 font-serif text-xl font-semibold text-heading">
          {type.name}の深層
        </h2>
        <p className="mb-4 text-sm text-muted">{report.guide.subtitle}</p>
        {report.guide.essays.map((paragraph) => (
          <p
            key={paragraph.slice(0, 24)}
            className="mb-4 text-[15px] leading-relaxed text-foreground"
          >
            {paragraph}
          </p>
        ))}
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-serif text-xl font-semibold text-heading">
          影と実存的危機
        </h2>
        {report.guide.shadow.map((paragraph) => (
          <p
            key={paragraph.slice(0, 24)}
            className="mb-4 text-[15px] leading-relaxed text-foreground"
          >
            {paragraph}
          </p>
        ))}
        <p className="text-[15px] leading-relaxed text-foreground">
          {type.crisis}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-serif text-xl font-semibold text-heading">
          タイプ別の実存的処方箋
        </h2>
        <p className="mb-4 text-[15px] leading-relaxed text-foreground">
          {type.prescription}
        </p>
        <ol className="list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-foreground">
          {report.guide.prescriptions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-serif text-xl font-semibold text-heading">
          今週の実践
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-foreground">
          {report.guide.practices.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <p className="mb-10 text-[15px] leading-relaxed text-foreground">
        {report.closing}
      </p>

      <div className="flex flex-col gap-3 print:hidden">
        <ReportPrintButton />
        <Link
          href={buildResultPath(result)}
          className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-transparent px-6 py-4 text-lg font-semibold text-foreground transition-colors hover:bg-ghost-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-ring-offset"
        >
          診断結果へ戻る
        </Link>
        <Link
          href={`/types/${type.id}`}
          className="inline-flex w-full items-center justify-center rounded-xl bg-button px-6 py-4 text-lg font-semibold tracking-wide text-button-fg transition-colors hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-ring-offset"
        >
          このタイプを詳しく見る
        </Link>
      </div>
    </article>
  );
}
