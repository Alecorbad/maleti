"use client";
import { easeInOut, motion } from "framer-motion";
import React from "react";
import { useEffect, useRef, useState } from "react";
import MediaQuery from "@/app/hooks/useMediaQuery";
import { randomUUID } from "crypto";

import styles from "./header.module.css";
import Link from "next/link";

class Option {
  name: string;
  href: string | null;
  options: Option[];

  constructor(data: { name: string; href?: string; options?: Option[] }) {
    this.name = data.name;
    this.href = data.href ?? null;
    this.options = data.options ?? [];
  }
}

const Header = () => {
  const [menuState, setMenu] = useState<boolean>(false);
  const isMobile = MediaQuery(768);
  const pages: Option[] = [
    new Option({
      name: "Home",
      href: "/",
    }),
  ];

  const ref = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuHovered, setMenuHovered] = useState(false);

  // Controllo la posizione dello scroll
  useEffect(() => {
    const handleScroll = () => setMenuHovered(window.scrollY === 0);

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //Controllo se l'header è in posizione "sticky"
  useEffect(() => {
    const checkSticky = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      // Se il top dell'header è sopra lo scroll corrente, è sticky
      setIsSticky(rect.top < 0);
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        checkSticky();
      }
    };

    checkSticky(); // controlla subito al mount
    const observer = new IntersectionObserver(
      //Callback
      ([entry]) => {
        setIsSticky(entry.intersectionRatio < 1);
      },
      {
        //Opzioni
        threshold: [0, 1],
      },
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.disconnect();
    };
  }, []);

  if (isMobile) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.base}></div>
        <div className={styles.mobileBanner}>
          <div className={styles.left}>
            <motion.div
              className={styles.menuButton}
              animate={menuState ? { rotate: 90 } : { rotate: 0 }}
              transition={{
                duration: 0.75,
                ease: "easeInOut",
              }}
              onClick={() => setMenu(!menuState)}
            >
              <motion.div
                animate={menuState ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.75, ease: "easeInOut" }}
                className={styles.bar}
              ></motion.div>
              <motion.div
                animate={menuState ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={styles.bar}
              ></motion.div>
              <motion.div
                animate={
                  menuState ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.75, ease: "easeInOut" }}
                className={styles.bar}
              ></motion.div>
            </motion.div>

            <motion.div
              className={styles.menu}
              animate={
                !menuState
                  ? { width: 0, opacity: 0 }
                  : { width: "45vw", opacity: 1 }
              }
              transition={{ duration: 0.75, ease: "easeInOut" }}
            >
              <div style={{ width: "100%", height: "4rem" }}></div>
              {pages.map((option, index) => {
                return (
                  <div className={styles.mobileLink} key={index}>
                    <Link href={option.href ?? ""}>
                      <AnimatedText text={option.name} delay={0.05} />
                    </Link>
                  </div>
                );
              })}
            </motion.div>
          </div>
          <div className={styles.center}></div>
          <div className={styles.right}></div>
        </div>
      </div>
    );
  } else {
    const states = {
      none: {
        y: "0",
        transition: {
          duration: 0.4,
          ease: easeInOut,
        },
      },
      up: {
        y: "-15vh",
        transition: {
          delay: 0.3,
          duration: 0.5,
          ease: easeInOut,
        },
      },
    };

    return (
      <motion.div
        id="headerDesktopWrap"
        ref={ref}
        variants={states}
        initial={false}
        animate={isSticky && !isMenuHovered ? "up" : "none"}
        transition={{ duration: 0.75, ease: "easeInOut" }}
        className={styles.wrapper}
      >
        <div className={styles.base}></div>
        <div className={styles.headerContainer}>
          <motion.div
            className={styles.header}
            style={{
              background: isSticky
                ? "rgba(var(--colorB3), 0.7)"
                : "transparent",
            }}
            onHoverStart={() => setMenuHovered(true)}
            onHoverEnd={() => setMenuHovered(false)}
          >
            <div className={styles.linkList}>
              {pages.map((option, index) => {
                return (
                  <div className={styles.option} key={index}>
                    <Link href={option.href ?? ""}>
                      <AnimatedText text={option.name} delay={0.05} />
                    </Link>
                  </div>
                );
              })}
            </div>
          </motion.div>
          {isSticky && (
            <div className={styles.hoverMenuContainer}>
              <motion.div
                className={styles.hoverMenu}
                onHoverStart={() => setMenuHovered(true)}
                onHoverEnd={() => setMenuHovered(false)}
              >
                Menu
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>
    );
  }
};

type AnimatedTextProps = {
  text: string;
  el?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  duration?: number;
  padding?: string;
};

export const AnimatedText = ({
  text,
  el: Wrapper = "div",
  delay = 0.1,
  duration = 0.25,
  className,
}: AnimatedTextProps) => {
  const divProperties: React.CSSProperties = {};

  return (
    <Wrapper className={className}>
      <motion.div
        initial="initial"
        whileHover="hovered"
        className={`relative block overflow-hidden whitespace-nowrap `}
      >
        <div className="sr-only">{text}</div>
        <div aria-hidden style={divProperties}>
          {text.split("").map((c, i) => (
            <motion.span
              key={`${c}-${i}`}
              className={`inline-block ${styles.letter}`}
              variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
              transition={{
                delay: delay * i,
                ease: "easeInOut",
                duration: duration,
              }}
            >
              {c}
            </motion.span>
          ))}
        </div>
        <div aria-hidden className="absolute inset-0" style={divProperties}>
          {text.split("").map((c, i) => (
            <motion.span
              key={`${c}-${i}`}
              className={`inline-block ${styles.letter}`}
              variants={{ initial: { y: "100%" }, hovered: { y: "0" } }}
              transition={{
                delay: delay * i,
                ease: "easeInOut",
                duration: duration,
              }}
            >
              {c}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </Wrapper>
  );
};

export default Header;
