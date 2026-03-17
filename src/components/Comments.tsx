"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface Props {
  title: string; // název článku – zobrazí se v Cusdis dashboardu
}

export default function Comments({ title }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Pokud je skript už načtený, jen ho reinicializuj
    if ((window as any).CUSDIS) {
      (window as any).CUSDIS.initial();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cusdis.com/js/cusdis.es.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, [pathname]);

  return (
    <div className="mt-12 pt-8 border-t border-[var(--border)]">
      <h2 className="font-serif text-2xl font-bold text-[var(--ink)] mb-6">
        💬 Diskuze
      </h2>
      <div
        ref={ref}
        id="cusdis_thread"
        data-host="https://cusdis.com"
        data-app-id="SEM_VLOZ_SVE_APP_ID"  // ← nahraď svým App ID z cusdis.com
        data-page-id={pathname}
        data-page-url={`https://rodicovskysvet.cz${pathname}`} // ← nahraď svou doménou
        data-page-title={title}
        data-theme="light"
      />
    </div>
  );
}
