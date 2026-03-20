import type { Metadata } from "next";
import Link from "next/link";
import PohadkyClient from "./PohadkyClient";

export const metadata: Metadata = {
  title: "Generátor pohádek pro děti",
  description: "Vygeneruj pohádku na míru pro své dítě. Zadej jméno, klíčová slova a délku — a pohádka je hotová za pár vteřin.",
  alternates: { canonical: "https://rodicovskysvet.cz/generatory/pohadky" },
  authors: [{ name: "Rodičovský svět", url: "https://rodicovskysvet.cz" }],
  publisher: "Rodičovský svět",
};

export default function PohadkyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">

      <nav className="text-sm text-[var(--muted)] mb-8">
        <Link href="/" className="hover:text-[var(--accent)]">Domů</Link>
        <span className="mx-2">›</span>
        <Link href="/generatory" className="hover:text-[var(--accent)]">Generátory</Link>
        <span className="mx-2">›</span>
        <span>Generátor pohádek</span>
      </nav>

      <div className="text-center mb-10">
        <div className="text-6xl mb-4">🧚</div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--ink)] mb-3">
          Generátor pohádek
        </h1>
        <p className="text-[var(--muted)] max-w-lg mx-auto leading-relaxed">
          Zadej jméno dítěte a pár klíčových slov — pohádka na míru je hotová za pár vteřin.
        </p>
      </div>

      <PohadkyClient />

    </div>
  );
}
