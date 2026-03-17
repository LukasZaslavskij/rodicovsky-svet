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

          {/* ADS: Banner 728×90 – nahraď za AdSense leaderboard */}
          <div className="rounded-xl overflow-hidden mb-8 relative hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800&h=120&fit=crop&auto=format&q=80"
              alt="Rodič s dítětem"
              className="w-full h-[100px] object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center px-6">
              <p className="text-white font-serif font-bold text-lg">Vítej na Rodičovském světě 🌸</p>
            </div>
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
