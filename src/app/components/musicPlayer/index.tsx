"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./musicPlayer.module.css";
import { useMusic } from "@/app/providers/music.provider";
import useMediaQuery from "@/app/hooks/useMediaQuery";

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
  >
    <polygon points="5 4 15 12 5 20 5 4"></polygon>
    <line x1="19" y1="5" x2="19" y2="19" strokeWidth="2"></line>
  </svg>
);

export default function MusicPlayer() {
  const { currentTrack, playing, progress, next, prev, togglePlay } = useMusic();
  const isMobile = useMediaQuery(767);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [needsScroll, setNeedsScroll] = useState(false);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [marqueeDuration, setMarqueeDuration] = useState(10);
  const [detailsVisible, setDetailsVisible] = useState(false);

  useEffect(() => {
    const updateMarquee = () => {
      const titleWidth = titleRef.current?.scrollWidth ?? 0;
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const distance = Math.max(0, titleWidth - containerWidth + 12);
      setScrollDistance(distance);
      setNeedsScroll(distance > 0);
      const duration = Math.max(8, distance / 24);
      setMarqueeDuration(duration);
    };

    updateMarquee();
    window.addEventListener("resize", updateMarquee);

    return () => {
      window.removeEventListener("resize", updateMarquee);
    };
  }, [currentTrack?.title]);

  if (isMobile || !currentTrack) {
    return null;
  }

  return (
    <motion.aside
      className={`${styles.player} ${detailsVisible ? styles.playerExpanded : ""}`}
      aria-label="Music player"
    >
      <div className={styles.contentWrapper}>
        <div className={styles.titleRow}>
          <div
            className={styles.infoArea}
            onMouseEnter={() => setDetailsVisible(true)}
            onMouseLeave={() => setDetailsVisible(false)}
          >
            <div className={styles.marqueeContainer}>
              <div ref={containerRef} className={styles.titleScroller}>
                <motion.div
                  ref={titleRef}
                  animate={
                    needsScroll
                      ? { x: [0, -scrollDistance] }
                      : { x: 0 }
                  }
                  transition={
                    needsScroll
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
                  <span className={styles.trackTitle}>
                    {currentTrack.artist && currentTrack.title
                      ? `${currentTrack.artist} - ${currentTrack.title}`
                      : currentTrack.title}
                  </span>
                </motion.div>
              </div>
            </div>

            <div className={styles.detailsRow}>
              <div className={styles.progressBarContainer}>
                <div
                  className={styles.progressBar}
                  style={{ width: `${progress}%` }}
                />
              </div>
              {currentTrack.origin && (
                <div className={styles.originWrapper}>
                  <span className={styles.originLabel}>from</span>
                  {currentTrack.originUrl ? (
                    <a
                      href={currentTrack.originUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.originLink}
                    >
                      {currentTrack.origin}
                    </a>
                  ) : (
                    <span className={styles.originText}>{currentTrack.origin}</span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className={styles.controls}>
            <button
              type="button"
              onClick={prev}
              className={styles.controlButton}
              aria-label="Previous track"
            >
              <PrevIcon />
            </button>
            <button
              type="button"
              onClick={() => void togglePlay()}
              className={styles.playButton}
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button
              type="button"
              onClick={next}
              className={styles.controlButton}
              aria-label="Next track"
            >
              <NextIcon />
            </button>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
