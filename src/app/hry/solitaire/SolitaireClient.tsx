"use client";

import { useState, useCallback, useEffect, useRef } from "react";

// ── Typy a pomocné funkce ──────────────────────────────────
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
    return {
        stock: deck.slice(idx).map(c => ({ ...c, faceUp: false })),
        waste: [],
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
    if (column.length === 0) return card.value === 13;
    const top = column[column.length - 1];
    if (!top.faceUp) return false;
    return isRed(card.suit) !== isRed(top.suit) && card.value === top.value - 1;
}

function CardView({
                      card, isDragging, onDragStart, onDoubleClick, isFullscreen
                  }: {
    card: Card; isDragging?: boolean; onDragStart?: (e: React.DragEvent) => void;
    onDoubleClick?: () => void; isFullscreen: boolean;
}) {
    const red = isRed(card.suit);
    const cardStyle: React.CSSProperties = {
        aspectRatio: "2/3",
        height: isFullscreen ? "16.5vh" : "150px",
        width: "auto",
        minWidth: isFullscreen ? "11vh" : "100px",
    };

    const baseClass = `relative rounded-xl border-2 transition-all overflow-hidden flex flex-col select-none
        ${isDragging ? "opacity-0 scale-105" : "opacity-100 shadow-lg"}
        ${!card.faceUp ? "bg-blue-800 border-white shadow-md" : "bg-white border-gray-300 hover:border-blue-500 cursor-grab"}`;

    if (!card.faceUp) {
        return (
            <div className={baseClass} style={cardStyle}>
                <div className="absolute inset-1 rounded-lg border border-white/20 overflow-hidden">
                    <div className="w-full h-full opacity-40"
                         style={{
                             backgroundColor: "#1e3a8a",
                             backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px), radial-gradient(#ffffff 1px, #1e3a8a 1px)",
                             backgroundSize: "16px 16px"
                         }}
                    />
                </div>
            </div>
        );
    }

    return (
        <div draggable onDragStart={onDragStart} onDoubleClick={onDoubleClick}
             className={`${baseClass} ${red ? "text-red-600" : "text-slate-900"}`}
             style={cardStyle}
        >
            <div className="p-1.5 flex flex-col h-full justify-between items-start relative font-sans">
                <div className="leading-none font-black flex flex-col items-center" style={{ fontSize: isFullscreen ? "2.2vh" : "1.2rem" }}>
                    <span>{label(card.value)}</span>
                    <span className="mt-0.5">{card.suit}</span>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.1]" style={{ fontSize: isFullscreen ? "6vh" : "4rem" }}>
                    {card.suit}
                </div>
                <div className="leading-none font-black self-end rotate-180 flex flex-col items-center" style={{ fontSize: isFullscreen ? "2.2vh" : "1.2rem" }}>
                    <span>{label(card.value)}</span>
                    <span className="mt-0.5">{card.suit}</span>
                </div>
            </div>
        </div>
    );
}

export default function SolitaireClient() {
    const [state, setState] = useState<GameState | null>(null);
    const [draggedIds, setDraggedIds] = useState<string[]>([]);
    const [source, setSource] = useState<{ type: string; colIdx?: number; cardIdx?: number; cards: Card[] } | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) containerRef.current?.requestFullscreen?.();
        else document.exitFullscreen?.();
    }, []);

    useEffect(() => {
        const onChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener("fullscreenchange", onChange);
        setState(generateNewGame());
        return () => document.removeEventListener("fullscreenchange", onChange);
    }, []);

    const handleAutoMove = (card: Card, type: "waste" | "tableau", colIdx?: number) => {
        setState(prev => {
            if (!prev) return null;
            const fIdx = prev.foundations.findIndex(f => canPlaceOnFoundation(card, f));
            if (fIdx === -1) return prev;
            const newFoundations = prev.foundations.map((f, i) => i === fIdx ? [...f, card] : f);
            const newTableau = prev.tableau.map(c => [...c]);
            let newWaste = [...prev.waste];
            if (type === "waste") newWaste.pop();
            else if (type === "tableau" && colIdx !== undefined) {
                newTableau[colIdx].pop();
                if (newTableau[colIdx].length > 0) newTableau[colIdx][newTableau[colIdx].length - 1].faceUp = true;
            }
            return { ...prev, foundations: newFoundations, tableau: newTableau, waste: newWaste, moves: prev.moves + 1 };
        });
    };

    const handleDragStart = (type: string, cards: Card[], colIdx?: number, cardIdx?: number) => {
        setSource({ type, colIdx, cardIdx, cards });
        setTimeout(() => setDraggedIds(cards.map(c => c.id)), 0);
    };

    const handleDrop = (targetType: "tableau" | "foundation", targetIdx: number) => {
        if (!source || !state) { setDraggedIds([]); setSource(null); return; }
        const cards = source.cards;
        let canMove = targetType === "tableau"
            ? canPlaceOnTableau(cards[0], state.tableau[targetIdx])
            : cards.length === 1 && canPlaceOnFoundation(cards[0], state.foundations[targetIdx]);
        if (!canMove) { setDraggedIds([]); setSource(null); return; }
        setState(prev => {
            if (!prev) return null;
            const newTableau = prev.tableau.map(c => [...c]);
            const newFoundations = prev.foundations.map(f => [...f]);
            let newWaste = [...prev.waste];
            if (source.type === "waste") newWaste.pop();
            else if (source.type === "tableau" && source.colIdx !== undefined) {
                newTableau[source.colIdx] = newTableau[source.colIdx].slice(0, source.cardIdx);
                if (newTableau[source.colIdx].length > 0) newTableau[source.colIdx][newTableau[source.colIdx].length - 1].faceUp = true;
            }
            if (targetType === "tableau") newTableau[targetIdx] = [...newTableau[targetIdx], ...cards];
            else newFoundations[targetIdx] = [...newFoundations[targetIdx], cards[0]];
            return { ...prev, tableau: newTableau, foundations: newFoundations, waste: newWaste, moves: prev.moves + 1 };
        });
        setDraggedIds([]); setSource(null);
    };

    if (!state) return null;

    const gridGap = isFullscreen ? "gap-6" : "gap-4";

    return (
        <div ref={containerRef} className={`flex flex-col transition-all duration-500 ${isFullscreen ? "h-screen w-screen fixed inset-0 p-8 bg-slate-300 overflow-y-auto items-center" : "min-h-screen max-w-6xl mx-auto p-6 shadow-2xl my-4 rounded-3xl bg-slate-200"}`}>

            <div className={`flex flex-col h-full ${isFullscreen ? "w-fit pt-4" : "w-full"}`}>

                {/* Header */}
                <div className={`flex items-center justify-between mb-8 border-b pb-4 px-1 ${isFullscreen ? "border-slate-400" : "border-slate-300"}`}>
                    <span className="font-black text-2xl tracking-tighter text-slate-800">SOLITAIRE</span>
                    <div className="flex gap-6 items-center">
                        <div className="text-right">
                            <span className="text-[10px] uppercase font-bold block text-slate-500">Tahy</span>
                            <span className="text-2xl font-black text-slate-800 leading-none">{state.moves}</span>
                        </div>
                        <button onClick={toggleFullscreen} className="bg-white border-2 border-slate-300 px-5 py-2 rounded-xl font-bold text-sm hover:border-blue-500 transition-all shadow-sm">
                            {isFullscreen ? "Zmenšit" : "Celá obrazovka"}
                        </button>
                        <button onClick={() => window.location.reload()} className="bg-white border-2 border-slate-300 px-5 py-2 rounded-xl font-bold text-sm hover:border-red-400 transition-all shadow-sm">Restart</button>
                    </div>
                </div>

                {/* Horní řada */}
                <div className={`grid grid-cols-7 mb-10 ${gridGap}`}>
                    <div className="flex gap-2 col-span-2">
                        <div className="w-fit" onClick={() => {
                            setState(prev => {
                                if (!prev) return prev;
                                if (prev.stock.length === 0) return { ...prev, stock: [...prev.waste].map(c => ({...c, faceUp: false})).reverse(), waste: [] };
                                const newStock = [...prev.stock];
                                const card = newStock.pop();
                                return card ? { ...prev, stock: newStock, waste: [...prev.waste, {...card, faceUp: true}] } : prev;
                            });
                        }}>
                            {state.stock.length > 0 ? <CardView card={{suit:"♠", value:1, faceUp:false, id:"back"}} isFullscreen={isFullscreen} /> : <div className="rounded-xl border-4 border-dashed border-slate-400 flex items-center justify-center text-4xl text-slate-400" style={{aspectRatio:"2/3", height: isFullscreen ? "16.5vh" : "150px"}}>↺</div>}
                        </div>
                        <div className="w-fit">
                            {state.waste.length > 0 && (
                                <CardView card={state.waste[state.waste.length-1]} isDragging={draggedIds.includes(state.waste[state.waste.length-1].id)}
                                          onDragStart={() => handleDragStart("waste", [state.waste[state.waste.length-1]])}
                                          onDoubleClick={() => handleAutoMove(state.waste[state.waste.length-1], "waste")} isFullscreen={isFullscreen} />
                            )}
                        </div>
                    </div>

                    <div className="col-span-1"></div>

                    <div className="col-span-4 grid grid-cols-4 gap-2">
                        {state.foundations.map((f, fi) => (
                            <div key={fi} onDragOver={e => e.preventDefault()} onDrop={() => handleDrop("foundation", fi)}>
                                {f.length > 0 ? <CardView card={f[f.length-1]} isFullscreen={isFullscreen} /> : (
                                    <div className="rounded-xl border-4 border-dashed border-slate-400 text-slate-400 bg-slate-100/50 flex items-center justify-center text-3xl font-black shadow-inner" style={{aspectRatio: "2/3", height: isFullscreen ? "16.5vh" : "150px"}}>
                                        {SUITS[fi]}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tableau - ZVĚTŠENÝ ODSTUP MEZI KARTAMI VE FS */}
                <div className={`grid grid-cols-7 flex-grow items-start ${gridGap}`}>
                    {state.tableau.map((col, ci) => (
                        <div key={ci} className="flex flex-col items-center relative h-full" onDragOver={e => e.preventDefault()} onDrop={() => handleDrop("tableau", ci)}>
                            {col.length === 0 && <div className="rounded-xl border-2 border-dashed border-slate-400 opacity-20" style={{aspectRatio:"2/3", width: isFullscreen ? "11vh" : "100px"}} />}
                            {col.map((card, cardIdx) => {
                                const overlap = cardIdx === 0 ? "0" : (
                                    isFullscreen
                                        ? (col[cardIdx-1].faceUp ? "-12vh" : "-14.5vh") // Odkryto více z lícové karty (-12vh místo -14.5vh)
                                        : (col[cardIdx-1].faceUp ? "-105px" : "-120px")
                                );
                                return (
                                    <div key={card.id} style={{ marginTop: overlap, zIndex: cardIdx, position: "relative" }}>
                                        <CardView card={card} isDragging={draggedIds.includes(card.id)}
                                                  onDragStart={() => handleDragStart("tableau", col.slice(cardIdx), ci, cardIdx)}
                                                  onDoubleClick={() => cardIdx === col.length - 1 && handleAutoMove(card, "tableau", ci)} isFullscreen={isFullscreen} />
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}