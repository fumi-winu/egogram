import Link from "next/link";
import { type DiagnosisResult, FACTOR_INFO, FACTOR_ORDER, MAX_SCORE_PER_FACTOR, SCORE_BAND_LABEL, getFactorInsight, getScoreBand } from "@/lib/existential";
import { RadarChart } from "./RadarChart";
import { ShareButton } from "./ShareButton";
import { TypeEmblem } from "./TypeEmblem";

export function ResultScreen({ result }: { result: DiagnosisResult }) {
  const { scores, percentiles, type } = result;
  return (
    <div className="result-panel">
      <header className="result-hero">
        <TypeEmblem typeId={type.id} className="result-emblem" />
        <div><p className="eyebrow">YOUR MEANING PROFILE</p><p className="mt-3 text-xs text-muted">今回のあなたのタイプは</p><h1>{type.name}</h1><p className="mb-4 text-[10px] uppercase tracking-[0.18em] text-subtle">{type.nameEn}</p><p className="text-sm text-accent">{type.tagline}</p></div>
      </header>
      <div className="result-scores">
        <div><p className="eyebrow text-center">あなたの意味のかたち</p><div className="flex justify-center"><RadarChart scores={scores} /></div><p className="text-center text-[10px] text-subtle">4つの観点から、いまの自分を見つめる。</p></div>
        <div>{FACTOR_ORDER.map((factor) => {
          const info = FACTOR_INFO[factor];
          return <div key={factor} className="score-card"><div className="mb-2 flex items-center justify-between"><span className="text-sm font-medium" style={{ color: info.color }}>{info.name}</span><span className="text-xs text-muted">{scores[factor]} / {MAX_SCORE_PER_FACTOR}<span className="ml-3 text-heading">{percentiles[factor]}%</span></span></div><div className="mb-2 h-1.5 overflow-hidden rounded-full bg-track"><div className="h-full rounded-full" style={{ width: `${percentiles[factor]}%`, backgroundColor: info.color }} /></div><p className="text-[10px] text-subtle">当てはまり：{SCORE_BAND_LABEL[getScoreBand(percentiles[factor])]}</p><p className="mt-2 text-xs leading-6 text-muted">{getFactorInsight(factor, percentiles[factor])}</p></div>;
        })}</div>
      </div>
      <p className="mb-7 rounded-lg bg-card p-4 text-[11px] leading-6 text-muted">棒の百分率は、最低5点を0%、最高25点を100%に換算した値です。他の人との順位ではありません。レーダーは合計点を表示しています。</p>
      <section className="result-reading"><h2><span>01</span>今回の回答から見える傾向</h2><p>{type.strengths}</p></section>
      <section className="result-reading"><h2><span>02</span>読み解くときのヒント</h2><p>{type.crisis}</p></section>
      <section className="result-reading result-practice"><h2><span>03</span>今日から試せること</h2><p>{type.prescription}</p></section>
      <div className="result-actions"><Link href={`/types/${type.id}`} className="primary-action">このタイプをもっと知る <span aria-hidden="true">↗</span></Link><ShareButton typeName={type.name} /><Link href="/" className="inline-flex items-center justify-center rounded-xl border border-border px-5 py-3 text-muted hover:bg-card">もう一度診断する ↻</Link></div>
      <p className="mt-6 text-xs leading-6 text-subtle">今回の回答をもとにした独自の分類です。性格や能力の判定ではありません。当てはまる部分を、具体的な経験と照らし合わせて読んでください。</p>
    </div>
  );
}
