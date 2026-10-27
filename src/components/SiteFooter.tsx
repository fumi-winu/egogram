import Link from "next/link";

const LINKS = [
  { href: "/", label: "診断トップ" },
  { href: "/articles", label: "解説記事一覧" },
  { href: "/types", label: "タイプ一覧" },
  { href: "/legal/tokushoho", label: "特定商取引法に基づく表記" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background/60 print:hidden">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8">
        <p className="font-serif text-xl text-heading">意味のかたち<span className="ml-4 font-sans text-[10px] tracking-[0.2em] text-subtle">A LITTLE MORE LIKE YOU.</span></p>
        <p className="text-[11px] leading-relaxed text-subtle">
          本診断は自己理解のためのものであり、医学的診断ではありません。
        </p>
        <nav aria-label="フッターナビゲーション" className="flex flex-wrap gap-x-4 gap-y-1">
          {LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs text-muted underline-offset-4 transition-colors hover:text-heading hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
