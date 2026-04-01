import type { Metadata } from "next";
import Link from "next/link";
import FreecellClient from "./FreecellClient";

export const metadata: Metadata = {
  title: "FreeCell – Karetní hra",
  description: "Klasická karetní hra FreeCell. Přesuň všechny karty na hromádky podle barev od esa po krále s pomocí volných buněk.",
  alternates: { canonical: "https://rodicovskysvet.cz/hry/freecell" },
};

export default function FreecellPage() {
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <nav className="text-sm text-[var(--muted)] mb-6">
          <Link href="/" className="hover:text-[var(--accent)]">Domů</Link>
          <span className="mx-2">›</span>
          <Link href="/hry" className="hover:text-[var(--accent)]">Hry</Link>
          <span className="mx-2">›</span>
          <span>FreeCell</span>
        </nav>
        <div className="text-center mb-6">
          <h1 className="font-serif text-3xl font-bold text-[var(--ink)] mb-2">🃏 FreeCell</h1>
          <p className="text-[var(--muted)] text-sm">Přesuň všechny karty na 4 hromádky — od esa po krále, každá barva zvlášť. Využij volné buňky jako dočasné odkladiště.</p>
        </div>
      </div>
      <FreecellClient />
    </>
  );
}
