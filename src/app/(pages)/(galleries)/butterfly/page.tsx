"use client"
import { useState, useEffect } from 'react';
import  React, { useRef } from 'react';
import { usePathname } from 'next/navigation'

import { Gallery, Painting } from "@/app/types/galleries";
import Wall from "@/app/components/wall";
import PaintingComponent from "@/app/components/painting";
import { generatePaintings } from "@/app/utils/gallery.utils"


enum WallRange{
  zero = 0,
  first = 6,
  second = 7
}


export default function About() {
  const [gallery, setGallery] = useState<Gallery>();
  const pageName = usePathname().replace('/', '');
  const initialized = useRef(false)

     // {gallery ? gallery.paintings.map(
     // (paint) => {
       // return <Image
             // key={paint.id}
             // src={paint.url ?? ""}
             // height= {500}
             // width= {500}
             // alt="Dipinto non disponibile"
       // />
     // })
     // : "NoGalleryFound"}


useEffect(() => {
    if (initialized.current) { return }
    initialized.current = true
    const fetchGallery = async () => {
      try {
        const response = await fetch(`/api/galleries?pageName=${pageName}`);
        const data = await response.json();
        setGallery(data); 
      } catch (error) {
        console.error('Error fetching butterfly gallery:', error);
      }
    };
    
    fetchGallery(); 
  }); 


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



