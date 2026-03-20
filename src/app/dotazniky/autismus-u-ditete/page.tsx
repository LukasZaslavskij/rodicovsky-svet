import type { Metadata } from "next";
import Link from "next/link";
import AutismusClient from "./AutismusClient";

export const metadata: Metadata = {
  title: "Orientační dotazník: Může mít moje dítě autismus?",
  description: "Orientační dotazník zaměřený na znaky poruchy autistického spektra u dětí. Pomůže ti připravit se na rozhovor s lékařem. Nenahrazuje odbornou diagnózu.",
  alternates: { canonical: "https://rodicovskysvet.cz/dotazniky/autismus-u-ditete" },
  authors: [{ name: "Rodičovský svět", url: "https://rodicovskysvet.cz" }],
  publisher: "Rodičovský svět",
};

export default function AutismusPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">

      <nav className="text-sm text-[var(--muted)] mb-8">
        <Link href="/" className="hover:text-[var(--accent)]">Domů</Link>
        <span className="mx-2">›</span>
        <Link href="/dotazniky" className="hover:text-[var(--accent)]">Orientační dotazníky</Link>
        <span className="mx-2">›</span>
        <span>Může mít moje dítě autismus?</span>
      </nav>

      <div className="text-center mb-10">
        <div className="text-6xl mb-4">🧩</div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--ink)] mb-3">
          Může mít moje dítě autismus?
        </h1>
        <p className="text-[var(--muted)] max-w-lg mx-auto leading-relaxed">
          20 otázek zaměřených na oblasti vývoje, komunikace a chování, které se sledují
          při diagnostice poruchy autistického spektra.
        </p>
        <div className="flex items-center justify-center gap-4 mt-4 text-sm text-[var(--muted)]">
          <span>⏱ cca 5 minut</span>
          <span>·</span>
          <span>20 otázek</span>
          <span>·</span>
          <span>3 možné odpovědi</span>
        </div>
      </div>

      <AutismusClient />

    </div>
  );
}
