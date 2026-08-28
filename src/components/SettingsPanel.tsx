"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import {
  THEME_OPTIONS,
  applyTheme,
  persistTheme,
  readStoredTheme,
  subscribeTheme,
  notifyThemeChange,
  type ThemePreference,
} from "@/lib/theme";

const RESET_EVENT = "existential-reset";

export function SettingsPanel() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const theme = useSyncExternalStore<ThemePreference>(
    subscribeTheme,
    readStoredTheme,
    () => "system",
  );
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const handleThemeChange = (next: ThemePreference) => {
    persistTheme(next);
    applyTheme(next);
    notifyThemeChange();
  };

  const handleReset = () => {
    window.dispatchEvent(new Event(RESET_EVENT));
    router.push("/");
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="fixed bottom-4 left-4 z-50 print:hidden">
      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label="設定"
          className="mb-2 w-64 rounded-2xl border border-border bg-surface p-4 shadow-[var(--shadow)] backdrop-blur-md"
        >
          <p className="mb-3 text-[11px] font-medium tracking-[0.22em] text-accent">
            設定
          </p>

          <fieldset className="mb-4">
            <legend className="mb-2 text-xs font-medium text-heading">
              テーマ切替
            </legend>
            <div className="grid grid-cols-3 gap-1.5">
              {THEME_OPTIONS.map((option) => {
                const selected = theme === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => handleThemeChange(option.value)}
                    className={`rounded-lg border px-2 py-1.5 text-[11px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-ring-offset ${
                      selected
                        ? "border-accent bg-accent-soft text-heading"
                        : "border-border bg-card text-muted hover:bg-card-hover"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-[10px] leading-relaxed text-subtle">
              「システム」はOS・ブラウザのカラー設定に連動します。
            </p>
          </fieldset>

          <div className="mb-4">
            <p className="mb-2 text-xs font-medium text-heading">言語</p>
            <p className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground">
              日本語
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-ghost-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-ring-offset"
          >
            リセット
          </button>
        </div>
      )}

      <button
        type="button"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 text-sm font-medium text-heading shadow-[var(--shadow)] backdrop-blur-md transition-colors hover:bg-card-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-ring-offset"
      >
        <SettingsIcon />
        設定
      </button>
    </div>
  );
}

function SettingsIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <circle cx="10" cy="10" r="2.2" />
      <path d="M8.2 2.8h3.6l.5 1.7 1.6.7 1.6-1 2.5 2.5-1 1.6.7 1.6 1.7.5v3.6l-1.7.5-.7 1.6 1 1.6-2.5 2.5-1.6-1-1.6.7-.5 1.7H8.2l-.5-1.7-1.6-.7-1.6 1-2.5-2.5 1-1.6-.7-1.6L2.8 11.8V8.2l1.7-.5.7-1.6-1-1.6 2.5-2.5 1.6 1 1.6-.7z" />
    </svg>
  );
}
