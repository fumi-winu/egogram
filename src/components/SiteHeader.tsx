"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "診断する" },
  { href: "/types", label: "タイプ図鑑" },
  { href: "/articles", label: "読みもの" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md print:hidden">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5 sm:px-8">
        <Link
          href="/"
          className="brand-lockup"
        >
          <span className="brand-symbol" aria-hidden="true">✳</span>
          <span><span className="brand-name">意味のかたち</span><span className="brand-subtitle">実存的動機診断</span></span>
        </Link>
        <nav aria-label="主要ナビゲーション" className="flex flex-wrap gap-1">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-ring-offset sm:text-sm ${
                  active
                    ? "bg-accent-soft text-heading"
                    : "text-muted hover:bg-ghost-hover hover:text-heading"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
