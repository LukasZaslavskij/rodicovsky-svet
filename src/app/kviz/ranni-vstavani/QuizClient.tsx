"use client";

import { useState } from "react";
import Link from "next/link";

const OTÁZKY = [
  { id: 1, text: "V kolik hodin zazvoní budík ve vaší domácnosti?", možnosti: [
    { text: "Vstávám hodinu před dětmi. Potřebuji klid a kávu.", body: { velitel: 2, filosof: 0, prezivajici: 0 } },
    { text: "Přesně tak aby to vyšlo — minutu po minutě naplánováno.", body: { velitel: 2, filosof: 0, prezivajici: 0 } },
    { text: "Budík? My vstáváme tak nějak přirozeně.", body: { velitel: 0, filosof: 2, prezivajici: 0 } },
    { text: "Pozdě. Vždycky pozdě.", body: { velitel: 0, filosof: 0, prezivajici: 2 } },
  ]},
  { id: 2, text: "Dítě nechce vstát. Jak ho dostaneš z postele?", možnosti: [
    { text: "Mám systém — světlo, píseň, pak postupně zvyšuji tlak.", body: { velitel: 2, filosof: 0, prezivajici: 0 } },
    { text: "Lehnu si k němu a pomalu ho probouzím. Spěch se mi nelíbí.", body: { velitel: 0, filosof: 2, prezivajici: 0 } },
    { text: "Smlouvám, prosím, lákám sladkostí na snídani.", body: { velitel: 0, filosof: 0, prezivajici: 2 } },
    { text: "Strhnu deku. Ráno není prostor pro drama.", body: { velitel: 2, filosof: 0, prezivajici: 0 } },
  ]},
  { id: 3, text: "Co je u vás k snídani?", možnosti: [
    { text: "Vždy připravená snídaně — jogurt, ovoce, vejce. Mám to pod kontrolou.", body: { velitel: 2, filosof: 0, prezivajici: 0 } },
    { text: "Kdokoli si udělá co chce. Ráno je o svobodě.", body: { velitel: 0, filosof: 2, prezivajici: 0 } },
    { text: "Toastový chléb nebo cereálie. Rychle a bez diskuzí.", body: { velitel: 0, filosof: 0, prezivajici: 2 } },
    { text: "Snídaně? Vezmeme si něco s sebou.", body: { velitel: 0, filosof: 0, prezivajici: 2 } },
  ]},
  { id: 4, text: "Dítě nemůže najít klíčový předmět (bota, aktovka, čepice). Jak reaguješ?", možnosti: [
    { text: "Nemůže nastat — každá věc má své místo od večera.", body: { velitel: 2, filosof: 0, prezivajici: 0 } },
    { text: "Hledáme klidně společně. Spěch problémy neřeší.", body: { velitel: 0, filosof: 2, prezivajici: 0 } },
    { text: "Začnu panikařit a hledám i za dítě.", body: { velitel: 0, filosof: 0, prezivajici: 2 } },
    { text: "Jeden pohled, rychle najdu, jdem.", body: { velitel: 1, filosof: 0, prezivajici: 1 } },
  ]},
  { id: 5, text: "Jak fungujete s oblékáním?", možnosti: [
    { text: "Oblečení připravené večer předem. Ráno se nevyjednává.", body: { velitel: 2, filosof: 0, prezivajici: 0 } },
    { text: "Dítě si vybírá samo — i kdyby to trvalo 20 minut.", body: { velitel: 0, filosof: 2, prezivajici: 0 } },
    { text: "Cokoliv co leží nahoře. Hlavně ať je oblečené.", body: { velitel: 0, filosof: 0, prezivajici: 2 } },
    { text: "Kombinace — já dám výběr ze dvou, dítě vybere.", body: { velitel: 1, filosof: 1, prezivajici: 0 } },
  ]},
  { id: 6, text: "5 minut před odchodem si dítě vzpomene na zapomenutý úkol. Co se děje?", možnosti: [
    { text: "To se u nás nestane — kontrolujeme aktovky večer.", body: { velitel: 2, filosof: 0, prezivajici: 0 } },
    { text: "Zavolám do školy, vysvětlím situaci. Nic hrozného.", body: { velitel: 0, filosof: 2, prezivajici: 0 } },
    { text: "Rychle ho napíšeme za pochodu nebo v autě.", body: { velitel: 0, filosof: 0, prezivajici: 2 } },
    { text: "Jdeme bez úkolu. Nechám to dítě vyřešit samotné.", body: { velitel: 1, filosof: 1, prezivajici: 0 } },
  ]},
  { id: 7, text: "Jak bys popsal/a typické ráno u vás doma jedním slovem?", možnosti: [
    { text: "Efektivní.", body: { velitel: 2, filosof: 0, prezivajici: 0 } },
    { text: "Pohodové.", body: { velitel: 0, filosof: 2, prezivajici: 0 } },
    { text: "Přežité.", body: { velitel: 0, filosof: 0, prezivajici: 2 } },
    { text: "Nepředvídatelné.", body: { velitel: 0, filosof: 1, prezivajici: 1 } },
  ]},
  { id: 8, text: "Jaký je tvůj vztah ke kávě ráno?", možnosti: [
    { text: "Připravím ji automaticky jako první věc. Je součástí systému.", body: { velitel: 2, filosof: 0, prezivajici: 0 } },
    { text: "Piju ji pomalu a vychutnávám. Ráno si zaslouží pomalý start.", body: { velitel: 0, filosof: 2, prezivajici: 0 } },
    { text: "Piju ji za pochodu nebo v autě. Nemám čas na rituály.", body: { velitel: 0, filosof: 0, prezivajici: 2 } },
    { text: "Kakao? Nemám čas na kávu, mám tři děti.", body: { velitel: 0, filosof: 0, prezivajici: 2 } },
  ]},
];

const VÝSLEDKY = {
  velitel: {
    typ: "Ranní velitel",
    emoji: "⏰",
    popis: "Ráno je pro tebe jako vojenská operace — a většinou vychází. Máš systémy, rutiny a záložní plány. Tvoje děti vědí co se od nich čeká a to je dar. Jen si někdy dovol trochu improvizovat — chaos může být dobrodružství.",
    tipy: [
      "Jednou za čas záměrně vynech jeden krok a sleduj co se stane",
      "Zahrň děti do tvoření ranní rutiny — budou ji dodržovat ochotněji",
      "Ranní systém je skvělý nástroj, ne cíl sám o sobě",
    ],
    barva: "from-blue-50 to-sky-100",
  },
  filosof: {
    typ: "Ranní filosof",
    emoji: "☕",
    popis: "Pro tebe je ráno posvátný čas a spěch je nepřítel. Děti u tebe vyrůstají bez ranního stresu — a to je vzácné. Jen se ujisti, že pohodovost není záminka pro pravidelné pozdní příchody do školy.",
    tipy: [
      "Filosofii rána zachovej, ale dej ji pevný rámec: vstávat o 15 minut dřív",
      "Pomalé ráno funguje nejlépe s dobrým večerem — připrav věci předem",
      "Tvůj přístup je protijed na dnešní uspěchaný svět — jen ho nevzdávej pod tlakem",
    ],
    barva: "from-amber-50 to-yellow-100",
  },
  prezivajici: {
    typ: "Statečný přeživší",
    emoji: "😅",
    popis: "Ráno je u vás spíš kontaktní sport než rituál. Ale víš co? Vždycky nějak dorazíte. Tvoje flexibilita a schopnost fungovat v chaosu je podceňovaná superschopnost. Trochu systému by ale pomohlo — tobě i dětem.",
    tipy: [
      "Zkus jedno jednoduché pravidlo: aktovka připravená večer předem",
      "Vstávej o 20 minut dřív než si myslíš že potřebuješ",
      "Hrdost na to že vždy nějak zvládneš je oprávněná — teď ji jen trochu ukočíruj",
    ],
    barva: "from-green-50 to-lime-100",
  },
};

const SLUG = "ranni-vstávani";
const URL = `https://rodicovskysvet.cz/kviz/${SLUG}`;

export default function QuizClient() {
  const [aktuální, setAktuální] = useState(0);
  const [odpovědi, setOdpovědi] = useState<number[]>([]);
  const [skóre, setSkóre] = useState({ velitel: 0, filosof: 0, prezivajici: 0 });
  const [hotovo, setHotovo] = useState(false);
  const [vybraná, setVybraná] = useState<number | null>(null);

  const odpověz = (index: number) => {
    setVybraná(index);
    const body = OTÁZKY[aktuální].možnosti[index].body;
    const nové = {
      velitel: skóre.velitel + body.velitel,
      filosof: skóre.filosof + body.filosof,
      prezivajici: skóre.prezivajici + body.prezivajici,
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
            const max = 16;
            const procent = Math.round((body / max) * 100);
            const labels: Record<string, string> = { velitel: "⏰ Velitel", filosof: "☕ Filosof", prezivajici: "😅 Přeživší" };
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
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Jsem " + výsledek.typ + " " + výsledek.emoji + "! Zjisti i ty jak přežíváš ranní vstávání.")}&url=${encodeURIComponent(URL)}`}
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
            onClick={() => { setAktuální(0); setOdpovědi([]); setSkóre({ velitel: 0, filosof: 0, prezivajici: 0 }); setHotovo(false); }}
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
