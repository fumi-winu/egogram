import Link from "next/link";
import {
  type DiagnosisResult,
  FACTOR_INFO,
  FACTOR_ORDER,
  MAX_SCORE_PER_FACTOR,
  SCORE_BAND_LABEL,
  getFactorInsight,
  getScoreBand,
} from "@/lib/existential";
import { RadarChart } from "./RadarChart";
import { ReportCheckoutButton } from "./ReportCheckoutButton";
import { ShareButton } from "./ShareButton";

interface ResultScreenProps {
  result: DiagnosisResult;
}

const PANEL =
  "rounded-2xl border border-border bg-surface p-8 shadow-[var(--shadow)] backdrop-blur-sm sm:p-10";

export function ResultScreen({ result }: ResultScreenProps) {
  const { scores, percentiles, type } = result;

  return (
    <div className={PANEL}>
      <div className="mb-8 text-center">
        <p className="mb-3 text-[11px] font-medium tracking-[0.28em] text-accent">
          診断結果
        </p>
        <h2 className="mb-2 font-serif text-3xl font-semibold text-heading sm:text-4xl">
          {type.name}
        </h2>
        <p className="mb-3 text-xs tracking-[0.2em] text-subtle uppercase">
          {type.nameEn}
        </p>
        <p className="text-muted">{type.tagline}</p>
      </div>

      <div className="mb-8 flex items-center justify-center rounded-xl border border-border-subtle bg-card p-4">
        <RadarChart scores={scores} />
      </div>

      <div className="mb-8">
        <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {FACTOR_ORDER.map((factor) => {
            const info = FACTOR_INFO[factor];
            const score = scores[factor];
            const percentile = percentiles[factor];
            const width = (score / MAX_SCORE_PER_FACTOR) * 100;
            const band = getScoreBand(percentile);

            return (
              <div
                key={factor}
                className="rounded-xl border border-border-subtle bg-card p-4"
              >
                <div className="mb-2 flex items-baseline justify-between gap-2">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: info.color }}
                  >
                    {info.name}
                  </span>
                  <span className="text-xs text-subtle">
                    {score}/{MAX_SCORE_PER_FACTOR}
                  </span>
                </div>
                <div className="mb-2 h-1 overflow-hidden rounded-full bg-track">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${width}%`, backgroundColor: info.color }}
                  />
                </div>
                <p className="mb-2 text-[11px] text-subtle">
                  {percentile}%（{SCORE_BAND_LABEL[band]}）
                </p>
                <p className="text-xs leading-relaxed text-muted">
                  {getFactorInsight(factor, percentile)}
                </p>
              </div>
            );
          })}
        </div>
        <p className="text-center text-[11px] text-subtle">
          百分率は、各因子の理論上の満点を100とした相対位置です。
        </p>
      </div>

      <section className="mb-6">
        <h3 className="mb-3 font-serif text-base font-semibold text-heading">
          あなたの強みとなる実存的構え
        </h3>
        <p className="text-[15px] leading-relaxed text-foreground">
          {type.strengths}
        </p>
      </section>

      <section className="mb-6">
        <h3 className="mb-3 font-serif text-base font-semibold text-heading">
          陥りやすい実存的危機（虚無感・バーンアウトなどへの傾向）
        </h3>
        <p className="text-[15px] leading-relaxed text-foreground">
          {type.crisis}
        </p>
      </section>

      <section className="mb-8">
        <h3 className="mb-3 font-serif text-base font-semibold text-heading">
          今後の行動指針・処方箋
        </h3>
        <p className="text-[15px] leading-relaxed text-foreground">
          {type.prescription}
        </p>
      </section>

      <ReportCheckoutButton
        type={type.id}
        c={scores.creative}
        e={scores.experiential}
        a={scores.attitudinal}
        u={scores.autonomy}
      />

      <div className="flex flex-col gap-3">
        <Link
          href={`/types/${type.id}`}
          className="inline-flex w-full items-center justify-center rounded-xl bg-button px-6 py-4 text-lg font-semibold tracking-wide text-button-fg transition-colors hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-ring-offset"
        >
          このタイプを詳しく見る
        </Link>
        <ShareButton typeName={type.name} />
        <Link
          href="/"
          className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-transparent px-6 py-4 text-lg font-semibold text-foreground transition-colors hover:bg-ghost-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-ring-offset"
        >
          もう一度診断する
        </Link>
      </div>
    </div>
  );
}
