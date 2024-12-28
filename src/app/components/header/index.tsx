
"use client";
import styles from "./header.module.css"
import Link from 'next/link'

const Header = () => {
  return (
    <>
    <div className={styles.header} >
      <div className={styles.linkList} >
        <Link href="/">
          Home
        </Link>
        <Link href="/about">
          About
        </Link>
        <Link href="/contact-us">
          Contact Us
        </Link>
      </div>    
    </div>    
    </>
  );
};

export default Header;

