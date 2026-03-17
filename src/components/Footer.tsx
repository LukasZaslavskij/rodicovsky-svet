import Link from "next/link";

const LINKS = [
  { href: "/kategorie/spanek", label: "🌙 Spánek" },
  { href: "/kategorie/jidlo", label: "🥣 Jídlo" },
  { href: "/kategorie/sourozenci", label: "👧🏻 Sourozenci" },
  { href: "/kategorie/zachvaty-vzteku", label: "🌪️ Záchvaty vzteku" },
  { href: "/kategorie/skolka", label: "🏫 Školka" },
  { href: "/kategorie/nemoci", label: "🌡️ Nemoci" },
  { href: "/kategorie/vychova", label: "💛 Výchova" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-xl font-bold mb-2">Rodičovský svět</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Příběhy a rady pro každého rodiče na jeho cestě.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">Kategorie</h4>
            <ul className="space-y-1.5">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-300 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">O blogu</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Obsah na tomto webu je informačního charakteru a nenahrazuje radu lékaře nebo odborníka.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Rodičovský svět — Všechna práva vyhrazena
        </div>
      </div>
    </footer>
  );
}
