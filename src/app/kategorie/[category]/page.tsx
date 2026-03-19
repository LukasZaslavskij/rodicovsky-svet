import { getAllArticles, getAllCategories } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

const BASE_URL = "https://rodicovskysvet.cz";

interface Props { params: { category: string } }

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = getAllCategories().find((c) => c.slug === params.category);
  if (!cat) return {};
  const canonicalUrl = `${BASE_URL}/kategorie/${params.category}`;
  return {
    title: cat.label,
    description: `Příběhy a rady na téma ${cat.label}. Zkušenosti skutečných rodičů.`,
    keywords: [cat.label, "rodičovství", "výchova dětí", "tipy pro rodiče"],
    authors: [{ name: "Rodičovský svět", url: BASE_URL }],
    publisher: "Rodičovský svět",
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "website",
      locale: "cs_CZ",
      url: canonicalUrl,
      siteName: "Rodičovský svět",
      title: `${cat.label} | Rodičovský svět`,
      description: `Příběhy a rady na téma ${cat.label}. Zkušenosti skutečných rodičů.`,
    },
  };
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

          <div className="flex flex-wrap gap-2 mb-6">
            {categories.filter((c) => c.slug !== params.category).map((c) => (
              <Link key={c.slug} href={`/kategorie/${c.slug}`}
                className="px-3 py-1 border border-[var(--border)] rounded-full text-sm text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                {CATEGORY_ICONS[c.slug] ?? "✨"} {c.label}
              </Link>
            ))}
          </div>

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
        <div className="hidden lg:block w-72 flex-shrink-0"><Sidebar /></div>
      </div>
    </div>
  );
}
