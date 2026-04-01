"use client";

import { useState, useCallback, useEffect, useRef, useLayoutEffect } from "react";

// ── Typy a pomocné funkce ────────────────────────────────────
type Suit = "♠" | "♥" | "♦" | "♣";
type Card = { suit: Suit; value: number; faceUp: boolean; id: string };
const SUITS: Suit[] = ["♠", "♥", "♦", "♣"];
const RED: Suit[] = ["♥", "♦"];
const VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const LABELS: Record<number, string> = { 1: "A", 11: "J", 12: "Q", 13: "K" };
const label = (v: number) => LABELS[v] ?? String(v);
function isRed(suit: Suit) { return RED.includes(suit); }

function makeDeck(): Card[] {
    const deck: Card[] = [];
    for (const suit of SUITS)
        for (const value of VALUES)
            deck.push({ suit, value, faceUp: true, id: `${suit}${value}` });
    return deck;
}

function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

interface GameState {
    freeCells: (Card | null)[];
    foundations: Card[][];
    tableau: Card[][];
    moves: number;
}

function generateNewGame(): GameState {
    const deck = shuffle(makeDeck());
    // 8 sloupců: první 4 mají 7 karet, poslední 4 mají 6 karet
    const tableau: Card[][] = Array.from({ length: 8 }, () => []);
    for (let i = 0; i < deck.length; i++) {
        tableau[i % 8].push(deck[i]);
    }
    return {
        freeCells: [null, null, null, null],
        foundations: [[], [], [], []],
        tableau,
        moves: 0,
    };
}

function canPlaceOnFoundation(card: Card, foundation: Card[]): boolean {
    if (!foundation) return false;
    if (foundation.length === 0) return card.value === 1;
    const top = foundation[foundation.length - 1];
    return top.suit === card.suit && card.value === top.value + 1;
}

function canPlaceOnTableau(card: Card, column: Card[]): boolean {
    if (!column) return false;
    if (column.length === 0) return true; // na prázdný sloupec lze cokoliv
    const top = column[column.length - 1];
    return isRed(card.suit) !== isRed(top.suit) && card.value === top.value - 1;
}

// Zda jde sekvence karet přesunout (FreeCell pravidlo)
function maxMovableCards(freeCells: (Card | null)[], tableau: Card[][], targetColIdx: number): number {
    const emptyFree = freeCells.filter(c => c === null).length;
    const emptyTableau = tableau.filter((col, i) => i !== targetColIdx && col.length === 0).length;
    return (emptyFree + 1) * Math.pow(2, emptyTableau);
}

// Ověří, že sekvence karet je validní (střídavé barvy, sestupné hodnoty)
function isValidSequence(cards: Card[]): boolean {
    for (let i = 1; i < cards.length; i++) {
        if (isRed(cards[i].suit) === isRed(cards[i - 1].suit)) return false;
        if (cards[i].value !== cards[i - 1].value - 1) return false;
    }
    return true;
}

// ── Pomocné funkce pro velikost karet (8 sloupců místo 7) ─────────────────────
function cardHeight(isFullscreen: boolean, mobileFS: boolean, mobilePortrait: boolean) {
    if (mobilePortrait) return "calc((100vw - 20px) / 8 * 1.5)";
    if (mobileFS) return "19vh";
    if (isFullscreen) return "16.5vh";
    return "130px";
}
function cardMinWidth(isFullscreen: boolean, mobileFS: boolean, mobilePortrait: boolean) {
    if (mobilePortrait) return "calc((100vw - 20px) / 8)";
    if (mobileFS) return "12.7vh";
    if (isFullscreen) return "11vh";
    return "87px";
}

// ── Komponenta karty ───────────────────────────────────────
function CardView({
    card, isDragging, isSelected, onDragStart, onTouchStart, onClick,
    isFullscreen, mobileFS, mobilePortrait, dimmed,
}: {
    card: Card; isDragging?: boolean; isSelected?: boolean;
    onDragStart?: (e: React.DragEvent) => void;
    onTouchStart?: (e: React.TouchEvent) => void;
    onClick?: (e?: React.MouseEvent) => void;
    isFullscreen: boolean; mobileFS: boolean; mobilePortrait: boolean;
    dimmed?: boolean;
}) {
    const red = isRed(card.suit);
    const cardStyle: React.CSSProperties = {
        aspectRatio: "2/3",
        height: cardHeight(isFullscreen, mobileFS, mobilePortrait),
        width: "auto",
        minWidth: cardMinWidth(isFullscreen, mobileFS, mobilePortrait),
    };
    const fs = isFullscreen || mobileFS;
    const labelFontSize = mobilePortrait ? "2.4vw" : fs ? (mobileFS ? "2.6vh" : "2.4vh") : "1rem";
    const centerFontSize = mobilePortrait ? "6.5vw" : fs ? (mobileFS ? "7vh" : "6.5vh") : "3.5rem";

    const baseClass = `relative rounded-xl border-2 transition-all overflow-hidden flex flex-col select-none
        ${isDragging ? "opacity-0 scale-105" : "opacity-100 shadow-lg"}
        ${isSelected ? "ring-4 ring-yellow-400 scale-105 z-50 border-yellow-500 shadow-2xl" : ""}
        ${dimmed ? "opacity-40" : ""}
        bg-white border-gray-300 hover:border-blue-500 cursor-grab`;

    return (
        <div
            draggable
            onDragStart={onDragStart}
            onTouchStart={onTouchStart}
            onClick={onClick}
            className={`${baseClass} ${red ? "text-red-600" : "text-slate-900"}`}
            style={cardStyle}
        >
            <div className="p-1 flex flex-col h-full justify-between items-start relative font-sans">
                <div className="leading-none font-black flex flex-col items-center"
                    style={{ fontSize: labelFontSize }}>
                    <span>{label(card.value)}</span>
                    <span className="mt-0.5">{card.suit}</span>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.1]"
                    style={{ fontSize: centerFontSize }}>
                    {card.suit}
                </div>
                <div className="leading-none font-black self-end rotate-180 flex flex-col items-center"
                    style={{ fontSize: labelFontSize }}>
                    <span>{label(card.value)}</span>
                    <span className="mt-0.5">{card.suit}</span>
                </div>
            </div>
        </div>
    );
}

export default function FreecellClient() {
    const [state, setState] = useState<GameState | null>(null);
    const [draggedIds, setDraggedIds] = useState<string[]>([]);
    const [source, setSource] = useState<{
        type: "freecell" | "tableau";
        cellIdx?: number;
        colIdx?: number;
        cardIdx?: number;
        cards: Card[];
    } | null>(null);
    const [won, setWon] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isLandscape, setIsLandscape] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [cssFullscreen, setCssFullscreen] = useState(false);
    const [windowHeight, setWindowHeight] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);
    const [tableauHeight, setTableauHeight] = useState(0);
    const tableauRef = useRef<HTMLDivElement>(null);
    const [touchDragPos, setTouchDragPos] = useState<{ x: number; y: number } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const sourceRef = useRef(source);
    sourceRef.current = source;
    const lastClickRef = useRef<{ id: string; time: number } | null>(null);

    // ── ResizeObserver ──
    useLayoutEffect(() => {
        const el = tableauRef.current;
        if (!el) return;
        const ro = new ResizeObserver(entries => {
            const h = entries[0]?.contentRect.height ?? 0;
            if (h > 0) setTableauHeight(h);
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    // ── iOS fix: po přepnutí cssFullscreen přečti výšku ručně ──
    useEffect(() => {
        if (!cssFullscreen) return;
        let raf1: number, raf2: number;
        raf1 = requestAnimationFrame(() => {
            raf2 = requestAnimationFrame(() => {
                const h = tableauRef.current?.getBoundingClientRect().height ?? 0;
                if (h > 0) setTableauHeight(h);
            });
        });
        return () => { cancelAnimationFrame(raf1); cancelAnimationFrame(raf2); };
    }, [cssFullscreen]);

    // ── Detekce výhry ──
    useEffect(() => {
        if (!state) return;
        if (state.foundations.every(f => f.length === 13)) {
            const t = setTimeout(() => setWon(true), 400);
            return () => clearTimeout(t);
        }
    }, [state]);

    const checkOrientation = useCallback(() => {
        const landscape = screen.orientation
            ? screen.orientation.angle === 90 || screen.orientation.angle === 270
            : window.innerWidth > window.innerHeight;
        setIsLandscape(landscape);
    }, []);

    const toggleFullscreen = useCallback(() => {
        if (isIOS) { setCssFullscreen(prev => !prev); return; }
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen?.().catch(() => {});
        } else {
            document.exitFullscreen?.();
        }
    }, [isIOS]);

    useEffect(() => {
        const handleTouchMove = (e: TouchEvent) => {
            if (!sourceRef.current) return;
            e.preventDefault();
            const touch = e.touches[0];
            setTouchDragPos({ x: touch.clientX, y: touch.clientY });
        };
        document.addEventListener("touchmove", handleTouchMove, { passive: false });
        return () => document.removeEventListener("touchmove", handleTouchMove);
    }, []);

    useEffect(() => {
        const mobile = "ontouchstart" in window;
        const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
        setIsMobile(mobile);
        setIsIOS(ios);
        setWindowHeight(window.innerHeight);
        setWindowWidth(window.innerWidth);
        if (ios) {
            document.documentElement.style.overscrollBehavior = 'none';
            document.body.style.overscrollBehavior = 'none';
        }
        const onResize = () => { setWindowHeight(window.innerHeight); setWindowWidth(window.innerWidth); };
        const onChange = () => setIsFullscreen(!!document.fullscreenElement);
        window.addEventListener("resize", onResize);
        window.addEventListener("resize", checkOrientation);
        window.addEventListener("orientationchange", checkOrientation);
        screen.orientation?.addEventListener("change", checkOrientation);
        document.addEventListener("fullscreenchange", onChange);
        checkOrientation();
        setState(generateNewGame());
        return () => {
            window.removeEventListener("resize", onResize);
            window.removeEventListener("resize", checkOrientation);
            window.removeEventListener("orientationchange", checkOrientation);
            screen.orientation?.removeEventListener("change", checkOrientation);
            document.removeEventListener("fullscreenchange", onChange);
        };
    }, [checkOrientation]);

    // ── Auto-complete: pokud jsou všechny karty na tableau otočené (jsou vždy) a lze je automaticky přesunout ──
    useEffect(() => {
        if (!state || won) return;
        // Automaticky přesuň kartu na foundation pokud je to bezpečné
        // (bezpečné = hodnota ≤ min(foundations) + 2, aby hra zůstala řešitelná)
        const minFound = Math.min(...state.foundations.map(f => f.length));
        const canAutoMove = (card: Card): boolean => {
            for (let fi = 0; fi < 4; fi++) {
                if (canPlaceOnFoundation(card, state.foundations[fi])) {
                    // Bezpečné přesunout pokud hodnota je A, 2, nebo ≤ minFound + 2
                    if (card.value <= 2 || card.value <= minFound + 2) return true;
                }
            }
            return false;
        };

        // Zkontroluj top karty tableau a freeCells
        const candidates: { card: Card; from: "freecell" | "tableau"; idx: number }[] = [];
        state.freeCells.forEach((c, i) => { if (c && canAutoMove(c)) candidates.push({ card: c, from: "freecell", idx: i }); });
        state.tableau.forEach((col, i) => {
            if (col.length > 0) {
                const c = col[col.length - 1];
                if (canAutoMove(c)) candidates.push({ card: c, from: "tableau", idx: i });
            }
        });
        if (candidates.length === 0) return;

        const timer = setTimeout(() => {
            setState(prev => {
                if (!prev) return null;
                for (const cand of candidates) {
                    for (let fi = 0; fi < 4; fi++) {
                        if (canPlaceOnFoundation(cand.card, prev.foundations[fi])) {
                            const newFreeCells = [...prev.freeCells];
                            const newTableau = prev.tableau.map(c => [...c]);
                            const newFoundations = prev.foundations.map(f => [...f]);
                            if (cand.from === "freecell") newFreeCells[cand.idx] = null;
                            else newTableau[cand.idx] = newTableau[cand.idx].slice(0, -1);
                            newFoundations[fi] = [...newFoundations[fi], cand.card];
                            return { ...prev, freeCells: newFreeCells, tableau: newTableau, foundations: newFoundations, moves: prev.moves + 1 };
                        }
                    }
                }
                return prev;
            });
        }, 150);
        return () => clearTimeout(timer);
    }, [state, won]);

    const executeMove = useCallback((targetType: "tableau" | "foundation" | "freecell", targetIdx: number) => {
        const src = sourceRef.current;
        if (!src) return;

        setState(prev => {
            if (!prev) return null;
            const cards = src.cards;
            const newFreeCells = [...prev.freeCells];
            const newTableau = prev.tableau.map(c => [...c]);
            const newFoundations = prev.foundations.map(f => [...f]);

            // Validace cíle
            if (targetType === "freecell") {
                if (cards.length !== 1) return prev; // do free cellu jen 1 karta
                if (newFreeCells[targetIdx] !== null) return prev; // obsazeno
            } else if (targetType === "foundation") {
                if (cards.length !== 1) return prev;
                if (!canPlaceOnFoundation(cards[0], newFoundations[targetIdx])) return prev;
            } else {
                // tableau
                if (!canPlaceOnTableau(cards[0], newTableau[targetIdx])) return prev;
                if (!isValidSequence(cards)) return prev;
                const maxCards = maxMovableCards(prev.freeCells, prev.tableau, targetIdx);
                if (cards.length > maxCards) return prev;
            }

            // Odeber ze zdroje
            if (src.type === "freecell") {
                newFreeCells[src.cellIdx!] = null;
            } else {
                newTableau[src.colIdx!] = newTableau[src.colIdx!].slice(0, src.cardIdx);
            }

            // Přidej na cíl
            if (targetType === "freecell") {
                newFreeCells[targetIdx] = cards[0];
            } else if (targetType === "foundation") {
                newFoundations[targetIdx] = [...newFoundations[targetIdx], cards[0]];
            } else {
                newTableau[targetIdx] = [...newTableau[targetIdx], ...cards];
            }

            return { ...prev, freeCells: newFreeCells, tableau: newTableau, foundations: newFoundations, moves: prev.moves + 1 };
        });
        setSource(null);
        setDraggedIds([]);
    }, []);

    const handleActionStart = (
        type: "freecell" | "tableau",
        cards: Card[],
        cellIdx?: number,
        colIdx?: number,
        cardIdx?: number,
    ) => {
        if (!cards[0]) return;

        // Double-tap → automaticky na foundation
        const now = Date.now();
        const cardId = cards[0].id;
        if (lastClickRef.current?.id === cardId && now - lastClickRef.current.time < 400) {
            lastClickRef.current = null;
            // Zkus přesunout na foundation
            setState(prev => {
                if (!prev) return null;
                for (let fi = 0; fi < 4; fi++) {
                    if (canPlaceOnFoundation(cards[0], prev.foundations[fi])) {
                        const newFreeCells = [...prev.freeCells];
                        const newTableau = prev.tableau.map(c => [...c]);
                        const newFoundations = prev.foundations.map(f => [...f]);
                        if (type === "freecell") newFreeCells[cellIdx!] = null;
                        else newTableau[colIdx!] = newTableau[colIdx!].slice(0, -1);
                        newFoundations[fi] = [...newFoundations[fi], cards[0]];
                        return { ...prev, freeCells: newFreeCells, tableau: newTableau, foundations: newFoundations, moves: prev.moves + 1 };
                    }
                }
                return prev;
            });
            return;
        }
        lastClickRef.current = { id: cardId, time: now };

        setSource({ type, cellIdx, colIdx, cardIdx, cards });
        setDraggedIds(cards.map(c => c.id));
    };

    const handleTouchEnd = useCallback((e: React.TouchEvent) => {
        setTouchDragPos(null);
        if (!sourceRef.current) return;
        const touch = e.changedTouches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        const target = element?.closest("[data-target]");
        if (target) {
            const type = target.getAttribute("data-target-type") as "tableau" | "foundation" | "freecell";
            const idx = parseInt(target.getAttribute("data-target-idx") || "0");
            executeMove(type, idx);
        } else {
            setSource(null);
            setDraggedIds([]);
        }
    }, [executeMove]);

    if (!state) return null;

    const effectiveFullscreen = isIOS ? cssFullscreen : isFullscreen;
    const mobileFS = isMobile && effectiveFullscreen && isLandscape;
    const showBlocker = isMobile && effectiveFullscreen && !isLandscape;
    const mobilePortrait = isMobile && !isLandscape && !effectiveFullscreen;

    const cardH = cardHeight(effectiveFullscreen, mobileFS, mobilePortrait);
    const cardW = cardMinWidth(effectiveFullscreen, mobileFS, mobilePortrait);

    // Overlapy – FreeCell má všechny karty face-up, tedy jen jeden typ overlapu
    const portraitCardHeightPx = windowWidth > 0 ? (windowWidth - 20) / 8 * 1.5 : 65;
    const overlapFaceUp = mobilePortrait ? `-${(portraitCardHeightPx * 0.70).toFixed(1)}px`
                        : mobileFS       ? "-14vh"
                        : effectiveFullscreen ? "-11vh"
                        : "-95px";

    return (
        <div ref={containerRef} className="contents">
            {/* ── Blocker ── */}
            {showBlocker && (
                <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center p-8 text-center z-[200]">
                    <div className="text-7xl mb-6" style={{ animation: "spin-y 1.5s ease-in-out infinite alternate" }}>🔄</div>
                    <style>{`@keyframes spin-y { from { transform: rotate(-30deg); } to { transform: rotate(30deg); } }`}</style>
                    <h1 className="text-white text-3xl font-black mb-3">OTOČTE TELEFON</h1>
                    <p className="text-slate-400 mb-8 max-w-xs text-sm">Pro full screen režim otočte telefon na šířku.</p>
                    <button onClick={toggleFullscreen}
                        className="bg-slate-800 text-slate-300 px-8 py-3 rounded-2xl font-bold text-base active:scale-95 transition-transform">
                        ✕ Zrušit full screen
                    </button>
                </div>
            )}

            {/* ── Hra ── */}
            <div
                className={`flex flex-col transition-all duration-500 ${
                    showBlocker ? "invisible" :
                    effectiveFullscreen
                        ? mobileFS
                            ? "w-screen fixed inset-0 p-1 bg-slate-300 overflow-hidden z-[200]"
                            : "w-screen fixed inset-0 p-2 sm:p-4 bg-slate-300 overflow-hidden items-center justify-center z-[200]"
                        : mobilePortrait
                            ? "min-h-screen w-full p-1.5 bg-slate-200"
                            : "min-h-screen max-w-6xl mx-auto p-6 shadow-2xl my-4 rounded-3xl bg-slate-200"
                }`}
                style={effectiveFullscreen ? { height: '100svh' } : {}}
                onTouchEnd={handleTouchEnd}
            >
                <div className={`flex flex-col h-full ${
                    effectiveFullscreen ? (mobileFS ? "w-full" : "w-full sm:w-fit") : "w-full"
                }`}>

                    {/* ── Header ── */}
                    <div className={`flex items-center justify-between border-b px-1 ${
                        effectiveFullscreen
                            ? mobileFS ? "border-slate-400 mb-2 py-0.5" : "border-slate-400 mb-4 py-1"
                            : mobilePortrait ? "border-slate-300 mb-1.5 pb-1.5"
                            : "border-slate-300 mb-8 pb-4"
                    }`}>
                        <span className={`font-black tracking-tighter text-slate-800 ${
                            effectiveFullscreen ? "hidden sm:block text-2xl"
                            : mobilePortrait ? "text-base"
                            : "text-2xl"
                        }`}>FREECELL</span>

                        <div className={`flex items-center ${(mobileFS || mobilePortrait) ? "gap-2" : "gap-4"}`}>
                            <div className="flex flex-row items-center gap-1">
                                <span className={`uppercase font-bold text-slate-500 ${(mobileFS || mobilePortrait) ? "text-[8px]" : "text-[10px]"}`}>Tahy</span>
                                <span className={`font-black text-slate-800 leading-none ${(mobileFS || mobilePortrait) ? "text-base" : "text-xl sm:text-2xl"}`}>
                                    {state.moves}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={toggleFullscreen}
                                    className={`bg-white border-2 border-slate-300 rounded-xl font-bold shadow-sm active:bg-slate-50 ${
                                        (mobileFS || mobilePortrait) ? "px-3 py-1.5 text-sm" : "px-3 py-1 text-[10px] sm:text-sm"
                                    }`}>
                                    {(mobileFS || mobilePortrait) ? "⛶" : "Full Screen"}
                                </button>
                                <button onClick={() => { setState(generateNewGame()); setWon(false); }}
                                    className={`bg-white border-2 border-slate-300 rounded-xl font-bold text-red-500 active:bg-slate-50 ${
                                        (mobileFS || mobilePortrait) ? "px-3 py-1.5 text-sm" : "px-3 py-1 text-[10px] sm:text-sm"
                                    }`}>
                                    {(mobileFS || mobilePortrait) ? "↺" : "Restart"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── Horní řada: 4 free celly | mezera | 4 foundations ── */}
                    <div className={`flex ${
                        mobileFS ? "mb-3 gap-3"
                        : mobilePortrait ? "mb-1.5 gap-2"
                        : effectiveFullscreen ? "mb-4 gap-4"
                        : "mb-4 gap-6"
                    }`}>
                        {/* Free celly */}
                        <div className={`grid grid-cols-4 flex-1 ${
                            mobileFS ? "gap-2" : mobilePortrait ? "gap-1" : "gap-3"
                        }`}>
                            {state.freeCells.map((cell, ci) => (
                                <div key={ci}
                                    data-target data-target-type="freecell" data-target-idx={ci}
                                    onClick={() => source && executeMove("freecell", ci)}
                                    onDragOver={e => e.preventDefault()}
                                    onDrop={() => executeMove("freecell", ci)}>
                                    {cell
                                        ? <CardView
                                            card={cell}
                                            isSelected={source?.type === "freecell" && source.cellIdx === ci}
                                            onClick={() => handleActionStart("freecell", [cell], ci)}
                                            onDragStart={() => handleActionStart("freecell", [cell], ci)}
                                            onTouchStart={() => handleActionStart("freecell", [cell], ci)}
                                            isFullscreen={effectiveFullscreen} mobileFS={mobileFS} mobilePortrait={mobilePortrait}
                                        />
                                        : <div className="rounded-xl border-2 border-dashed border-slate-400 bg-slate-300/60 flex items-center justify-center text-slate-400 font-black shadow-inner"
                                            style={{ aspectRatio: "2/3", height: cardH }}>
                                            <span style={{ fontSize: mobilePortrait ? "2.5vw" : mobileFS ? "1.4vh" : "0.75rem" }}>FREE</span>
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>
                        {/* Foundations */}
                        <div className={`grid grid-cols-4 flex-1 ${
                            mobileFS ? "gap-2" : mobilePortrait ? "gap-1" : "gap-3"
                        }`}>
                            {state.foundations.map((f, fi) => (
                                <div key={fi}
                                    data-target data-target-type="foundation" data-target-idx={fi}
                                    onClick={() => source && executeMove("foundation", fi)}
                                    onDragOver={e => e.preventDefault()}
                                    onDrop={() => executeMove("foundation", fi)}>
                                    {f.length > 0
                                        ? <CardView card={f[f.length - 1]} isFullscreen={effectiveFullscreen} mobileFS={mobileFS} mobilePortrait={mobilePortrait} />
                                        : <div className="rounded-xl border-4 border-dashed border-slate-400 text-slate-400 bg-slate-100/50 flex items-center justify-center text-xl sm:text-3xl font-black shadow-inner"
                                            style={{ aspectRatio: "2/3", height: cardH }}>{SUITS[fi]}</div>
                                    }
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Tableau (8 sloupců) ── */}
                    <div ref={tableauRef} className={`grid grid-cols-8 flex-grow items-start ${
                        mobilePortrait ? "gap-1" : effectiveFullscreen ? "gap-2" : "gap-3"
                    }`}>
                        {state.tableau.map((col, ci) => {
                            let dynOverlap = overlapFaceUp;

                            if (col.length > 1 && (mobileFS || mobilePortrait)) {
                                const availablePx = tableauHeight > 10
                                    ? tableauHeight
                                    : (mobileFS && !isIOS && windowHeight > 0 ? windowHeight * 0.63 : 0);

                                if (availablePx > 0) {
                                    const cardPx = mobilePortrait
                                        ? (windowWidth - 20) / 8 * 1.5
                                        : windowHeight * 0.19;
                                    const defaultOverlapPx = cardPx * 0.70;
                                    const totalH = cardPx + (col.length - 1) * (cardPx - defaultOverlapPx);
                                    if (totalH > availablePx) {
                                        const extra = (totalH - availablePx) / (col.length - 1);
                                        dynOverlap = `-${(defaultOverlapPx + extra).toFixed(1)}px`;
                                    }
                                }
                            }

                            // Zjisti zda jsou karty v tomto sloupci přesunutelné (pro vizuální hint)
                            const movableFromIdx = (() => {
                                if (!source) return col.length; // nic není vybráno, vše normálně
                                // Najdi nejdelší validní sekvenci zdola
                                let idx = col.length - 1;
                                while (idx > 0 && isRed(col[idx].suit) !== isRed(col[idx - 1].suit) && col[idx].value === col[idx - 1].value - 1) idx--;
                                return idx;
                            })();

                            return (
                                <div key={ci}
                                    className="flex flex-col items-center relative h-full"
                                    data-target data-target-type="tableau" data-target-idx={ci}
                                    onClick={() => source && source.colIdx !== ci && executeMove("tableau", ci)}
                                    onDragOver={e => e.preventDefault()}
                                    onDrop={() => executeMove("tableau", ci)}>
                                    {col.length === 0 && (
                                        <div className="rounded-xl border-2 border-dashed border-slate-400 opacity-20"
                                            style={{ aspectRatio: "2/3", width: cardW }} />
                                    )}
                                    {col.map((card, cardIdx) => {
                                        const overlap = cardIdx === 0 ? "0" : dynOverlap;
                                        const isSelected = draggedIds.includes(card.id);
                                        return (
                                            <div key={card.id} style={{ marginTop: overlap, zIndex: cardIdx, position: "relative" }}>
                                                <CardView
                                                    card={card}
                                                    isSelected={isSelected}
                                                    isDragging={isSelected && !!touchDragPos}
                                                    onDragStart={() => handleActionStart("tableau", col.slice(cardIdx), undefined, ci, cardIdx)}
                                                    onTouchStart={() => handleActionStart("tableau", col.slice(cardIdx), undefined, ci, cardIdx)}
                                                    onClick={(e) => {
                                                        // @ts-ignore
                                                        e?.stopPropagation();
                                                        handleActionStart("tableau", col.slice(cardIdx), undefined, ci, cardIdx);
                                                    }}
                                                    isFullscreen={effectiveFullscreen} mobileFS={mobileFS} mobilePortrait={mobilePortrait}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── Plovoucí karta při touch dragu ── */}
                {source && touchDragPos && (
                    <div style={{
                        position: "fixed",
                        left: `calc(${touchDragPos.x}px - ${cardW} / 2)`,
                        top: `calc(${touchDragPos.y}px - ${cardH} * 0.65)`,
                        zIndex: 9999,
                        pointerEvents: "none",
                        opacity: 0.92,
                        filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.5))",
                    }}>
                        {source.cards.map((card, i) => (
                            <div key={card.id} style={{ marginTop: i === 0 ? 0 : overlapFaceUp, position: "relative", zIndex: i }}>
                                <CardView card={card} isFullscreen={effectiveFullscreen} mobileFS={mobileFS} mobilePortrait={mobilePortrait} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ── Výherní overlay ── */}
            {won && (
                <div className="fixed inset-0 z-[500] flex items-center justify-center" style={{ background: "rgba(0,0,0,0.55)" }}>
                    <style>{`
                        @keyframes confetti-fall {
                            0%   { transform: translateY(-10px) rotate(0deg);   opacity: 1; }
                            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                        }
                        @keyframes win-pop {
                            0%   { transform: scale(0.6); opacity: 0; }
                            70%  { transform: scale(1.05); }
                            100% { transform: scale(1);   opacity: 1; }
                        }
                        .confetti-piece {
                            position: fixed; top: -20px;
                            border-radius: 2px;
                            animation: confetti-fall linear forwards;
                            pointer-events: none;
                        }
                    `}</style>
                    {Array.from({ length: 48 }).map((_, i) => (
                        <div key={i} className="confetti-piece" style={{
                            left: `${Math.random() * 100}%`,
                            background: ["#f59e0b","#ef4444","#3b82f6","#10b981","#8b5cf6","#ec4899","#f97316"][i % 7],
                            animationDuration: `${1.8 + Math.random() * 2}s`,
                            animationDelay: `${Math.random() * 1.2}s`,
                            width: `${8 + Math.random() * 8}px`,
                            height: `${10 + Math.random() * 10}px`,
                            transform: `rotate(${Math.random() * 360}deg)`,
                        }} />
                    ))}
                    <div style={{ animation: "win-pop 0.5s cubic-bezier(.34,1.56,.64,1) forwards" }}
                        className="bg-white rounded-3xl shadow-2xl flex flex-col items-center px-10 py-8 gap-4 text-center max-w-xs w-full mx-4">
                        <div style={{ fontSize: "3.5rem", lineHeight: 1 }}>🏆</div>
                        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Výhra!</h2>
                        <p className="text-slate-500 text-sm font-medium">
                            Dokončeno za <span className="text-slate-800 font-black text-base">{state.moves}</span> tahů
                        </p>
                        <button
                            onClick={() => { setState(generateNewGame()); setWon(false); }}
                            className="mt-2 w-full bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white font-black text-lg rounded-2xl py-3 shadow-lg shadow-blue-200">
                            Nová hra
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
