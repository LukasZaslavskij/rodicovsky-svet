"use client";

import { useState } from "react";

// Vychází z M-CHAT-R/F (Modified Checklist for Autism in Toddlers) a AQ-Child principů
// Upraveno pro obecnou srozumitelnost, NENÍ klinickým nástrojem
const OTÁZKY = [
    { id: 1, text: "Reaguje dítě na své jméno, když ho zavoláš (bez toho, aby tě vidělo)?" },
    { id: 2, text: "Ukazuje dítě prstem na věci, které ho zajímají (ne proto, aby něco dostalo, ale aby ti to ukázalo)?" },
    { id: 3, text: "Sleduje dítě tvůj pohled, když se díváš na něco konkrétního?" },
    { id: 4, text: "Napodobuje dítě tvé výrazy obličeje nebo gesta (úsměv, tleskání)?" },
    { id: 5, text: "Hraje si dítě na 'jako' (vaří, krmí panenku, volá na hračkovém telefonu)?" },
    { id: 6, text: "Přináší ti dítě věci, aby ti je ukázalo — ne jen abys mu s nimi pomohl/a?" },
    { id: 7, text: "Sdílí dítě s tebou radost — například se ohlédne na tebe, když dělá něco zábavného?" },
    { id: 8, text: "Rozumí dítě jednoduchým pokynům bez doprovodu gest (např. 'Dej mi to')?" },
    { id: 9, text: "Navazuje dítě oční kontakt přirozeně a spontánně?" },
    { id: 10, text: "Má dítě zájem o jiné děti a snaží se s nimi navázat kontakt?" },
    { id: 11, text: "Reaguje dítě přiměřeně na bolest nebo nepohodlí?" },
    { id: 12, text: "Je dítě flexibilní — zvládá změny v rutině bez výrazné úzkosti nebo záchvatu?" },
    { id: 13, text: "Hraje si dítě různorodě — nevěnuje se dokola pouze jedné činnosti nebo předmětu?" },
    { id: 14, text: "Vyjadřuje dítě emoce přiměřeně situaci (radost, smutek, strach)?" },
    { id: 15, text: "Mluví dítě (nebo se jinak dorozumívá) způsobem odpovídajícím jeho věku?" },
    { id: 16, text: "Je pro dítě snesitelný dotyk a fyzická blízkost?" },
    { id: 17, text: "Reaguje dítě na běžné zvuky přiměřeně — není přehnaně citlivé ani necitlivé?" },
    { id: 18, text: "Chápe dítě základní společenská pravidla (zdravení, střídání v rozhovoru)?" },
    { id: 19, text: "Zvládá dítě odloučení od rodiče přiměřeně věku?" },
    { id: 20, text: "Celkově vnímáš vývoj svého dítěte jako odpovídající vrstevníkům?" },
];

type Odpověď = "ano" | "ne" | "nevim";

export default function AutismusClient() {
    const [aktuální, setAktuální] = useState(0);
    const [odpovědi, setOdpovědi] = useState<Record<number, Odpověď>>({});
    const [hotovo, setHotovo] = useState(false);

    const odpověz = (volba: Odpověď) => {
        const nové = { ...odpovědi, [OTÁZKY[aktuální].id]: volba };
        setOdpovědi(nové);
        if (aktuální + 1 >= OTÁZKY.length) {
            setHotovo(true);
        } else {
            setAktuální(aktuální + 1);
        }
    };

    const zpět = () => {
        if (aktuální > 0) setAktuální(aktuální - 1);
    };

    // Skóre: "ne" na pozitivní otázky = znepokojivé
    // Všechny otázky jsou formulovány pozitivně → "ne" = potenciální příznak
    const početNe = Object.values(odpovědi).filter((v) => v === "ne").length;
    const početNevim = Object.values(odpovědi).filter((v) => v === "nevim").length;

    const výsledek = () => {
        if (početNe >= 8) return "high";
        if (početNe >= 4) return "medium";
        return "low";
    };

    const VÝSLEDKY = {
        low: {
            emoji: "✅",
            nadpis: "Výsledky nevykazují výraznější odchylky",
            barva: "from-green-50 to-emerald-100",
            border: "border-green-200",
            text: "Na základě tvých odpovědí se neobjevily výraznější znaky, které by naznačovaly poruchu autistického spektra. To samozřejmě neznamená, že vše je stoprocentně v pořádku — pokud máš konkrétní obavy, vždy stojí za to o nich promluvit s dětským lékařem.",
            doporuceni: [
                "Pokračuj v sledování vývoje dítěte",
                "Zaznamenej si chování, které ti dělá starosti, a proberte to při příští preventivní prohlídce",
                "Pamatuj, že každé dítě se vyvíjí svým tempem",
            ],
        },
        medium: {
            emoji: "⚠️",
            nadpis: "Některé odpovědi stojí za pozornost",
            barva: "from-amber-50 to-yellow-100",
            border: "border-amber-200",
            text: "V tvých odpovědích se objevilo několik oblastí, které mohou být hodnoty dalšího sledování. To neznamená, že dítě má autismus — může jít o vývojové zpoždění, temperament nebo jiné příčiny. Doporučujeme promluvit s dětským lékařem nebo pediatrickým psychologem.",
            doporuceni: [
                "Domluv si konzultaci s dětským lékařem a popiš mu konkrétní chování",
                "Zeptej se na možnost doporučení k vývojovému pediatrovi nebo psychologovi",
                "Veď si krátké záznamy o chování dítěte — bude to cenné pro odborníka",
            ],
        },
        high: {
            emoji: "🔎",
            nadpis: "Výsledky naznačují, že je vhodné vyhledat odborníka",
            barva: "from-red-50 to-rose-100",
            border: "border-red-200",
            text: "Tvoje odpovědi naznačují, že je vhodné vyhledat odborné posouzení. To neznamená, že diagnóza je jistá — ale dítě by mělo být vyšetřeno odborníkem. Čím dřívější je případná intervence, tím lépe.",
            doporuceni: [
                "Co nejdříve navštiv dětského lékaře a požádej o doporučení na specializované pracoviště",
                "V ČR se specializují na diagnostiku PAS centra APLA nebo Národní ústav duševního zdraví",
                "Nezůstávej s tím sama — obrať se na rodičovské komunity nebo odborné poradny",
            ],
        },
    };

    const res = výsledek();
    const výsledekData = VÝSLEDKY[res];
    const progress = ((aktuální) / OTÁZKY.length) * 100;

    if (hotovo) {
        return (
            <div className="max-w-2xl mx-auto">
                {/* Výsledek */}
                <div className={`bg-gradient-to-br ${výsledekData.barva} border ${výsledekData.border} rounded-2xl p-7 mb-6`}>
                    <div className="text-5xl mb-3">{výsledekData.emoji}</div>
                    <h2 className="font-serif text-2xl font-bold text-[var(--ink)] mb-3">
                        {výsledekData.nadpis}
                    </h2>
                    <p className="text-[var(--muted)] leading-relaxed">{výsledekData.text}</p>
                </div>

                {/* Skóre + vizuální škála */}
                <div className="bg-white border border-[var(--border)] rounded-2xl p-5 mb-5">
                    <h3 className="font-serif text-lg font-bold text-[var(--ink)] mb-4">Přehled odpovědí</h3>

                    {/* Počty */}
                    <div className="grid grid-cols-3 gap-3 text-center mb-5">
                        <div className="bg-green-50 rounded-xl p-3">
                            <p className="text-2xl font-bold text-green-600">{Object.values(odpovědi).filter(v => v === "ano").length}</p>
                            <p className="text-xs text-[var(--muted)] mt-0.5">Ano</p>
                        </div>
                        <div className="bg-red-50 rounded-xl p-3">
                            <p className="text-2xl font-bold text-red-500">{početNe}</p>
                            <p className="text-xs text-[var(--muted)] mt-0.5">Ne</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-3">
                            <p className="text-2xl font-bold text-gray-500">{početNevim}</p>
                            <p className="text-xs text-[var(--muted)] mt-0.5">Nevím</p>
                        </div>
                    </div>

                    {/* Vizuální škála */}
                    <div className="mb-4">
                        <div className="flex justify-between text-xs text-[var(--muted)] mb-1.5">
                            <span>Počet odpovědí "Ne": <strong className="text-[var(--ink)]">{početNe} z 20</strong></span>
                        </div>
                        <div className="relative h-5 bg-gray-100 rounded-full overflow-hidden">
                            {/* Barevné zóny */}
                            <div className="absolute inset-0 flex">
                                <div className="bg-green-200 opacity-60" style={{ width: "20%" }} />
                                <div className="bg-amber-200 opacity-60" style={{ width: "20%" }} />
                                <div className="bg-red-200 opacity-60" style={{ width: "60%" }} />
                            </div>
                            {/* Ukazatel */}
                            <div
                                className="absolute top-0.5 bottom-0.5 w-3 rounded-full bg-[var(--ink)] shadow transition-all duration-700"
                                style={{ left: `calc(${Math.min((početNe / 20) * 100, 97)}% - 6px)` }}
                            />
                        </div>
                        {/* Popisky zón */}
                        <div className="flex text-xs mt-1.5">
                            <div className="text-green-700 font-medium" style={{ width: "20%" }}>0–3</div>
                            <div className="text-amber-700 font-medium" style={{ width: "20%" }}>4–7</div>
                            <div className="text-red-600 font-medium" style={{ width: "60%" }}>8+</div>
                        </div>
                    </div>

                    {/* Přehled pásem */}
                    <div className="space-y-2">
                        <div className="grid grid-cols-3 text-xs font-semibold text-[var(--muted)] uppercase tracking-wider pb-1 border-b border-[var(--border)]">
                            <div>Pásmo</div>
                            <div>Odpovědi "Ne"</div>
                            <div>Doporučení</div>
                        </div>
                        {[
                            { key: "low", emoji: "✅", label: "Bez odchylek", range: "0 – 3", tip: "Sleduj vývoj", color: "green", bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
                            { key: "medium", emoji: "⚠️", label: "Stojí za pozornost", range: "4 – 7", tip: "Konzultace s lékařem", color: "amber", bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
                            { key: "high", emoji: "🔎", label: "Doporučujeme odborníka", range: "8+", tip: "Odborné vyšetření", color: "red", bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
                        ].map((row) => (
                            <div key={row.key} className={`grid grid-cols-3 gap-2 py-2.5 px-2 rounded-lg text-sm ${res === row.key ? row.bg : ""}`}>
                                <div className="flex items-center gap-1.5">
                                    {res === row.key && <span className={`w-2 h-2 rounded-full flex-shrink-0 ${row.dot}`} />}
                                    <span className={res === row.key ? `font-bold ${row.text}` : "text-[var(--muted)]"}>
                                        {row.emoji} {row.label}
                                    </span>
                                </div>
                                <div className={res === row.key ? `font-bold ${row.text}` : "text-[var(--muted)]"}>{row.range}</div>
                                <div className={res === row.key ? row.text : "text-[var(--muted)]"}>{row.tip}</div>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-[var(--muted)] mt-3">* Tvoje aktuální skóre je zvýrazněno. Pásma jsou orientační, nezohledňují věk dítěte ani kontext odpovědí.</p>
                </div>

                {/* Doporučení */}
                <div className="bg-white border border-[var(--border)] rounded-2xl p-5 mb-6">
                    <h3 className="font-serif text-lg font-bold text-[var(--ink)] mb-4">💡 Co dělat dál</h3>
                    <ul className="space-y-3">
                        {výsledekData.doporuceni.map((tip, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-[var(--muted)]">
                                <span className="text-[var(--accent)] font-bold flex-shrink-0 mt-0.5">→</span>
                                {tip}
                            </li>
                        ))}
                    </ul>
                </div>

                <button
                    onClick={() => { setAktuální(0); setOdpovědi({}); setHotovo(false); }}
                    className="w-full py-3 border border-[var(--border)] rounded-xl text-sm font-semibold text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                    Vyplnit znovu
                </button>
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
                    <div className="h-full bg-[var(--accent)] rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
            </div>

            {/* Otázka */}
            <div className="bg-white border border-[var(--border)] rounded-2xl p-6 md:p-8 mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-3">
                    Myslíš na toto dítě...
                </p>
                <h2 className="font-serif text-xl md:text-2xl font-bold text-[var(--ink)] mb-8 leading-snug">
                    {otázka.text}
                </h2>
                <div className="space-y-3">
                    {(["ano", "ne", "nevim"] as Odpověď[]).map((volba) => {
                        const labels = { ano: "✅ Ano, obvykle", ne: "❌ Ne, obvykle ne", nevim: "🤔 Nevím / Těžko říct" };
                        const colors = {
                            ano: "border-green-200 hover:border-green-400 hover:bg-green-50",
                            ne: "border-red-200 hover:border-red-400 hover:bg-red-50",
                            nevim: "border-gray-200 hover:border-gray-400 hover:bg-gray-50",
                        };
                        return (
                            <button
                                key={volba}
                                onClick={() => odpověz(volba)}
                                className={`w-full text-left px-5 py-4 rounded-xl border-2 text-sm font-medium transition-all duration-150 ${colors[volba]} text-[var(--ink)]`}
                            >
                                {labels[volba]}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Zpět */}
            {aktuální > 0 && (
                <button onClick={zpět} className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                    ← Předchozí otázka
                </button>
            )}
        </div>
    );
}
