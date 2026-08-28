import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { PERSONALITY_TYPES, PERSONALITY_TYPE_IDS } from "@/lib/existential";
import { focusLabels } from "@/lib/type-encyclopedia";

export const metadata: Metadata = {
  title: "タイプ一覧",
  description:
    "実存的動機診断における13類型の図鑑です。各タイプの核と処方箋を通覧できます。",
};

const PANEL =
  "rounded-2xl border border-border bg-surface p-8 shadow-[var(--shadow)] backdrop-blur-sm sm:p-10";

export default function TypesPage() {
  return (
    <PageShell size="lg" align="start">
      <div className={PANEL}>
        <p className="mb-3 text-[11px] font-medium tracking-[0.28em] text-accent">
          図鑑
        </p>
        <h1 className="mb-2 font-serif text-3xl font-semibold text-heading">
          タイプ一覧
        </h1>
        <p className="mb-8 text-[15px] leading-relaxed text-muted">
          四因子の配置から導かれる13の実存的類型です。診断結果から、またはここから直接、深層解説へ進めます。
        </p>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {PERSONALITY_TYPE_IDS.map((typeId) => {
            const type = PERSONALITY_TYPES[typeId];
            const labels = focusLabels(typeId);
            return (
              <li key={typeId}>
                <Link
                  href={`/types/${typeId}`}
                  className="block h-full rounded-xl border border-border-subtle bg-card p-5 transition-colors hover:bg-card-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-ring-offset"
                >
                  <h2 className="mb-1 font-serif text-lg font-semibold text-heading">
                    {type.name}
                  </h2>
                  <p className="mb-3 text-[11px] tracking-[0.16em] text-subtle uppercase">
                    {type.nameEn}
                  </p>
                  <p className="mb-3 text-sm leading-relaxed text-muted">
                    {type.tagline}
                  </p>
                  {labels.length > 0 && (
                    <p className="text-[11px] text-subtle">
                      {labels.join(" · ")}
                    </p>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </PageShell>
  );
}
