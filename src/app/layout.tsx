import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { getAllCategories } from "@/lib/articles";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: {
    default: "Rodičovský svět – Příběhy pro každého rodiče",
    template: "%s | Rodičovský svět",
  },
  description: "Příběhy a rady pro rodiče. Spánek, jídlo, výchova, školka a vše, co k rodičovství patří.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = getAllCategories();
  return (
    <html lang="cs">
      <body className="min-h-screen flex flex-col bg-[var(--paper)] text-[var(--ink)]">
        <Navbar categories={categories} />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
        <Analytics />
      </body>
      <GoogleAnalytics gaId="G-E48T1T4Y5N" />
    </html>
  );
}
