
"use client";
import { motion } from "framer-motion";
import React, {  useState } from 'react';
import MediaQuery from '@/app/hooks/useMediaQuery';
// createContext, useContext, useEffect,

import styles from "./header.module.css"
import Link from 'next/link'

const Header = () => {
  const [menuState, setMenu] = useState<boolean>(false);
  const isMobile = MediaQuery(768);
  const pages: {name: string, href: string}[]=[
    {
      name: "About",
      href: "/about"
    },
    {
      name: "Home",
      href: "/"
    },
    {
      name: "Contattaci",
      href: "/contact-us"
    }
  ];
  if(isMobile){
    return (
      <>
        <div className={styles.mobileBanner}>
          <div className={styles.left}>
            <motion.div 
            className={styles.menuButton} 
            animate= { 
              menuState ?
              { rotate: 90 } :
              { rotate: 0 }
            }
            transition={{
              duration: 0.75,
              ease: "easeInOut", 
            }}
            onClick={() => setMenu(!menuState)}>
              <motion.div 
                animate={
                  menuState ?
                  { rotate: 45, y: 8 } :
                  { rotate: 0, y: 0 }
                } 
                transition={{
                  duration: 0.75,
                  ease: "easeInOut", 
                }}
                className={styles.bar}>
              </motion.div>
              <motion.div 
                animate={
                  menuState ?
                  { opacity: 0 } :
                  { opacity: 1 }
                } 
                transition={{
                  duration: 0.5,
                  ease: "easeInOut", 
                }}
                className={styles.bar}>
              </motion.div>
              <motion.div 
                animate={
                  menuState ?
                  { rotate: -45, y: -8 } :
                  { rotate: 0, y: 0 }
                } 
                transition={{
                  duration: 0.75,
                  ease: "easeInOut", 
                }}
                className={styles.bar}>
              </motion.div>
            </motion.div>

            <motion.div className={styles.menu}
                animate={
                  !menuState ?
                  { width: 0, opacity: 0} :
                  { width: "70vw", opacity: 1 }
                } 
                transition={{
                  duration: 0.75,
                  ease: "easeInOut", 
                }}
            >
            <div style={{width: "100%", height: "4rem"}}></div>
            {
              pages.map((p, index)=>{
                return <Link href={p.href} key={index}>
                  <AnimatedText text={p.name} delay={0.05}/>
                </Link>
              })
            }
            </motion.div>
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
      <div className={styles.linkList}>
        {
          pages.map((p, index)=>{
            return <Link href={p.href} key={index}>
              <AnimatedText text={p.name} delay={0.05}/>
            </Link>
          })
        }
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

