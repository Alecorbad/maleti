"use client"


import { useState,  useEffect } from 'react';
import React from 'react';
import { motion } from "framer-motion";
import Image from 'next/image'
import Header from "./components/header";
import Footer from "./components/footer";
import GalleryFacetComponent from './components/galleryFacet';
import StylesHomePage from './homepage.module.css';
import { Gallery } from '@/app/types/galleries';
import { useGalleryContext } from "@/app/providers/gallery.provider"


  function animateBanner(){
    return <motion.div className={StylesHomePage.titleContainer}
    animate= {{
      height: ["20rem", "3rem"],
    }}
    transition={{
      times: [1],
      duration: 1,
      ease: "easeInOut", 
    }}
    >
      <h1 className={StylesHomePage.title1}>
        Simona Maleti
      </h1>
    </motion.div>
  }


export default function Home() {
  const galleriesContext = useGalleryContext()
  const galleries = galleriesContext.galleries
  const bannerGallery: Gallery = galleries.filter((g) => g.pageName == "floras")[0]
  const [hasBannerAnimated, setHasBannerAnimated] = useState<boolean>(false);

  useEffect(() => {
     const hasBannerAnimated = sessionStorage.getItem('hasBannerAnimated');
     if(hasBannerAnimated){
        setHasBannerAnimated(true);
     }
     else{
      sessionStorage.setItem("hasBannerAnimated", "yes");
     }
  }, []);

  return (
    <>
      <div className={`${StylesHomePage.homepageBanner}`}>
        {
            bannerGallery ? bannerGallery.paintings.slice(0, 5).map((paint, key) => {
              return <Image className={StylesHomePage.bannerImage} height={500} width ={300} key={key} src={paint.url ?? ""} alt=""/>
            }) : <></>
        }
        <div className={StylesHomePage.titleWrapper}>
          {!hasBannerAnimated ? (
            animateBanner() 
          ) : ( 
            <div className={StylesHomePage.titleContainer}>
              <h1 className={StylesHomePage.title1}>
                Simona Maleti
              </h1>
            </div>
              ) 

          }
        </div>
      </div>
      <div className={`${StylesHomePage.homepageHeader} headerContainer`}>
          <Header />
      </div>
      <div className={`${StylesHomePage.homepageContainer} pageContainer container`}>
      {
          galleries.map((gallery, key) => (
            <div className={`${StylesHomePage.galleryContainer}`} key={`galCont_${gallery.title}`}>
                <GalleryFacetComponent 
                justifyContent={key % 2 == 0 ? "flex-start" : "flex-end"}
                gallery={gallery} 
                key={`gal_${gallery.title}`} />
            </div>
          ))
      }
      </div>
      <div className={`${StylesHomePage.homepageFooter} footerContainer`}>
        <Footer />
      </div>
    </>
  );
}

