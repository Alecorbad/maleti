
"use client";
import { stagger, useAnimate, animate } from "framer-motion";
import { motion } from "framer-motion";

import styles from "./header.module.css"
import Link from 'next/link'

const Header = () => {


         //    {("Home").split('').map((letter, index) => (
         //       <motion.span
         //         variants={textMotion}
         //         className="letter relative inline-block h-8 leading-8 after:absolute after:left-0 after:top-full after:h-8 after:content-[attr(data-letter)]"
         //         key={`${letter}-${index}`}
         //       >
         //         {letter}
         //       </motion.span>
         // ))}
  return (
    <>
    <div className={styles.header} >
      <div className={styles.linkList} >
        <Link href="/">
          <AnimatedText text="Home" delay={0.05}/>
        </Link>
        <Link href="/about">
          <AnimatedText text="About" delay={0.05}/>
        </Link>
        <Link href="/contact-us">
          <AnimatedText text="Contatti" delay={0.05}/>
        </Link>
      </div>    
    </div>    
    </>
  );
};

type AnimatedTextProps = {
  text: string;
  el?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  duration?: number;
  padding?: string;
}

export const AnimatedText = ({
  text,
  el: Wrapper = "div",
  delay = 0.1,
  duration = 0.25,
  className,
}: AnimatedTextProps) => {
    const divProperties: React.CSSProperties = {
    }

    return <Wrapper 
        className={className}
    >
      <motion.div 
        initial="initial" 
        whileHover="hovered"
        className="relative block overflow-hidden whitespace-nowrap"
      >
        <div className="sr-only">{text}</div>
        <div aria-hidden style={divProperties}>
          {text.split('').map((c, i) => (
            <motion.span key={`${c}-${i}`}
              className="inline-block"
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" }
              }}
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
              {text.split('').map((c, i) => (
                <motion.span key={`${c}-${i}`}
                  className="inline-block"
                  variants={{
                    initial: { y: "100%" },
                    hovered: { y: "0" }
                  }}
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
}



export default Header;

