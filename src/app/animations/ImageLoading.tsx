
"use client";

import { motion } from "framer-motion";
// import StyleAnimations from "./animations.module.css"
type ImageLoadingProps = {
  children: React.ReactNode;
  isLoaded: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export default function ImageLoading({
  children,
  isLoaded,
  className,
  style
}: ImageLoadingProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={false}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{
        duration: 0.75,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
