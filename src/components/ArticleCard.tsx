import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";

interface Props {
  article: ArticleMeta;
  variant: "featured" | "card" | "list";
}

const CATEGORY_ICONS: Record<string, string> = {
  spanek: "🌙",
  jidlo: "🥣",
  sourozenci: "👧🏻",
  "zachvaty-vzteku": "🌪️",
  skolka: "🏫",
  nemoci: "🌡️",
  vychova: "💛",
};

const CATEGORY_COLORS: Record<string, string> = {
  spanek: "from-indigo-50 to-purple-100",
  jidlo: "from-amber-50 to-orange-100",
  sourozenci: "from-pink-50 to-rose-100",
  "zachvaty-vzteku": "from-red-50 to-orange-100",
  skolka: "from-sky-50 to-blue-100",
  nemoci: "from-teal-50 to-cyan-100",
  vychova: "from-yellow-50 to-lime-100",
};

export default function ArticleCard({ article, variant }: Props) {
  const href = `/clanky/${article.slug}?kat=${article.category}`;

  const formattedDate = article.date
    ? new Date(article.date).toLocaleDateString("cs-CZ", {
        day: "numeric", month: "long", year: "numeric",
      })
    : "";

  const icon = CATEGORY_ICONS[article.category] ?? "✨";
  const gradient = CATEGORY_COLORS[article.category] ?? "from-pink-50 to-rose-100";

  // ── Featured (největší karta na homepage) ──────────────────────────
  if (variant === "featured") {
    return (
      <Link href={href} className="group block article-card">
        <article className="grid md:grid-cols-5 gap-0 bg-white border border-[var(--border)] rounded-2xl overflow-hidden">

          {/* Thumbnail – obrázek nebo gradient */}
          <div className="md:col-span-2 min-h-[220px] relative overflow-hidden">
            {article.coverImage ? (
              <img
                src={article.coverImage}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                <span className="text-7xl">{icon}</span>
              </div>
            )}
          </div>

          <div className="md:col-span-3 p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] bg-[var(--rose)] px-2.5 py-1 rounded-full">
                  {article.categoryLabel}
                </span>
                {formattedDate && <span className="text-xs text-[var(--muted)]">{formattedDate}</span>}
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold leading-snug text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors mb-3">
                {article.title}
              </h2>
              {article.excerpt && (
                <p className="text-[var(--muted)] leading-relaxed line-clamp-3">{article.excerpt}</p>
              )}
            </div>
            <div className="mt-5">
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--accent)] group-hover:gap-2.5 transition-all">
                Číst příběh <span>→</span>
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // ── List (kompaktní řádek – stránka kategorie) ──────────────────────
  if (variant === "list") {
    return (
      <Link href={href} className="group block article-card">
        <article className="flex gap-4 bg-white border border-[var(--border)] rounded-xl p-4 items-start">
          <div className="w-16 h-16 rounded-xl flex-shrink-0 overflow-hidden relative">
            {article.coverImage ? (
              <img
                src={article.coverImage}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl`}>
                {icon}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[var(--muted)] mb-1">{formattedDate}</p>
            <h3 className="font-serif font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors leading-snug mb-1">
              {article.title}
            </h3>
            {article.excerpt && (
              <p className="text-sm text-[var(--muted)] line-clamp-2">{article.excerpt}</p>
            )}
          </div>
        </article>
      </Link>
    );
  }

  // ── Card (mřížka na homepage) ───────────────────────────────────────
  return (
    <Link href={href} className="group block article-card h-full">
      <article className="h-full bg-white border border-[var(--border)] rounded-xl overflow-hidden flex flex-col">

        {/* Thumbnail – obrázek nebo gradient */}
        <div className="relative h-44 overflow-hidden">
          {article.coverImage ? (
            <img
              src={article.coverImage}
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
              <span className="text-5xl">{icon}</span>
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">{article.categoryLabel}</span>
            {formattedDate && <span className="text-xs text-[var(--muted)]">· {formattedDate}</span>}
          </div>
          <h3 className="font-serif font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors leading-snug mb-2 flex-1">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="text-sm text-[var(--muted)] line-clamp-2 mt-auto">{article.excerpt}</p>
          )}
        </div>
      </article>
    </Link>
  );
}
