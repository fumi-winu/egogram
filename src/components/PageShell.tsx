const SIZE_CLASS = {
  md: "w-full max-w-2xl",
  lg: "w-full max-w-3xl",
  xl: "w-full max-w-5xl",
} as const;

interface PageShellProps {
  children: React.ReactNode;
  size?: "md" | "lg" | "xl";
  align?: "center" | "start";
}

export function PageShell({
  children,
  size = "md",
  align = "center",
}: PageShellProps) {
  return (
    <div
      className={`flex flex-1 justify-center bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,var(--page-glow),transparent_55%),var(--background)] px-4 py-10 pb-24 print:bg-white print:px-0 print:py-0 print:pb-0 ${
        align === "center" ? "items-center" : "items-start"
      }`}
    >
      <div className={SIZE_CLASS[size]}>{children}</div>
    </div>
  );
}
