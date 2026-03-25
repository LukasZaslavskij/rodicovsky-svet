"use client";

import { useState, useCallback, useEffect } from "react";

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

// ── Pravidla ──────────────────────────────────────────────
function canPlaceOnFoundation(card: Card, foundation: Card[]): boolean {
    if (!foundation) return false;
    if (foundation.length === 0) return card.value === 1;
    const top = foundation[foundation.length - 1];
    return top.suit === card.suit && card.value === top.value + 1;
}

function canPlaceOnTableau(card: Card, column: Card[]): boolean {
    if (!column) return false;
    if (column.length === 0) return card.value === 13; // Pouze Král
    const top = column[column.length - 1];
    if (!top.faceUp) return false;
    return isRed(card.suit) !== isRed(top.suit) && card.value === top.value - 1;
}

// ── Komponenta karty ──────────────────────────────────────
function CardView({
                      card, isDragging, onDragStart, onDragEnd, onDoubleClick
                  }: {
    card: Card; isDragging?: boolean; onDragStart?: (e: React.DragEvent) => void;
    onDragEnd?: () => void; onDoubleClick?: () => void;
}) {
    const red = isRed(card.suit);
    if (!card.faceUp) {
        return (
            <div className="w-full rounded-lg border border-gray-300 shadow-sm" style={{ aspectRatio: "2/3", minHeight: "100px", background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)" }}>
                <div className="w-full h-full rounded-lg opacity-10" style={{ background: "repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 10px)" }} />
            </div>
        );
    }
    return (
        <div
            draggable onDragStart={onDragStart} onDragEnd={onDragEnd} onDoubleClick={onDoubleClick}
            className={`w-full rounded-xl border-2 bg-white cursor-grab active:cursor-grabbing select-none transition-all
        ${isDragging ? "opacity-0" : "opacity-100 shadow-md"}
        ${red ? "text-red-500" : "text-gray-900"} border-gray-200 hover:border-blue-300`}
            style={{ aspectRatio: "2/3", minHeight: "120px" }}
        >
            <div className="flex flex-col h-full p-2">
                <div className="flex flex-col items-start leading-none">
                    <span className="text-4xl font-black tracking-tighter">{label(card.value)}</span>
                    <span className="text-2xl">{card.suit}</span>
                </div>
                <div className="flex-1 flex items-center justify-center -mt-4 pointer-events-none text-7xl">{card.suit}</div>
            </div>
        </div>
    );
}

// ── Hlavní Aplikace ───────────────────────────────────────
export default function SolitaireClient() {
    const [state, setState] = useState<GameState | null>(null);
    const [draggedIds, setDraggedIds] = useState<string[]>([]);
    const [source, setSource] = useState<{ type: string; colIdx?: number; cardIdx?: number; cards: Card[] } | null>(null);
    const [won, setWon] = useState(false);
    const [isAutoFinishing, setIsAutoFinishing] = useState(false);

    useEffect(() => { setState(generateNewGame()); }, []);

    // Automatické dohrávání
    useEffect(() => {
        if (!state || won || isAutoFinishing) return;
        const allTableauFaceUp = state.tableau.every(col => col.every(card => card.faceUp));
        const stockEmpty = state.stock.length === 0 && state.waste.length === 0;
        if (allTableauFaceUp && stockEmpty) setIsAutoFinishing(true);
    }, [state, won, isAutoFinishing]);

    useEffect(() => {
        if (!isAutoFinishing || won || !state) return;
        const timer = setTimeout(() => {
            for (let ci = 0; ci < state.tableau.length; ci++) {
                const col = state.tableau[ci];
                if (col.length === 0) continue;
                const lastCard = col[col.length - 1];
                const fIdx = state.foundations.findIndex(f => canPlaceOnFoundation(lastCard, f));
                if (fIdx !== -1) { handleAutoMove(lastCard, "tableau", ci); return; }
            }
            if (state.foundations.every(f => f.length === 13)) { setWon(true); setIsAutoFinishing(false); }
        }, 100);
        return () => clearTimeout(timer);
    }, [isAutoFinishing, state, won]);

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
        if (!source || !state || targetIdx === -1) { setDraggedIds([]); setSource(null); return; }

        const cards = source.cards;
        const firstCard = cards[0];
        let canMove = false;

        if (targetType === "tableau") {
            canMove = canPlaceOnTableau(firstCard, state.tableau[targetIdx]);
        } else {
            canMove = cards.length === 1 && canPlaceOnFoundation(firstCard, state.foundations[targetIdx]);
        }

        setDraggedIds([]);
        if (!canMove) { setSource(null); return; }

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
            else newFoundations[targetIdx] = [...newFoundations[targetIdx], firstCard];

            return { ...prev, tableau: newTableau, foundations: newFoundations, waste: newWaste, moves: prev.moves + 1 };
        });
        setSource(null);
    };

    if (!state) return null;

    return (
        <div className="flex flex-col gap-6 max-w-5xl mx-auto p-4 min-h-screen bg-white">
            {won && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900/40 backdrop-blur-md">
                    <div className="bg-white p-12 rounded-[40px] text-center border-[12px] border-blue-500">
                        <h2 className="text-7xl font-black mb-4">VÍTĚZSTVÍ!</h2>
                        <button onClick={() => window.location.reload()} className="bg-blue-600 text-white text-2xl font-black px-12 py-5 rounded-2xl">HRÁT ZNOVU</button>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between border-b pb-4">
                <span className="font-black text-xl text-blue-600 tracking-tighter">SOLITAIRE</span>
                <div className="flex flex-col items-center"><span className="text-[10px] text-gray-400 font-bold uppercase">Tahy</span><span className="text-2xl font-black">{state.moves}</span></div>
                <button onClick={() => window.location.reload()} className="bg-slate-100 px-4 py-2 rounded-lg font-bold">Restart</button>
            </div>

            <div className="grid grid-cols-7 gap-3">
                <div className="cursor-pointer" onClick={() => {
                    setState(prev => {
                        if (!prev || isAutoFinishing) return prev;
                        if (prev.stock.length === 0) return { ...prev, stock: prev.waste.map(c => ({...c, faceUp: false})).reverse(), waste: [] };
                        return { ...prev, stock: prev.stock.slice(0,-1), waste: [...prev.waste, {...prev.stock[prev.stock.length-1], faceUp: true}] };
                    });
                }}>
                    {state.stock.length > 0 ? <CardView card={{suit:"♠", value:1, faceUp:false, id:"back"}} /> : <div className="rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-3xl text-slate-200" style={{aspectRatio:"2/3"}}>↺</div>}
                </div>

                {/* Odkládací balíček - Přidána ochrana proti dropu na -1 */}
                <div onDragOver={e => e.preventDefault()}>
                    {state.waste.length > 0 ? (
                        <CardView
                            card={state.waste[state.waste.length-1]}
                            isDragging={draggedIds.includes(state.waste[state.waste.length-1].id)}
                            onDragStart={() => handleDragStart("waste", [state.waste[state.waste.length-1]])}
                            onDragEnd={() => setDraggedIds([])}
                            onDoubleClick={() => handleAutoMove(state.waste[state.waste.length-1], "waste")}
                        />
                    ) : <div className="rounded-xl border-2 border-dashed border-slate-100" style={{aspectRatio:"2/3"}} />}
                </div>
                <div />
                {state.foundations.map((f, fi) => (
                    <div key={fi} onDragOver={e => e.preventDefault()} onDrop={() => handleDrop("foundation", fi)}>
                        {f.length > 0 ? <CardView card={f[f.length-1]} /> : <div className="rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-3xl font-black text-slate-200" style={{aspectRatio: "2/3"}}>A</div>}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-3 items-start">
                {state.tableau.map((col, ci) => (
                    <div key={ci} className="flex flex-col" onDragOver={e => e.preventDefault()} onDrop={() => handleDrop("tableau", ci)}>
                        {col.length === 0 && <div className="rounded-xl border-2 border-dashed border-slate-100 w-full" style={{aspectRatio:"2/3"}} />}
                        {col.map((card, cardIdx) => (
                            <div key={card.id} style={{ marginTop: cardIdx === 0 ? 0 : (!col[cardIdx-1].faceUp ? -135 : -110) }} className="relative">
                                <CardView
                                    card={card}
                                    isDragging={draggedIds.includes(card.id)}
                                    onDragStart={() => handleDragStart("tableau", col.slice(cardIdx), ci, cardIdx)}
                                    onDragEnd={() => setDraggedIds([])}
                                    onDoubleClick={() => cardIdx === col.length - 1 && handleAutoMove(card, "tableau", ci)}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}