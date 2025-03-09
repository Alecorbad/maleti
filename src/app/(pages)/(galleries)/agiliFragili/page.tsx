
"use client"
import { Gallery, Painting } from "@/app/types/galleries";
import Wall from "@/app/components/wall";
import PaintingComponent from "@/app/components/painting";
import { generatePaintings } from "@/app/utils/gallery.utils"
import { useGalleryContext } from "@/app/providers/gallery.provider"
import { usePathname } from "next/navigation";


export default function AgiliFragili() {
  const galleriesContext = useGalleryContext();
  const galleries: Gallery[] = galleriesContext.galleries
  const pageName: string = usePathname().replace('/', '');
  const gallery: Gallery = galleries.filter((g) => g.pageName == pageName)[0]


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
          gallery ? gallery?.paintings : []
        )
      }
      </Wall>
      

  </>;
}



