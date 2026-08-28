# 実存的動機診断（Existential Motivation Test）

フランクルの実存分析・ロゴセラピーに基づき、人生に意味を見出す四つの動機を測定するWebアプリです。

- **創造価値 (Creative Value)** — 創り出す・生み出す・行動する動機
- **体験価値 (Experiential Value)** — 世界や他者、芸術、自然を深く受容・味わう動機
- **態度価値 (Attitudinal Value)** — 苦難や不条理を引き受ける内面の動機
- **実存的自律 (Existential Autonomy)** — 外部評価に依存せず、自己の基準で完結する傾向

Next.js（App Router）/ React / TypeScript / Tailwind CSS で構築しています。チャートは外部ライブラリを使わず、SVGで描画します。

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

有料の深層分析レポートを有効にする場合は、`.env.example` をコピーして `.env.local` を作り、`STRIPE_SECRET_KEY` を設定してください。決済は Stripe Checkout（買い切り 800円）を使用します。

```bash
# .env.local（キー単体の行ではなく、必ず変数名付きで書く）
STRIPE_SECRET_KEY=sk_test_xxxxxxxx
```

変更後は `npm run dev` を再起動してください。`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` は不要です。
