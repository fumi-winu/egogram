import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { TypeEmblem } from "@/components/TypeEmblem";
import { PERSONALITY_TYPES, PERSONALITY_TYPE_IDS } from "@/lib/existential";
import { focusLabels } from "@/lib/type-encyclopedia";

export const metadata: Metadata = { title: "タイプ図鑑", description: "日々の意味を見つめる13タイプ。それぞれの傾向と、自分を知るヒントを紹介します。" };

export default function TypesPage() {
  return (
    <PageShell size="xl" align="start">
      <header className="collection-heading"><p className="eyebrow">THE TYPE COLLECTION / 13 PROFILES</p><h1>自分を知る、13の入口。</h1><p>あなたが大切にしていることは、どんなかたちをしているだろう。<br />気になるタイプから、その輪郭をのぞいてみてください。</p></header>
      <ul className="type-grid">{PERSONALITY_TYPE_IDS.map((typeId, index) => {
        const type = PERSONALITY_TYPES[typeId];
        const labels = focusLabels(typeId);
        return <li key={typeId}><Link href={`/types/${typeId}`} className="type-card"><div className="type-card-art"><span className="absolute left-5 top-4 text-[10px] tracking-widest text-subtle">NO. {String(index + 1).padStart(2, "0")}</span><TypeEmblem typeId={typeId} /><span className="card-arrow" aria-hidden="true">↗</span></div><div className="type-card-copy"><p className="eyebrow">{type.nameEn}</p><h2>{type.name}</h2><p>{type.tagline}</p><p className="type-labels">{labels.length ? labels.join(" / ") : "自分の言葉から探す"}</p></div></Link></li>;
      })}</ul>
      <div className="mt-12 flex flex-wrap items-center justify-between gap-5 rounded-xl border border-border bg-surface p-7"><div><p className="font-serif text-xl text-heading">あなたのタイプも、見つけてみませんか。</p><p className="mt-2 text-xs text-muted">全20問。いつもの自分を思い浮かべて。</p></div><Link href="/" className="primary-action">診断トップへ <span aria-hidden="true">↗</span></Link></div>
    </PageShell>
  );
}
