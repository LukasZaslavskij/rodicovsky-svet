import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllCategories } from "@/lib/articles";

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
      </body>
    </html>
  );
}
