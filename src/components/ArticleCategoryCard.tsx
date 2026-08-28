import type { ReactNode } from "react";
import Link from "next/link";
import type { ArticleCategory, ArticleCategoryId } from "@/lib/article-categories";
import { articleCategoryHref } from "@/lib/article-categories";

interface ArticleCategoryCardProps {
  category: ArticleCategory;
  articleCount: number;
}

export function ArticleCategoryCard({
  category,
  articleCount,
}: ArticleCategoryCardProps) {
  return (
    <li>
      <Link
        href={articleCategoryHref(category.id)}
        className="article-category-card group flex h-full flex-col overflow-hidden rounded-2xl border shadow-[var(--shadow)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_18px_40px_rgba(15,23,42,0.18)] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-ring-offset motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      >
        <div
          className="relative h-40 overflow-hidden"
          style={{
            background: `linear-gradient(165deg, color-mix(in srgb, ${category.tone} 22%, transparent) 0%, transparent 72%)`,
          }}
        >
          <ArticleCategoryGraphic categoryId={category.id} />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h2 className="mb-2 font-serif text-lg font-semibold text-heading">
            {category.title}
          </h2>
          <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-muted">
            {category.description}
          </p>
          <div className="mt-auto flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1 rounded-lg bg-accent-soft px-3 py-1.5 text-sm font-semibold text-accent transition-colors group-hover:bg-accent group-hover:text-button-fg">
              記事を見る
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                →
              </span>
            </span>
            <span className="text-[11px] tracking-wide text-subtle">
              {articleCount}件
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}

interface ArticleCategoryGraphicProps {
  categoryId: ArticleCategoryId;
  className?: string;
}

export function ArticleCategoryGraphic({
  categoryId,
  className = "h-full w-full",
}: ArticleCategoryGraphicProps) {
  const graphic = GRAPHICS[categoryId];

  return (
    <svg
      viewBox="0 0 320 160"
      className={className}
      aria-hidden
      style={{ color: graphic.tone }}
    >
      <defs>
        <radialGradient id={`glow-${categoryId}`} cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.28" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="160" fill={`url(#glow-${categoryId})`} />
      {graphic.shapes}
    </svg>
  );
}

const GRAPHICS: Record<
  ArticleCategoryId,
  { tone: string; shapes: ReactNode }
> = {
  "core-theory": {
    tone: "var(--accent)",
    shapes: (
      <>
        <circle cx="160" cy="82" r="54" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
        <circle cx="160" cy="82" r="34" fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" />
        <circle cx="160" cy="82" r="14" fill="currentColor" fillOpacity="0.85" />
        <line x1="160" y1="22" x2="160" y2="48" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
        <line x1="160" y1="116" x2="160" y2="140" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
        <line x1="92" y1="82" x2="118" y2="82" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
        <line x1="202" y1="82" x2="228" y2="82" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
      </>
    ),
  },
  career: {
    tone: "var(--factor-creative)",
    shapes: (
      <>
        <rect x="72" y="96" width="44" height="36" rx="4" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeOpacity="0.5" />
        <rect x="128" y="72" width="44" height="60" rx="4" fill="currentColor" fillOpacity="0.28" stroke="currentColor" strokeOpacity="0.55" />
        <rect x="184" y="46" width="44" height="86" rx="4" fill="currentColor" fillOpacity="0.38" stroke="currentColor" strokeOpacity="0.7" />
        <path d="M78 88 L248 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.45" />
        <circle cx="248" cy="34" r="6" fill="currentColor" />
      </>
    ),
  },
  crisis: {
    tone: "var(--factor-attitudinal)",
    shapes: (
      <>
        <path
          d="M160 38c-24 0-44 20-44 44 0 18 12 32 28 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.75"
        />
        <path
          d="M160 38c24 0 44 20 44 44 0 10-4 20-10 27"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 7"
          strokeOpacity="0.4"
        />
        <path d="M188 118 L212 96 L228 112" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="160" cy="82" r="7" fill="currentColor" />
      </>
    ),
  },
  relationships: {
    tone: "var(--factor-experiential)",
    shapes: (
      <>
        <circle cx="132" cy="82" r="38" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeOpacity="0.65" strokeWidth="1.75" />
        <circle cx="188" cy="82" r="38" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeOpacity="0.65" strokeWidth="1.75" />
        <circle cx="160" cy="82" r="10" fill="currentColor" fillOpacity="0.8" />
      </>
    ),
  },
  growth: {
    tone: "var(--factor-autonomy)",
    shapes: (
      <>
        <path d="M160 132 C160 96 128 92 128 64 C128 88 160 84 160 52" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M160 132 C160 100 196 94 196 70 C196 90 164 88 160 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
        <circle cx="160" cy="44" r="8" fill="currentColor" />
        <line x1="160" y1="132" x2="160" y2="142" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  typology: {
    tone: "var(--accent)",
    shapes: (
      <>
        <circle cx="118" cy="58" r="8" fill="currentColor" fillOpacity="0.9" />
        <circle cx="202" cy="58" r="8" fill="currentColor" fillOpacity="0.55" />
        <circle cx="92" cy="104" r="7" fill="currentColor" fillOpacity="0.4" />
        <circle cx="160" cy="112" r="9" fill="currentColor" />
        <circle cx="228" cy="100" r="7" fill="currentColor" fillOpacity="0.65" />
        <path d="M118 58 L160 112 L202 58 M118 58 L92 104 M160 112 L92 104 M160 112 L228 100 M202 58 L228 100" fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.25" />
      </>
    ),
  },
  values: {
    tone: "var(--factor-creative)",
    shapes: (
      <>
        <rect x="108" y="34" width="48" height="48" rx="10" fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeOpacity="0.7" />
        <rect x="164" y="34" width="48" height="48" rx="10" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeOpacity="0.45" />
        <rect x="108" y="90" width="48" height="48" rx="10" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeOpacity="0.75" />
        <rect x="164" y="90" width="48" height="48" rx="10" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.4" />
      </>
    ),
  },
  assessment: {
    tone: "var(--factor-autonomy)",
    shapes: (
      <>
        <polygon points="160,36 228,82 160,128 92,82" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeOpacity="0.4" />
        <polygon points="160,56 200,82 160,108 120,82" fill="currentColor" fillOpacity="0.28" stroke="currentColor" strokeOpacity="0.75" />
        <circle cx="160" cy="82" r="4" fill="currentColor" />
      </>
    ),
  },
  practice: {
    tone: "var(--factor-experiential)",
    shapes: (
      <>
        <circle cx="160" cy="48" r="16" fill="currentColor" fillOpacity="0.85" />
        <path d="M92 132 C120 92 200 92 228 132" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
        <circle cx="124" cy="96" r="4" fill="currentColor" fillOpacity="0.5" />
        <circle cx="160" cy="88" r="4" fill="currentColor" fillOpacity="0.7" />
        <circle cx="196" cy="96" r="4" fill="currentColor" fillOpacity="0.5" />
      </>
    ),
  },
};
