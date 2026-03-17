import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "O nás",
  description: "Příběh za Rodičovským světem – kdo jsme a proč tento blog vznikl.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">

      {/* ── Hero ── */}
      <div className="relative rounded-2xl overflow-hidden mb-12">
        <img
          src="https://images.unsplash.com/photo-1581952976147-5a2d15560349?w=1000&h=380&fit=crop&auto=format&q=80"
          alt="Rodinná chvíle"
          className="w-full h-[320px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12">
          <p className="text-[var(--accent)] bg-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full w-fit mb-3">
            O nás
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
            Jsme jedna rodina.<br />A píšeme pro vás.
          </h1>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-6">
          <div className="prose prose-lg max-w-none prose-headings:font-serif prose-a:text-[var(--accent)]">

            <h2>Jak Rodičovský svět vznikl</h2>
            <p>
              Jsme běžná česká rodina — máma, táta a dvě malé děti. Jako každá rodina jsme
              procházeli věcmi, o kterých se moc nemluví: nocemi bez spánku, prvními záchvaty vzteku
              uprostřed obchodu, obavami před nástupem do školky, horečkami o víkendu, kdy jsou
              ordinace zavřené.
            </p>
            <p>
              Googlovali jsme, četli anglické blogy, ptali se kamarádů. A přitom nás stále napadalo:
              <em> proč o tom někdo nepíše česky? Normálně, bez přehánění, bez zaručených rad?</em>
            </p>
            <p>
              Tak vznikl tento web. Píšeme příběhy ze života — naše vlastní i příběhy dalších
              rodin, které nám je svěřily. Nejsme lékaři ani odborníci. Jsme rodiče, stejně jako vy.
            </p>

            <h2>Co tady najdeš</h2>
            <p>
              Články rozdělujeme do témat, která nás samotné zajímají nebo zajímala: spánek, jídlo,
              záchvaty vzteku, školka, nemoci, sourozenci a výchova. Každý příběh je skutečný —
              někdy vtipný, někdy těžký, vždy upřímný.
            </p>
            <p>
              Obsah na tomto webu je informačního charakteru a <strong>nenahrazuje radu lékaře
              nebo jiného odborníka.</strong> Na odborníky odkazujeme vždy, když je to na místě.
            </p>

            <h2>Sdílej svůj příběh</h2>
            <p>
              Máš příběh, který by pomohl jiné mamince nebo tatínkovi? Napiš nám ho na{" "}
              <a href="mailto:rodicovskysvet@seznam.cz">rodicovskysvet@seznam.cz</a>.
              Rádi ho zveřejníme — anonymně nebo se jménem, jak budeš chtít. Každý příběh,
              který otevřeně mluví o rodičovství, pomáhá ostatním cítit se méně sami.
            </p>

          </div>
        </div>

        <aside className="space-y-5">
          <div className="bg-[var(--rose)] border border-pink-200 rounded-2xl p-6">
            <h3 className="font-serif text-xl font-bold text-[var(--ink)] mb-2">Máš svůj příběh?</h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
              Napiš nám — zveřejníme ho anonymně nebo se jménem, jak budeš chtít.
            </p>
            <div className="bg-white rounded-xl px-4 py-3 text-center border border-pink-200">
              <p className="text-xs text-[var(--muted)] mb-1">Kontaktní e-mail</p>
              <a href="mailto:rodicovskysvet@seznam.cz" className="text-[var(--accent)] font-bold text-sm hover:underline break-all">
                rodicovskysvet@seznam.cz
              </a>
            </div>
          </div>

          <div className="bg-white border border-[var(--border)] rounded-2xl p-6">
            <h3 className="font-serif text-lg font-bold text-[var(--ink)] mb-4">Kontakt</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-lg">✉️</span>
                <div>
                  <p className="font-semibold text-[var(--ink)]">Obecné dotazy & příběhy</p>
                  <a href="mailto:rodicovskysvet@seznam.cz" className="text-[var(--accent)] hover:underline break-all">
                    rodicovskysvet@seznam.cz
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">⏱️</span>
                <div>
                  <p className="font-semibold text-[var(--ink)]">Odpovídáme do</p>
                  <p className="text-[var(--muted)]">2–3 pracovních dnů</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-[var(--border)] rounded-2xl p-6">
            <h3 className="font-serif text-lg font-bold text-[var(--ink)] mb-4">Naše zásady</h3>
            <ul className="space-y-2.5 text-sm text-[var(--muted)]">
              {["Píšeme upřímně, bez přehánění", "Nejsme odborníci, ale rodiče", "Každý příběh respektujeme", "Anonymitu vždy zachováme"].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[var(--accent)] mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <div className="mt-12 bg-gradient-to-br from-pink-50 to-rose-100 rounded-2xl p-8 text-center">
        <p className="text-3xl mb-3">🌸</p>
        <h2 className="font-serif text-2xl font-bold text-[var(--ink)] mb-2">Díky, že jsi tady</h2>
        <p className="text-[var(--muted)] mb-6 max-w-md mx-auto">
          Každý příběh na tomto webu vznikl z touhy říct jiným rodičům:{" "}
          <em>je to normální, zvládneš to.</em>
        </p>
        <Link href="/" className="inline-block bg-[var(--accent)] text-white font-bold px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity">
          Číst příběhy →
        </Link>
      </div>

    </div>
  );
}
