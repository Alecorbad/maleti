 //import React, { useEffect, useRef, useState } from "react";
 //import { motion } from "framer-motion";
 //
 //type MusicPlayerProps = {
   //tracks?: string[];
   //expandedHeightRem?: number;
   //collapsedHeightRem?: number;
 //};
 //
 //export default function MusicPlayer({
   //tracks = ["/music/track1.mp3", "/music/track2.mp3"],
   //expandedHeightRem = 8,
   //collapsedHeightRem = 3,
 //}: MusicPlayerProps) {
   //const audioRef = useRef<HTMLAudioElement | null>(null);
   //const [index, setIndex] = useState(0);
   //const [playing, setPlaying] = useState(false);
   //const [hovered, setHovered] = useState(false);
   //const [progress, setProgress] = useState(0);
   //const titleRef = useRef<HTMLDivElement | null>(null);
   //const containerRef = useRef<HTMLDivElement | null>(null);
   //const [needsScroll, setNeedsScroll] = useState(false);
 //
   //useEffect(() => {
     //if (!audioRef.current) {
       //audioRef.current = new Audio(tracks[index]);
       //audioRef.current.preload = "metadata";
     //}
 //
     //const audio = audioRef.current;
 //
     //const onEnded = () => handleNext();
     //const onTimeUpdate = () => {
       //if (!audio || !audio.duration) return;
       //setProgress((audio.currentTime / audio.duration) * 100);
     //};
 //
     //audio.addEventListener("ended", onEnded);
     //audio.addEventListener("timeupdate", onTimeUpdate);
 //
     //return () => {
       //audio.removeEventListener("ended", onEnded);
       //audio.removeEventListener("timeupdate", onTimeUpdate);
     //};
   //}, [handle]);
 //
   //useEffect(() => {
     //if (!audioRef.current) return;
     //const audio = audioRef.current;
     //const wasPlaying = !audio.paused && !audio.ended;
     //audio.src = tracks[index];
     //audio.load();
     //if (wasPlaying || playing) audio.play().catch(() => setPlaying(false));
   //}, [index]);
 //
   //useEffect(() => {
     //if (!titleRef.current || !containerRef.current) return;
     //const titleWidth = titleRef.current.scrollWidth;
     //const containerWidth = containerRef.current.clientWidth;
     //setNeedsScroll(titleWidth > containerWidth);
   //}, [index, tracks]);
 //
   //const togglePlay = async () => {
     //if (!audioRef.current) return;
     //try {
       //if (playing) {
         //audioRef.current.pause();
         //setPlaying(false);
       //} else {
         //await audioRef.current.play();
         //setPlaying(true);
       //}
     //} catch (e) {
       //console.warn("Playback failed:", e);
     //}
   //};
 //
   //const handlePrev = () => {
     //if (!audioRef.current) return;
     //if (audioRef.current.currentTime > 3) {
       //audioRef.current.currentTime = 0;
     //} else {
       //setIndex((i) => (i - 1 + tracks.length) % tracks.length);
     //}
     //setPlaying(true);
   //};
 //
   //const handleNext = () => {
     //setIndex((i) => (i + 1) % tracks.length);
     //setPlaying(true);
   //};
 //
   //const titleFromPath = (p: string) => {
     //try {
       //const parts = p.split("/");
       //const file = parts[parts.length - 1];
       //return decodeURIComponent(file).replace(/[-_]/g, " ").replace(/\.mp3$/i, "");
     //} catch {
       //return p;
     //}
   //};
 //
   //const containerHeightCollapsed = `${collapsedHeightRem}rem`;
   //const containerHeightExpanded = `${expandedHeightRem}rem`;
 //
   //return (
     //<motion.aside
       //onHoverStart={() => setHovered(true)}
       //onHoverEnd={() => setHovered(false)}
       //onMouseEnter={() => setHovered(true)}
       //onMouseLeave={() => setHovered(false)}
       //initial={false}
       //animate={{ height: hovered ? containerHeightExpanded : containerHeightCollapsed }}
       //transition={{ type: "spring", stiffness: 280, damping: 30 }}
       //style={{
         //position: 'fixed',
         //bottom: 0,
         //left: 0,
         //zIndex: 50,
         //width: '20rem',
         //backgroundColor: 'rgba(255,255,255,0.95)',
         //backdropFilter: 'blur(10px)',
         //boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
         //borderTopRightRadius: '1rem',
         //borderTopLeftRadius: '1rem',
         //overflow: 'hidden',
         //display: 'flex',
         //flexDirection: 'column-reverse',
         //justifyContent: 'flex-start',
         //padding: '0.5rem',
       //}}
     //>
       //{/* Always visible title with conditional scrolling only when collapsed */}
       //<div ref={containerRef} style={{ position: 'absolute', bottom: '0.5rem', left: '3rem', right: '0.5rem', overflow: 'hidden', whiteSpace: 'nowrap' }}>
         //<motion.div
           //ref={titleRef}
           //animate={needsScroll && !hovered ? { x: ['0%', `-${titleRef.current?.scrollWidth - containerRef.current?.clientWidth}px`] } : { x: 0 }}
           //transition={needsScroll && !hovered ? { repeat: Infinity, repeatType: 'loop', duration: 10, ease: 'linear' } : { duration: 0 }}
           //style={{ display: 'inline-block' }}
         //>
           //{titleFromPath(tracks[index])}
         //</motion.div>
       //</div>
 //
       //<motion.div
         //style={{ display: 'flex', alignItems: 'center', width: '100%' }}
         //initial={{ opacity: 0 }}
         //animate={{ opacity: hovered ? 1 : 0 }}
         //transition={{ duration: 0.2 }}
       //>
         //<div style={{ flexShrink: 0, width: '2.5rem', height: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.5rem', backgroundColor: '#f0f0f0' }}>
           //<div style={{ width: '20px', height: '20px', clipPath: 'polygon(0 0, 100% 50%, 0 100%)', backgroundColor: '#333' }} />
         //</div>
 //
         //<div style={{ marginLeft: '0.75rem', flex: 1, minWidth: 0 }}>
           //<div style={{ fontSize: '0.875rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{titleFromPath(tracks[index])}</div>
           //<div style={{ fontSize: '0.75rem', color: '#6b7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{`${index + 1} / ${tracks.length}`}</div>
 //
           //<div style={{ width: '100%', marginTop: '0.5rem', height: '0.25rem', backgroundColor: '#e5e7eb', borderRadius: '9999px', overflow: 'hidden' }}>
             //<div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#111' }} />
           //</div>
 //
           //<div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
             //<button onClick={handlePrev} style={{ padding: '0.25rem', borderRadius: '0.375rem', backgroundColor: '#f9f9f9', border: 'none', cursor: 'pointer' }}>⏮️</button>
             //<button onClick={togglePlay} style={{ padding: '0.5rem', borderRadius: '9999px', border: 'none', boxShadow: '0 2px 6px rgba(0,0,0,0.2)', cursor: 'pointer' }}>{playing ? '⏸️' : '▶️'}</button>
             //<button onClick={handleNext} style={{ padding: '0.25rem', borderRadius: '0.375rem', backgroundColor: '#f9f9f9', border: 'none', cursor: 'pointer' }}>⏭️</button>
           //</div>
         //</div>
       //</motion.div>
     //</motion.aside>
   //);
 //}
