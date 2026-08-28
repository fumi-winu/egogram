import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import {
  ARTICLE_CATEGORY_IDS,
  type ArticleCategoryId,
  isArticleCategoryId,
} from "@/lib/article-categories";

const ARTICLES_DIR = path.join(process.cwd(), "src/content/articles");

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: ArticleCategoryId | null;
}

export interface Article extends ArticleMeta {
  html: string;
}

marked.setOptions({ gfm: true });

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getArticleBySlug(slug: string): Article | null {
  const fullPath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const html = marked.parse(content, { async: false }) as string;

  return {
    slug,
    title: isNonEmptyString(data.title) ? data.title : slug,
    description: isNonEmptyString(data.description) ? data.description : "",
    date: isNonEmptyString(data.date) ? data.date : "",
    category: isArticleCategoryId(data.category) ? data.category : null,
    html,
  };
}

function toArticleMeta({
  slug,
  title,
  description,
  date,
  category,
}: Article): ArticleMeta {
  return { slug, title, description, date, category };
}

export function getAllArticles(): ArticleMeta[] {
  return getArticleSlugs()
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is Article => article !== null)
    .map(toArticleMeta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticlesByCategory(
  category: ArticleCategoryId,
): ArticleMeta[] {
  return getAllArticles().filter((article) => article.category === category);
}

export function getArticleCountByCategory(): Record<ArticleCategoryId, number> {
  const counts = Object.fromEntries(
    ARTICLE_CATEGORY_IDS.map((id) => [id, 0]),
  ) as Record<ArticleCategoryId, number>;

  for (const article of getAllArticles()) {
    if (article.category) {
      counts[article.category] += 1;
    }
  }

  return counts;
}
