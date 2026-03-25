import type { Metadata } from "next";
import Link from "next/link";
import SolitaireClient from "./SolitaireClient";

export const metadata: Metadata = {
  title: "Solitaire – Karetní hra",
  description: "Klasická karetní hra Solitaire (Klondike). Přesuň všechny karty na hromádky podle barev od esa po krále.",
  alternates: { canonical: "https://rodicovskysvet.cz/hry/solitaire" },
};

export default function SolitairePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Domů</Link>
        <span className="mx-2">›</span>
        <Link href="/hry" className="hover:text-[var(--accent)]">Hry</Link>
        <span className="mx-2">›</span>
        <span>Solitaire</span>
      </nav>
      <div className="text-center mb-6">
        <h1 className="font-serif text-3xl font-bold text-[var(--ink)] mb-2">🃏 Solitaire</h1>
        <p className="text-[var(--muted)] text-sm">Přesuň všechny karty na 4 hromádky — od esa po krále, každá barva zvlášť.</p>
      </div>
      <SolitaireClient />
    </div>
  );
}
