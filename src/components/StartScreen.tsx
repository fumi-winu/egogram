import Link from "next/link";
import { FACTOR_INFO, FACTOR_ORDER, PERSONALITY_TYPES, QUESTIONS } from "@/lib/existential";
import { MeaningCompass, TypeEmblem } from "./TypeEmblem";

export function StartScreen({ onStart }: { onStart: () => void }) {
  const types = Object.values(PERSONALITY_TYPES);
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> A LITTLE JOURNEY INTO YOURSELF</p>
          <h1>あなたの毎日に、<br />どんな<span className="hero-emphasis">意味</span>が<br className="hero-break" />息づいている？</h1>
          <p className="hero-description">つくること。感じること。向き合うこと。自分で選ぶこと。<br className="hidden sm:block" />いつもの選択から、あなたを動かすものを見つけよう。</p>
          <div className="hero-actions">
            <button type="button" onClick={onStart} className="primary-action">自分のタイプを見つける <span aria-hidden="true">↗</span></button>
            <p className="hero-meta">全{QUESTIONS.length}問 <span>／</span> 約{Math.ceil(QUESTIONS.length * 0.25)}分 <span>／</span> 無料</p>
          </div>
          <p className="hero-note">正解はありません。いまの自分の感覚で、気軽に。</p>
        </div>
        <div className="hero-art">
          <span className="art-caption">THE SHAPE OF YOUR MEANING</span>
          <MeaningCompass />
          <div className="art-footnote"><span>4 PERSPECTIVES</span><span>ONE UNIQUE YOU</span></div>
        </div>
      </section>

      <section className="factor-strip" aria-label="自分を知る四つの観点">
        {FACTOR_ORDER.map((factor, index) => (
          <div key={factor} className="factor-strip-item">
            <span className="factor-number" style={{ color: FACTOR_INFO[factor].color }}>0{index + 1}</span>
            <div><h2>{FACTOR_INFO[factor].shortLabel}</h2><p>{["何を世界に届けたい？", "何に心を動かされる？", "どう向き合っていたい？", "何を大切に選びたい？"][index]}</p></div>
          </div>
        ))}
      </section>

      <section className="home-section">
        <div className="section-heading"><div><p className="eyebrow">THE TYPE COLLECTION</p><h2>自分を知る、13の入口。</h2></div><Link href="/types" className="text-link">すべてのタイプを見る <span aria-hidden="true">↗</span></Link></div>
        <p className="section-description">ひとつの名前で決めつけるより、まだ知らない自分に出会うために。</p>
        <div className="featured-types">
          {[types[0], types[3], types[7]].map((type) => (
            <Link key={type.id} href={`/types/${type.id}`} className="type-card">
              <div className="type-card-art"><TypeEmblem typeId={type.id} /><span className="card-arrow" aria-hidden="true">↗</span></div>
              <div className="type-card-copy"><p className="eyebrow">{type.nameEn}</p><h3>{type.name}</h3><p>{type.tagline}</p></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="philosophy-block">
        <div><p className="eyebrow">INSPIRED BY VIKTOR FRANKL</p><h2>「自分は何者か」から、<br />「何を大切にしたいか」へ。</h2></div>
        <div><p>フランクルのロゴセラピーに着想を得た、自己理解のための診断です。創造・体験・態度の三価値に、独自の観点「自律」を加え、日々の経験を見つめます。</p><Link href="/articles/existential-motivation" className="text-link">この診断の背景を読む ↗</Link></div>
      </section>
      <details className="about-diagnosis"><summary>この診断について</summary><p>20問と13タイプは本サイトの独自設計で、標準化された心理検査ではありません。MBTIとは異なる分類で、性格や能力を固定するものではありません。自己理解のためのものであり、医学的診断ではありません。</p></details>
    </div>
  );
}
