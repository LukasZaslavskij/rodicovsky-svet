"use client";

import { useState } from "react";
import Link from "next/link";

const OTÁZKY = [
  { id: 1, text: "Dítě rozlilo celý džus na čistě uklizený stůl. Tvoje první reakce?", možnosti: [
    { text: "Nadechnu se a klidně utřu. Stane se.", body: { zenovy: 2, sopka: 0, superhrdina: 0 } },
    { text: "Vybuchnu, pak se styděm omlouvám.", body: { zenovy: 0, sopka: 2, superhrdina: 0 } },
    { text: "Hned utírám, organizuji, řeším — emoce až potom.", body: { zenovy: 0, sopka: 0, superhrdina: 2 } },
    { text: "Trochu zanadávám pod vousy, ale zvládnu to.", body: { zenovy: 1, sopka: 1, superhrdina: 0 } },
  ]},
  { id: 2, text: "Jsou 7:45, odjezd za 10 minut a dítě nemůže najít druhou botu. Jak reaguješ?", možnosti: [
    { text: "Zůstanu klidný/á a hledáme společně.", body: { zenovy: 2, sopka: 0, superhrdina: 0 } },
    { text: "Začnu křičet, pak si říkám že jsem hrozný rodič.", body: { zenovy: 0, sopka: 2, superhrdina: 0 } },
    { text: "Za 30 vteřin botu najdu, naloduji děti a jedeme.", body: { zenovy: 0, sopka: 0, superhrdina: 2 } },
    { text: "Vnitřně umírám, navenek funguju.", body: { zenovy: 0, sopka: 1, superhrdina: 1 } },
  ]},
  { id: 3, text: "Třetí noc v řadě špatně spíš kvůli nemocnému dítěti. Jak se cítíš?", možnosti: [
    { text: "Unavený/á, ale vím že to přejde. Piju čaj a jdu dál.", body: { zenovy: 2, sopka: 0, superhrdina: 0 } },
    { text: "Jsem na pokraji nervového zhroucení a všechno mě štve.", body: { zenovy: 0, sopka: 2, superhrdina: 0 } },
    { text: "Funguju v autopilotu. Nedám si odpočinout dokud dítě není zdravé.", body: { zenovy: 0, sopka: 0, superhrdina: 2 } },
    { text: "Přežívám. Den po dni.", body: { zenovy: 1, sopka: 0, superhrdina: 1 } },
  ]},
  { id: 4, text: "Dítě způsobilo trapas u kamarádů — vyvádělo, ničilo, neposlouchalo. Tvoje první pocity?", možnosti: [
    { text: "Je to dítě, příště to bude lepší. Neřeším to přehnaně.", body: { zenovy: 2, sopka: 0, superhrdina: 0 } },
    { text: "Hanbím se a vzteká mě to zároveň. Doma to schytá.", body: { zenovy: 0, sopka: 2, superhrdina: 0 } },
    { text: "Situaci hned řeším přímo na místě, věcně a bez hysterie.", body: { zenovy: 0, sopka: 0, superhrdina: 2 } },
    { text: "Navenek v pohodě, uvnitř chci zmizet ze Země.", body: { zenovy: 1, sopka: 1, superhrdina: 0 } },
  ]},
  { id: 5, text: "Máš těžký den v práci a hned po příchodu domů na tebe dítě valí požadavky. Co uděláš?", možnosti: [
    { text: "Poprosím o 10 minut pro sebe, pak jsem tu naplno.", body: { zenovy: 2, sopka: 0, superhrdina: 0 } },
    { text: "Jsem otrávený/á a nezvládám skrýt že mě to štve.", body: { zenovy: 0, sopka: 2, superhrdina: 0 } },
    { text: "Hodím tašku a jdu rovnou do akce — co potřebuješ?", body: { zenovy: 0, sopka: 0, superhrdina: 2 } },
    { text: "Zapnu televizi, koupím si 20 minut klidu.", body: { zenovy: 1, sopka: 0, superhrdina: 1 } },
  ]},
  { id: 6, text: "Jak jsi na tom se spánkem a odpočinkem pro sebe?", možnosti: [
    { text: "Hlídám si to. Bez dobití baterií nejsem dobrý/á rodič.", body: { zenovy: 2, sopka: 0, superhrdina: 0 } },
    { text: "Špatně. A pak se divím proč jsem podrážděný/á.", body: { zenovy: 0, sopka: 2, superhrdina: 0 } },
    { text: "Málo spím, ale zvládám to. Na odpočinek přijde řada až budou děti dospělé.", body: { zenovy: 0, sopka: 0, superhrdina: 2 } },
    { text: "Jde to nahoru dolů. Snažím se, ale ne vždy to vychází.", body: { zenovy: 1, sopka: 1, superhrdina: 0 } },
  ]},
  { id: 7, text: "Dítě odmítá udělat co říkáš — potřetí za sebou. Jak se cítíš?", možnosti: [
    { text: "Frustrovaně, ale zkusím jiný přístup. Hledám proč nechce.", body: { zenovy: 2, sopka: 0, superhrdina: 0 } },
    { text: "Přejde mi trpělivost a zvýším hlas.", body: { zenovy: 0, sopka: 2, superhrdina: 0 } },
    { text: "Pevně, jasně a bez emocí to zopakuji. Jednou za všechny.", body: { zenovy: 0, sopka: 0, superhrdina: 2 } },
    { text: "Vzdám to a udělám to za něj/ni, ať je klid.", body: { zenovy: 0, sopka: 1, superhrdina: 1 } },
  ]},
  { id: 8, text: "Co děláš když cítíš že jsi na pokraji vyčerpání?", možnosti: [
    { text: "Řeknu si o pomoc — partnerovi, babičce, kamarádce.", body: { zenovy: 2, sopka: 0, superhrdina: 0 } },
    { text: "Funguju dál dokud nespadnu. Pak je zle.", body: { zenovy: 0, sopka: 1, superhrdina: 1 } },
    { text: "Zapnu druhý vítr a jedu. Jinak to neumím.", body: { zenovy: 0, sopka: 0, superhrdina: 2 } },
    { text: "Záleží na dni. Někdy pomoc přijmu, někdy to rozchodím.", body: { zenovy: 1, sopka: 1, superhrdina: 0 } },
  ]},
  { id: 9, text: "Dítě ti řekne 'Jsi nejhorší rodič na světě!' Jak to na tebe působí?", možnosti: [
    { text: "Vím že to myslí jako výtku pro daný moment, neberem to osobně.", body: { zenovy: 2, sopka: 0, superhrdina: 0 } },
    { text: "Bolí to a reaguju emocionálně, pak si vyčítám přecitlivělost.", body: { zenovy: 0, sopka: 2, superhrdina: 0 } },
    { text: "Klidně řeknu že to tak není, a jdeme dál.", body: { zenovy: 1, sopka: 0, superhrdina: 1 } },
    { text: "Ignoruju to. Prostě ne.", body: { zenovy: 0, sopka: 0, superhrdina: 2 } },
  ]},
  { id: 10, text: "Jak obvykle skončí tvůj náročný rodičovský den?", možnosti: [
    { text: "Vděčně — i těžké dny mají svou hodnotu.", body: { zenovy: 2, sopka: 0, superhrdina: 0 } },
    { text: "S výčitkami svědomí co jsem zase pokazil/a.", body: { zenovy: 0, sopka: 2, superhrdina: 0 } },
    { text: "S pocitem splněné mise. Unavený/á, ale OK.", body: { zenovy: 0, sopka: 0, superhrdina: 2 } },
    { text: "S vínem a zhaslou obrazovkou. Zítra zas.", body: { zenovy: 1, sopka: 1, superhrdina: 0 } },
  ]},
];

const VÝSLEDKY = {
  zenovy: {
    typ: "Zenový rodič",
    emoji: "🧘",
    popis: "Máš vzácnou schopnost zůstat klidný/á i v bouři. Vidíš věci v perspektivě a víš, že většina rodičovského chaosu není konec světa. Dítě v tobě má pevnou, klidnou kotvu — a to je obrovský dar.",
    tipy: [
      "Tvůj klid je vzor — ale nezapomínej i pojmenovat emoce nahlas, ať dítě vidí že je mít smíme",
      "Sdílej svůj recept na klid s ostatními rodiči, kteří ho potřebují",
      "Dávej si pozor aby klidný přístup nezklouzl v přehlížení vlastních potřeb",
    ],
    barva: "from-teal-50 to-emerald-100",
  },
  sopka: {
    typ: "Sopečný rodič",
    emoji: "🌋",
    popis: "Máš velké srdce a ještě větší city. Někdy vybuchneš — ale záleží ti na tom jak se pak zachováš. Rodič který se umí omluvit a začít znovu je pro dítě mnohem cennější než ten, kdo nikdy nechybuje.",
    tipy: [
      "Zkus zavést 'signál pauzy' — slovo nebo gesto které použiješ než reaguješ",
      "Výbuch je signál — ptej se co ti chybělo: spánek, čas pro sebe, podpora?",
      "Omluva dítěti po výbuchu je lekce empatie a odvahy, ne slabost",
    ],
    barva: "from-orange-50 to-red-100",
  },
  superhrdina: {
    typ: "Superhrdina",
    emoji: "🦸",
    popis: "Fungujete plný výkon, řešíte, organizujete, zvládáte. Tvoje rodina má v tobě neúnavnou oporu. Jen si pamatuj — i superhrdinové potřebují dobít baterky. Vyčerpaný rodič nemůže dávat plnou sílu.",
    tipy: [
      "Naplánuj si vlastní 'zásoby energie' stejně pečlivě jako rodinný program",
      "Přijmout pomoc není slabost — je to chytré řízení zdrojů",
      "Děti nepotřebují dokonalého rodiče, potřebují přítomného rodiče",
    ],
    barva: "from-blue-50 to-indigo-100",
  },
};

const SLUG = "jak-zvladas-stres";
const URL = `https://rodicovskysvet.cz/kviz/${SLUG}`;

export default function QuizClient() {
  const [aktuální, setAktuální] = useState(0);
  const [odpovědi, setOdpovědi] = useState<number[]>([]);
  const [skóre, setSkóre] = useState({ zenovy: 0, sopka: 0, superhrdina: 0 });
  const [hotovo, setHotovo] = useState(false);
  const [vybraná, setVybraná] = useState<number | null>(null);

  const odpověz = (index: number) => {
    setVybraná(index);
    const body = OTÁZKY[aktuální].možnosti[index].body;
    const nové = {
      zenovy: skóre.zenovy + body.zenovy,
      sopka: skóre.sopka + body.sopka,
      superhrdina: skóre.superhrdina + body.superhrdina,
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

  const sdílet = () => {
    if (navigator.share) {
      navigator.share({ title: "Jak zvládám rodičovský stres", url: URL });
    } else {
      navigator.clipboard.writeText(URL);
      alert("Odkaz zkopírován!");
    }
  };

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
            const labels: Record<string, string> = { zenovy: "🧘 Zenový", sopka: "🌋 Sopečný", superhrdina: "🦸 Superhrdina" };
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
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Jsem " + výsledek.typ + " " + výsledek.emoji + "! Zjisti i ty jak zvládáš rodičovský stres.")}&url=${encodeURIComponent(URL)}`}
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
            onClick={() => { setAktuální(0); setOdpovědi([]); setSkóre({ zenovy: 0, sopka: 0, superhrdina: 0 }); setHotovo(false); }}
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
