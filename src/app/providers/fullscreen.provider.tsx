"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface FullscreenContextType {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

const FullscreenContext = createContext<FullscreenContextType | undefined>(
  undefined,
);

export const useFullscreen = () => {
  const context = useContext(FullscreenContext);
  if (!context) {
    throw new Error("useFullscreen must be used within a FullscreenProvider");
  }
  return context;
};

export const FullscreenProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Sincronizza stato e sessione
    const handleFullscreenChange = () => {
      const isFs = !!document.fullscreenElement;
      setIsFullscreen(isFs);
      sessionStorage.setItem("isFullscreen", isFs ? "true" : "false");
    };

    // Controllo iniziale
    const storedState = sessionStorage.getItem("isFullscreen") === "true";
    const currentState = !!document.fullscreenElement;

    if (storedState && !currentState) {
      setIsFullscreen(false);
      sessionStorage.setItem("isFullscreen", "false");
    } else {
      setIsFullscreen(currentState);
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(
          `Error attempting to enable fullscreen mode: ${e.message}`,
        );
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <FullscreenContext.Provider value={{ isFullscreen, toggleFullscreen }}>
      {children}
    </FullscreenContext.Provider>
  );
};

export default FullscreenProvider;
