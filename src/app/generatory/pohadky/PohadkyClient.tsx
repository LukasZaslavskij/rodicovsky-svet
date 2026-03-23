"use client";

import { useState } from "react";

const DÉLKY = [
    { value: "1", label: "1 minuta", emoji: "⚡", popis: "Krátká pohádka na dobrou noc" },
    { value: "3", label: "3 minuty", emoji: "🌙", popis: "Klasická pohádka před spaním" },
    { value: "5", label: "5 minut", emoji: "📖", popis: "Delší příběh plný dobrodružství" },
];

const PŘÍKLADY = [
    { jmena: "Eliška", klíčová: "drak, les, kouzelný meč", délka: "3" },
    { jmena: "Tomáš a Matyáš", klíčová: "vesmír, robot, hvězdy", délka: "3" },
    { jmena: "Anička", klíčová: "jednorožec, duha, čarovný les", délka: "1" },
];

export default function PohadkyClient() {
    const [jmena, setJmena] = useState("");
    const [klíčová, setKlíčová] = useState("");
    const [délka, setDélka] = useState("3");
    const [pohádka, setPohádka] = useState("");
    const [načítá, setNačítá] = useState(false);
    const [chyba, setChyba] = useState("");

    const generovat = async () => {
        if (!jmena.trim()) { setChyba("Zadej prosím jméno dítěte."); return; }
        if (!klíčová.trim()) { setChyba("Zadej prosím aspoň jedno klíčové slovo."); return; }

        const apiKey = process.env.NEXT_PUBLIC_GEMINI_KEY;
        if (!apiKey) {
            setChyba("API klíč není nastaven. Přidej NEXT_PUBLIC_GEMINI_KEY do Vercel environment variables.");
            return;
        }

        setChyba("");
        setNačítá(true);
        setPohádka("");

        const délkaSlova: Record<string, string> = {
            "1": "velmi krátká (asi 150 slov)",
            "3": "středně dlouhá (asi 400 slov)",
            "5": "delší (asi 700 slov)",
        };

        const prompt = `Napiš českou pohádku pro děti.

Hlavní postava (nebo postavy): ${jmena}
Klíčová slova, která musí pohádka obsahovat: ${klíčová}
Délka pohádky: ${délkaSlova[délka]}

Pravidla:
- Pohádka musí být v češtině
- Musí být vhodná pro děti předškolního a školního věku
- Musí mít šťastný konec
- Hlavní hrdina je ${jmena} — dítě nebo děti tohoto jména
- Použij klíčová slova přirozeně v příběhu
- Začni nadpisem pohádky na prvním řádku (jen text, bez uvozovek nebo #)
- Piš příběh v odstavcích, přirozeným pohádkovým jazykem
- Nepoužívej markdown (žádné *, #, atd.)`;

        try {
            const maxTokens = délka === "5" ? 12000 : délka === "3" ? 6000 : 4500;

            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 60000); // 60s timeout

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    signal: controller.signal,
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                        generationConfig: {
                            temperature: 0.9,
                            maxOutputTokens: maxTokens,
                        },
                    }),
                }
            );
            clearTimeout(timeout);

            const data = await response.json();
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (text) {
                setPohádka(text.trim());
            } else if (data?.error) {
                setChyba(`Chyba API: ${data.error.message}`);
            } else {
                setChyba("Nepodařilo se vygenerovat pohádku. Zkus to prosím znovu.");
            }
        } catch (err: unknown) {
            if (err instanceof Error && err.name === "AbortError") {
                setChyba("Generování trvalo příliš dlouho. Zkus to znovu nebo vyber kratší pohádku.");
            } else {
                setChyba("Nastala chyba při generování. Zkontroluj připojení a zkus znovu.");
            }
        } finally {
            setNačítá(false);
        }
    };

    const použítPříklad = (p: typeof PŘÍKLADY[0]) => {
        setJmena(p.jmena);
        setKlíčová(p.klíčová);
        setDélka(p.délka);
        setPohádka("");
        setChyba("");
    };

    const tisknout = () => {
        const okno = window.open("", "_blank");
        if (!okno) return;
        const řádky = pohádka.split("\n").filter(r => r.trim());
        const nadpis = řádky[0];
        const odstavce = řádky.slice(1);
        okno.document.write(`
      <html><head><title>${nadpis}</title>
      <style>body{font-family:Georgia,serif;max-width:600px;margin:40px auto;line-height:1.8;font-size:16px}h1{font-size:24px;margin-bottom:24px}p{margin-bottom:16px}</style>
      </head><body>
      <h1>${nadpis}</h1>
      ${odstavce.map(o => `<p>${o}</p>`).join("")}
      </body></html>
    `);
        okno.print();
    };

    const formátovanáPohádka = () => {
        const řádky = pohádka.split("\n").filter(r => r.trim());
        if (řádky.length === 0) return null;
        return { nadpis: řádky[0], odstavce: řádky.slice(1) };
    };

    const fp = pohádka ? formátovanáPohádka() : null;

    return (
        <div className="max-w-2xl mx-auto">

            {/* Formulář */}
            <div className="bg-white border border-[var(--border)] rounded-2xl p-6 md:p-8 mb-6">

                {/* Jméno */}
                <div className="mb-5">
                    <label className="block text-sm font-bold text-[var(--ink)] mb-2">
                        👶 Jméno dítěte (nebo dětí)
                    </label>
                    <input
                        type="text"
                        value={jmena}
                        onChange={(e) => setJmena(e.target.value)}
                        placeholder="např. Eliška, nebo Tomáš a Matyáš"
                        className="w-full px-4 py-3 border-2 border-[var(--border)] rounded-xl text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                    />
                </div>

                {/* Klíčová slova */}
                <div className="mb-5">
                    <label className="block text-sm font-bold text-[var(--ink)] mb-2">
                        🔑 O čem má pohádka být?
                    </label>
                    <input
                        type="text"
                        value={klíčová}
                        onChange={(e) => setKlíčová(e.target.value)}
                        placeholder="např. drak, kouzelný les, rytíř, hvězdy"
                        className="w-full px-4 py-3 border-2 border-[var(--border)] rounded-xl text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                    />
                    <p className="text-xs text-[var(--muted)] mt-1.5">Odděl klíčová slova čárkou</p>
                </div>

                {/* Délka */}
                <div className="mb-6">
                    <label className="block text-sm font-bold text-[var(--ink)] mb-2">
                        ⏱ Délka pohádky
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {DÉLKY.map((d) => (
                            <button
                                key={d.value}
                                onClick={() => setDélka(d.value)}
                                className={`p-3 rounded-xl border-2 text-center transition-all ${
                                    délka === d.value
                                        ? "border-[var(--accent)] bg-[var(--rose)]"
                                        : "border-[var(--border)] hover:border-[var(--accent)]"
                                }`}
                            >
                                <div className="text-2xl mb-1">{d.emoji}</div>
                                <div className={`text-sm font-bold ${délka === d.value ? "text-[var(--accent)]" : "text-[var(--ink)]"}`}>
                                    {d.label}
                                </div>
                                <div className="text-xs text-[var(--muted)] mt-0.5">{d.popis}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {chyba && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-sm text-red-700">
                        {chyba}
                    </div>
                )}

                <button
                    onClick={generovat}
                    disabled={načítá}
                    className="w-full py-4 bg-[var(--accent)] text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2 text-base"
                >
                    {načítá ? (
                        <>
                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            {délka === "5" ? "Píšeme delší pohádku, chvilku strpení…" : "Píšeme pohádku…"}
                        </>
                    ) : (
                        <>✨ Vygenerovat pohádku</>
                    )}
                </button>
            </div>

            {/* Loading indikátor */}
            {načítá && (
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-6 mb-6 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="flex gap-1.5">
                            {[0, 1, 2].map((i) => (
                                <div
                                    key={i}
                                    className="w-3 h-3 rounded-full bg-purple-400 animate-bounce"
                                    style={{ animationDelay: `${i * 0.15}s` }}
                                />
                            ))}
                        </div>
                    </div>
                    <p className="font-serif text-lg font-bold text-[var(--ink)] mb-1">Píšeme pohádku pro {jmena}…</p>
                    <p className="text-sm text-[var(--muted)]">
                        {délka === "5"
                            ? "Delší pohádka může trvat 30–40 vteřin, buď trpělivý/á 🧚"
                            : "Chvilku strpení, pohádka se tvoří ✨"}
                    </p>
                </div>
            )}

            {/* Příklady */}
            {!pohádka && !načítá && (
                <div className="mb-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-3">Vyzkoušej příklad</p>
                    <div className="flex flex-wrap gap-2">
                        {PŘÍKLADY.map((p, i) => (
                            <button
                                key={i}
                                onClick={() => použítPříklad(p)}
                                className="px-3 py-1.5 border border-[var(--border)] rounded-full text-xs text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                            >
                                {p.jmena} · {p.klíčová}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Výsledek */}
            {fp && (
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-serif text-2xl font-bold text-[var(--ink)]">{fp.nadpis}</h2>
                        <span className="text-2xl">🧚</span>
                    </div>
                    <div className="space-y-4">
                        {fp.odstavce.map((odstavec, i) => (
                            odstavec.trim() ? (
                                <p key={i} className="text-[var(--ink)] leading-relaxed">{odstavec}</p>
                            ) : null
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-purple-200">
                        <button onClick={generovat} className="flex items-center gap-2 px-4 py-2 border border-purple-300 rounded-xl text-sm font-semibold text-purple-700 hover:bg-purple-100 transition-colors">
                            🔄 Vygenerovat znovu
                        </button>
                        <button onClick={tisknout} className="flex items-center gap-2 px-4 py-2 border border-purple-300 rounded-xl text-sm font-semibold text-purple-700 hover:bg-purple-100 transition-colors">
                            🖨️ Tisknout
                        </button>
                        <button onClick={() => { navigator.clipboard.writeText(pohádka); alert("Pohádka zkopírována!"); }} className="flex items-center gap-2 px-4 py-2 border border-purple-300 rounded-xl text-sm font-semibold text-purple-700 hover:bg-purple-100 transition-colors">
                            📋 Kopírovat
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}
