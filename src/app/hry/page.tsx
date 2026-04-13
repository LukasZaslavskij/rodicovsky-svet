import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hry pro rodiče a děti",
  description: "Zábavné hry pro chvíle odpočinku. Bubble Shooter, Solitaire a další hry zdarma.",
  alternates: { canonical: "https://rodicovskysvet.cz/hry" },
};

const HRY = [
  {
    slug: "bubble-shooter",
    title: "Bubble Shooter",
    description: "Střílej barevné bubliny a spoj 3 stejné barvy. Klasická hra pro chvíle odpočinku.",
    emoji: "🫧",
    color: "from-purple-50 to-indigo-100",
    tag: "Puzzle",
  },
  {
    slug: "solitaire",
    title: "Solitaire",
    description: "Klasická karetní hra Klondike. Přesuň všechny karty na hromádky od esa po krále.",
    emoji: "🃏",
    color: "from-emerald-50 to-teal-100",
    tag: "Karty",
  },
  {
    slug: "freecell",
    title: "FreeCell",
    description: "Strategická karetní hra s volnými buňkami. Přesuň všechny karty na hromádky od esa po krále.",
    emoji: "🂡",
    color: "from-blue-50 to-sky-100",
    tag: "Karty",
  },
];

export default function HryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-[var(--muted)] mb-8">
        <Link href="/" className="hover:text-[var(--accent)]">Domů</Link>
        <span className="mx-2">›</span>
        <span>Hry</span>
      </nav>

      <div className="mb-12">
        <h1 className="font-serif text-4xl font-bold text-[var(--ink)] mb-4">Hry pro rodiče a děti 🎮</h1>
        <p className="text-[var(--muted)] text-lg leading-relaxed max-w-3xl">
          Vítejte v našem herním koutku! Připravili jsme pro vás výběr klasických her, které vám pomohou si na chvíli odpočinout od každodenního shonu. Ať už máte rádi logické hádanky nebo karetní klasiku, najdete zde to pravé pro relaxaci.
        </p>
        <div className="mt-6 p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-sm text-indigo-800 leading-relaxed">
          <strong>💡 Proč si zahrát?</strong> Krátká herní pauza prokazatelně snižuje stres a pomáhá vyčistit hlavu. Naše hry jsou zdarma, bez nutnosti instalace a optimalizované pro mobily i počítače.
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {HRY.map((h) => (
          <Link key={h.slug} href={`/hry/${h.slug}`} className="group block article-card">
            <div className={`bg-gradient-to-br ${h.color} rounded-2xl p-6 h-full border border-[var(--border)] hover:border-[var(--accent)] transition-colors`}>
              <div className="flex items-start justify-between mb-4">
                <span className="text-5xl">{h.emoji}</span>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] bg-white/70 px-2 py-1 rounded-full">{h.tag}</span>
              </div>
              <h2 className="font-serif text-xl font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors mb-2">{h.title}</h2>
              <p className="text-sm text-[var(--muted)] mb-4 leading-relaxed">{h.description}</p>
              <span className="text-sm font-bold text-[var(--accent)] flex items-center gap-1 group-hover:gap-2 transition-all">Hrát →</span>
            </div>
          </Link>
        ))}
        <div className="rounded-2xl border-2 border-dashed border-[var(--border)] p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
          <span className="text-4xl mb-3">🔜</span>
          <p className="font-serif font-bold text-[var(--ink)] mb-1">Brzy další hry</p>
          <p className="text-sm text-[var(--muted)]">Pracujeme na dalších hrách pro celou rodinu</p>
        </div>
      </div>
    </div>
  );
}
