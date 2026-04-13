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

          {/* Hry promo banner - nyní přes celou šířku */}
          <div className="mb-10">
            <a href="/hry" className="group block h-full">
              <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-500 border border-indigo-400 p-8 flex items-center gap-8 shadow-lg shadow-indigo-100 hover:shadow-indigo-200 hover:-translate-y-1 transition-all text-white">
                <div className="text-6xl flex-shrink-0 group-hover:rotate-12 transition-transform duration-300">🎮</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold uppercase tracking-wider text-indigo-100 mb-1">Zábava a relax</p>
                  <p className="font-serif font-bold text-2xl group-hover:text-indigo-100 transition-colors leading-tight">Herní koutek</p>
                  <p className="text-base text-white/80 mt-2 italic">Solitaire, Bubble Shooter a další hry pro chvíle pohody</p>
                </div>
                <span className="bg-white/20 p-3 rounded-full group-hover:bg-white/30 transition-colors hidden sm:block">
                  <span className="block translate-x-0.5 group-hover:translate-x-1 transition-transform text-xl">→</span>
                </span>
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
