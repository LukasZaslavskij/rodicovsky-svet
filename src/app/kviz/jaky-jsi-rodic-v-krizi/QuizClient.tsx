"use client";

import { useState } from "react";
import Link from "next/link";

const OTÁZKY = [
  { id: 1, text: "Dítě přijde domů ze školy a hned se rozbrečí. Nevíš proč. Co jako první uděláš?", možnosti: [
    { text: "Obejmu ho a počkám — přijde to samo.", body: { zachranar: 2, detektiv: 0, hasic: 0 } },
    { text: "Začnu klást otázky — co se stalo, kde, s kým?", body: { zachranar: 0, detektiv: 2, hasic: 0 } },
    { text: "Hned vymýšlím řešení — zavolám učiteli, půjdeme to vyřešit.", body: { zachranar: 0, detektiv: 0, hasic: 2 } },
    { text: "Dám mu prostor, ale jsem nablízku kdyby potřeboval.", body: { zachranar: 1, detektiv: 1, hasic: 0 } },
  ]},
  { id: 2, text: "Dítě se pohádalo s nejlepším kamarádem a říká, že nikdy nebude mít přátele. Jak reaguješ?", možnosti: [
    { text: "Naslouchám, validuji jeho pocity. Hádky jsou součástí přátelství.", body: { zachranar: 2, detektiv: 0, hasic: 0 } },
    { text: "Ptám se co přesně řekl, co odpověděl kamarád, jak to začalo.", body: { zachranar: 0, detektiv: 2, hasic: 0 } },
    { text: "Navrhuji konkrétní kroky — zavolej mu, omluv se, pozvi ho domů.", body: { zachranar: 0, detektiv: 0, hasic: 2 } },
    { text: "Říkám příběh z vlastního dětství — taky jsem zažil/a hádky s kamarádem.", body: { zachranar: 1, detektiv: 0, hasic: 1 } },
  ]},
  { id: 3, text: "Dítě má horečku a bolí ho břicho. Je noc. Co uděláš?", možnosti: [
    { text: "Lehnu si k němu, uklidním ho, sleduji stav.", body: { zachranar: 2, detektiv: 0, hasic: 0 } },
    { text: "Systematicky zjišťuji symptomy, kontroluji teplotu, vyhodnocuji.", body: { zachranar: 0, detektiv: 2, hasic: 0 } },
    { text: "Okamžitě volám lékaři nebo jedeme na pohotovost.", body: { zachranar: 0, detektiv: 0, hasic: 2 } },
    { text: "Dám léky, zůstanu nablízku a rozhodnu se podle situace.", body: { zachranar: 1, detektiv: 1, hasic: 0 } },
  ]},
  { id: 4, text: "Dítě se dostalo do šikany ve škole. Jak postupuješ?", možnosti: [
    { text: "Nejdříve mluvím s dítětem, aby vědělo že je v bezpečí a milované.", body: { zachranar: 2, detektiv: 0, hasic: 0 } },
    { text: "Shromáždím informace — kdo, jak dlouho, co přesně — pak jednám.", body: { zachranar: 0, detektiv: 2, hasic: 0 } },
    { text: "Hned volám třídnímu učiteli. Toto se musí řešit okamžitě.", body: { zachranar: 0, detektiv: 0, hasic: 2 } },
    { text: "Paralelně mluvím s dítětem i kontaktuji školu.", body: { zachranar: 1, detektiv: 0, hasic: 1 } },
  ]},
  { id: 5, text: "Dítě se poranilo — není to vážné, ale pláče a je vyděšené. Tvoje první slova?", možnosti: [
    { text: "'Jsem tady, jsi v bezpečí, všechno bude dobré.'", body: { zachranar: 2, detektiv: 0, hasic: 0 } },
    { text: "'Kde to bolí? Jak moc? Ukáž mi tu ruku.'", body: { zachranar: 0, detektiv: 2, hasic: 0 } },
    { text: "'Pojď, ošetříme to.' A jdu rovnou k lékárničce.", body: { zachranar: 0, detektiv: 0, hasic: 2 } },
    { text: "'Hele, vidím že tě to bolí. Pojď sem.' — pak jednám.", body: { zachranar: 1, detektiv: 0, hasic: 1 } },
  ]},
  { id: 6, text: "Dítě má strach z něčeho zdánlivě iracionálního (tma, psi, záchody na výletě). Jak k tomu přistupuješ?", možnosti: [
    { text: "Beru strach vážně a jsem nablízku. Netlačím na překonání.", body: { zachranar: 2, detektiv: 0, hasic: 0 } },
    { text: "Ptám se odkud strach pochází, od kdy, co ho spouští.", body: { zachranar: 0, detektiv: 2, hasic: 0 } },
    { text: "Navrhuji konkrétní techniky — dejme si plán jak strach překonat krok za krokem.", body: { zachranar: 0, detektiv: 0, hasic: 2 } },
    { text: "Normalizuji strach a pak nabídnu pomoc s překonáním.", body: { zachranar: 1, detektiv: 1, hasic: 0 } },
  ]},
  { id: 7, text: "Dítě se vrátí domů a je zřejmě smutné, ale říká 'je to OK.' Co uděláš?", možnosti: [
    { text: "Dám mu prostor, jsem nablízku a řeknu mu že jsem tu kdyby chtělo mluvit.", body: { zachranar: 2, detektiv: 0, hasic: 0 } },
    { text: "Opatrně zjišťuji co se mohlo stát — nevtíravě, ale systematicky.", body: { zachranar: 0, detektiv: 2, hasic: 0 } },
    { text: "Navrhuji aktivity které ho rozveselí — jdeme ven, vaříme spolu, zahrajeme si.", body: { zachranar: 0, detektiv: 0, hasic: 2 } },
    { text: "Sleduju situaci a reaguji podle toho jak se bude vyvíjet.", body: { zachranar: 1, detektiv: 1, hasic: 0 } },
  ]},
  { id: 8, text: "Co považuješ za nejdůležitější v těžké chvíli dítěte?", možnosti: [
    { text: "Aby vědělo že není samo a je bezpodmínečně milované.", body: { zachranar: 2, detektiv: 0, hasic: 0 } },
    { text: "Aby jsme porozuměli situaci — bez pochopení nelze dobře pomoci.", body: { zachranar: 0, detektiv: 2, hasic: 0 } },
    { text: "Aby problém byl co nejdříve vyřešen — čím rychleji, tím lépe.", body: { zachranar: 0, detektiv: 0, hasic: 2 } },
    { text: "Kombinace — emoce i řešení jsou oba důležité.", body: { zachranar: 1, detektiv: 0, hasic: 1 } },
  ]},
  { id: 9, text: "Jak reaguješ na vlastní chybu v rodičovství (třeba křičení, neférovost)?", možnosti: [
    { text: "Omlouvám se dítěti upřímně a vyjadřuji emoce — 'bylo mi líto že jsem křičel/a'.", body: { zachranar: 2, detektiv: 0, hasic: 0 } },
    { text: "Přemýšlím co vedlo k chybě a jak to příště udělám jinak.", body: { zachranar: 0, detektiv: 2, hasic: 0 } },
    { text: "Chybu napravuji ihned — omlouvám se, odčiňuji, posouvám se dál.", body: { zachranar: 0, detektiv: 0, hasic: 2 } },
    { text: "Omlouvám se a pak přemýšlím jak se zlepšit.", body: { zachranar: 1, detektiv: 1, hasic: 0 } },
  ]},
  { id: 10, text: "Co by o tobě v krizi řeklo tvoje dítě?", možnosti: [
    { text: "'Mám tě vždy po svém boku a vím že mi rozumíš.'", body: { zachranar: 2, detektiv: 0, hasic: 0 } },
    { text: "'Vždy to dobře pochopíš a víš přesně co se děje.'", body: { zachranar: 0, detektiv: 2, hasic: 0 } },
    { text: "'Vždy najdeš řešení a postaráš se o to.'", body: { zachranar: 0, detektiv: 0, hasic: 2 } },
    { text: "'Nevím přesně co uděláš, ale vím že to nějak zvládneme.'", body: { zachranar: 1, detektiv: 0, hasic: 1 } },
  ]},
];

const VÝSLEDKY = {
  zachranar: {
    typ: "Záchranář",
    emoji: "🏥",
    popis: "V krizi jsi emocionální kotva. Tvoje první reakce je být přítomný/á — obejmout, uklidnit, dát pocit bezpečí. Dítě v tobě má bezpečný přístav a to buduje hlubokou důvěru. Jen si někdy připomeň, že po emocionální podpoře přichází čas na řešení.",
    tipy: [
      "Tvůj přístup je vzácný — mnoho rodičů přeskakuje emoce a jde rovnou k řešení",
      "Až dítě bude uklidněné, neboj se ho zapojit do hledání řešení",
      "Tvá empatie je silná stránka — pečuj i o sebe, aby ses nevyčerpal/a",
    ],
    barva: "from-rose-50 to-pink-100",
  },
  detektiv: {
    typ: "Detektiv",
    emoji: "🔍",
    popis: "V krizi jsi analytik. Nejdřív chceš pochopit — co, jak, proč, kdy. Tvoje systematické myšlení pomáhá najít kořen problému a skutečné řešení. Jen si dávej pozor, aby tvoje otázky nevypadaly jako výslech — dítě potřebuje nejdřív cítit přijetí.",
    tipy: [
      "Před otázkami věnuj minutu přijetí — 'vidím že je ti smutno, jsem tady'",
      "Tvoje analytická síla je nejúčinnější po emocionálním zakotvení",
      "Sdílej své závěry s dítětem — ať cítí že jste v tom spolu",
    ],
    barva: "from-indigo-50 to-purple-100",
  },
  hasic: {
    typ: "Hasič",
    emoji: "🚒",
    popis: "V krizi jdeš rovnou do akce. Vidíš problém a chceš ho vyřešit — hned. Tvoje rozhodnost a schopnost jednat pod tlakem jsou neuvěřitelné. Jen nezapomeň, že děti někdy nepotřebují řešení. Potřebují být slyšeny.",
    tipy: [
      "Zkus před akcí položit jednu otázku: 'Chceš teď radu, nebo chceš aby ses vymluvil/a?'",
      "Rychlá řešení jsou cenná — kombinuj je s nasloucháním a budeš neporazitelný/á",
      "Tvůj přístup dítěti ukazuje že problémy mají řešení — to je cenná lekce",
    ],
    barva: "from-amber-50 to-orange-100",
  },
};

const SLUG = "rodic-v-krizi";
const URL = `https://rodicovskysvet.cz/kviz/${SLUG}`;

export default function QuizClient() {
  const [aktuální, setAktuální] = useState(0);
  const [odpovědi, setOdpovědi] = useState<number[]>([]);
  const [skóre, setSkóre] = useState({ zachranar: 0, detektiv: 0, hasic: 0 });
  const [hotovo, setHotovo] = useState(false);
  const [vybraná, setVybraná] = useState<number | null>(null);

  const odpověz = (index: number) => {
    setVybraná(index);
    const body = OTÁZKY[aktuální].možnosti[index].body;
    const nové = {
      zachranar: skóre.zachranar + body.zachranar,
      detektiv: skóre.detektiv + body.detektiv,
      hasic: skóre.hasic + body.hasic,
    };

    setTimeout(() => {
      setSkóre(nové);
      setOdpovědi([...odpovědi, index]);
      setVybraná(null);
      if (aktuální + 1 >= OTÁZKY.length) {
        setHotovo(true);
      } else {
        setAktuální(aktuální + 1);
      }
    }, 400);
  };

  const výsledekTyp = Object.entries(skóre).reduce((a, b) => a[1] > b[1] ? a : b)[0] as keyof typeof VÝSLEDKY;
  const výsledek = VÝSLEDKY[výsledekTyp];
  const progress = (aktuální / OTÁZKY.length) * 100;

  if (hotovo) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className={`bg-gradient-to-br ${výsledek.barva} rounded-2xl p-8 mb-6 text-center border border-[var(--border)]`}>
          <div className="text-6xl mb-3">{výsledek.emoji}</div>
          <p className="text-sm font-semibold text-[var(--accent)] uppercase tracking-wide mb-1">Tvůj výsledek</p>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--ink)] mb-4">{výsledek.typ}</h2>
          <p className="text-[var(--muted)] leading-relaxed">{výsledek.popis}</p>
        </div>

        <div className="bg-white border border-[var(--border)] rounded-2xl p-6 mb-6">
          <h3 className="font-serif text-lg font-bold text-[var(--ink)] mb-4">💡 Tipy pro tebe</h3>
          <ul className="space-y-3">
            {výsledek.tipy.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[var(--muted)]">
                <span className="text-[var(--accent)] font-bold flex-shrink-0">✓</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-[var(--border)] rounded-2xl p-6 mb-6">
          <h3 className="font-serif text-lg font-bold text-[var(--ink)] mb-4">Tvoje skóre</h3>
          {Object.entries(skóre).map(([typ, body]) => {
            const max = 20;
            const procent = Math.round((body / max) * 100);
            const labels: Record<string, string> = { zachranar: "🏥 Záchranář", detektiv: "🔍 Detektiv", hasic: "🚒 Hasič" };
            return (
              <div key={typ} className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[var(--ink)] font-medium">{labels[typ]}</span>
                  <span className="text-[var(--muted)]">{procent}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--accent)] rounded-full transition-all duration-500" style={{ width: `${procent}%` }} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white border border-[var(--border)] rounded-2xl p-5 mb-6">
          <p className="font-serif font-bold text-[var(--ink)] mb-3">📤 Sdílej svůj výsledek</p>
          <div className="flex flex-wrap gap-2">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(URL)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Jsem " + výsledek.typ + " " + výsledek.emoji + "! Zjisti i ty jaký jsi rodič v krizi.")}&url=${encodeURIComponent(URL)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              X (Twitter)
            </a>
            <button
              onClick={() => { navigator.clipboard.writeText(URL); alert("Odkaz zkopírován!"); }}
              className="flex items-center gap-2 px-4 py-2 border border-[var(--border)] rounded-xl text-sm font-semibold text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              Kopírovat odkaz
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => { setAktuální(0); setOdpovědi([]); setSkóre({ zachranar: 0, detektiv: 0, hasic: 0 }); setHotovo(false); }}
            className="flex-1 py-3 border border-[var(--border)] rounded-xl text-sm font-semibold text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
          >
            Zkusit znovu
          </button>
          <Link href="/kviz" className="flex-1 py-3 bg-[var(--accent)] text-white rounded-xl text-sm font-bold text-center hover:opacity-90 transition-opacity">
            Další kvízy →
          </Link>
        </div>
      </div>
    );
  }

  const otázka = OTÁZKY[aktuální];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between text-sm text-[var(--muted)] mb-2">
          <span>Otázka {aktuální + 1} z {OTÁZKY.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-[var(--accent)] rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="bg-white border border-[var(--border)] rounded-2xl p-6 md:p-8 mb-4">
        <h2 className="font-serif text-xl md:text-2xl font-bold text-[var(--ink)] mb-6 leading-snug">
          {otázka.text}
        </h2>
        <div className="space-y-3">
          {otázka.možnosti.map((možnost, i) => (
            <button
              key={i}
              onClick={() => odpověz(i)}
              disabled={vybraná !== null}
              className={`w-full text-left px-5 py-4 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                vybraná === i
                  ? "border-[var(--accent)] bg-[var(--rose)] text-[var(--accent)]"
                  : "border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--rose)] text-[var(--ink)]"
              }`}
            >
              <span className="inline-flex items-center gap-3">
                <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  {String.fromCharCode(65 + i)}
                </span>
                {možnost.text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
