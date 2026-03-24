"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// --- KONSTANTY ---
const COLS = 12;
const ROWS = 15;
const R = 18;
const COLORS = ["#c9607a", "#6b8cff", "#4caf50", "#ff9800", "#9c27b0", "#00bcd4"];
const COLOR_NAMES: Record<string, string> = {
    "#c9607a": "Růžová", "#6b8cff": "Modrá", "#4caf50": "Zelená",
    "#ff9800": "Oranžová", "#9c27b0": "Fialová", "#00bcd4": "Tyrkysová",
};

const W = (COLS * R * 2) + R;
const H = 520;
const SY = H - 50;
const SX = W / 2;

type B = { color: string; x: number; y: number } | null;

function bpos(col: number, row: number) {
    return {
        x: (row % 2 === 1 ? R : 0) + R + col * R * 2,
        y: R + row * R * 1.8,
    };
}

function makeGrid(): B[][] {
    return Array.from({ length: ROWS }, (_, r) =>
        Array.from({ length: COLS }, (_, c) => {
            if (r < 6) {
                const p = bpos(c, r);
                return { color: COLORS[Math.floor(Math.random() * COLORS.length)], ...p };
            }
            return null;
        })
    );
}

function rndColor() { return COLORS[Math.floor(Math.random() * COLORS.length)]; }

function drawBubble(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, alpha = 1) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(x, y, r - 1, 0, Math.PI * 2);
    const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r);
    g.addColorStop(0, "rgba(255,255,255,0.6)");
    g.addColorStop(0.4, color);
    g.addColorStop(1, color + "cc");
    ctx.fillStyle = g;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.4)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
}

function neighbors(col: number, row: number): [number, number][] {
    const odd = row % 2 === 1;
    return ([
        [col - 1, row], [col + 1, row],
        [col + (odd ? 0 : -1), row - 1], [col + (odd ? 1 : 0), row - 1],
        [col + (odd ? 0 : -1), row + 1], [col + (odd ? 1 : 0), row + 1],
    ] as [number, number][]).filter(([c, r]) => c >= 0 && c < COLS && r >= 0 && r < ROWS);
}

function floodFill(grid: B[][], col: number, row: number, color: string): [number, number][] {
    const visited = new Set<string>();
    const result: [number, number][] = [];
    const stack: [number, number][] = [[col, row]];
    while (stack.length) {
        const [c, r] = stack.pop()!;
        const k = `${c},${r}`;
        if (visited.has(k)) continue;
        visited.add(k);
        if (!grid[r]?.[c] || grid[r][c]?.color !== color) continue;
        result.push([c, r]);
        for (const n of neighbors(c, r)) stack.push(n);
    }
    return result;
}

function findFloating(grid: B[][]): [number, number][] {
    const connected = new Set<string>();
    const stack: [number, number][] = [];
    for (let c = 0; c < COLS; c++) {
        if (grid[0]?.[c]) { stack.push([c, 0]); connected.add(`${c},0`); }
    }
    while (stack.length) {
        const [c, r] = stack.pop()!;
        for (const [nc, nr] of neighbors(c, r)) {
            const k = `${nc},${nr}`;
            if (!connected.has(k) && grid[nr]?.[nc]) { connected.add(k); stack.push([nc, nr]); }
        }
    }
    const floating: [number, number][] = [];
    for (let r = 0; r < ROWS; r++)
        for (let c = 0; c < COLS; c++)
            if (grid[r]?.[c] && !connected.has(`${c},${r}`)) floating.push([c, r]);
    return floating;
}

export default function BubbleShooterClient() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hasMounted, setHasMounted] = useState(false);

    // Reference pro stav hry
    const grid = useRef<B[][]>([]);
    const angle = useRef(-Math.PI / 2);
    const curColor = useRef(COLORS[0]);
    const nxtColor = useRef(COLORS[1]);
    const proj = useRef<{ x: number; y: number; vx: number; vy: number; color: string } | null>(null);
    const scoreRef = useRef(0);
    const over = useRef(false);
    const won = useRef(false);

    // React state pro UI
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [win, setWin] = useState(false);
    const [cur, setCur] = useState(COLORS[0]);
    const [nxt, setNxt] = useState(COLORS[1]);

    const land = useCallback((px: number, py: number, color: string) => {
        let br = -1, bc = -1, bd = Infinity;
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid.current[r] && grid.current[r][c]) continue;
                const p = bpos(c, r);
                const d = Math.hypot(px - p.x, py - p.y);
                if (d < bd) { bd = d; br = r; bc = c; }
            }
        }
        if (br === -1) return;
        const p = bpos(bc, br);
        if (!grid.current[br]) grid.current[br] = Array(COLS).fill(null);
        grid.current[br][bc] = { color, ...p };

        const matches = floodFill(grid.current, bc, br, color);
        if (matches.length >= 3) {
            matches.forEach(([c, r]) => { if(grid.current[r]) grid.current[r][c] = null; });
            scoreRef.current += matches.length * 10;
            const floating = findFloating(grid.current);
            floating.forEach(([c, r]) => { if(grid.current[r]) grid.current[r][c] = null; scoreRef.current += 5; });
            setScore(scoreRef.current);
        }

        if (!grid.current.some(row => row && row.some(b => b !== null))) { won.current = true; setWin(true); return; }
        if (grid.current[ROWS - 1]?.some(b => b !== null)) { over.current = true; setGameOver(true); return; }

        curColor.current = nxtColor.current;
        nxtColor.current = rndColor();
        proj.current = null;
        setCur(curColor.current);
        setNxt(nxtColor.current);
    }, []);

    const reset = useCallback(() => {
        grid.current = makeGrid();
        curColor.current = rndColor();
        nxtColor.current = rndColor();
        proj.current = null;
        scoreRef.current = 0;
        over.current = false;
        won.current = false;
        angle.current = -Math.PI / 2;
        setScore(0); setGameOver(false); setWin(false);
        setCur(curColor.current); setNxt(nxtColor.current);
    }, []);

    // Hydration fix & Inicializace
    useEffect(() => {
        setHasMounted(true);
        reset();
    }, [reset]);

    useEffect(() => {
        if (!hasMounted) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d")!;
        let raf: number;

        const updateAngle = (cx: number, cy: number, rect: DOMRect) => {
            const sx = canvas.width / rect.width;
            const sy = canvas.height / rect.height;
            let a = Math.atan2((cy - rect.top) * sy - SY, (cx - rect.left) * sx - SX);
            if (a > -0.15) a = -0.15;
            if (a < -Math.PI + 0.15) a = -Math.PI + 0.15;
            angle.current = a;
        };

        const onMouseMove = (e: MouseEvent) => {
            updateAngle(e.clientX, e.clientY, canvas.getBoundingClientRect());
        };

        const onTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                updateAngle(e.touches[0].clientX, e.touches[0].clientY, canvas.getBoundingClientRect());
            }
        };

        const shoot = () => {
            if (proj.current || over.current || won.current) return;
            const spd = 12;
            proj.current = { x: SX, y: SY, vx: Math.cos(angle.current) * spd, vy: Math.sin(angle.current) * spd, color: curColor.current };
        };

        const onClick = (e: MouseEvent) => {
            e.preventDefault();
            shoot();
        };

        const onTouchEnd = (e: TouchEvent) => {
            e.preventDefault();
            shoot();
        };

        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("click", onClick);
        canvas.addEventListener("touchstart", onTouchMove, { passive: false });
        canvas.addEventListener("touchmove", onTouchMove, { passive: false });
        canvas.addEventListener("touchend", onTouchEnd, { passive: false });

        const draw = () => {
            raf = requestAnimationFrame(draw);
            ctx.clearRect(0, 0, W, H);

            const bg = ctx.createLinearGradient(0, 0, 0, H);
            bg.addColorStop(0, "#fdf0f3"); bg.addColorStop(1, "#f2dde4");
            ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

            // Bezpečné vykreslení mřížky
            for (let r = 0; r < ROWS; r++) {
                const row = grid.current[r];
                if (!row) continue;
                for (let c = 0; c < COLS; c++) {
                    const b = row[c];
                    if (b) drawBubble(ctx, b.x, b.y, R, b.color);
                }
            }

            if (proj.current) {
                const p = proj.current;
                p.x += p.vx; p.y += p.vy;
                if (p.x - R < 0) { p.x = R; p.vx = Math.abs(p.vx); }
                if (p.x + R > W) { p.x = W - R; p.vx = -Math.abs(p.vx); }
                let hit = false;
                for (let r = 0; r < ROWS && !hit; r++) {
                    const row = grid.current[r];
                    if (!row) continue;
                    for (let c = 0; c < COLS && !hit; c++) {
                        const b = row[c];
                        if (b && Math.hypot(p.x - b.x, p.y - b.y) < R * 1.9) {
                            land(p.x, p.y, p.color); hit = true;
                        }
                    }
                }
                if (!hit && p.y - R < R) { land(p.x, p.y, p.color); }
                else if (!hit) drawBubble(ctx, p.x, p.y, R, p.color);
            }

            // UI prvky na canvasu
            ctx.strokeStyle = "rgba(201,96,122,0.2)"; ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
            ctx.beginPath(); ctx.moveTo(0, H - 80); ctx.lineTo(W, H - 80); ctx.stroke();
            ctx.setLineDash([]);

            ctx.strokeStyle = "rgba(201,96,122,0.4)"; ctx.lineWidth = 1.5;
            ctx.setLineDash([6, 6]);
            ctx.beginPath(); ctx.moveTo(SX, SY);
            ctx.lineTo(SX + Math.cos(angle.current) * 90, SY + Math.sin(angle.current) * 90);
            ctx.stroke(); ctx.setLineDash([]);

            drawBubble(ctx, SX, SY, R, curColor.current);
            ctx.fillStyle = "rgba(255,255,255,0.9)"; ctx.font = "bold 10px sans-serif"; ctx.textAlign = "center";
            ctx.fillText("▲", SX, SY + 4);

            drawBubble(ctx, SX - 60, SY, R * 0.8, nxtColor.current, 0.7);
            ctx.fillStyle = "#9b8a7a"; ctx.font = "10px sans-serif"; ctx.textAlign = "center";
            ctx.fillText("další", SX - 60, SY + R + 12);
        };

        draw();
        return () => {
            cancelAnimationFrame(raf);
            canvas.removeEventListener("mousemove", onMouseMove);
            canvas.removeEventListener("click", onClick);
            canvas.removeEventListener("touchstart", onTouchMove);
            canvas.removeEventListener("touchmove", onTouchMove);
            canvas.removeEventListener("touchend", onTouchEnd);
        };
    }, [hasMounted, land]);

    // Pokud ještě nejsme na klientu, vykreslíme jen prázdný kontejner stejných rozměrů
    if (!hasMounted) {
        return <div className="w-full h-[600px] bg-[#fdf0f3] animate-pulse rounded-2xl" />;
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-6 bg-white border border-[var(--border)] rounded-2xl px-6 py-3 w-full justify-between">
                <div className="text-center">
                    <p className="text-xs text-[var(--muted)] uppercase tracking-wider">Skóre</p>
                    <p className="font-serif text-2xl font-bold text-[var(--accent)]">{score}</p>
                </div>
                <div className="text-center">
                    <p className="text-xs text-[var(--muted)] uppercase tracking-wider mb-1">Míříš</p>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full border-2 border-white shadow" style={{ background: cur }} />
                        <span className="text-sm font-medium text-[var(--ink)]">{COLOR_NAMES[cur] ?? ""}</span>
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-xs text-[var(--muted)] uppercase tracking-wider mb-1">Příští</p>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border-2 border-white shadow opacity-70" style={{ background: nxt }} />
                        <span className="text-xs text-[var(--muted)]">{COLOR_NAMES[nxt] ?? ""}</span>
                    </div>
                </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border-2 border-[var(--border)] shadow-lg w-full" style={{ touchAction: "none" }}>
                <canvas ref={canvasRef} width={W} height={H} className="w-full block" style={{ cursor: "crosshair" }} />
                {(gameOver || win) && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-white rounded-2xl p-8 text-center shadow-xl mx-4">
                            <p className="text-5xl mb-3">{win ? "🎉" : "💫"}</p>
                            <h2 className="font-serif text-2xl font-bold text-[var(--ink)] mb-2">{win ? "Výborně!" : "Konec hry"}</h2>
                            <p className="text-[var(--muted)] mb-1">{win ? "Vyčistil/a jsi všechny bubliny!" : "Bubliny dosáhly dna."}</p>
                            <p className="font-bold text-[var(--accent)] text-xl mb-5">Skóre: {score}</p>
                            <button onClick={reset} className="bg-[var(--accent)] text-white font-bold px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity">Hrát znovu</button>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-white border border-[var(--border)] rounded-xl p-4 w-full text-sm text-[var(--muted)]">
                <p className="font-bold text-[var(--ink)] mb-2">Jak hrát:</p>
                <ul className="space-y-1">
                    <li>🖱️ <strong>Desktop:</strong> Pohni myší pro míření, klikni pro výstřel</li>
                    <li>📱 <strong>Mobil:</strong> Držením prstu miř, puštěním vystřel</li>
                    <li>🫧 Spoj <strong>3 a více</strong> bublin stejné barvy</li>
                    <li>⭐ Oddělené bubliny dávají <strong>bonusové body</strong></li>
                </ul>
            </div>
        </div>
    );
}