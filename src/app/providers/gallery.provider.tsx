"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Gallery} from "@/app/types/galleries";
import jsonGalleries from "@/json/galleries.json"

interface GalleryContextType {
  galleries: Gallery[];
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const useGalleryContext = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGalleryContext must be used within a GalleryProvider');
  }
  return context;
};

export async function getStaticProps(){
  
}

export const GalleryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);

  useEffect(() => {
    setGalleries(jsonGalleries)
    // Carica i dati dal JSON generato
    // fetch('json/galleries.json')
    //   .then(res => res.json())
    //   .then(data => setGalleries(data));
  }, []);

  return (
    <GalleryContext.Provider value={{ galleries }}>
      {children}
    </GalleryContext.Provider>
  );
};

export default GalleryProvider;
