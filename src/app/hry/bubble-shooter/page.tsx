import type { Metadata } from "next";
import Link from "next/link";
import BubbleShooterClient from "./BubbleShooterClient";

export const metadata: Metadata = {
  title: "Bubble Shooter – Hra pro rodiče i děti",
  description: "Zábavná hra Bubble Shooter. Střílej barevné bubliny a vytvárej skupiny stejných barev.",
  alternates: { canonical: "https://rodicovskysvet.cz/hry/bubble-shooter" },
};

export default function BubbleShooterPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <nav className="text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Domů</Link>
        <span className="mx-2">›</span>
        <span>Bubble Shooter</span>
      </nav>
      <div className="text-center mb-6">
        <h1 className="font-serif text-3xl font-bold text-[var(--ink)] mb-2">🫧 Bubble Shooter</h1>
        <p className="text-[var(--muted)] text-sm">Střílej bubliny a spoj 3 stejné barvy. Čím výše se dostaneš, tím více bodů!</p>
      </div>
      <BubbleShooterClient />
    </div>
  );
}
