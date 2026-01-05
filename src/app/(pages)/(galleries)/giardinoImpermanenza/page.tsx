
"use client"
import { Gallery, Painting } from "@/app/types/galleries";
import Wall from "@/app/components/wall";
import PaintingComponent from "@/app/components/painting";
import { generatePaintings } from "@/app/utils/gallery.utils"
import { useGalleryContext } from "@/app/providers/gallery.provider"
import { usePathname } from "next/navigation";
import MediaQuery from '@/app/hooks/useMediaQuery';
import GalleriesStyle from '../../pagesLayout.module.css';


export default function GiardinoImpermanenza() {
  const galleriesContext = useGalleryContext();
  const galleries: Gallery[] = galleriesContext.galleries
  const pageName: string = usePathname().replace('/', '');
  const gallery: Gallery = galleries.filter((g) => g.pageName == pageName)[0]


  //import MediaQuery from '@/app/hooks/useMediaQuery';
  const isMobile = MediaQuery(768);
  if (isMobile) {
    return <>
      <Wall mode="flex" width="100%">
        {
          generatePaintings((paint: Painting, key: number) => {
            return <div key={paint.id}
              className={`${GalleriesStyle.paintingFocus}`}>
              <PaintingComponent
                displayText={true}
                objectFit="contain"
                height="auto"
                width="100%"
                margin="3rem 0 3rem 0"
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
  } else {
    return <>
      <Wall mode="flex" width="100%">
        {
          generatePaintings((paint: Painting, key: number) => {
            return <div key={paint.id}
              className={`${GalleriesStyle.paintingFocus}`}>
              <PaintingComponent
                displayText={true}
                objectFit="contain"
                height="95vh"
                width="auto"
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


