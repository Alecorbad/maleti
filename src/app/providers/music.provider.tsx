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
  const [autoplayOnLoad, setAutoplayOnLoad] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasEverPlayed, setHasEverPlayed] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasTriedAutoplayOnLoadRef = useRef(false);
  const lastSrcRef = useRef<string | null>(null);

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

  const [index, setIndex] = useState(0);
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

  // Ripristina da sessionStorage: solo indice traccia
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const storedIndex = window.sessionStorage.getItem("maletiTrackIndex");
      if (storedIndex !== null) {
        const parsed = parseInt(storedIndex, 10);
        if (!Number.isNaN(parsed) && parsed >= 0 && parsed < tracks.length) {
          setIndex(parsed);
          return;
        }
      }

      // Se non c'e' nulla in storage, scegli una traccia casuale all'inizio della sessione
      if (tracks.length > 0) {
        const randomIndex = Math.floor(Math.random() * tracks.length);
        setIndex(randomIndex);
        window.sessionStorage.setItem("maletiTrackIndex", String(randomIndex));
      }
    } catch {
      // In caso di errori nello storage, ignora e usa i default
    }
  }, [tracks.length]);

  // Persisti indice corrente della traccia
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.sessionStorage.setItem("maletiTrackIndex", String(index));
    } catch {
      // Ignora errori di storage
    }
  }, [index]);

  const play = useCallback(async () => {
    if (isMobile) return;
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setPlaying(true);
      setHasEverPlayed(true);
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

  // Inizializza audio e listener una sola volta
  useEffect(() => {
    if (isMobile) return;
    if (audioRef.current) return;

    const audio = new Audio();
    audio.preload = "metadata";

    const onEnded = () => next();
    const onTimeUpdate = () => {
      if (!audio.duration) return;
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener("ended", onEnded);
    audio.addEventListener("timeupdate", onTimeUpdate);

    audioRef.current = audio;

    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [next, isMobile]);

  // Aggiorna src quando cambia la traccia
  useEffect(() => {
    if (isMobile) return;
    if (!audioRef.current || !currentTrack) return;
    const audio = audioRef.current;
    const newSrc = currentTrack.src;

    // Se la sorgente non cambia, non ricarichiamo l'audio (evita restart su navigazioni)
    if (lastSrcRef.current === newSrc) return;

    lastSrcRef.current = newSrc;
    setProgress(0);
    audio.src = newSrc;
    audio.load();

    if (playing) {
      void play();
    }
  }, [currentTrack, playing, isMobile, play]);

  // Autoplay all'apertura del sito (una sola volta)
  useEffect(() => {
    if (isMobile) return;
    if (!autoplayOnLoad || hasTriedAutoplayOnLoadRef.current) return;
    if (hasEverPlayed) return;
    if (!tracks.length) return;

    hasTriedAutoplayOnLoadRef.current = true;
    const randomIndex = Math.floor(Math.random() * tracks.length);
    setIndex(randomIndex);

    // Prova a partire subito (potrebbe essere bloccato dalle policy del browser)
    setTimeout(() => {
      void play();
    }, 0);
  }, [autoplayOnLoad, tracks.length, play, hasEverPlayed, isMobile]);

  // Avvio della musica quando un paintingFocus entra in viewport
  useEffect(() => {
    if (isMobile) return;
    const handleExternalPlay = () => {
      // Se la musica non ha mai iniziato a suonare (autoplay bloccato e nessun play manuale),
      // permettiamo al primo paintingFocus di avviarla.
      // Se invece l'utente l'ha gia' avviata almeno una volta (haEverPlayed true),
      // rispettiamo il suo stop e non riavviamo automaticamente.
      if (!hasEverPlayed && !playing) {
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
  }, [playing, play, hasEverPlayed, isMobile]);

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
