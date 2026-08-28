import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "診断結果",
  description:
    "実存的動機診断の結果です。四因子の配置と類型の解説を、共有可能なURLから復元します。",
};

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
