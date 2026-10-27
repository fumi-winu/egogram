const SIZE_CLASS = {
  md: "w-full max-w-3xl",
  lg: "w-full max-w-4xl",
  xl: "w-full max-w-6xl",
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
      className={`page-shell flex flex-1 justify-center px-5 py-10 pb-24 sm:px-8 sm:py-16 print:bg-white print:px-0 print:py-0 print:pb-0 ${
        align === "center" ? "items-center" : "items-start"
      }`}
    >
      <div className={SIZE_CLASS[size]}>{children}</div>
    </div>
  );
}
