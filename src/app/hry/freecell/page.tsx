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

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="font-serif text-2xl font-bold text-[var(--ink)] mb-6">Jak hrát FreeCell</h2>

        <div className="grid sm:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-[var(--ink)] mb-2">🎯 Cíl hry</h3>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              Přesuň všech 52 karet na 4 cílové hromádky (vpravo nahoře) — každou pro jednu barvu (♠ ♥ ♦ ♣),
              seřazené od esa (A) po krále (K). Na rozdíl od Solitaire jsou všechny karty od začátku viditelné.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-[var(--ink)] mb-2">📦 Volné buňky (FREE)</h3>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              Vlevo nahoře jsou 4 volné buňky. Do každé lze dočasně odložit <strong>jednu kartu</strong>.
              Jsou klíčem ke strategii — dobře rozmysli, které karty tam umístíš.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-[var(--ink)] mb-2">♟️ Pravidla přesouvání</h3>
            <ul className="text-[var(--muted)] text-sm leading-relaxed space-y-1">
              <li>• Na sloupec lze položit kartu o hodnotu nižší a <strong>opačné barvy</strong> (červená/černá).</li>
              <li>• Na <strong>prázdný sloupec</strong> lze umístit libovolnou kartu.</li>
              <li>• Přesouvat lze více karet najednou, ale jen tolik, kolik dovolují volné buňky a prázdné sloupce.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-[var(--ink)] mb-2">🔢 Kolik karet přesunout najednou?</h3>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              Maximální počet karet v jednom tahu je <strong>(volné buňky + 1) × 2<sup>počet prázdných sloupců</sup></strong>.
              Čím více volného místa máš, tím delší sekvence lze přesunout.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-[var(--ink)] mb-2">⚡ Zkratky</h3>
            <ul className="text-[var(--muted)] text-sm leading-relaxed space-y-1">
              <li>• <strong>Dvojklik / dvojtap</strong> na kartu ji automaticky přesune na cílovou hromádku.</li>
              <li>• Na mobilu hrajete <strong>tahem prstu</strong> nebo klepnutím.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-[var(--ink)] mb-2">💡 Tipy</h3>
            <ul className="text-[var(--muted)] text-sm leading-relaxed space-y-1">
              <li>• FreeCell je téměř vždy řešitelný — pokud uvíznete, zkuste jiný postup.</li>
              <li>• Volné buňky nevyplňujte zbytečně brzy, budete je potřebovat.</li>
              <li>• Prázdné sloupce jsou cennější než volné buňky — šetřete je.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
