import type { Metadata } from "next";
import { Zen_Maru_Gothic } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const zen = Zen_Maru_Gothic({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-zen",
  display: "swap",
});

const SITE_URL = "https://love-app-1.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Couple Vibe｜2人の取扱説明書がわかる16タイプ相性診断",
    template: "%s｜Couple Vibe",
  },
  description:
    "16タイプ性格診断×心理学で、夫婦・カップルのすれ違いの原因と相性がわかる無料診断。あなたとパートナーの“取扱説明書”を約3分で。",
  applicationName: "Couple Vibe",
  openGraph: {
    type: "website",
    siteName: "Couple Vibe",
    locale: "ja_JP",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${zen.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
