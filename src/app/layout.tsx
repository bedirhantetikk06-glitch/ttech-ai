import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tettech AI — Hayatını Yeniden İnşa Et",
  description:
    "Kişisel yapay zeka asistanınla kariyer, sağlık, finans ve kişisel gelişimin için akıllıca planlar oluştur, hedeflerini takip et ve hayatını dönüştür.",
  keywords: [
    "yapay zeka", "kişisel gelişim", "kariyer planlama", "AI asistan",
    "hedef takip", "Türkçe AI", "life coach", "tettech"
  ],
  authors: [{ name: "Tettech AI" }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://tettech.ai",
    title: "Tettech AI — Hayatını Yeniden İnşa Et",
    description:
      "5 uzman yapay zeka ajanıyla hayatının her alanında akıllıca planlama ve takip.",
    siteName: "Tettech AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tettech AI — Hayatını Yeniden İnşa Et",
    description:
      "5 uzman yapay zeka ajanıyla hayatının her alanında akıllıca planlama ve takip.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  );
}
