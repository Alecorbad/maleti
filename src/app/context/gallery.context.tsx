import React, { createContext, useContext } from 'react';
import { Gallery} from "@/app/types/galleries";

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

export const GalleryProvider = ({
  galleries,
  children,
}: {
  galleries: Gallery[];
  children: React.ReactNode;
}) => {
  return (
    <GalleryContext.Provider value={{ galleries }}>
      {children}
    </GalleryContext.Provider>
  );
};

export default GalleryProvider;
