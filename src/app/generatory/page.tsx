import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Generátory pro rodiče",
  description: "Chytré nástroje pro rodiče. Vygeneruj pohádku na míru, básničku nebo příběh pro své dítě.",
  alternates: { canonical: "https://rodicovskysvet.cz/generatory" },
  authors: [{ name: "Rodičovský svět", url: "https://rodicovskysvet.cz" }],
  publisher: "Rodičovský svět",
};

const GENERATORY = [
  {
    slug: "pohadky",
    title: "Generátor pohádek",
    description: "Zadej jméno dítěte a klíčová slova a my vytvoříme pohádku přesně na míru. Na výběr délka 1, 3 nebo 5 minut čtení.",
    emoji: "🧚",
    color: "from-purple-50 to-indigo-100",
    tag: "Pohádky",
    badge: "✨ AI",
  },
];

export default function GeneratoryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">

      <nav className="text-sm text-[var(--muted)] mb-8">
        <Link href="/" className="hover:text-[var(--accent)]">Domů</Link>
        <span className="mx-2">›</span>
        <span>Generátory</span>
      </nav>

      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold text-[var(--ink)] mb-3">
          Generátory ✨
        </h1>
        <p className="text-[var(--muted)] text-lg leading-relaxed max-w-2xl">
          Chytré nástroje které ti ušetří čas a přinesou radost dětem.
          Pohádky, básničky a další obsah vytvořený na míru.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {GENERATORY.map((g) => (
          <Link key={g.slug} href={`/generatory/${g.slug}`} className="group block article-card">
            <div className={`bg-gradient-to-br ${g.color} rounded-2xl p-6 h-full border border-[var(--border)] hover:border-[var(--accent)] transition-colors`}>
              <div className="flex items-start justify-between mb-4">
                <span className="text-5xl">{g.emoji}</span>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] bg-white/70 px-2 py-1 rounded-full">
                  {g.badge}
                </span>
              </div>
              <h2 className="font-serif text-xl font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors mb-2">
                {g.title}
              </h2>
              <p className="text-sm text-[var(--muted)] mb-4 leading-relaxed">
                {g.description}
              </p>
              <span className="text-sm font-bold text-[var(--accent)] flex items-center gap-1 group-hover:gap-2 transition-all">
                Vygenerovat →
              </span>
            </div>
          </Link>
        ))}

        <div className="rounded-2xl border-2 border-dashed border-[var(--border)] p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
          <span className="text-4xl mb-3">🔜</span>
          <p className="font-serif font-bold text-[var(--ink)] mb-1">Brzy: Generátor básniček</p>
          <p className="text-sm text-[var(--muted)]">Rýmovaná básnička se jménem dítěte</p>
        </div>
      </div>

    </div>
  );
}
