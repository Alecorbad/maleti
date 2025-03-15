"use client"


import { Gallery, Painting } from "@/app/types/galleries";
import Wall from "@/app/components/wall";
import PaintingComponent from "@/app/components/painting";
import { generatePaintings } from "@/app/utils/gallery.utils"
import { useGalleryContext } from "@/app/providers/gallery.provider"
import { usePathname } from "next/navigation";



export default function IncontriDeserto() {
  const galleriesContext = useGalleryContext();
  const galleries: Gallery[] = galleriesContext.galleries
  const pageName: string = usePathname().replace('/', '');
  const gallery: Gallery = galleries.filter((g) => g.pageName == pageName)[0]


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

  return <>
      <Wall mode="flex"  width="100%">
      {
         generatePaintings((paint: Painting, key: number) => {
          return <PaintingComponent 
              key={paint.id} 
              objectFit="contain"
              height="20rem"
              width="25rem"
              margin="1rem"
              frameWidth="100%"
              framePadding="1rem"
              frameColor="rgb(255, 255, 255)"
              painting={paint} 
              gridArea={`p${key}`}
          />},
          gallery ? gallery?.paintings : [],
        )
      }
      </Wall>
      

  </>;
}



