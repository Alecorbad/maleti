"use client"


import { Gallery, Painting } from "@/app/types/galleries";
import Wall from "@/app/components/wall";
import PaintingComponent from "@/app/components/painting";
import { generatePaintings } from "@/app/utils/gallery.utils"
import { useGalleryContext } from "@/app/providers/gallery.provider"
import { usePathname } from "next/navigation";
import MediaQuery from '@/app/hooks/useMediaQuery';

import GalleriesStyle from '../../pagesLayout.module.css';
// import GalleryStyle from './incontriDeserto.module.css';



export default function IncontriDeserto() {
  const galleriesContext = useGalleryContext();
  const galleries: Gallery[] = galleriesContext.galleries
  const pageName: string = usePathname().replace('/', '');
  const gallery: Gallery = galleries.filter((g) => g.pageName == pageName)[0]
  const isMobile = MediaQuery(768);
  console.log(gallery?.paintings)




//<Wall mode="grid" 
      //gridTemplateAreas={`
         //"p0 p1 p2" 
         //"p4 p4 p4" 
         //"p3 p5 p6" 
        //`}
      //gridGap="1rem"
      //gridRowsTemplate="30vh 60vh 30vh"
      //gridMobileRowsTemplate="auto auto auto"
      //gridColsTemplate="30% 30% 30%"
      //>
//{
  //generatePaintings((paint: Painting, key: number) => {
    //return <PaintingComponent 
        //key={paint.id} 
        //objectFit="contain"
        //painting={paint} 
        //gridArea={`p${key}`}
        //frameWidth="100%"
        //framePadding="1rem"
        //frameColor="white"
    ///>},
    //gallery ? gallery?.paintings : [],
  //)
//}
//</Wall>

  if(isMobile){
  return <>
      <Wall mode="flex"  width="100%">
      {
        generatePaintings((paint: Painting, key: number) => {
          return <div key={paint.id} 
          className={`${GalleriesStyle.paintingFocus}`}>
          <PaintingComponent 
          objectFit="contain"
          height="auto"
          width="100%"
          margin="0 1rem 6rem 0"
          frameWidth="100%"
          framePadding="1rem"
          frameColor="rgb(255, 255, 255)"
          painting={paint} 
          gridArea={`p${key}`}
          />
          </div>
        },

          gallery ? gallery?.paintings : [],
        )
      }
      </Wall>
  </>;
  }else{
  return <>
      <Wall mode="flex"  width="100%">
      {
        generatePaintings((paint: Painting, key: number) => {
          return <div key={paint.id} 
          className={`${GalleriesStyle.paintingFocus}`}>
          <PaintingComponent 
          key={paint.id} 
          objectFit="contain"
          height="95vh"
          width="auto"
          margin="1rem 1rem 10rem 1rem"
          frameWidth="100%"
          framePadding="1rem"
          frameColor="rgb(255, 255, 255)"
          painting={paint} 
          gridArea={`p${key}`}
          />
          </div>
        },

          gallery ? gallery?.paintings : [],
        )
      }
      </Wall>
  </>;
  }
}



