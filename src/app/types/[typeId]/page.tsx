import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TypeEmblem } from "@/components/TypeEmblem";
import { PageShell } from "@/components/PageShell";
import {
  FACTOR_INFO,
  PERSONALITY_TYPES,
  PERSONALITY_TYPE_IDS,
  isPersonalityTypeId,
} from "@/lib/existential";
import { TYPE_ENCYCLOPEDIA } from "@/lib/type-encyclopedia";

interface TypePageProps {
  params: Promise<{ typeId: string }>;
}

export function generateStaticParams() {
  return PERSONALITY_TYPE_IDS.map((typeId) => ({ typeId }));
}

export async function generateMetadata({
  params,
}: TypePageProps): Promise<Metadata> {
  const { typeId } = await params;
  if (!isPersonalityTypeId(typeId)) {
    return { title: "タイプが見つかりません" };
  }
  const type = PERSONALITY_TYPES[typeId];
  return {
    title: type.name,
    description: `${type.name}（${type.nameEn}）— ${type.tagline}`,
  };
}

const PANEL =
  "reading-panel";

export default async function TypePage({ params }: TypePageProps) {
  const { typeId } = await params;
  if (!isPersonalityTypeId(typeId)) notFound();

  const type = PERSONALITY_TYPES[typeId];
  const guide = TYPE_ENCYCLOPEDIA[typeId];
  const paragraphs = guide.essay.split("\n").filter(Boolean);

  return (
    <PageShell size="lg" align="start">
      <p className="mb-6"><Link href="/types" className="text-link">← タイプ図鑑に戻る</Link></p>
      <article className={PANEL}>
        <TypeEmblem typeId={typeId} className="type-detail-emblem" />
        <p className="mb-3 text-[11px] font-medium tracking-[0.28em] text-accent">
          TYPE PROFILE
        </p>
        <h1 className="mb-2 font-serif text-3xl font-semibold text-heading sm:text-4xl">
          {type.name}
        </h1>
        <p className="mb-3 text-xs tracking-[0.2em] text-subtle uppercase">
          {type.nameEn}
        </p>
        <p className="mb-6 text-muted">{type.tagline}</p>

        {guide.focus.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {guide.focus.map((factor) => (
              <span
                key={factor}
                className="rounded-full border border-border-subtle bg-card px-3 py-1 text-[11px] font-medium"
                style={{ color: FACTOR_INFO[factor].color }}
              >
                {FACTOR_INFO[factor].name}
              </span>
            ))}
          </div>
        )}

        <section className="mb-8">
          <h2 className="mb-3 font-serif text-base font-semibold text-heading">
            この類型が現れるとき
          </h2>
          <p className="text-[15px] leading-relaxed text-foreground">
            {guide.formation}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 font-serif text-base font-semibold text-heading">
            このタイプの読み方
          </h2>
          <div className="space-y-4">
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-[15px] leading-relaxed text-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 font-serif text-base font-semibold text-heading">
            回答から見える傾向
          </h2>
          <p className="text-[15px] leading-relaxed text-foreground">
            {type.strengths}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 font-serif text-base font-semibold text-heading">
            読み解くときのヒント
          </h2>
          <p className="text-[15px] leading-relaxed text-foreground">
            {type.crisis}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 font-serif text-base font-semibold text-heading">
            今日から試せること
          </h2>
          <p className="text-[15px] leading-relaxed text-foreground">
            {type.prescription}
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 font-serif text-base font-semibold text-heading">
            隣接する類型
          </h2>
          <ul className="flex flex-col gap-2">
            {guide.related.map((relatedId) => {
              const related = PERSONALITY_TYPES[relatedId];
              return (
                <li key={relatedId}>
                  <Link
                    href={`/types/${relatedId}`}
                    className="text-sm text-muted underline-offset-4 hover:text-heading hover:underline"
                  >
                    {related.name}
                    <span className="ml-2 text-[11px] text-subtle">
                      {related.nameEn}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center rounded-xl bg-button px-6 py-4 text-lg font-semibold tracking-wide text-button-fg transition-colors hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-ring-offset"
          >
            診断をはじめる
          </Link>
          <Link
            href="/types"
            className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-transparent px-6 py-4 text-base font-semibold text-foreground transition-colors hover:bg-ghost-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-ring-offset"
          >
            タイプ一覧へ
          </Link>
        </div>
      </article>
    </PageShell>
  );
}
