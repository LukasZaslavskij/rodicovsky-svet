"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface Category {
  slug: string;
  label: string;
  count: number;
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

export default function Navbar({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = (active: boolean) =>
    `px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${
      active ? "bg-[var(--rose)] text-[var(--accent)]" : "text-[var(--muted)] hover:text-[var(--accent)]"
    }`;

  return (
    <header className="bg-white border-b border-[var(--border)] sticky top-0 z-50 shadow-sm">
      {/* ── Logo ── */}
      <div className="bg-[var(--rose)] py-2.5 text-center">
        <Link href="/" className="font-serif text-2xl font-bold text-[var(--ink)] tracking-tight hover:text-[var(--accent)] transition-colors">
          Rodičovský svět
        </Link>
        <p className="text-xs text-[var(--muted)] mt-0.5">Příběhy a rady pro každého rodiče</p>
      </div>

      {/* ── Navigace ── */}
      <nav className="max-w-6xl mx-auto px-4">
        {/* Desktop – kategorie vlevo, O nás vpravo oddělené čarou */}
        <div className="hidden md:flex items-center justify-between py-2">
          <ul className="flex items-center gap-1">
            <li>
              <Link href="/" className={linkClass(pathname === "/")}>Vše</Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/kategorie/${cat.slug}`}
                  className={`${linkClass(pathname === `/kategorie/${cat.slug}`)} flex items-center gap-1.5`}
                >
                  <span>{CATEGORY_ICONS[cat.slug] ?? "✨"}</span>{cat.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* O nás – oddělené svislou čarou vpravo */}
          <div className="flex items-center gap-3 pl-4 border-l border-[var(--border)]">
            <Link
              href="/o-nas"
              className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                pathname === "/o-nas"
                  ? "text-[var(--accent)]"
                  : "text-[var(--muted)] hover:text-[var(--accent)]"
              }`}
            >
              <span>👨‍👩‍👧</span> O nás
            </Link>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center justify-between py-2">
          <span className="text-sm text-[var(--muted)] font-medium">Menu</span>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--accent)]"
            aria-label="Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-3 space-y-2">
            <div className="flex flex-wrap gap-2">
              <Link href="/" onClick={() => setMenuOpen(false)} className="px-3 py-1 bg-[var(--rose)] text-[var(--accent)] rounded-full text-sm font-semibold">Vše</Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/kategorie/${cat.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-1 border border-[var(--border)] rounded-full text-sm text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors flex items-center gap-1"
                >
                  {CATEGORY_ICONS[cat.slug] ?? "✨"} {cat.label}
                </Link>
              ))}
            </div>
            {/* O nás oddělené čarou i na mobilu */}
            <div className="pt-2 border-t border-[var(--border)]">
              <Link
                href="/o-nas"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-semibold text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                👨‍👩‍👧 O nás
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
