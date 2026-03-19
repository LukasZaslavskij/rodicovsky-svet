import { getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";

export default function HomePage() {
  const articles = getAllArticles();
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex gap-8 items-start">

        {/* ── Hlavní obsah ── */}
        <div className="flex-1 min-w-0">

          {/* Kvíz promo banner */}
          <div className="mb-8">
            <a href="/kviz/jaky-jsi-rodic" className="group block">
              <div className="rounded-2xl bg-gradient-to-r from-[var(--rose)] to-pink-100 border border-pink-200 p-5 flex items-center gap-5 hover:border-[var(--accent)] transition-colors">
                <div className="text-5xl flex-shrink-0">🎯</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-0.5">Nový kvíz</p>
                  <p className="font-serif font-bold text-lg text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">Jaký jsi typ rodiče?</p>
                  <p className="text-sm text-[var(--muted)] mt-0.5">10 otázek · 3 minuty · zjisti svůj rodičovský styl</p>
                </div>
                <span className="text-[var(--accent)] font-bold text-sm flex-shrink-0 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>
          </div>

          {/* Vybraný článek */}
          {featured && (
            <section className="mb-8">
              <div className="dot-divider text-xs uppercase tracking-wider font-bold text-[var(--muted)] mb-4">
                Nejnovější příběh
              </div>
              <ArticleCard article={featured} variant="featured" />
            </section>
          )}

          {/* Mřížka ostatních článků */}
          {rest.length > 0 && (
            <section>
              <div className="dot-divider text-xs uppercase tracking-wider font-bold text-[var(--muted)] mb-4">
                Další příběhy
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {rest.map((article) => (
                  <ArticleCard key={article.slug} article={article} variant="card" />
                ))}
              </div>
            </section>
          )}

          {articles.length === 0 && (
            <div className="text-center py-24 text-[var(--muted)] bg-white rounded-2xl border border-[var(--border)]">
              <p className="text-4xl mb-4">🌸</p>
              <p className="text-lg font-serif font-bold mb-2">Zatím žádné příběhy</p>
              <p className="text-sm">Přidej první Markdown soubor do složky <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">/content/</code></p>
            </div>
          )}
        </div>

        {/* ── Sidebar ── */}
        <div className="hidden lg:block w-72 flex-shrink-0">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
