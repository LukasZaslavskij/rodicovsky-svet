"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-[var(--ink)] text-white rounded-2xl shadow-2xl p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">

          {/* Text */}
          <div className="flex-1">
            <p className="font-serif font-bold text-lg mb-1">🍪 Tento web používá cookies</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              Používáme cookies pro analytiku a zobrazování reklam (Google AdSense).
              Více informací v{" "}
              <Link
                href="/zasady-ochrany-osobnich-udaju"
                className="underline text-[var(--rose)] hover:text-white transition-colors"
              >
                Zásadách ochrany osobních údajů
              </Link>.
            </p>
          </div>

          {/* Tlačítka */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={decline}
              className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white border border-gray-600 hover:border-gray-400 rounded-xl transition-colors"
            >
              Odmítnout
            </button>
            <button
              onClick={accept}
              className="px-5 py-2 text-sm font-bold bg-[var(--accent)] hover:opacity-90 text-white rounded-xl transition-opacity"
            >
              Přijmout vše
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
