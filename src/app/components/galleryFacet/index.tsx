"use client";
import galleryFacetStyles from "./galleryFacet.module.css"
import Image from 'next/image'
import { Gallery, Painting} from '@/app/types/galleries';
import Link from 'next/link'

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react"


interface GalleryProps {
  gallery: Gallery;
  justifyContent?: string;
  xRange?: {start: string, end: string};
}


const GalleryCard: React.FC<GalleryProps> = (props: GalleryProps) => {
   const targetRef = useRef(null); 
   const justifyContent = (props.justifyContent ? props.justifyContent : "flex-start");
   let xRange: {start: string, end: string};

   if(justifyContent == "flex-end"){
     xRange = { start: (props.xRange ? props.xRange.start : "0"), 
       end: (props.xRange ? props.xRange.end : "30%")
     }
   }
   else{
      xRange = { start: (props.xRange ? props.xRange.start : "0%"), 
        end: (props.xRange ? props.xRange.end : "-30%")
      }
   }

   const { scrollYProgress } = useScroll({
     target: targetRef,
   })
    
  const x = useTransform(scrollYProgress, [0, 1], [xRange.start, xRange.end]);

  
  return (
    <>
     <div className={`${galleryFacetStyles.defaultGalleryContainer}`} ref={targetRef}>
          <div className={`${galleryFacetStyles.defaultGalleryName}`}>
             <Link href={`/${props.gallery.pageName}`}>
                <h2> {props.gallery.title} </h2>
             </Link>
          </div>
           <div className={`${galleryFacetStyles.defaultGalleryWrapper}`}>
              <motion.div 
                className={`${galleryFacetStyles.defaultImagesContainer}`} 
                style={{x, justifyContent: justifyContent}}>
              {
                 takeRandomPaintings(props.gallery, 10).map(
                    (paint) => {
                      return <Image
                            key={paint.id}
                            src={paint.url ?? ""}
                            height= {500}
                            width= {500}
                            alt="Dipinto non disponibile"
                      />
                  })
              }
              </motion.div>
          </div>
      </div>    
    </>
  );
};


//  <motion.div className={`${galleryFacetStyles.defaultGalleryName}`} 
//          initial={{ opacity: 0 }} 
//          whileInView={{ opacity: 1, 'backdrop-filter': 'blur(.7px)' }}
//          transition={{ duration: 0.7 }}
//          >
//            <Link href={`/${gallery.pageName}`}>
//              <h2> {gallery.title} </h2>
//            </Link>
//        </motion.div>




function takeRandomPaintings(gallery: Gallery, paintNum: number = 5): Painting[]{
 const result: Painting[] = [];
  const usedIndices = new Set<number>();
  if(paintNum > gallery.paintings.length){
    paintNum = gallery.paintings.length;
  }

  while (result.length < paintNum) {
    const randomIndex = Math.floor(Math.random() * gallery.paintings.length);
    if (!usedIndices.has(randomIndex)) {
      result.push(gallery.paintings[randomIndex]);
      usedIndices.add(randomIndex);
    }
  }
  return result;
}


function generateRandomNumber(min: number, max: number, jump: number = 10){
   const ran = Math.random() * (max - min) + min;
  return Math.round(ran / jump) * jump;
}

export default GalleryCard;

