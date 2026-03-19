import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Orientační dotazníky pro rodiče",
    description: "Orientační dotazníky pro rodiče. Pomáhají si uvědomit, na co se zaměřit při návštěvě lékaře. Nenahrazují odbornou diagnózu.",
    alternates: { canonical: "https://rodicovskysvet.cz/dotazniky" },
    authors: [{ name: "Rodičovský svět", url: "https://rodicovskysvet.cz" }],
    publisher: "Rodičovský svět",
};

const DOTAZNÍKY = [
    {
        slug: "autismus-u-ditete",
        title: "Může mít moje dítě autismus?",
        description: "Orientační dotazník zaměřený na znaky, které mohou být spojeny s poruchou autistického spektra. Pomůže ti připravit se na rozhovor s lékařem.",
        emoji: "🧩",
        time: "5 minut",
        color: "from-sky-50 to-blue-100",
        tag: "Vývoj dítěte",
    },
];

export default function DotaznikyPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">

            <nav className="text-sm text-[var(--muted)] mb-8">
                <Link href="/" className="hover:text-[var(--accent)]">Domů</Link>
                <span className="mx-2">›</span>
                <span>Orientační dotazníky</span>
            </nav>

            <div className="mb-8">
                <h1 className="font-serif text-4xl font-bold text-[var(--ink)] mb-3">
                    Orientační dotazníky 📋
                </h1>
                <p className="text-[var(--muted)] text-lg leading-relaxed max-w-2xl">
                    Tyto dotazníky jsou pouze orientační — pomáhají si uvědomit, na co se zaměřit
                    při návštěvě lékaře. <strong>Nenahrazují odbornou diagnózu.</strong>
                </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
                {DOTAZNÍKY.map((d) => (
                    <Link key={d.slug} href={`/dotazniky/${d.slug}`} className="group block article-card">
                        <div className={`bg-gradient-to-br ${d.color} rounded-2xl p-6 h-full border border-[var(--border)] hover:border-[var(--accent)] transition-colors`}>
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-5xl">{d.emoji}</span>
                                <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] bg-white/70 px-2 py-1 rounded-full">
                  {d.tag}
                </span>
                            </div>
                            <h2 className="font-serif text-xl font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors mb-2">
                                {d.title}
                            </h2>
                            <p className="text-sm text-[var(--muted)] mb-4 leading-relaxed">
                                {d.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-[var(--muted)]">⏱ {d.time}</span>
                                <span className="text-sm font-bold text-[var(--accent)] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Spustit →
                </span>
                            </div>
                        </div>
                    </Link>
                ))}

                <div className="rounded-2xl border-2 border-dashed border-[var(--border)] p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
                    <span className="text-4xl mb-3">🔜</span>
                    <p className="font-serif font-bold text-[var(--ink)] mb-1">Další dotazník brzy</p>
                    <p className="text-sm text-[var(--muted)]">Připravujeme dotazník pro ADHD a opožděný vývoj řeči</p>
                </div>
            </div>

        </div>
    );
}
