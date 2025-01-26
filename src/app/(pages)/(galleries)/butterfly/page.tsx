import { Gallery, Painting } from "@/app/types/galleries";
import Wall from "@/app/components/wall";
import PaintingComponent from "@/app/components/painting";
import { generatePaintings } from "@/app/utils/gallery.utils"
import { getAllGalleries } from "@/app/scripts/getGalleries";


enum WallRange{
  zero = 0,
  first = 6,
  second = 7
}


function getGalleries() {
  const res = JSON.parse(getAllGalleries())
  return res;
}


export default function Butterfly() {
  const galleries: Gallery[] = getGalleries()
  const gallery: Gallery = galleries.filter((g) => g.pageName == "butterfly")[0]

  return <>
      <Wall mode="grid" 
            gridTemplateAreas={`
               "p0 p1 p2" 
               "p3 p4 p5" 
              `}
            gridGap="0 3rem"
            gridColsTemplate="30vh 30vh 30vh"
            itemsAlign="stretch"
            >
      {
        generatePaintings((paint: Painting, key: number) => {
          return <PaintingComponent 
              key={paint.id} 
              objectFit="contain"
              painting={paint} 
              gridArea={`p${key}`}
          />},
          gallery ? gallery?.paintings : [],
          {from: WallRange.zero, to: WallRange.first}
        )
      }
      </Wall>


      <Wall mode="flex"  width="100%">
      {
         generatePaintings((paint: Painting, key: number) => {
          return <PaintingComponent 
              key={paint.id} 
              objectFit="cover"
              height="15rem"
              width="15rem"
              painting={paint} 
              gridArea={`p${key}`}
          />},
          gallery ? gallery?.paintings : [],
          {from: WallRange.first}
        )
      }
      </Wall>
      
  </>;
}



