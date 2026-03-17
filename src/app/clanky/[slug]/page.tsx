import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import { notFound } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";
import Comments from "@/components/Comments";

interface Props {
  params: { slug: string };
  searchParams: { kat?: string };
}

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const category = searchParams.kat ?? "";
  const article = await getArticleBySlug(params.slug, category);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      ...(article.coverImage ? { images: [article.coverImage] } : {}),
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  spanek: "from-indigo-50 to-purple-100",
  jidlo: "from-amber-50 to-orange-100",
  sourozenci: "from-pink-50 to-rose-100",
  "zachvaty-vzteku": "from-red-50 to-orange-100",
  skolka: "from-sky-50 to-blue-100",
  nemoci: "from-teal-50 to-cyan-100",
  vychova: "from-yellow-50 to-lime-100",
};

const CATEGORY_ICONS: Record<string, string> = {
  spanek: "🌙", jidlo: "🥣", sourozenci: "👧🏻",
  "zachvaty-vzteku": "🌪️", skolka: "🏫", nemoci: "🌡️", vychova: "💛",
};

export default async function ArticlePage({ params, searchParams }: Props) {
  const category = searchParams.kat ?? "";
  const article = await getArticleBySlug(params.slug, category);
  if (!article) notFound();

  const formattedDate = article.date
    ? new Date(article.date).toLocaleDateString("cs-CZ", { day: "numeric", month: "long", year: "numeric" })
    : "";

  const gradient = CATEGORY_COLORS[article.category] ?? "from-pink-50 to-rose-100";
  const icon = CATEGORY_ICONS[article.category] ?? "✨";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex gap-8 items-start">

        {/* ── Článek ── */}
        <article className="flex-1 min-w-0">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6 flex-wrap">
            <Link href="/" className="hover:text-[var(--accent)]">Domů</Link>
            <span>›</span>
            <Link href={`/kategorie/${article.category}`} className="hover:text-[var(--accent)]">{article.categoryLabel}</Link>
            <span>›</span>
            <span className="text-[var(--ink)] truncate max-w-xs">{article.title}</span>
          </nav>

          {/* ── 1. REKLAMA (banner nahoře) ── */}
          {/* ADS: Nahraď za Google AdSense leaderboard 728×90 */}
          <div className="rounded-xl overflow-hidden mb-6 relative hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=100&fit=crop&auto=format&q=80"
              alt=""
              className="w-full h-[90px] object-cover opacity-60"
            />
          </div>

          {/* ── 2. HERO – obrázek nebo gradient ── */}
          {article.coverImage ? (
            <div className="rounded-2xl overflow-hidden mb-8 relative">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-[320px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8">
                <Link
                  href={`/kategorie/${article.category}`}
                  className="inline-block text-xs font-bold uppercase tracking-wider text-white bg-[var(--accent)] px-3 py-1 rounded-full mb-3 w-fit hover:opacity-90 transition-opacity"
                >
                  {icon} {article.categoryLabel}
                </Link>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
                  {article.title}
                </h1>
                {formattedDate && (
                  <p className="text-white/70 text-sm mt-2">{formattedDate}</p>
                )}
              </div>
            </div>
          ) : (
            <div className={`rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center py-12 mb-8`}>
              <div className="text-center px-6">
                <Link
                  href={`/kategorie/${article.category}`}
                  className="inline-block text-xs font-bold uppercase tracking-wider text-[var(--accent)] bg-white bg-opacity-70 px-3 py-1 rounded-full mb-4 hover:bg-opacity-100 transition-colors"
                >
                  {icon} {article.categoryLabel}
                </Link>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-[var(--ink)] max-w-2xl mx-auto leading-tight">
                  {article.title}
                </h1>
                {formattedDate && (
                  <p className="text-sm text-[var(--muted)] mt-3">{formattedDate}</p>
                )}
              </div>
            </div>
          )}

          {/* Perex */}
          {article.excerpt && (
            <p className="text-lg text-[var(--muted)] leading-relaxed border-l-4 border-[var(--accent)] pl-4 mb-8 italic font-serif">
              {article.excerpt}
            </p>
          )}

          {/* Obsah článku */}
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-serif
              prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-xl prose-img:shadow-md"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tagy */}
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-[var(--border)]">
              {article.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 bg-[var(--rose)] text-[var(--accent)] rounded-full font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* ── Reklama pod článkem ── */}
          {/* ADS: Nahraď za Google AdSense 300×250 */}
          <div className="mt-10 rounded-xl overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1490750967868-88df5691cc99?w=700&h=250&fit=crop&auto=format&q=80"
              alt=""
              className="w-full h-[200px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center px-8">
              <div>
                <p className="text-white font-serif font-bold text-xl">Líbil se ti příběh?</p>
                <p className="text-white/80 text-sm mt-1">Přečti si další ze stejné kategorie</p>
                <Link
                  href={`/kategorie/${article.category}`}
                  className="inline-block mt-3 bg-white text-[var(--accent)] text-sm font-bold px-4 py-1.5 rounded-full hover:bg-[var(--rose)] transition-colors"
                >
                  Zobrazit vše →
                </Link>
              </div>
            </div>
          </div>

          {/* Komentáře */}
          <Comments title={article.title} />

          {/* Zpět */}
          <div className="mt-8">
            <Link
              href={`/kategorie/${article.category}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              ← Zpět na {article.categoryLabel}
            </Link>
          </div>
        </article>

        {/* ── Sidebar ── */}
        <div className="hidden lg:block w-72 flex-shrink-0">
          <Sidebar currentSlug={article.slug} />
        </div>
      </div>
    </div>
  );
}
