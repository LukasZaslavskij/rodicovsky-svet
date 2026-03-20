import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllCategories } from "@/lib/articles";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";

const BASE_URL = "https://rodicovskysvet.cz";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Rodičovský svět – Příběhy pro každého rodiče",
    template: "%s | Rodičovský svět",
  },
  description: "Příběhy a rady pro rodiče. Spánek, jídlo, výchova, školka a vše, co k rodičovství patří.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: { url: "/favicon-180.png", sizes: "180x180", type: "image/png" },
  },
  keywords: ["rodičovství", "výchova dětí", "spánek miminka", "vybíravé jídlo děti", "záchvat vzteku toddler", "školka adaptace", "nemoci dětí", "sourozenci", "mateřství", "tipy pro rodiče"],
  authors: [{ name: "Rodičovský svět", url: BASE_URL }],
  publisher: "Rodičovský svět",
  creator: "Rodičovský svět",
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: BASE_URL,
    siteName: "Rodičovský svět",
    title: "Rodičovský svět – Příběhy pro každého rodiče",
    description: "Příběhy a rady pro rodiče. Spánek, jídlo, výchova, školka a vše, co k rodičovství patří.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: { url: "/favicon-180.png", sizes: "180x180", type: "image/png" },
  },
  },
  twitter: {
    card: "summary_large_image",
    title: "Rodičovský svět",
    description: "Příběhy a rady pro rodiče.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = getAllCategories();
  return (
    <html lang="cs">
      <head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4364039580277485"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--paper)] text-[var(--ink)]">
        <Navbar categories={categories} />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
      <GoogleAnalytics gaId="G-E48T1T4Y5N" />
    </html>
  );
}
