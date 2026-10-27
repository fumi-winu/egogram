import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import {
  ARTICLE_CATEGORIES,
  articleCategoryHref,
} from "@/lib/article-categories";
import { getAllArticles, getArticleBySlug, getArticleSlugs } from "@/lib/markdown";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return { title: "記事が見つかりません" };
  }
  return {
    title: article.title,
    description: article.description,
  };
}

const PANEL =
  "reading-panel";

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const others = getAllArticles()
    .filter((item) => item.slug !== slug)
    .sort((a, b) => {
      if (!article.category) return 0;
      const aSame = a.category === article.category ? 0 : 1;
      const bSame = b.category === article.category ? 0 : 1;
      return aSame - bSame;
    });

  return (
    <PageShell size="lg" align="start">
      <p className="mb-6"><Link href="/articles" className="text-link">← 読みもの一覧に戻る</Link></p>
      <article className={PANEL}>
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
          {article.date && (
            <p className="text-[11px] tracking-wider text-subtle">
              {article.date}
            </p>
          )}
          {article.category && (
            <Link
              href={articleCategoryHref(article.category)}
              className="text-[11px] tracking-wide text-accent underline-offset-4 hover:underline"
            >
              {ARTICLE_CATEGORIES[article.category].title}
            </Link>
          )}
        </div>
        <h1 className="mb-6 font-serif text-3xl font-semibold tracking-tight text-heading sm:text-4xl">
          {article.title}
        </h1>
        <p className="mb-8 text-sm leading-7 text-muted">{article.description}</p>
        <div
          className="article-prose"
          dangerouslySetInnerHTML={{ __html: article.html }}
        />

        <div className="mt-10 flex flex-col gap-3">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center rounded-xl bg-button px-6 py-4 text-lg font-semibold tracking-wide text-button-fg transition-colors hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-ring-offset"
          >
            診断をはじめる
          </Link>
          {article.category && (
            <Link
              href={articleCategoryHref(article.category)}
              className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-transparent px-6 py-4 text-base font-semibold text-foreground transition-colors hover:bg-ghost-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-ring-offset"
            >
              {ARTICLE_CATEGORIES[article.category].title}の記事一覧へ
            </Link>
          )}
          <Link
            href="/articles"
            className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-transparent px-6 py-4 text-base font-semibold text-foreground transition-colors hover:bg-ghost-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-ring-offset"
          >
            解説記事一覧へ
          </Link>
        </div>

        {others.length > 0 && (
          <section className="mt-10 border-t border-border-subtle pt-8">
            <h2 className="mb-4 font-serif text-base font-semibold text-heading">
              ほかの記事
            </h2>
            <ul className="flex flex-col gap-2">
              {others.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/articles/${item.slug}`}
                    className="text-sm text-muted underline-offset-4 hover:text-heading hover:underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </PageShell>
  );
}
