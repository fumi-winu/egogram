"use client";

const BUTTON_CLASS =
  "inline-flex w-full items-center justify-center rounded-xl border border-border bg-transparent px-6 py-4 text-lg font-semibold text-foreground transition-colors hover:bg-ghost-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-ring-offset print:hidden";

export function ReportPrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={BUTTON_CLASS}
    >
      印刷 / PDFとして保存
    </button>
  );
}
