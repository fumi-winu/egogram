import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import {
  REPORT_PRICE_JPY,
  REPORT_PRODUCT_NAME,
} from "@/lib/report-product";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
  description:
    "実存的動機診断におけるデジタルコンテンツ販売についての、特定商取引法に基づく表記です。",
};

const PANEL =
  "rounded-2xl border border-border bg-surface p-8 shadow-[var(--shadow)] backdrop-blur-sm sm:p-10";

const PRICE_LABEL = `${REPORT_PRICE_JPY.toLocaleString("ja-JP")}円（税込）`;

const SECTIONS: { title: string; body: string }[] = [
  {
    title: "販売業者",
    body: "［販売業者名を記入］",
  },
  {
    title: "運営統括責任者",
    body: "［責任者氏名を記入］",
  },
  {
    title: "所在地",
    body: "［住所を記入］\n※請求があった場合、遅滞なく開示します。",
  },
  {
    title: "電話番号",
    body: "［電話番号を記入］\n受付時間: ［例: 平日10:00–17:00］\n※請求があった場合、遅滞なく開示します。",
  },
  {
    title: "メールアドレス",
    body: "［連絡用メールアドレスを記入］",
  },
  {
    title: "販売する商品",
    body: `${REPORT_PRODUCT_NAME}（ウェブ上で閲覧するデジタルコンテンツ）`,
  },
  {
    title: "販売価格",
    body: PRICE_LABEL,
  },
  {
    title: "商品代金以外の必要料金",
    body: "インターネット接続料金、通信費、端末の利用料金はお客様のご負担です。決済手数料は当方で負担します。",
  },
  {
    title: "支払方法",
    body: "クレジットカード決済（Stripe Checkout）。Stripeが対応するブランド・支払い手段は、決済画面の表示に従います。",
  },
  {
    title: "支払時期",
    body: "注文時（Stripe Checkout での決済完了時）に全額をお支払いいただきます。",
  },
  {
    title: "商品の引渡時期",
    body: "決済完了後、ただちに本サイトの購入完了ページ（深層分析レポート閲覧画面）にてコンテンツを提供します。",
  },
  {
    title: "返品・キャンセルについて",
    body: "デジタルコンテンツの性質上、決済完了後の返品・キャンセル・返金には原則として応じられません。決済完了前であれば、Stripe の決済画面を閉じることで注文を中止できます。表示不具合など当方の責めに帰すべき事由がある場合は、同等のコンテンツを再提供します。",
  },
  {
    title: "動作環境",
    body: "JavaScript が有効な、最新の主要ブラウザ（Chrome / Edge / Safari / Firefox）での閲覧を想定しています。印刷および PDF 保存は、ブラウザの印刷機能をご利用ください。",
  },
  {
    title: "表現および商品に関する注意",
    body: "本レポートは自己理解のためのものであり、医学的診断、心理療法、その他の専門的助言の代替ではありません。",
  },
];

export default function TokushohoPage() {
  return (
    <PageShell size="lg" align="start">
      <article className={PANEL}>
        <p className="mb-3 text-[11px] font-medium tracking-[0.28em] text-accent">
          特定商取引法
        </p>
        <h1 className="mb-4 font-serif text-3xl font-semibold text-heading">
          特定商取引法に基づく表記
        </h1>
        <p className="mb-8 text-[15px] leading-relaxed text-muted">
          デジタルコンテンツの販売にあたり、特定商取引法に基づき以下の事項を明示します。［　］内は公開前に実情報へ差し替えてください。
        </p>
        <dl className="space-y-6">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <dt className="mb-1 font-serif text-sm font-semibold text-heading">
                {section.title}
              </dt>
              <dd className="whitespace-pre-line text-[15px] leading-relaxed text-foreground">
                {section.body}
              </dd>
            </div>
          ))}
        </dl>
      </article>
    </PageShell>
  );
}
