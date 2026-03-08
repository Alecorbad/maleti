"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type LoadingContextType = {
  initialLoading: boolean;
  progress: number; // 0-1, frazione di risorse tracciate caricate
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function useLoading(): LoadingContextType {
  const ctx = useContext(LoadingContext);
  if (!ctx) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return ctx;
}

export function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [initialLoading, setInitialLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Tracciamo il caricamento delle immagini piu' importanti (fetchPriority="high")
    // e teniamo il loader finche' almeno il 90% non e' completo.
    const tracked = Array.from(
      document.querySelectorAll<HTMLImageElement>("img[fetchpriority='high']"),
    );

    const total = tracked.length;
    if (total === 0) {
      setProgress(1);
      setInitialLoading(false);
      return;
    }

    let loaded = 0;

    const update = () => {
      loaded += 1;
      const p = loaded / total;
      setProgress(p);
      if (p >= 0.9) {
        setInitialLoading(false);
      }
    };

    tracked.forEach((img) => {
      if (img.complete && img.naturalWidth > 0) {
        update();
      } else {
        img.addEventListener("load", update, { once: true });
        img.addEventListener("error", update, { once: true });
      }
    });

    // Fallback: se dopo 8 secondi non abbiamo raggiunto il 90%, togli comunque il loader
    const timeout = window.setTimeout(() => {
      setInitialLoading(false);
      setProgress(1);
    }, 8000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ initialLoading, progress }}>
      {children}
    </LoadingContext.Provider>
  );
}
