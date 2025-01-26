import { motion } from "framer-motion";
import Image from 'next/image'
import Header from "./components/header";
import Footer from "./components/footer";
import GalleryFacetComponent from './components/galleryFacet';
import { Gallery } from '@/app/types/galleries';
import StylesHomePage from './homepage.module.css';
import { getAllGalleries } from "./scripts/getGalleries";


function getGalleries() {
  const res = JSON.parse(getAllGalleries())
  return res;
}


function getAnimateState(){
  // const hasAnimated = sessionStorage.getItem('hasAnimated');
  // if (!hasAnimated) {
  //   sessionStorage.setItem('hasAnimated', 'true');
  //   return true;
  // }
  return false;
}



export default function Home() {
  const galleries: Gallery[] = getGalleries()
  const bannerGallery: Gallery = galleries.filter((g) => g.pageName == "esili_segni")[0]
  const shouldAnimate = getAnimateState();



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
