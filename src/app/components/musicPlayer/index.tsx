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
  src: string;
};

export default function MusicPlayer({
  tracks = ["/static/data/music/track1.mp3"],
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
            ? { title: titleFromPath(track), src: track }
            : track,
        )
        .filter((track) => track.src),
    [tracks, titleFromPath],
  );

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
      audioRef.current = new Audio(currentTrack.src);
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
    audio.src = currentTrack.src;
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

  const containerHeightCollapsed = `${collapsedHeightRem}rem`;
  const containerHeightExpanded = `${expandedHeightRem}rem`;

  if (!currentTrack) {
    return null;
  }

  return (
    <motion.aside
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={false}
      animate={{
        height: hovered ? containerHeightExpanded : containerHeightCollapsed,
      }}
      transition={{ type: "spring", stiffness: 280, damping: 30 }}
      className={styles.player}
      aria-label="Music player"
    >
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
          {currentTrack.title}
        </motion.div>
      </div>

      <motion.div
        className={styles.controls}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
        transition={{ duration: 0.2 }}
      >
        <button
          type="button"
          onClick={handlePrev}
          className={styles.controlButton}
          aria-label="Previous track"
        >
          ⏮️
        </button>
        <button
          type="button"
          onClick={togglePlay}
          className={styles.playButton}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? "⏸️" : "▶️"}
        </button>
        <button
          type="button"
          onClick={handleNext}
          className={styles.controlButton}
          aria-label="Next track"
        >
          ⏭️
        </button>
      </motion.div>

      <div className={styles.meta}>
        <div className={styles.trackTitle}>{currentTrack.title}</div>
        <div className={styles.trackCounter}>
          {index + 1} / {normalizedTracks.length}
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progress} style={{ width: `${progress}%` }} />
        </div>
      </div>
    </motion.aside>
  );
}
