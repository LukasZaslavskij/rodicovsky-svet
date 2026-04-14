import type { Metadata } from "next";
import Link from "next/link";
import QuizClient from "./QuizClient";

export const metadata: Metadata = {
  title: "Jak zvládáš rodičovský stres?",
  description: "Záchvaty vzteku, rozlité džusy, ztracené ponožky... Zjisti jestli jsi zenový guru, sopka, nebo superhrdina.",
  alternates: { canonical: "https://rodicovskysvet.cz/kviz/jak-zvladas-stres" },
  authors: [{ name: "Rodičovský svět", url: "https://rodicovskysvet.cz" }],
  publisher: "Rodičovský svět",
};

export default function JakZvladasStresPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">

      <nav className="text-sm text-[var(--muted)] mb-8">
        <Link href="/" className="hover:text-[var(--accent)]">Domů</Link>
        <span className="mx-2">›</span>
        <Link href="/kviz" className="hover:text-[var(--accent)]">Kvízy</Link>
        <span className="mx-2">›</span>
        <span>Jak zvládáš rodičovský stres?</span>
      </nav>

      <div className="text-center mb-10">
        <div className="text-6xl mb-4">😤</div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--ink)] mb-3">
          Jak zvládáš rodičovský stres?
        </h1>
        <p className="text-[var(--muted)] max-w-md mx-auto">
          Každý rodič má svůj způsob. Zjisti jestli jsi klidný guru, výbušná sopka, nebo neúnavný superhrdina.
        </p>
        <div className="flex items-center justify-center gap-4 mt-4 text-sm text-[var(--muted)]">
          <span>⏱ cca 3 minuty</span>
          <span>·</span>
          <span>10 otázek</span>
          <span>·</span>
          <span>3 typy výsledků</span>
        </div>
      </div>

      <QuizClient />

    </div>
  );
}
