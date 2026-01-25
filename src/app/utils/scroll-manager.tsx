"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    // Disabilita scroll restoration automatico
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Strategy 1: Salva stato scroll-snap corrente
    const originalSnapType = document.documentElement.style.scrollSnapType;

    // Strategy 2: Disabilita temporaneamente scroll-snap
    document.documentElement.style.scrollSnapType = "none";

    // Strategy 3: Funzione scroll-to-top con timing multipli
    const forceScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    // Esegui scroll immediatamente
    forceScrollToTop();

    // Esegui dopo primo paint (requestAnimationFrame)
    requestAnimationFrame(() => {
      forceScrollToTop();

      // Esegui dopo secondo paint per sicurezza
      requestAnimationFrame(() => {
        forceScrollToTop();
      });
    });

    // Strategy 4: Riabilita scroll-snap dopo breve delay
    const timeoutId = setTimeout(() => {
      document.documentElement.style.scrollSnapType =
        originalSnapType || "y proximity";
    }, 150); // Timing testato per compatibilità cross-browser

    // Strategy 5: Cleanup per evitare memory leaks
    return () => {
      clearTimeout(timeoutId);
      // Assicura ripristino scroll-snap
      document.documentElement.style.scrollSnapType =
        originalSnapType || "y proximity";
    };
  }, [pathname]);

  return null;
}
