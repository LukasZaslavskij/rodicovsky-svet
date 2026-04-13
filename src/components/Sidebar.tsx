import Link from "next/link";
import { getAllCategories, getAllArticles } from "@/lib/articles";

const CATEGORY_ICONS: Record<string, string> = {
  spanek: "🌙",
  jidlo: "🥣",
  sourozenci: "👧🏻",
  "zachvaty-vzteku": "🌪️",
  skolka: "🏫",
  nemoci: "🌡️",
  vychova: "💛",
};

export default function Sidebar({ currentSlug }: { currentSlug?: string }) {
  const categories = getAllCategories();
  const recent = getAllArticles().slice(0, 5);

  return (
    <aside className="space-y-6">

      {/* ── Vylepšený odkaz na kvíz (Jaký jsi rodič) ── */}
      <Link href="/kviz/jaky-jsi-rodic" className="group block overflow-hidden rounded-2xl relative aspect-[300/320] shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--rose)] to-pink-100 flex items-center justify-center">
          <span className="text-8xl group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">🎯</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6">
          <div className="flex gap-2 mb-3">
            <div className="bg-[var(--accent)] text-white text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded shadow-sm">
              Kvíz
            </div>
            <div className="bg-white/20 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded backdrop-blur-sm">
              3 minuty
            </div>
          </div>
          <h3 className="text-white font-serif font-bold text-2xl leading-tight mb-2 group-hover:text-[var(--rose)] transition-colors">
            Jaký jsi typ rodiče?
          </h3>
          <p className="text-white/70 text-xs mb-4 line-clamp-2 italic leading-relaxed">
            Zjisti, jaké jsou tvé silné stránky a v čem vynikáš při výchově svých dětí.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-white font-semibold text-sm">Spustit kvíz</span>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-[var(--rose)] group-hover:text-[var(--accent)] transition-all">
              <span className="font-bold">→</span>
            </div>
          </div>
        </div>
      </Link>

      {/* ── Kategorie ── */}
      <div className="bg-white border border-[var(--border)] rounded-xl p-5">
        <h3 className="font-serif text-lg font-bold mb-4 text-[var(--ink)]">Témata</h3>
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/kategorie/${cat.slug}`}
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[var(--rose)] hover:text-[var(--accent)] transition-colors group"
              >
                <span className="flex items-center gap-2 text-sm font-medium text-[var(--ink)] group-hover:text-[var(--accent)]">
                  <span>{CATEGORY_ICONS[cat.slug] ?? "✨"}</span>
                  {cat.label}
                </span>
                <span className="text-xs text-[var(--muted)] group-hover:text-[var(--accent)]">{cat.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Nejnovější články ── */}
      <div className="bg-white border border-[var(--border)] rounded-xl p-5">
        <h3 className="font-serif text-lg font-bold mb-4 text-[var(--ink)]">Nejnovější</h3>
        <ul className="space-y-3">
          {recent
            .filter((a) => a.slug !== currentSlug)
            .slice(0, 4)
            .map((article) => (
              <li key={article.slug}>
                <Link href={`/clanky/${article.slug}?kat=${article.category}`} className="flex gap-3 group">
                  <div className="w-14 h-14 rounded-lg bg-[var(--rose)] flex-shrink-0 flex items-center justify-center text-xl overflow-hidden">
                    {article.coverImage ? (
                      <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
                    ) : (
                      CATEGORY_ICONS[article.category] ?? "✨"
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </p>
                    <p className="text-xs text-[var(--muted)] mt-1">
                      {article.date
                        ? new Date(article.date).toLocaleDateString("cs-CZ", { day: "numeric", month: "short" })
                        : ""}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>

      {/* ── Promo box dolní (sem později AdSense 160×600) ── */}
      <div className="rounded-xl overflow-hidden relative">
        {/* ADS: Nahraď img + div za Google AdSense tag až budeš schválený */}
        <img
          src="https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=280&h=500&fit=crop&auto=format&q=80"
          alt="Rodinná chvíle"
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-5">
          <p className="text-white font-serif font-bold text-xl leading-snug mb-1">Nejsi sama</p>
          <p className="text-white/80 text-sm">Každý rodič má svůj příběh.</p>
        </div>
      </div>

    </aside>
  );
}
