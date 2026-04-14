import type { Metadata } from "next";
import Link from "next/link";
import QuizClient from "./QuizClient";

export const metadata: Metadata = {
  title: "Jaký jsi rodič v krizi?",
  description: "Dítě pláče, všechno jde špatně a ty... co uděláš? Zjisti svůj krizový rodičovský archetyp.",
  alternates: { canonical: "https://rodicovskysvet.cz/kviz/rodic-v-krizi" },
  authors: [{ name: "Rodičovský svět", url: "https://rodicovskysvet.cz" }],
  publisher: "Rodičovský svět",
};

export default function RodicVKriziPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">

      <nav className="text-sm text-[var(--muted)] mb-8">
        <Link href="/" className="hover:text-[var(--accent)]">Domů</Link>
        <span className="mx-2">›</span>
        <Link href="/kviz" className="hover:text-[var(--accent)]">Kvízy</Link>
        <span className="mx-2">›</span>
        <span>Jaký jsi rodič v krizi?</span>
      </nav>

      <div className="text-center mb-10">
        <div className="text-6xl mb-4">🚨</div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--ink)] mb-3">
          Jaký jsi rodič v krizi?
        </h1>
        <p className="text-[var(--muted)] max-w-md mx-auto">
          Když se všechno sesype, každý rodič reaguje jinak. Jsi záchranář, detektiv, nebo hasič? Zjisti svůj krizový archetyp.
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
