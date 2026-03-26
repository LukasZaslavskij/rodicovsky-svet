"use client";

import { useState, useCallback, useEffect, useRef } from "react";

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
            deck.push({ suit, value, faceUp: false, id: `${suit}${value}` });
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
    stock: Card[];
    waste: Card[];
    foundations: Card[][];
    tableau: Card[][];
    moves: number;
}

function generateNewGame(): GameState {
    const deck = shuffle(makeDeck());
    const tableau: Card[][] = Array.from({ length: 7 }, () => []);
    let idx = 0;
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row <= col; row++) {
            const card = { ...deck[idx++], faceUp: row === col };
            tableau[col].push(card);
        }
    }
    return { stock: deck.slice(idx).map(c => ({ ...c, faceUp: false })), waste: [], foundations: [[], [], [], []], tableau, moves: 0 };
}

function canPlaceOnFoundation(card: Card, foundation: Card[]): boolean {
    if (!foundation) return false;
    if (foundation.length === 0) return card.value === 1;
    const top = foundation[foundation.length - 1];
    return top.suit === card.suit && card.value === top.value + 1;
}

function canPlaceOnTableau(card: Card, column: Card[]): boolean {
    if (!column) return false;
    if (column.length === 0) return card.value === 13;
    const top = column[column.length - 1];
    if (!top.faceUp) return false;
    return isRed(card.suit) !== isRed(top.suit) && card.value === top.value - 1;
}

// ── Pomocné funkce pro velikost karet ─────────────────────
function cardHeight(isFullscreen: boolean, mobileFS: boolean) {
    if (mobileFS) return "22vh";
    if (isFullscreen) return "16.5vh";
    return "150px";
}
function cardMinWidth(isFullscreen: boolean, mobileFS: boolean) {
    if (mobileFS) return "14.7vh";
    if (isFullscreen) return "11vh";
    return "100px";
}

// ── Komponenta karty ───────────────────────────────────────
function CardView({
    card, isDragging, isSelected, onDragStart, onTouchStart, onClick, isFullscreen, mobileFS
}: {
    card: Card; isDragging?: boolean; isSelected?: boolean;
    onDragStart?: (e: React.DragEvent) => void;
    onTouchStart?: (e: React.TouchEvent) => void;
    onClick?: (e?: React.MouseEvent) => void;
    isFullscreen: boolean; mobileFS: boolean;
}) {
    const red = isRed(card.suit);
    const cardStyle: React.CSSProperties = {
        aspectRatio: "2/3",
        height: cardHeight(isFullscreen, mobileFS),
        width: "auto",
        minWidth: cardMinWidth(isFullscreen, mobileFS),
    };
    const fs = isFullscreen || mobileFS;

    const baseClass = `relative rounded-xl border-2 transition-all overflow-hidden flex flex-col select-none
        ${isDragging ? "opacity-0 scale-105" : "opacity-100 shadow-lg"}
        ${isSelected ? "ring-4 ring-yellow-400 scale-105 z-50 border-yellow-500 shadow-2xl" : ""}
        ${!card.faceUp ? "bg-blue-800 border-white shadow-md" : "bg-white border-gray-300 hover:border-blue-500 cursor-grab"}`;

    return (
        <div
            draggable={card.faceUp}
            onDragStart={onDragStart}
            onTouchStart={onTouchStart}
            onClick={onClick}
            className={`${baseClass} ${red ? "text-red-600" : "text-slate-900"}`}
            style={cardStyle}
        >
            {card.faceUp ? (
                <div className="p-1.5 flex flex-col h-full justify-between items-start relative font-sans">
                    <div className="leading-none font-black flex flex-col items-center"
                        style={{ fontSize: fs ? (mobileFS ? "3vh" : "2.4vh") : "1.2rem" }}>
                        <span>{label(card.value)}</span>
                        <span className="mt-0.5">{card.suit}</span>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.1]"
                        style={{ fontSize: fs ? (mobileFS ? "8.5vh" : "7vh") : "4.5rem" }}>
                        {card.suit}
                    </div>
                    <div className="leading-none font-black self-end rotate-180 flex flex-col items-center"
                        style={{ fontSize: fs ? (mobileFS ? "3vh" : "2.4vh") : "1.2rem" }}>
                        <span>{label(card.value)}</span>
                        <span className="mt-0.5">{card.suit}</span>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default function SolitaireClient() {
    const [state, setState] = useState<GameState | null>(null);
    const [draggedIds, setDraggedIds] = useState<string[]>([]);
    const [source, setSource] = useState<{ type: string; colIdx?: number; cardIdx?: number; cards: Card[] } | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isLandscape, setIsLandscape] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [touchDragPos, setTouchDragPos] = useState<{ x: number; y: number } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const sourceRef = useRef(source);
    sourceRef.current = source;
    const lastClickRef = useRef<{ id: string; time: number } | null>(null);

    const autoMoveToFoundation = useCallback((card: Card, from: "waste" | "tableau", colIdx?: number) => {
        setState(prev => {
            if (!prev) return null;
            for (let fi = 0; fi < 4; fi++) {
                if (canPlaceOnFoundation(card, prev.foundations[fi])) {
                    const newTableau = prev.tableau.map(c => [...c]);
                    const newFoundations = prev.foundations.map(f => [...f]);
                    let newWaste = [...prev.waste];
                    if (from === "waste") newWaste.pop();
                    else if (from === "tableau" && colIdx !== undefined) {
                        newTableau[colIdx] = newTableau[colIdx].slice(0, -1);
                        if (newTableau[colIdx].length > 0)
                            newTableau[colIdx][newTableau[colIdx].length - 1].faceUp = true;
                    }
                    newFoundations[fi] = [...newFoundations[fi], card];
                    return { ...prev, tableau: newTableau, foundations: newFoundations, waste: newWaste, moves: prev.moves + 1 };
                }
            }
            return prev;
        });
    }, []);

    const checkOrientation = useCallback(() => {
        // Použij screen.orientation pokud je dostupné, jinak window rozměry
        const landscape = screen.orientation
            ? screen.orientation.angle === 90 || screen.orientation.angle === 270
            : window.innerWidth > window.innerHeight;
        setIsLandscape(landscape);
    }, []);

    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen?.().catch(() => {});
        } else {
            document.exitFullscreen?.();
        }
    }, []);

    // Globální touchmove – aktualizuje pozici plovoucí karty a blokuje scroll při dragu
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
        setIsMobile("ontouchstart" in window);
        const onChange = () => setIsFullscreen(!!document.fullscreenElement);
        window.addEventListener("resize", checkOrientation);
        window.addEventListener("orientationchange", checkOrientation);
        screen.orientation?.addEventListener("change", checkOrientation);
        document.addEventListener("fullscreenchange", onChange);
        checkOrientation();
        setState(generateNewGame());
        return () => {
            window.removeEventListener("resize", checkOrientation);
            window.removeEventListener("orientationchange", checkOrientation);
            screen.orientation?.removeEventListener("change", checkOrientation);
            document.removeEventListener("fullscreenchange", onChange);
        };
    }, [checkOrientation]);

    const executeMove = useCallback((targetType: "tableau" | "foundation", targetIdx: number) => {
        const src = sourceRef.current;
        if (!src) return;
        setState(prev => {
            if (!prev) return null;
            const cards = src.cards;
            const canMove = targetType === "tableau"
                ? canPlaceOnTableau(cards[0], prev.tableau[targetIdx])
                : cards.length === 1 && canPlaceOnFoundation(cards[0], prev.foundations[targetIdx]);
            if (!canMove) return prev;
            const newTableau = prev.tableau.map(c => [...c]);
            const newFoundations = prev.foundations.map(f => [...f]);
            let newWaste = [...prev.waste];
            if (src.type === "waste") newWaste.pop();
            else if (src.type === "tableau" && src.colIdx !== undefined) {
                newTableau[src.colIdx] = newTableau[src.colIdx].slice(0, src.cardIdx);
                if (newTableau[src.colIdx].length > 0)
                    newTableau[src.colIdx][newTableau[src.colIdx].length - 1].faceUp = true;
            }
            if (targetType === "tableau") newTableau[targetIdx] = [...newTableau[targetIdx], ...cards];
            else newFoundations[targetIdx] = [...newFoundations[targetIdx], cards[0]];
            return { ...prev, tableau: newTableau, foundations: newFoundations, waste: newWaste, moves: prev.moves + 1 };
        });
        setSource(null);
        setDraggedIds([]);
    }, []);

    // ── Auto-complete: když jsou všechny karty otočené, automaticky přesuň na foundations ──
    useEffect(() => {
        if (!state) return;
        const allFaceUp = state.tableau.every(col => col.every(c => c.faceUp))
            && state.stock.length === 0;
        if (!allFaceUp) return;

        const timer = setTimeout(() => {
            setState(prev => {
                if (!prev) return null;
                const sources: { card: Card; from: "waste" | "tableau"; colIdx?: number }[] = [];
                if (prev.waste.length > 0) sources.push({ card: prev.waste[prev.waste.length - 1], from: "waste" });
                prev.tableau.forEach((col, ci) => {
                    if (col.length > 0) sources.push({ card: col[col.length - 1], from: "tableau", colIdx: ci });
                });
                for (const src of sources) {
                    for (let fi = 0; fi < 4; fi++) {
                        if (canPlaceOnFoundation(src.card, prev.foundations[fi])) {
                            const newTableau = prev.tableau.map(c => [...c]);
                            const newFoundations = prev.foundations.map(f => [...f]);
                            let newWaste = [...prev.waste];
                            if (src.from === "waste") newWaste.pop();
                            else if (src.from === "tableau" && src.colIdx !== undefined)
                                newTableau[src.colIdx] = newTableau[src.colIdx].slice(0, -1);
                            newFoundations[fi] = [...newFoundations[fi], src.card];
                            return { ...prev, tableau: newTableau, foundations: newFoundations, waste: newWaste, moves: prev.moves + 1 };
                        }
                    }
                }
                return prev;
            });
        }, 150);
        return () => clearTimeout(timer);
    }, [state]);

    const handleActionStart = (type: string, cards: Card[], colIdx?: number, cardIdx?: number) => {
        if (type === "stock") {
            setState(prev => {
                if (!prev) return prev;
                if (prev.stock.length === 0)
                    return { ...prev, stock: [...prev.waste].map(c => ({ ...c, faceUp: false })).reverse(), waste: [] };
                const newStock = [...prev.stock];
                const card = newStock.pop();
                return card ? { ...prev, stock: newStock, waste: [...prev.waste, { ...card, faceUp: true }] } : prev;
            });
            return;
        }
        if (!cards[0]?.faceUp) return;

        // Double-click / double-tap – automaticky přesuň na foundation
        const now = Date.now();
        const cardId = cards[0].id;
        if (lastClickRef.current?.id === cardId && now - lastClickRef.current.time < 400) {
            lastClickRef.current = null;
            autoMoveToFoundation(cards[0], type as "waste" | "tableau", colIdx);
            return;
        }
        lastClickRef.current = { id: cardId, time: now };

        setSource({ type, colIdx, cardIdx, cards });
        setDraggedIds(cards.map(c => c.id));
    };

    // Touch konec – funguje pro celý kontejner, najde data-target pod prstem
    const handleTouchEnd = useCallback((e: React.TouchEvent) => {
        setTouchDragPos(null);
        if (!sourceRef.current) return;
        const touch = e.changedTouches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        const target = element?.closest("[data-target]");
        if (target) {
            const type = target.getAttribute("data-target-type") as "tableau" | "foundation";
            const idx = parseInt(target.getAttribute("data-target-idx") || "0");
            executeMove(type, idx);
        } else {
            setSource(null);
            setDraggedIds([]);
        }
    }, [executeMove]);

    if (!state) return null;

    const showBlocker = isMobile && (!isLandscape || !isFullscreen);
    const mobileFS = isMobile && isFullscreen && isLandscape;
    const cardH = cardHeight(isFullscreen, mobileFS);
    const cardW = cardMinWidth(isFullscreen, mobileFS);
    const overlapFaceUp   = mobileFS ? "-16vh"   : isFullscreen ? "-12vh"   : "-105px";
    const overlapFaceDown = mobileFS ? "-19.5vh" : isFullscreen ? "-14.5vh" : "-120px";

    return (
        // Jeden stálý wrapper s ref – nikdy se neodmountuje, takže fullscreen zůstane
        <div
            ref={containerRef}
            className="contents"
        >
            {/* ── Blocker – překryje vše když podmínky nejsou splněny ── */}
            {showBlocker && (
                <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center p-8 text-center z-[999]">
                    <div className="text-7xl mb-6" style={{ animation: "spin-y 1.5s ease-in-out infinite alternate" }}>🔄</div>
                    <style>{`@keyframes spin-y { from { transform: rotate(-30deg); } to { transform: rotate(30deg); } }`}</style>
                    <h1 className="text-white text-3xl font-black mb-3">PŘEVRAŤTE OBRAZOVKU</h1>
                    <p className="text-slate-400 mb-2 max-w-xs text-sm">1. Klikněte na Full Screen níže.</p>
                    <p className="text-slate-500 mb-8 max-w-xs text-xs">2. Pak otočte telefon na šířku.</p>
                    <div className="flex flex-col gap-4 w-full max-w-xs">
                        <button
                            onClick={toggleFullscreen}
                            className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xl active:scale-95 transition-transform shadow-lg shadow-blue-900"
                        >
                            ⛶ ZAPNOUT FULL SCREEN
                        </button>
                        <button
                            onClick={() => window.history.back()}
                            className="bg-slate-800 text-slate-300 px-8 py-3 rounded-2xl font-bold text-base active:scale-95 transition-transform"
                        >
                            ← ZPĚT
                        </button>
                    </div>
                </div>
            )}

            {/* ── Hra – vždy mountovaná, schovaná za blockerem pokud je blocker aktivní ── */}
            <div
                className={`flex flex-col transition-all duration-500 ${
                    showBlocker ? "invisible" :
                    isFullscreen
                        ? mobileFS
                            ? "h-screen w-screen fixed inset-0 p-1 bg-slate-300 overflow-hidden"
                            : "h-screen w-screen fixed inset-0 p-2 sm:p-4 bg-slate-300 overflow-hidden items-center justify-center"
                        : "min-h-screen max-w-6xl mx-auto p-6 shadow-2xl my-4 rounded-3xl bg-slate-200"
                }`}
                onTouchEnd={handleTouchEnd}
            >
                <div className={`flex flex-col h-full ${
                    isFullscreen ? (mobileFS ? "w-full" : "w-full sm:w-fit") : "w-full"
                }`}>

                    {/* ── Header ── */}
                    <div className={`flex items-center justify-between border-b px-1 ${
                        isFullscreen
                            ? mobileFS ? "border-slate-400 mb-2 py-0.5" : "border-slate-400 mb-4 py-1"
                            : "border-slate-300 mb-8 pb-4"
                    }`}>
                        <span className={`font-black tracking-tighter text-slate-800 ${
                            isFullscreen ? "hidden sm:block text-2xl" : "text-2xl"
                        }`}>SOLITAIRE</span>

                        <div className={`flex items-center ${mobileFS ? "gap-2" : "gap-4"}`}>
                            <div className="flex flex-row items-center gap-1">
                                <span className={`uppercase font-bold text-slate-500 ${mobileFS ? "text-[8px]" : "text-[10px]"}`}>Tahy</span>
                                <span className={`font-black text-slate-800 leading-none ${mobileFS ? "text-base" : "text-xl sm:text-2xl"}`}>
                                    {state.moves}
                                </span>
                            </div>
                            <div className={`flex ${mobileFS ? "gap-2" : "gap-2"}`}>
                                <button
                                    onClick={toggleFullscreen}
                                    className={`bg-white border-2 border-slate-300 rounded-xl font-bold shadow-sm active:bg-slate-50 ${
                                        mobileFS ? "px-4 py-1.5 text-sm" : "px-3 py-1 text-[10px] sm:text-sm"
                                    }`}
                                >
                                    {mobileFS ? "⛶" : "Full Screen"}
                                </button>
                                <button
                                    onClick={() => setState(generateNewGame())}
                                    className={`bg-white border-2 border-slate-300 rounded-xl font-bold text-red-500 active:bg-slate-50 ${
                                        mobileFS ? "px-4 py-1.5 text-sm" : "px-3 py-1 text-[10px] sm:text-sm"
                                    }`}
                                >
                                    {mobileFS ? "↺" : "Restart"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── Horní řada ── */}
                    <div className={`grid grid-cols-7 mb-4 ${isFullscreen ? "gap-2" : "gap-4"}`}>
                        <div className="flex gap-1 sm:gap-2 col-span-2">
                            <div className="w-fit"
                                onClick={(e) => { if (!('ontouchstart' in window)) handleActionStart("stock", []); }}
                                onTouchEnd={(e) => { e.stopPropagation(); handleActionStart("stock", []); }}
                                style={{ touchAction: "none" }}>
                                {state.stock.length > 0
                                    ? <CardView card={{ suit: "♠", value: 1, faceUp: false, id: "back" }} isFullscreen={isFullscreen} mobileFS={mobileFS} />
                                    : <div className="rounded-xl border-4 border-dashed border-slate-400 flex items-center justify-center text-4xl text-slate-400"
                                        style={{ aspectRatio: "2/3", height: cardH }}>↺</div>
                                }
                            </div>
                            <div className="w-fit">
                                {state.waste.length > 0 && (
                                    <CardView
                                        card={state.waste[state.waste.length - 1]}
                                        isSelected={source?.type === "waste"}
                                        onClick={() => handleActionStart("waste", [state.waste[state.waste.length - 1]])}
                                        onDragStart={() => handleActionStart("waste", [state.waste[state.waste.length - 1]])}
                                        onTouchStart={() => handleActionStart("waste", [state.waste[state.waste.length - 1]])}
                                        isFullscreen={isFullscreen} mobileFS={mobileFS}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="col-span-1" />
                        <div className="col-span-4 grid grid-cols-4 gap-1 sm:gap-2">
                            {state.foundations.map((f, fi) => (
                                <div key={fi}
                                    data-target data-target-type="foundation" data-target-idx={fi}
                                    onClick={() => source && executeMove("foundation", fi)}
                                    onDragOver={e => e.preventDefault()}
                                    onDrop={() => executeMove("foundation", fi)}>
                                    {f.length > 0
                                        ? <CardView card={f[f.length - 1]} isFullscreen={isFullscreen} mobileFS={mobileFS} />
                                        : <div className="rounded-xl border-4 border-dashed border-slate-400 text-slate-400 bg-slate-100/50 flex items-center justify-center text-xl sm:text-3xl font-black shadow-inner"
                                            style={{ aspectRatio: "2/3", height: cardH }}>{SUITS[fi]}</div>
                                    }
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Tableau ── */}
                    <div className={`grid grid-cols-7 flex-grow items-start ${isFullscreen ? "gap-2" : "gap-4"}`}>
                        {state.tableau.map((col, ci) => {
                            let dynOverlapFaceUp = overlapFaceUp;
                            let dynOverlapFaceDown = overlapFaceDown;
                            if (mobileFS && col.length > 1) {
                                // Výchozí: karta 22vh, face-up viditelná část = 22-16 = 6vh, face-down = 22-19.5 = 2.5vh
                                // Celková výška sloupce s výchozím overlapem:
                                const cardVh = 22;
                                const defaultUp = 16;
                                const defaultDown = 19.5;
                                const faceDownCount = col.filter((c, i) => i > 0 && !col[i-1].faceUp).length;
                                const faceUpCount = (col.length - 1) - faceDownCount;
                                const totalH = cardVh + faceUpCount * (cardVh - defaultUp) + faceDownCount * (cardVh - defaultDown);
                                const availableVh = 63;
                                if (totalH > availableVh) {
                                    // Přidej extra překryv rovnoměrně na všechny mezery
                                    const extra = (totalH - availableVh) / (col.length - 1);
                                    dynOverlapFaceUp   = `-${defaultUp + extra}vh`;
                                    dynOverlapFaceDown = `-${defaultDown + extra}vh`;
                                }
                            }
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
                                    const overlap = cardIdx === 0 ? "0"
                                        : (col[cardIdx - 1].faceUp ? dynOverlapFaceUp : dynOverlapFaceDown);
                                    return (
                                        <div key={card.id} style={{ marginTop: overlap, zIndex: cardIdx, position: "relative" }}>
                                            <CardView
                                                card={card}
                                                isSelected={draggedIds.includes(card.id)}
                                                isDragging={draggedIds.includes(card.id) && !!touchDragPos}
                                                onDragStart={() => handleActionStart("tableau", col.slice(cardIdx), ci, cardIdx)}
                                                onTouchStart={() => handleActionStart("tableau", col.slice(cardIdx), ci, cardIdx)}
                                                onClick={(e) => {
                                                    // @ts-ignore
                                                    e?.stopPropagation();
                                                    handleActionStart("tableau", col.slice(cardIdx), ci, cardIdx);
                                                }}
                                                isFullscreen={isFullscreen} mobileFS={mobileFS}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── Plovoucí karta sledující prst při touch dragu ── */}
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
                                <CardView card={card} isFullscreen={isFullscreen} mobileFS={mobileFS} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
