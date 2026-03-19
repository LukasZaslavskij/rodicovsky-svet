"use client";

import { useState } from "react";
import Link from "next/link";

const OTÁZKY = [
  {
    id: 1,
    text: "Dítě odmítá jíst večeři. Co uděláš?",
    možnosti: [
      { text: "Trvám na tom, aby snědlo aspoň trochu.", body: { autoritativni: 2, volny: 0, respektujici: 1 } },
      { text: "Uvařím mu co chce, ať je klid.", body: { autoritativni: 0, volny: 2, respektujici: 0 } },
      { text: "Vysvětlím proč je jídlo důležité a nabídnu alternativu.", body: { autoritativni: 0, volny: 0, respektujici: 2 } },
      { text: "Nechám ho, hlad ho naučí.", body: { autoritativni: 1, volny: 1, respektujici: 1 } },
    ],
  },
  {
    id: 2,
    text: "Dítě má záchvat vzteku na veřejnosti. Jak reaguješ?",
    možnosti: [
      { text: "Okamžitě ho napomenu, ať si to rozmyslí.", body: { autoritativni: 2, volny: 0, respektujici: 0 } },
      { text: "Splním co chce, jen ať přestane.", body: { autoritativni: 0, volny: 2, respektujici: 0 } },
      { text: "Kleknu si k němu a čekám až se zklidní.", body: { autoritativni: 0, volny: 0, respektujici: 2 } },
      { text: "Odvedl/a ho stranou a ignoroval/a scénu.", body: { autoritativni: 1, volny: 0, respektujici: 1 } },
    ],
  },
  {
    id: 3,
    text: "Dítě dostalo špatnou známku ve škole. Tvoje reakce?",
    možnosti: [
      { text: "Zákaz obrazovek dokud to nezlepší.", body: { autoritativni: 2, volny: 0, respektujici: 0 } },
      { text: "Nevadí, příště to bude lepší.", body: { autoritativni: 0, volny: 2, respektujici: 0 } },
      { text: "Pobavíme se co bylo těžké a jak to příště zkusit jinak.", body: { autoritativni: 0, volny: 0, respektujici: 2 } },
      { text: "Nabídnu pomoc s učením ale netlačím.", body: { autoritativni: 0, volny: 1, respektujici: 1 } },
    ],
  },
  {
    id: 4,
    text: "Jak řešíte pravidla doma?",
    možnosti: [
      { text: "Pravidla platí a hotovo, diskuse nepřipadá v úvahu.", body: { autoritativni: 2, volny: 0, respektujici: 0 } },
      { text: "Pravidla moc nemáme, chci aby bylo doma volně.", body: { autoritativni: 0, volny: 2, respektujici: 0 } },
      { text: "Pravidla tvoříme společně a vysvětlujeme proč existují.", body: { autoritativni: 0, volny: 0, respektujici: 2 } },
      { text: "Máme pár základních pravidel, zbytek řešíme podle situace.", body: { autoritativni: 1, volny: 0, respektujici: 1 } },
    ],
  },
  {
    id: 5,
    text: "Dítě chce zůstat déle vzhůru. Je večer a zítra je školní den.",
    možnosti: [
      { text: "Absolutně ne, spánek je spánek.", body: { autoritativni: 2, volny: 0, respektujici: 0 } },
      { text: "Dobře, jednou nevadí.", body: { autoritativni: 0, volny: 2, respektujici: 0 } },
      { text: "Domluvíme se na kompromisu — 15 minut navíc.", body: { autoritativni: 0, volny: 0, respektujici: 2 } },
      { text: "Záleží jak se dítě cítí, někdy povolím.", body: { autoritativni: 0, volny: 1, respektujici: 1 } },
    ],
  },
  {
    id: 6,
    text: "Dítě říká: 'Nechci do školky.' Co odpovíš?",
    možnosti: [
      { text: "Musíš jít, tečka.", body: { autoritativni: 2, volny: 0, respektujici: 0 } },
      { text: "Tak zůstaň doma, ať se mi nepláče.", body: { autoritativni: 0, volny: 2, respektujici: 0 } },
      { text: "Ptám se proč nechce a snažím se pochopit.", body: { autoritativni: 0, volny: 0, respektujici: 2 } },
      { text: "Motivuji ho něčím hezkým co ho tam čeká.", body: { autoritativni: 1, volny: 0, respektujici: 1 } },
    ],
  },
  {
    id: 7,
    text: "Jak reaguješ když je dítě smutné bez zjevného důvodu?",
    možnosti: [
      { text: "Řeknu ať se vzpamatuje, nic se nestalo.", body: { autoritativni: 2, volny: 0, respektujici: 0 } },
      { text: "Dám mu co chce, aby se rozveselilo.", body: { autoritativni: 0, volny: 2, respektujici: 0 } },
      { text: "Sednu si k němu a dám mu prostor to vyjádřit.", body: { autoritativni: 0, volny: 0, respektujici: 2 } },
      { text: "Snažím se ho rozptýlit aktivitou.", body: { autoritativni: 0, volny: 1, respektujici: 1 } },
    ],
  },
  {
    id: 8,
    text: "Dítě udělalo něco špatně. Jak ho potrestal/a?",
    možnosti: [
      { text: "Tresty jsou důležité — kout nebo zákaz oblíbené věci.", body: { autoritativni: 2, volny: 0, respektujici: 0 } },
      { text: "Moc netrestám, nechci aby mě mělo za zlého.", body: { autoritativni: 0, volny: 2, respektujici: 0 } },
      { text: "Proberu s ním co se stalo a co udělá příště jinak.", body: { autoritativni: 0, volny: 0, respektujici: 2 } },
      { text: "Záleží na situaci, přistupuji k tomu individuálně.", body: { autoritativni: 1, volny: 0, respektujici: 1 } },
    ],
  },
  {
    id: 9,
    text: "Dítě chce rozhodovat samo (oblečení, aktivity). Jak to vnímáš?",
    možnosti: [
      { text: "Rozhoduji já, na to je ještě brzo.", body: { autoritativni: 2, volny: 0, respektujici: 0 } },
      { text: "Ať si dělá co chce, je to jeho život.", body: { autoritativni: 0, volny: 2, respektujici: 0 } },
      { text: "Dávám mu možnost volby v rámci rozumných hranic.", body: { autoritativni: 0, volny: 0, respektujici: 2 } },
      { text: "Někdy ano, někdy ne — podle toho co je v sázce.", body: { autoritativni: 1, volny: 0, respektujici: 1 } },
    ],
  },
  {
    id: 10,
    text: "Co pro tebe jako rodiče znamená úspěch?",
    možnosti: [
      { text: "Dítě je poslušné a respektuje autoritu.", body: { autoritativni: 2, volny: 0, respektujici: 0 } },
      { text: "Dítě je šťastné a má hezké dětství.", body: { autoritativni: 0, volny: 2, respektujici: 0 } },
      { text: "Dítě umí vyjádřit emoce a rozumí samo sobě.", body: { autoritativni: 0, volny: 0, respektujici: 2 } },
      { text: "Dítě je samostatné a připravené na život.", body: { autoritativni: 1, volny: 1, respektujici: 1 } },
    ],
  },
];

const VÝSLEDKY = {
  autoritativni: {
    typ: "Autoritativní rodič",
    emoji: "🦁",
    popis: "Jsi rodič s jasnými pravidly a vysokými nároky. Věříš v řád a disciplínu — a to dítěti dává jistotu. Pozor ale na to, aby pravidla nezastínila prostor pro emoce a dialog.",
    tipy: ["Zkus jednou týdně udělat rozhodnutí společně s dítětem", "Ptej se jak se cítí, nejen co udělalo", "Připomínej si že chyby jsou součástí učení"],
    barva: "from-amber-50 to-orange-100",
  },
  volny: {
    typ: "Volný rodič",
    emoji: "🌈",
    popis: "Jsi empatický a přátelský rodič kterému záleží na tom, aby bylo dítě šťastné. Dítě tě miluje — ale může potřebovat trochu víc jasných hranic, které mu dají pocit bezpečí.",
    tipy: ["Zkus nastavit 2-3 pevná pravidla která platí vždy", "Neboj se říct ne — dítě to potřebuje slyšet", "Hranice jsou projevem lásky, ne trestu"],
    barva: "from-sky-50 to-blue-100",
  },
  respektujici: {
    typ: "Respektující rodič",
    emoji: "🌸",
    popis: "Přistupuješ k dítěti jako k rovnocennému člověku. Vysvětluješ, nasloucháš a hledáš kompromisy. Tento přístup buduje důvěru a emoční inteligenci — jen si hlídej, aby tě to nevyčerpávalo.",
    tipy: ["Nezapomínej taky na sebe a své potřeby", "Někdy je OK říct ne bez vysvětlení", "Oceňuj sám/sama sebe za to co děláš dobře"],
    barva: "from-pink-50 to-rose-100",
  },
};

export default function QuizClient() {
  const [aktuální, setAktuální] = useState(0);
  const [odpovědi, setOdpovědi] = useState<number[]>([]);
  const [skóre, setSkóre] = useState({ autoritativni: 0, volny: 0, respektujici: 0 });
  const [hotovo, setHotovo] = useState(false);
  const [vybraná, setVybraná] = useState<number | null>(null);

  const odpověz = (index: number) => {
    setVybraná(index);
    const body = OTÁZKY[aktuální].možnosti[index].body;
    const nové = {
      autoritativni: skóre.autoritativni + body.autoritativni,
      volny: skóre.volny + body.volny,
      respektujici: skóre.respektujici + body.respektujici,
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
  const progress = ((aktuální) / OTÁZKY.length) * 100;

  if (hotovo) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className={`bg-gradient-to-br ${výsledek.barva} rounded-2xl p-8 mb-6 text-center border border-[var(--border)]`}>
          <div className="text-7xl mb-4">{výsledek.emoji}</div>
          <p className="text-sm font-bold uppercase tracking-wider text-[var(--accent)] mb-2">Tvůj výsledek</p>
          <h2 className="font-serif text-3xl font-bold text-[var(--ink)] mb-4">{výsledek.typ}</h2>
          <p className="text-[var(--muted)] leading-relaxed text-lg">{výsledek.popis}</p>
        </div>

        <div className="bg-white border border-[var(--border)] rounded-2xl p-6 mb-6">
          <h3 className="font-serif text-xl font-bold text-[var(--ink)] mb-4">💡 Tipy pro tebe</h3>
          <ul className="space-y-3">
            {výsledek.tipy.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[var(--muted)]">
                <span className="text-[var(--accent)] font-bold flex-shrink-0">✓</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Skóre */}
        <div className="bg-white border border-[var(--border)] rounded-2xl p-6 mb-8">
          <h3 className="font-serif text-lg font-bold text-[var(--ink)] mb-4">Tvoje skóre</h3>
          {Object.entries(skóre).map(([typ, body]) => {
            const max = 20;
            const procent = Math.round((body / max) * 100);
            const labels: Record<string, string> = { autoritativni: "Autoritativní", volny: "Volný", respektujici: "Respektující" };
            return (
              <div key={typ} className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[var(--ink)] font-medium">{labels[typ]}</span>
                  <span className="text-[var(--muted)]">{procent}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--accent)] rounded-full transition-all duration-500"
                    style={{ width: `${procent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Sdílení */}
        <div className="bg-white border border-[var(--border)] rounded-2xl p-5 mb-6">
          <p className="font-serif font-bold text-[var(--ink)] mb-3">📤 Sdílej svůj výsledek</p>
          <div className="flex flex-wrap gap-2">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https://rodicovskysvet.cz/kviz/jaky-jsi-rodic&quote=Jsem ${encodeURIComponent(výsledek.typ + " " + výsledek.emoji)}! Zjisti i ty jaký jsi typ rodiče.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=Jsem ${encodeURIComponent(výsledek.typ + " " + výsledek.emoji + "! Zjisti i ty jaký jsi typ rodiče na rodicovskysvet.cz/kviz/jaky-jsi-rodic")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              X (Twitter)
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText("https://rodicovskysvet.cz/kviz/jaky-jsi-rodic");
                alert("Odkaz zkopírován!");
              }}
              className="flex items-center gap-2 px-4 py-2 border border-[var(--border)] rounded-xl text-sm font-semibold text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              Kopírovat odkaz
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => { setAktuální(0); setOdpovědi([]); setSkóre({ autoritativni: 0, volny: 0, respektujici: 0 }); setHotovo(false); }}
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
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-[var(--muted)] mb-2">
          <span>Otázka {aktuální + 1} z {OTÁZKY.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--accent)] rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Otázka */}
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
