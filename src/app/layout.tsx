import type { Metadata, Viewport } from "next";
import { Geist, Noto_Serif_JP } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SettingsPanel } from "@/components/SettingsPanel";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif_JP({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: "実存的動機診断 | Existential Motivation Test",
    template: "%s | 実存的動機診断",
  },
  description:
    "フランクルの思想を参考にした独自の自己理解コンテンツ。創造・体験・態度・自律から、日々の意味を見つめます。",
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#15241f" },
    { media: "(prefers-color-scheme: light)", color: "#f7f6f0" },
  ],
};

const themeInitScript = `(function(){try{var t=localStorage.getItem("existential-theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${notoSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col font-sans">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <a href="#main-content" className="skip-link">本文へスキップ</a>
        <SiteHeader />
        <main id="main-content" className="flex min-h-0 flex-1 flex-col">{children}</main>
        <SiteFooter />
        <SettingsPanel />
      </body>
    </html>
  );
}
