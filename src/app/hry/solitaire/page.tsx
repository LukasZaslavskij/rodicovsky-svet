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
    <>
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
      </div>

      <SolitaireClient />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="font-serif text-2xl font-bold text-[var(--ink)] mb-6">Jak hrát Solitaire</h2>

        <div className="grid sm:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-[var(--ink)] mb-2">🎯 Cíl hry</h3>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              Přesuň všech 52 karet na 4 cílové hromádky (vpravo nahoře) — každou pro jednu barvu (♠ ♥ ♦ ♣),
              seřazené od esa (A) po krále (K).
            </p>
          </div>
          <div>
            <h3 className="font-bold text-[var(--ink)] mb-2">🃏 Hrací plocha</h3>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              Hra má 7 sloupců karet (tableau), balíček karet vlevo nahoře a 4 cílové hromádky vpravo nahoře.
              Lícem dolů jsou karty zakryté, lícem nahoru jsou dostupné k přesouvání.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-[var(--ink)] mb-2">♟️ Pravidla přesouvání</h3>
            <ul className="text-[var(--muted)] text-sm leading-relaxed space-y-1">
              <li>• Na sloupec lze položit kartu o hodnotu nižší a <strong>opačné barvy</strong> (červená/černá).</li>
              <li>• Na prázdný sloupec lze umístit pouze <strong>krále (K)</strong>.</li>
              <li>• Přesouvat lze celé sekvence seřazených karet najednou.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-[var(--ink)] mb-2">📦 Balíček</h3>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              Kliknutím na balíček vlevo nahoře otočíš další kartu na odkládací hromádku.
              Karty z odkládací hromádky lze přesouvat do sloupců nebo na cílové hromádky.
              Až balíček dojde, lze ho znovu přehodit.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-[var(--ink)] mb-2">⚡ Zkratky</h3>
            <ul className="text-[var(--muted)] text-sm leading-relaxed space-y-1">
              <li>• <strong>Dvojklik / dvojtap</strong> na kartu ji automaticky přesune na cílovou hromádku.</li>
              <li>• Na mobilu hrajete <strong>tahem prstu</strong> (přetažení karty) nebo klepnutím.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-[var(--ink)] mb-2">💡 Tipy</h3>
            <ul className="text-[var(--muted)] text-sm leading-relaxed space-y-1">
              <li>• Snažte se odkrývat zakryté karty co nejdříve.</li>
              <li>• Prázdné sloupce jsou vzácné — nevyplňte je hned, počkejte na krále.</li>
              <li>• Esa a dvojky přesouvejte na cílové hromádky okamžitě.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
