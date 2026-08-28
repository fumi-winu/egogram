import Link from "next/link";
import { PageShell } from "@/components/PageShell";

const PANEL =
  "rounded-2xl border border-border bg-surface p-8 shadow-[var(--shadow)] backdrop-blur-sm sm:p-10";

export default function NotFound() {
  return (
    <PageShell>
      <div className={PANEL}>
        <p className="mb-3 text-[11px] font-medium tracking-[0.28em] text-accent">
          404
        </p>
        <h1 className="mb-4 font-serif text-2xl font-semibold text-heading">
          ページが見つかりません
        </h1>
        <p className="mb-8 text-[15px] leading-relaxed text-foreground">
          指定されたページは存在しないか、移動した可能性があります。
        </p>
        <Link
          href="/"
          className="inline-flex w-full items-center justify-center rounded-xl bg-button px-6 py-4 text-lg font-semibold tracking-wide text-button-fg transition-colors hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-ring-offset"
        >
          診断トップへ戻る
        </Link>
      </div>
    </PageShell>
  );
}
