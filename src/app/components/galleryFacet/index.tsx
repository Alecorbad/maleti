"use client";
import galleryFacetStyles from "./galleryFacet.module.css"
import { Gallery, Painting} from '@/app/types/galleries';
import Link from 'next/link'
import Image from 'next/image'
import { useRef } from "react";
import { motion,  useDragControls } from "framer-motion";
import MediaQuery from '@/app/hooks/useMediaQuery';



interface GalleryProps {
  gallery: Gallery;
  justifyContent?: string;
  xRange?: {start: string, end: string};
}


const GalleryFacet: React.FC<GalleryProps> = (props: GalleryProps) => {
   const targetRef = useRef(null); 
   const dragControls = useDragControls();
   const isMobile = MediaQuery(768);
   //const justifyContent = (props.justifyContent ? props.justifyContent : "flex-start");
 

  
  return (
    <>
     <div className={`${galleryFacetStyles.GalleryContainer}`} ref={targetRef} >
          <div className={`${galleryFacetStyles.GalleryName} unmovable`} onPointerDown={event => dragControls.start(event)} style={{ touchAction: "none" }}>
             <Link href={`/${props.gallery.pageName}`}>
                <h1> {props.gallery.title} </h1>
             </Link>
          </div>
           <div className={`${galleryFacetStyles.GalleryWrapper}`}>
              <motion.div 
                dragConstraints={targetRef}
                drag= {isMobile ? "x" : false}
                dragControls={dragControls}
                dragListener={false}
                className={`${galleryFacetStyles.ImagesContainer}`} 
                style={{justifyContent: "center"}}>
              {
                 takeRandomPaintings(props.gallery, 10).map(
                    (paint) => {
                      return <Image
                        key={paint.id}
                        src={paint.url ?? ''}
                        width={500}
                        height={500}
                        alt="Picture of the author"
                      >
                      

                      </Image>
                      // return <PaintingComponent 
                            // key={paint.id} 
                            // objectFit="contain"
                            // height="100%"
                            // width="30rem"
                            // margin="1rem"
                            // frameWidth="fit-content"
                            // frameHeight="fit-content"
                            // framePadding=".3rem"
                            // frameColor="rgb(255, 255, 255)"
                            // painting={paint} 
                            // gridArea={`p${paint.id}`}
                        // />
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


// function generateRandomNumber(min: number, max: number, jump: number = 10){
//    const ran = Math.random() * (max - min) + min;
//   return Math.round(ran / jump) * jump;
// }

export default GalleryFacet;

