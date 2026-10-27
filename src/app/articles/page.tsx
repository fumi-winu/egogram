import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import {
  ArticleCategoryCard,
  ArticleCategoryGraphic,
} from "@/components/ArticleCategoryCard";
import {
  ARTICLE_CATEGORIES,
  ARTICLE_CATEGORY_LIST,
  articleCategoryHref,
  parseArticleCategoryParam,
} from "@/lib/article-categories";
import {
  getAllArticles,
  getArticleCountByCategory,
  getArticlesByCategory,
  type ArticleMeta,
} from "@/lib/markdown";

interface ArticlesPageProps {
  searchParams: Promise<{ category?: string | string[] }>;
}

export async function generateMetadata({
  searchParams,
}: ArticlesPageProps): Promise<Metadata> {
  const { category: raw } = await searchParams;
  const categoryId = parseArticleCategoryParam(raw);

  if (!categoryId) {
    return {
      title: "解説記事",
      description:
        "フランクルの実存分析と、創造・体験・態度・実存的自律をめぐる解説記事の一覧です。",
    };
  }

  const category = ARTICLE_CATEGORIES[categoryId];
  return {
    title: `${category.title}の記事`,
    description: category.description,
  };
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const { category: raw } = await searchParams;
  const categoryId = parseArticleCategoryParam(raw);

  if (categoryId) {
    const category = ARTICLE_CATEGORIES[categoryId];
    const articles = getArticlesByCategory(categoryId);

    return (
      <PageShell size="lg" align="start">
        <p className="mb-5">
          <Link
            href="/articles"
            className="text-sm text-muted underline-offset-4 transition-colors hover:text-heading hover:underline"
          >
            ← すべてのカテゴリー
          </Link>
        </p>

        <header className="article-category-card mb-8 overflow-hidden rounded-2xl border shadow-[var(--shadow)] backdrop-blur-sm">
          <div
            className="h-44"
            style={{
              background: `linear-gradient(165deg, color-mix(in srgb, ${category.tone} 22%, transparent) 0%, transparent 72%)`,
            }}
          >
            <ArticleCategoryGraphic categoryId={category.id} />
          </div>
          <div className="p-8 sm:p-10">
            <p className="mb-3 text-[11px] font-medium tracking-[0.28em] text-accent">
              解説
            </p>
            <h1 className="mb-2 font-serif text-3xl font-semibold text-heading">
              {category.title}
            </h1>
            <p className="text-[15px] leading-relaxed text-muted">
              {category.description}
            </p>
          </div>
        </header>

        {articles.length === 0 ? (
          <p className="text-sm text-muted">このカテゴリーにはまだ記事がありません。</p>
        ) : (
          <>
            <h2 className="mb-4 font-serif text-xl font-semibold text-heading">
              このカテゴリーの記事
            </h2>
            <ArticleList articles={articles} />
          </>
        )}

        <nav aria-label="他のカテゴリー" className="mt-10 border-t border-border-subtle pt-8">
          <p className="mb-3 text-[11px] font-medium tracking-[0.2em] text-subtle">
            他のカテゴリー
          </p>
          <ul className="flex flex-wrap gap-2">
            {ARTICLE_CATEGORY_LIST.filter((item) => item.id !== categoryId).map(
              (item) => (
                <li key={item.id}>
                  <Link
                    href={articleCategoryHref(item.id)}
                    className="inline-flex rounded-lg border border-border-subtle bg-card px-3 py-1.5 text-xs text-muted transition-colors hover:bg-card-hover hover:text-heading focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-ring-offset"
                  >
                    {item.title}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
      </PageShell>
    );
  }

  const counts = getArticleCountByCategory();
  const articles = getAllArticles();

  return (
    <PageShell size="xl" align="start">
      <header className="collection-heading">
        <p className="mb-3 text-[11px] font-medium tracking-[0.28em] text-accent">
          THE JOURNAL / IDEAS FOR EVERYDAY
        </p>
        <h1 className="mb-2 font-serif text-3xl font-semibold text-heading">
          自分を知る、読みもの。
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-muted">
          診断のその先へ。日々の選択や人との関わりを、少し違う角度から見つめるヒントを集めました。
        </p>
      </header>

      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ARTICLE_CATEGORY_LIST.map((category) => (
          <ArticleCategoryCard
            key={category.id}
            category={category}
            articleCount={counts[category.id]}
          />
        ))}
      </ul>

      {articles.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-4 font-serif text-xl font-semibold text-heading">
            すべての記事
          </h2>
          <ArticleList articles={articles} />
        </section>
      )}
    </PageShell>
  );
}

function ArticleList({ articles }: { articles: ArticleMeta[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {articles.map((article) => (
        <li key={article.slug}>
          <Link
            href={`/articles/${article.slug}`}
            className="article-row"
          >
            <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
              {article.date && (
                <p className="text-[11px] tracking-wider text-subtle">
                  {article.date}
                </p>
              )}
              {article.category && (
                <p className="text-[11px] tracking-wide text-accent">
                  {ARTICLE_CATEGORIES[article.category].title}
                </p>
              )}
            </div>
            <h3 className="mb-2 font-serif text-xl font-semibold text-heading">
              {article.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              {article.description}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
