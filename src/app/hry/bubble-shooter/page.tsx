import type { Metadata } from "next";
import Link from "next/link";
import BubbleShooterClient from "./BubbleShooterClient";

export const metadata: Metadata = {
  title: "Bubble Shooter – Hra pro rodiče i děti",
  description: "Zábavná hra Bubble Shooter. Střílej barevné bubliny a vytvárej skupiny stejných barev.",
  alternates: { canonical: "https://rodicovskysvet.cz/hry/bubble-shooter" },
};

export default function BubbleShooterPage() {
  return (
    <>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <nav className="text-sm text-[var(--muted)] mb-6">
          <Link href="/" className="hover:text-[var(--accent)]">Domů</Link>
          <span className="mx-2">›</span>
          <Link href="/hry" className="hover:text-[var(--accent)]">Hry</Link>
          <span className="mx-2">›</span>
          <span>Bubble Shooter</span>
        </nav>
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl font-bold text-[var(--ink)] mb-4">🫧 Bubble Shooter</h1>
          <p className="text-[var(--muted)] text-lg leading-relaxed">
            Odpočiňte si u oblíbené hry, která vyžaduje trochu postřehu i strategie. Stačí mířit a střílet barevné kuličky. Zvládnete vyčistit celé hrací pole?
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4">
        <BubbleShooterClient />
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <h2 className="font-serif text-2xl font-bold text-[var(--ink)] mb-6">Jak hrát Bubble Shooter</h2>

        <div className="grid sm:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-[var(--ink)] mb-2">🎯 Cíl hry</h3>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              Odstraň všechny bubliny z hrací plochy. Střílej barevné bubliny a spoj
              dohromady <strong>3 nebo více</strong> stejné barvy — pak zmizí a získáš body.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-[var(--ink)] mb-2">🖱️ Ovládání</h3>
            <ul className="text-[var(--muted)] text-sm leading-relaxed space-y-1">
              <li>• <strong>Desktop:</strong> Pohni myší pro míření, klikni pro výstřel.</li>
              <li>• <strong>Mobil:</strong> Táhni prstem pro míření, zvedni prst pro výstřel.</li>
              <li>• Bublina se odrazí od bočních stěn — využij to!</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-[var(--ink)] mb-2">⭐ Bodování</h3>
            <ul className="text-[var(--muted)] text-sm leading-relaxed space-y-1">
              <li>• Každá odstraněná bublina = <strong>10 bodů</strong>.</li>
              <li>• Bubliny které visí ve vzduchu po odpojení od stropu padají a dávají <strong>5 bodů</strong> za kus.</li>
              <li>• Větší skupiny se víc vyplatí než malé.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-[var(--ink)] mb-2">💡 Tipy</h3>
            <ul className="text-[var(--muted)] text-sm leading-relaxed space-y-1">
              <li>• Sleduj <strong>příští bublinu</strong> — plánuj dopředu.</li>
              <li>• Odrazy od stěn umožní dostat se na těžko přístupná místa.</li>
              <li>• Zaměř se na velké shluky stejné barvy pro maximální skóre.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
