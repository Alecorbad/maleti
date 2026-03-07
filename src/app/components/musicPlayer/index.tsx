"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./musicPlayer.module.css";

type MusicPlayerProps = {
  tracks?: Array<string | Track>;
  expandedHeightRem?: number;
  collapsedHeightRem?: number;
};

type Track = {
  title: string;
  artist?: string;
  origin?: string;
  src?: string; // src è opzionale perché usiamo url dal json
  url?: string; // url dal json
};

import musicList from "@/json/music.json";

const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="0"
    strokeLinecap="round"
    strokeLinejoin="round"
    color="black"
  >
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

const PauseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="0"
    strokeLinecap="round"
    strokeLinejoin="round"
    color="black"
  >
    <rect x="6" y="4" width="4" height="16"></rect>
    <rect x="14" y="4" width="4" height="16"></rect>
  </svg>
);

const PrevIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="0"
    strokeLinecap="round"
    strokeLinejoin="round"
    color="black"
  >
    <polygon points="19 20 9 12 19 4 19 20"></polygon>
    <line x1="5" y1="19" x2="5" y2="5" strokeWidth="2"></line>
  </svg>
);

const NextIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="0"
    strokeLinecap="round"
    strokeLinejoin="round"
    color="black"
  >
    <polygon points="5 4 15 12 5 20 5 4"></polygon>
    <line x1="19" y1="5" x2="19" y2="19" strokeWidth="2"></line>
  </svg>
);

export default function MusicPlayer({
  tracks = musicList,
  expandedHeightRem = 8.5,
  collapsedHeightRem = 3.25,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [needsScroll, setNeedsScroll] = useState(false);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [marqueeDuration, setMarqueeDuration] = useState(10);

  const titleFromPath = useCallback((path: string) => {
    try {
      const parts = path.split("/");
      const file = parts[parts.length - 1];
      return decodeURIComponent(file)
        .replace(/[-_]/g, " ")
        .replace(/\.[a-z0-9]+$/i, "");
    } catch {
      return path;
    }
  }, []);

  const normalizedTracks = useMemo<Track[]>(
    () =>
      tracks
        .map((track) =>
          typeof track === "string"
            ? { title: titleFromPath(track), src: track, url: track }
            : { ...track, src: track.src || track.url || "" },
        )
        .filter((track) => track.src),
    [tracks, titleFromPath],
  );

  // Imposta una canzone casuale all'avvio
  useEffect(() => {
    if (normalizedTracks.length > 0) {
      setIndex(Math.floor(Math.random() * normalizedTracks.length));
    }
  }, [normalizedTracks.length]);

  const currentTrack = normalizedTracks[index];

  const handlePrev = useCallback(() => {
    if (!audioRef.current || normalizedTracks.length === 0) return;
    if (audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
    } else {
      setIndex((i) => (i - 1 + normalizedTracks.length) % normalizedTracks.length);
    }
    setPlaying(true);
  }, [normalizedTracks.length]);

  const handleNext = useCallback(() => {
    if (normalizedTracks.length === 0) return;
    setIndex((i) => (i + 1) % normalizedTracks.length);
    setPlaying(true);
  }, [normalizedTracks.length]);

  const togglePlay = useCallback(async () => {
    if (!audioRef.current) return;
    try {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        await audioRef.current.play();
        setPlaying(true);
      }
    } catch (e) {
      console.warn("Playback failed:", e);
      setPlaying(false);
    }
  }, [playing]);

  useEffect(() => {
    if (normalizedTracks.length === 0 || !currentTrack) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(currentTrack.src || "");
      audioRef.current.preload = "metadata";
    }

    const audio = audioRef.current;
    const onEnded = () => handleNext();
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
  }, [currentTrack, handleNext, normalizedTracks.length]);

  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;
    const audio = audioRef.current;
    const wasPlaying = !audio.paused && !audio.ended;
    setProgress(0);
    audio.src = currentTrack.src || "";
    audio.load();
    if (wasPlaying || playing) audio.play().catch(() => setPlaying(false));
  }, [currentTrack, playing]);

  useEffect(() => {
    const updateMarquee = () => {
      const titleWidth = titleRef.current?.scrollWidth ?? 0;
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const distance = Math.max(0, titleWidth - containerWidth + 12);
      setScrollDistance(distance);
      setNeedsScroll(distance > 0);
      const duration = Math.max(6, distance / 42);
      setMarqueeDuration(duration);
    };

    updateMarquee();
    window.addEventListener("resize", updateMarquee);

    return () => {
      window.removeEventListener("resize", updateMarquee);
    };
  }, [currentTrack?.title, hovered]);

  if (!currentTrack) {
    return null;
  }

  return (
    <motion.aside
      className={styles.player}
      aria-label="Music player"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.titleRow}>
          <div ref={containerRef} className={styles.marqueeContainer}>
            <motion.div
              ref={titleRef}
              animate={
                needsScroll && !hovered
                  ? { x: [0, -scrollDistance] }
                  : { x: 0 }
              }
              transition={
                needsScroll && !hovered
                  ? {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: marqueeDuration,
                      ease: "linear",
                    }
                  : { duration: 0.2 }
              }
              className={styles.marqueeText}
            >
              {currentTrack.artist && currentTrack.title
                ? `${currentTrack.artist} - ${currentTrack.title}`
                : currentTrack.title}
            </motion.div>
          </div>

          <div className={styles.controls}>
            <button
              type="button"
              onClick={handlePrev}
              className={styles.controlButton}
              aria-label="Previous track"
            >
              <PrevIcon />
            </button>
            <button
              type="button"
              onClick={togglePlay}
              className={styles.playButton}
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button
              type="button"
              onClick={handleNext}
              className={styles.controlButton}
              aria-label="Next track"
            >
              <NextIcon />
            </button>
          </div>
        </div>

        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar} style={{ width: `${progress}%` }} />
        </div>
      </div>
    </motion.aside>
  );
}
