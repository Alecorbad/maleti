
"use client";
import { motion } from "framer-motion";
import MediaQuery from '@/app/hooks/useMediaQuery';
;

import styles from "./header.module.css"
import Link from 'next/link'

const Header = () => {
  const isMobile = MediaQuery(768);
  if(isMobile){
    return (
      <>
        <div className={styles.mobileBanner}>
          <div className={styles.left}>
            <div className={styles.menuButton}>
              <div className={styles.bar}></div>
              <div className={styles.bar}></div>
              <div className={styles.bar}></div>
            </div>
          </div>
          <div className={styles.center}>
          </div>
          <div className={styles.right}>
          </div>
        </div>
      </>
    )
  }
  
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

