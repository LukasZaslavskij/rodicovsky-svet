import { getAllArticles, getAllCategories } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

interface Props { params: { category: string } }

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = getAllCategories().find((c) => c.slug === params.category);
  if (!cat) return {};
  return { title: cat.label, description: `Příběhy a rady na téma ${cat.label}` };
}

const CATEGORY_ICONS: Record<string, string> = {
  spanek: "🌙", jidlo: "🥣", sourozenci: "👧🏻",
  "zachvaty-vzteku": "🌪️", skolka: "🏫", nemoci: "🌡️", vychova: "💛",
};
const CATEGORY_COLORS: Record<string, string> = {
  spanek: "from-indigo-50 to-purple-100", jidlo: "from-amber-50 to-orange-100",
  sourozenci: "from-pink-50 to-rose-100", "zachvaty-vzteku": "from-red-50 to-orange-100",
  skolka: "from-sky-50 to-blue-100", nemoci: "from-teal-50 to-cyan-100",
  vychova: "from-yellow-50 to-lime-100",
};

export default function CategoryPage({ params }: Props) {
  const categories = getAllCategories();
  const cat = categories.find((c) => c.slug === params.category);
  if (!cat) notFound();

  const articles = getAllArticles().filter((a) => a.category === params.category);
  const gradient = CATEGORY_COLORS[params.category] ?? "from-pink-50 to-rose-100";
  const icon = CATEGORY_ICONS[params.category] ?? "✨";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex gap-8 items-start">
        <div className="flex-1 min-w-0">

          {/* Hlavička kategorie */}
          <div className={`rounded-2xl bg-gradient-to-br ${gradient} p-8 mb-6 flex items-center gap-5`}>
            <span className="text-6xl">{icon}</span>
            <div>
              <Link href="/" className="text-xs text-[var(--muted)] hover:text-[var(--accent)] mb-1 block">← Domů</Link>
              <h1 className="text-3xl font-serif font-bold text-[var(--ink)]">{cat.label}</h1>
              <p className="text-sm text-[var(--muted)] mt-1">
                {cat.count} {cat.count === 1 ? "příběh" : cat.count < 5 ? "příběhy" : "příběhů"}
              </p>
            </div>
          </div>

          {/* ADS: Nahraď za AdSense leaderboard 728×90 */}
          <div className="rounded-xl overflow-hidden mb-6 relative hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800&h=100&fit=crop&auto=format&q=80"
              alt=""
              className="w-full h-[90px] object-cover opacity-60"
            />
          </div>

          {/* Přepnutí kategorií */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.filter((c) => c.slug !== params.category).map((c) => (
              <Link key={c.slug} href={`/kategorie/${c.slug}`}
                className="px-3 py-1 border border-[var(--border)] rounded-full text-sm text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                {CATEGORY_ICONS[c.slug] ?? "✨"} {c.label}
              </Link>
            ))}
          </div>

          {/* Články */}
          {articles.length > 0 ? (
            <div className="space-y-3">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} variant="list" />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-[var(--muted)] bg-white rounded-2xl border border-[var(--border)]">
              <p className="text-4xl mb-3">{icon}</p>
              <p>V této kategorii zatím nejsou žádné příběhy.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block w-72 flex-shrink-0">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
