'use client'
import { useState, useEffect } from 'react';

import { motion } from "framer-motion";
import Image from 'next/image'
import Header from "./components/header";
import Footer from "./components/footer";
import GalleryFacetComponent from './components/galleryFacet';
import { Gallery } from '@/app/types/galleries';
import StylesHomePage from './homepage.module.css';

export default function Home() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [bannerGallery, setBannerGallery] = useState<Gallery | null>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const hasAnimated = sessionStorage.getItem('hasAnimated');

    if (!hasAnimated) {
      setShouldAnimate(true);
      sessionStorage.setItem('hasAnimated', 'true');
    }
  }, []);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await fetch('/api/galleries');
        const data = await response.json();
        setGalleries(data); 
      } catch (error) {
        console.error('Error fetching paintings:', error);
      }
    };

    fetchGalleries(); 
  }, []); 

   useEffect(() => {
      const fetchBannerGallery = async () => {
        try {
          const response = await fetch(`/api/galleries?pageName=esili_segni`);
          const data = await response.json();
          setBannerGallery(data); 
        } catch (error) {
          console.error('Error fetching paintings:', error);
        }
      };

      fetchBannerGallery(); 
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
                {!shouldAnimate ? (
                  <div className={StylesHomePage.titleContainer}>
                    <h1 className={StylesHomePage.title1}>
                      Simona Maleti
                    </h1>
                  </div>
                ) : ( animateBanner() ) 
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

function animateBanner(){
    sessionStorage.setItem("animationDone", "true");
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
