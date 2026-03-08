"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type LoadingContextType = {
  initialLoading: boolean;
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

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Se abbiamo gia' caricato le risorse in questa sessione, saltiamo lo splash
    const hasLoaded = sessionStorage.getItem("maletiInitialResourcesLoaded");
    if (hasLoaded) {
      setInitialLoading(false);
      return;
    }

    const handleReady = () => {
      setInitialLoading(false);
      sessionStorage.setItem("maletiInitialResourcesLoaded", "yes");
    };

    if (document.readyState === "complete") {
      handleReady();
      return;
    }

    window.addEventListener("load", handleReady);
    return () => {
      window.removeEventListener("load", handleReady);
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ initialLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}
