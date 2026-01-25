"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import MediaQuery from "@/app/hooks/useMediaQuery";

export default function ScrollManager() {
  const pathname = usePathname();
  const isMobile = MediaQuery(768);

  useEffect(() => {
    // Disabilita scroll restoration automatico
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Strategy 1: Salva stato scroll-snap corrente
    const originalSnapType = isMobile
      ? "none"
      : document.documentElement.style.scrollSnapType;

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
        originalSnapType || (isMobile ? "none" : "y proximity");
    }, 150); // Timing testato per compatibilità cross-browser

    // Strategy 5: Cleanup per evitare memory leaks
    return () => {
      clearTimeout(timeoutId);
      // Assicura ripristino scroll-snap
      document.documentElement.style.scrollSnapType =
        originalSnapType || (isMobile ? "none" : "y proximity");
    };
  }, [pathname]);

  return null;
}
