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
  first = 7,
  second = 30
}


export default function About() {
  const [gallery, setGallery] = useState<Gallery>();
  const pageName = usePathname().replace('/', '');
  const initialized = useRef(false)

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
               "p4 p4 p4" 
               "p3 p5 p6" 
              `}
            gridGap="1rem"
            gridRowsTemplate="30vh 60vh 30vh"
            gridMobileRowsTemplate="auto auto auto"
            gridColsTemplate="30% 30% 30%"
            >
      {
        generatePaintings((paint: Painting, key: number) => {
          return <PaintingComponent 
              key={paint.id} 
              objectFit="contain"
              painting={paint} 
              gridArea={`p${key}`}
              frameWidth="100%"
              framePadding="1rem"
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
              objectFit="contain"
              height="20rem"
              width="25rem"
              margin="1rem"
              frameWidth="100%"
              framePadding="1rem"
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



