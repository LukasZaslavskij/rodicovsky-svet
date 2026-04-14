import type { Metadata } from "next";
import Link from "next/link";
import QuizClient from "./QuizClient";

export const metadata: Metadata = {
  title: "Přežiješ ranní vstávání s dětmi?",
  description: "Chaos, slzy, ztracená bota a 5 minut do odjezdu. Jak to zvládáš? Otestuj svůj ranní survival mode.",
  alternates: { canonical: "https://rodicovskysvet.cz/kviz/ranni-vstávani" },
  authors: [{ name: "Rodičovský svět", url: "https://rodicovskysvet.cz" }],
  publisher: "Rodičovský svět",
};

export default function RanniVstavaniPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">

      <nav className="text-sm text-[var(--muted)] mb-8">
        <Link href="/" className="hover:text-[var(--accent)]">Domů</Link>
        <span className="mx-2">›</span>
        <Link href="/kviz" className="hover:text-[var(--accent)]">Kvízy</Link>
        <span className="mx-2">›</span>
        <span>Přežiješ ranní vstávání s dětmi?</span>
      </nav>

      <div className="text-center mb-10">
        <div className="text-6xl mb-4">☀️</div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--ink)] mb-3">
          Přežiješ ranní vstávání s dětmi?
        </h1>
        <p className="text-[var(--muted)] max-w-md mx-auto">
          Ztracená bota, nepojedené snídaně a ryk hodin. Zjisti jestli jsi ranní velitel, filosof, nebo statečný přeživší.
        </p>
        <div className="flex items-center justify-center gap-4 mt-4 text-sm text-[var(--muted)]">
          <span>⏱ cca 2 minuty</span>
          <span>·</span>
          <span>8 otázek</span>
          <span>·</span>
          <span>3 typy výsledků</span>
        </div>
      </div>

      <QuizClient />

    </div>
  );
}
