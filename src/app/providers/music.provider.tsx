"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import musicList from "@/json/music.json";

export type MusicTrack = {
  title: string;
  artist?: string;
  origin?: string;
  src: string;
  url?: string;
  originUrl?: string;
};

type MusicContextType = {
  tracks: MusicTrack[];
  currentTrack: MusicTrack | null;
  index: number;
  playing: boolean;
  progress: number;
  autoplayOnLoad: boolean;
  setAutoplayOnLoad: (value: boolean) => void;
  play: () => Promise<void> | void;
  pause: () => void;
  togglePlay: () => Promise<void> | void;
  next: () => void;
  prev: () => void;
  setIndex: (value: number) => void;
};

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function useMusic(): MusicContextType {
  const ctx = useContext(MusicContext);
  if (!ctx) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return ctx;
}

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [autoplayOnLoad, setAutoplayOnLoad] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasTriedAutoplayOnLoadRef = useRef(false);

  const tracks = useMemo<MusicTrack[]>(() => {
    const raw = musicList as Array<{
      title: string;
      artist?: string;
      origin?: string;
      url?: string;
      originUrl?: string;
    }>;

    return raw
      .map((track) => ({
        title: track.title,
        artist: track.artist,
        origin: track.origin,
        src: track.url || "",
        url: track.url,
        originUrl: track.originUrl,
      }))
      .filter((t) => t.src);
  }, []);

  const [index, setIndex] = useState(() =>
    tracks.length > 0 ? Math.floor(Math.random() * tracks.length) : 0,
  );
  const currentTrack = tracks[index] ?? null;

  // Rileva se siamo in modalita' mobile (viewport stretta)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    check();

    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const play = useCallback(async () => {
    if (isMobile) return;
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setPlaying(true);
    } catch (e) {
      console.warn("Playback failed:", e);
      setPlaying(false);
    }
  }, [isMobile]);

  const pause = useCallback(() => {
    if (isMobile) return;
    if (!audioRef.current) return;
    audioRef.current.pause();
    setPlaying(false);
  }, [isMobile]);

  const togglePlay = useCallback(async () => {
    if (playing) {
      pause();
    } else {
      await play();
    }
  }, [pause, play, playing]);

  const prev = useCallback(() => {
    if (isMobile) return;
    if (!tracks.length) return;
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    setIndex((i) => (i - 1 + tracks.length) % tracks.length);
    setPlaying(true);
  }, [tracks.length, isMobile]);

  const next = useCallback(() => {
    if (isMobile) return;
    if (!tracks.length) return;
    setIndex((i) => (i + 1) % tracks.length);
    setPlaying(true);
  }, [tracks.length, isMobile]);

  // Inizializza audio e listener quando cambia la traccia corrente
  useEffect(() => {
    if (isMobile) return;
    if (!tracks.length || !currentTrack) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(currentTrack.src);
      audioRef.current.preload = "metadata";
    }

    const audio = audioRef.current;
    const onEnded = () => next();
    const onTimeUpdate = () => {
      if (!audio || !audio.duration) return;
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener("ended", onEnded);
    audio.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [tracks, currentTrack, next, isMobile]);

  // Aggiorna src quando cambia la traccia
  useEffect(() => {
    if (isMobile) return;
    if (!audioRef.current || !currentTrack) return;
    const audio = audioRef.current;
    const wasPlaying = !audio.paused && !audio.ended;
    setProgress(0);
    audio.src = currentTrack.src;
    audio.load();
    if (wasPlaying || playing) {
      void play();
    }
  }, [currentTrack, playing, play, isMobile]);

  // Autoplay all'apertura del sito (una sola volta)
  useEffect(() => {
    if (isMobile) return;
    if (!autoplayOnLoad || hasTriedAutoplayOnLoadRef.current) return;
    if (!tracks.length) return;

    hasTriedAutoplayOnLoadRef.current = true;
    const randomIndex = Math.floor(Math.random() * tracks.length);
    setIndex(randomIndex);
    setPlaying(true);

    // Prova a partire subito (potrebbe essere bloccato dalle policy del browser)
    // Se viene bloccato, l'effetto di "resume" su interazione utente riproverà.
    setTimeout(() => {
      void play();
    }, 0);
  }, [autoplayOnLoad, tracks.length, play, isMobile]);

  // Avvio della musica quando un paintingFocus entra in viewport
  useEffect(() => {
    if (isMobile) return;
    const handleExternalPlay = () => {
      if (!playing) {
        setPlaying(true);
        void play();
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("maleti-play-music", handleExternalPlay);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("maleti-play-music", handleExternalPlay);
      }
    };
  }, [playing, play, isMobile]);

  // Nota: se il browser blocca l'autoplay iniziale, l'utente dovra' usare i controlli
  // del player per avviare la riproduzione. Non forziamo piu' il play sui click generici.

  const value: MusicContextType = {
    tracks,
    currentTrack,
    index,
    playing,
    progress,
    autoplayOnLoad,
    setAutoplayOnLoad,
    play,
    pause,
    togglePlay,
    next,
    prev,
    setIndex,
  };

  return (
    <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
  );
}
