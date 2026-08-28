export const ARTICLE_CATEGORY_IDS = [
  "core-theory",
  "career",
  "crisis",
  "relationships",
  "growth",
  "typology",
  "values",
  "assessment",
  "practice",
] as const;

export type ArticleCategoryId = (typeof ARTICLE_CATEGORY_IDS)[number];

export interface ArticleCategory {
  id: ArticleCategoryId;
  title: string;
  description: string;
  tone: string;
}

export const ARTICLE_CATEGORIES: Record<ArticleCategoryId, ArticleCategory> = {
  "core-theory": {
    id: "core-theory",
    title: "コア理論",
    description:
      "フランクルのロゴセラピーと、四つの実存的動機の基礎概念を解説します。",
    tone: "var(--accent)",
  },
  career: {
    id: "career",
    title: "キャリア・適職",
    description:
      "創造価値と態度価値を活かす仕事選びと、意味が持続する働き方。",
    tone: "var(--factor-creative)",
  },
  crisis: {
    id: "crisis",
    title: "実存的危機と克服",
    description:
      "虚無感、バーンアウト、無意味感からの回復アプローチを探ります。",
    tone: "var(--factor-attitudinal)",
  },
  relationships: {
    id: "relationships",
    title: "対人関係・対話",
    description:
      "動機タイプ別のコミュニケーションと、健全な距離感の取り方。",
    tone: "var(--factor-experiential)",
  },
  growth: {
    id: "growth",
    title: "自己成長・内省",
    description:
      "日常で実践する意味の発見と、セルフコーチングの手がかり。",
    tone: "var(--factor-autonomy)",
  },
  typology: {
    id: "typology",
    title: "深層分析・類型論",
    description:
      "孤高の設計者など、各タイプのより深いプロファイリング。",
    tone: "var(--accent)",
  },
  values: {
    id: "values",
    title: "四つの意味の通路",
    description:
      "創造・体験・態度・実存的自律を、個別に深く読み解きます。",
    tone: "var(--factor-creative)",
  },
  assessment: {
    id: "assessment",
    title: "診断の読み方",
    description:
      "スコアと類型の配置を、自己理解の地図として使う方法。",
    tone: "var(--factor-autonomy)",
  },
  practice: {
    id: "practice",
    title: "日常の実践",
    description:
      "今週できる小さな実験と、意味を生活に根づかせる習慣。",
    tone: "var(--factor-experiential)",
  },
};

export const ARTICLE_CATEGORY_LIST: ArticleCategory[] =
  ARTICLE_CATEGORY_IDS.map((id) => ARTICLE_CATEGORIES[id]);

export function isArticleCategoryId(
  value: unknown,
): value is ArticleCategoryId {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(ARTICLE_CATEGORIES, value)
  );
}

export function parseArticleCategoryParam(
  value: string | string[] | undefined,
): ArticleCategoryId | null {
  const raw = Array.isArray(value) ? value[0] : value;
  return isArticleCategoryId(raw) ? raw : null;
}

export function articleCategoryHref(id: ArticleCategoryId): string {
  return `/articles?category=${id}`;
}
