"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, animate, MotionValue } from "framer-motion";

export default function VerticalScrollbar() {
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  // Posizione verticale della barra in %
  const scrollY: MotionValue<number> = useMotionValue(0);

  // Larghezza animata della barra
  const width: MotionValue<number> = useMotionValue(10);

  // Sincronizza la barra con lo scroll della pagina
  const handleScroll = () => {
    const scrollPercent =
      window.scrollY / (document.body.scrollHeight - window.innerHeight);
    if (!dragging) {
      animate(scrollY, scrollPercent * 100, {
        type: "spring",
        stiffness: 200,
        damping: 30,
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dragging]);

  // Inizio/fine drag
  const handleDragStart = () => {
    setDragging(true);
    animate(width, 20, { type: "spring", stiffness: 300, damping: 25 });
  };
  const handleDragEnd = () => {
    setDragging(false);
    animate(width, 10, { type: "spring", stiffness: 300, damping: 25 });
  };

  // Drag con mouse
  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging || !scrollbarRef.current) return;
    const scrollbarHeight = scrollbarRef.current.offsetHeight;
    const newScroll = e.clientY / scrollbarHeight;
    window.scrollTo({
      top: newScroll * (document.body.scrollHeight - window.innerHeight),
      behavior: "auto",
    });
    scrollY.set(newScroll * 100);
  };

  // Drag con touch
  const handleTouchMove = (e: TouchEvent) => {
    if (!dragging || !scrollbarRef.current) return;
    const touch = e.touches[0];
    const scrollbarHeight = scrollbarRef.current.offsetHeight;
    const newScroll = touch.clientY / scrollbarHeight;
    window.scrollTo({
      top: newScroll * (document.body.scrollHeight - window.innerHeight),
      behavior: "auto",
    });
    scrollY.set(newScroll * 100);
  };

  // Eventi globali
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleDragEnd);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [dragging]);

  return (
    <div
      ref={scrollbarRef}
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "20px",
        height: "100vh",
        background: "#eee",
        zIndex: 1000,
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          top: scrollY,
          left: 0,
          width: width,
          height: "60px",
          background: "#333",
          borderRadius: "15px",
          cursor: "pointer",
        }}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      />
    </div>
  );
}
