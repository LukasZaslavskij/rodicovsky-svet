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

// Květ ze 5 okvětních lístků + střed
function Flower({ x, y, r, opacity }: { x: number; y: number; r: number; opacity: number }) {
  const petals = [0, 72, 144, 216, 288].map((angle) => {
    const rad = (angle * Math.PI) / 180;
    return { cx: x + Math.round(Math.sin(rad) * r * 2.2), cy: y - Math.round(Math.cos(rad) * r * 2.2) };
  });
  return (
    <g opacity={opacity}>
      {petals.map((p, i) => <circle key={i} cx={p.cx} cy={p.cy} r={r} fill="#c9607a" />)}
      <circle cx={x} cy={y} r={r * 0.9} fill="#e8a0b0" />
    </g>
  );
}

export default function Navbar({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = (active: boolean) =>
    `px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${
      active ? "bg-[var(--rose)] text-[var(--accent)]" : "text-[var(--muted)] hover:text-[var(--accent)]"
    }`;

  // Malé kvítky rovnoměrně rozložené přes celou šířku
  const smallFlowers = [150, 250, 380, 480, 620, 720, 860, 960, 1100, 1200];
  const dots = [190, 290, 440, 540, 680, 780, 920, 1020, 1150];

  return (
    <header className="bg-white border-b border-[var(--border)] sticky top-0 z-50 shadow-sm">

      {/* ── Masthead ── */}
      <div
        className="relative overflow-hidden py-5 text-center"
        style={{ background: "linear-gradient(135deg, #f2dde4 0%, #fdf8f5 40%, #f2dde4 100%)" }}
      >
        {/* SVG vzor – viewBox 1400×90 pokrývá celou šířku */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1400 90"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Velký květ vlevo */}
          <Flower x={65} y={45} r={10} opacity={0.14} />

          {/* Velký květ vpravo */}
          <Flower x={1335} y={45} r={10} opacity={0.14} />

          {/* Středně velké květy */}
          <Flower x={200} y={20} r={6} opacity={0.12} />
          <Flower x={1200} y={20} r={6} opacity={0.12} />
          <Flower x={350} y={70} r={5} opacity={0.10} />
          <Flower x={1050} y={70} r={5} opacity={0.10} />

          {/* Malé kvítky */}
          {smallFlowers.map((x, i) => (
            <Flower key={i} x={x} y={i % 2 === 0 ? 15 : 72} r={4} opacity={0.13} />
          ))}

          {/* Větvičky */}
          <g opacity="0.12" stroke="#c9607a" strokeWidth="1.5" fill="none" strokeLinecap="round">
            <path d="M110,75 Q130,55 155,68 Q175,80 195,62" />
            <path d="M128,78 Q133,63 143,70" />
            <path d="M163,74 Q168,60 178,67" />
          </g>
          <g opacity="0.12" stroke="#c9607a" strokeWidth="1.5" fill="none" strokeLinecap="round">
            <path d="M1290,75 Q1270,55 1245,68 Q1225,80 1205,62" />
            <path d="M1272,78 Q1267,63 1257,70" />
            <path d="M1237,74 Q1232,60 1222,67" />
          </g>

          {/* Puntíky */}
          {dots.map((x, i) => (
            <circle key={i} cx={x} cy={i % 2 === 0 ? 8 : 82} r={2.5} fill="#c9607a" opacity={0.2} />
          ))}
        </svg>

        {/* Text obsah */}
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="h-px w-14 bg-[var(--accent)] opacity-35" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--muted)] font-semibold">Příběhy, které pomáhají</span>
            <span className="h-px w-14 bg-[var(--accent)] opacity-35" />
          </div>
          <Link href="/" className="font-serif text-4xl md:text-5xl font-bold text-[var(--ink)] tracking-tight hover:text-[var(--accent)] transition-colors inline-block">
            Rodičovský svět
          </Link>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="h-px w-8 bg-[var(--accent)] opacity-30" />
            <span className="text-[var(--accent)] opacity-50 text-xs">✦</span>
            <span className="text-[var(--muted)] text-xs italic">Píšeme pro rodiče, od rodičů</span>
            <span className="text-[var(--accent)] opacity-50 text-xs">✦</span>
            <span className="h-px w-8 bg-[var(--accent)] opacity-30" />
          </div>
        </div>
      </div>

      {/* ── Navigace ── */}
      <nav className="max-w-6xl mx-auto px-4 border-t border-[var(--border)]">
        <div className="hidden md:flex items-center justify-between py-1.5">
          <ul className="flex items-center gap-1">
            <li><Link href="/" className={linkClass(pathname === "/")}>Vše</Link></li>
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link href={`/kategorie/${cat.slug}`} className={`${linkClass(pathname === `/kategorie/${cat.slug}`)} flex items-center gap-1.5`}>
                  <span>{CATEGORY_ICONS[cat.slug] ?? "✨"}</span>{cat.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3 pl-4 border-l border-[var(--border)]">
            <Link href="/kviz" className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${pathname.startsWith("/kviz") ? "text-[var(--accent)]" : "text-[var(--muted)] hover:text-[var(--accent)]"}`}>
              <span>🎯</span> Kvízy
            </Link>
            <Link href="/dotazniky" className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${pathname.startsWith("/dotazniky") ? "text-[var(--accent)]" : "text-[var(--muted)] hover:text-[var(--accent)]"}`}>
              <span>📋</span> Dotazníky
            </Link>
            <span className="text-[var(--border)]">|</span>
            <Link href="/o-nas" className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${pathname === "/o-nas" ? "text-[var(--accent)]" : "text-[var(--muted)] hover:text-[var(--accent)]"}`}>
              <span>👨‍👩‍👧</span> O nás
            </Link>
          </div>
        </div>

        <div className="md:hidden flex items-center justify-between py-2">
          <span className="text-sm text-[var(--muted)] font-medium">Menu</span>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--accent)]" aria-label="Menu">
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
                <Link key={cat.slug} href={`/kategorie/${cat.slug}`} onClick={() => setMenuOpen(false)}
                  className="px-3 py-1 border border-[var(--border)] rounded-full text-sm text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                  {CATEGORY_ICONS[cat.slug] ?? "✨"} {cat.label}
                </Link>
              ))}
            </div>
            <div className="pt-2 border-t border-[var(--border)] flex gap-2 flex-wrap">
              <Link href="/kviz" onClick={() => setMenuOpen(false)} className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-semibold text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                🎯 Kvízy
              </Link>
              <Link href="/dotazniky" onClick={() => setMenuOpen(false)} className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-semibold text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                📋 Dotazníky
              </Link>
              <Link href="/o-nas" onClick={() => setMenuOpen(false)} className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-semibold text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                👨‍👩‍👧 O nás
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
