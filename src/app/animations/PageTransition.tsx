"use client";

import { motion, cubicBezier } from "framer-motion";
import StyleAnimations from "./animations.module.css"

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const easing = cubicBezier(0.47,0,0.75,0.72)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: easing, duration: 1 }}
      className={`${StyleAnimations.pageTransition}`}
    >
      {children}
    </motion.div>
  );
}
