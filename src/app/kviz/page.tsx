import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kvízy pro rodiče",
  description: "Zábavné kvízy pro rodiče. Zjisti jaký jsi typ rodiče, jak zvládáš náročné situace a co o tobě říká tvůj přístup k výchově.",
  alternates: { canonical: "https://rodicovskysvet.cz/kviz" },
  authors: [{ name: "Rodičovský svět", url: "https://rodicovskysvet.cz" }],
  publisher: "Rodičovský svět",
};

const KVÍZY = [
  {
    slug: "jaky-jsi-rodic",
    title: "Jaký jsi typ rodiče?",
    description: "10 otázek, které odhalí tvůj rodičovský styl — jsi přísný, volný, nebo někde uprostřed?",
    emoji: "👨‍👩‍👧",
    time: "3 minuty",
    color: "from-pink-50 to-rose-100",
  },
];

export default function KvizPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">

      <nav className="text-sm text-[var(--muted)] mb-8">
        <Link href="/" className="hover:text-[var(--accent)]">Domů</Link>
        <span className="mx-2">›</span>
        <span>Kvízy</span>
      </nav>

      <div className="mb-10">
        <h1 className="font-serif text-4xl font-bold text-[var(--ink)] mb-3">
          Kvízy pro rodiče 🎯
        </h1>
        <p className="text-[var(--muted)] text-lg">
          Zábavné testy které ti řeknou něco nového o sobě jako rodiči.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {KVÍZY.map((kviz) => (
          <Link key={kviz.slug} href={`/kviz/${kviz.slug}`} className="group block article-card">
            <div className={`bg-gradient-to-br ${kviz.color} rounded-2xl p-6 h-full border border-[var(--border)] hover:border-[var(--accent)] transition-colors`}>
              <div className="text-5xl mb-4">{kviz.emoji}</div>
              <h2 className="font-serif text-xl font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors mb-2">
                {kviz.title}
              </h2>
              <p className="text-sm text-[var(--muted)] mb-4 leading-relaxed">
                {kviz.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--muted)]">⏱ {kviz.time}</span>
                <span className="text-sm font-bold text-[var(--accent)] group-hover:gap-2 flex items-center gap-1">
                  Spustit kvíz →
                </span>
              </div>
            </div>
          </Link>
        ))}

        {/* Placeholder pro další kvízy */}
        <div className="rounded-2xl border-2 border-dashed border-[var(--border)] p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
          <span className="text-4xl mb-3">🔜</span>
          <p className="font-serif font-bold text-[var(--ink)] mb-1">Další kvíz brzy</p>
          <p className="text-sm text-[var(--muted)]">Pracujeme na dalších testech pro rodiče</p>
        </div>
      </div>

    </div>
  );
}
