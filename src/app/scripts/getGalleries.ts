
import { Gallery } from '@/app/types/galleries';
import {getPaintings} from './getPaintings'
import path from 'path';
import fs from 'fs';


export enum GalleryFolderName{
  None = 'none',
  Butterfly = 'butterfly',
  Croste = 'croste',
  DiecimilaMondi = 'diecimila_mondi',
  EsiliSegni = 'esili_segni',
  GiardinoImpermanenza = 'giardino_impermanenza',
  Matite = 'matite',
  Squosh = 'squosh',
  Torri = 'torri',
  IncontriDeserto = 'incontri_nel_deserto',
}


export enum GalleryPage{
  None = 'none',
  Butterfly = 'butterfly',
  Croste = 'croste',
  DiecimilaMondi = 'diecimila_mondi',
  EsiliSegni = 'esili_segni',
  GiardinoImpermanenza = 'giardino_impermanenza',
  Matite = 'matite',
  Squosh = 'squosh',
  Torri = 'torri',
  IncontriDeserto = 'incontri_nel_deserto',
}

export function getGallery(searchData: string): Gallery{
 const baseGalleryPath: string = `public/static/galleries/`;
   if(searchData == GalleryFolderName.Butterfly || searchData == GalleryPage.Butterfly){
     const folderPath = `${baseGalleryPath}${GalleryFolderName.Butterfly}`
     const gallery = new Gallery({
       id: GalleryFolderName.Butterfly,
       paintings: getPaintings(folderPath),
       title: "Butterfly", 
       folderName: GalleryFolderName.Butterfly,
       folderPath: folderPath,
       pageName: GalleryPage.Butterfly,
       description: "Galleria", 
     });
     return gallery;
   }

   if(searchData == GalleryFolderName.Croste || searchData == GalleryPage.Croste){
     const folderPath = `${baseGalleryPath}${GalleryFolderName.Butterfly}`
     return new Gallery({
       id: GalleryFolderName.Croste,
       paintings: getPaintings(folderPath),
       title: "Croste", 
       folderName: GalleryFolderName.Croste,
       folderPath: folderPath,
       pageName: GalleryPage.Croste,
       description: "Galleria", 
     });
   }

   if(searchData == GalleryFolderName.DiecimilaMondi || searchData == GalleryPage.DiecimilaMondi){
     const folderPath = `${baseGalleryPath}${GalleryFolderName.DiecimilaMondi}`
     return new Gallery({
       id: GalleryFolderName.DiecimilaMondi,
       paintings: getPaintings(folderPath),
       title: "Diecimila Mondi", 
       folderName: GalleryFolderName.DiecimilaMondi,
       folderPath: folderPath,
       pageName: GalleryPage.DiecimilaMondi,
       description: "Galleria", 
     });
   }


   if(searchData == GalleryFolderName.EsiliSegni || searchData == GalleryPage.EsiliSegni){
     const folderPath = `${baseGalleryPath}${GalleryFolderName.EsiliSegni}`
     return new Gallery({
       id: GalleryFolderName.EsiliSegni,
       paintings: getPaintings(folderPath),
       title: "Esili Segni", 
       folderName: GalleryFolderName.EsiliSegni,
       folderPath: folderPath,
       pageName: GalleryPage.EsiliSegni,
       description: "Galleria", 
     });
   }


   if(searchData == GalleryFolderName.GiardinoImpermanenza || searchData == GalleryPage.GiardinoImpermanenza){
     const folderPath = `${baseGalleryPath}${GalleryFolderName.GiardinoImpermanenza}`
     return new Gallery({
       id: GalleryFolderName.GiardinoImpermanenza,
       paintings: getPaintings(folderPath),
       title: "Giardino dell'Impermanenza", 
       folderName: GalleryFolderName.GiardinoImpermanenza,
       folderPath: folderPath,
       pageName: GalleryPage.GiardinoImpermanenza,
       description: "Galleria", 
     });
   }

   if(searchData == GalleryFolderName.Matite || searchData == GalleryPage.Matite){
     const folderPath = `${baseGalleryPath}${GalleryFolderName.Matite}`
     return new Gallery({
       id: GalleryFolderName.Matite,
       paintings: getPaintings(folderPath),
       title: "Matite", 
       folderName: GalleryFolderName.Matite,
       folderPath: folderPath,
       pageName: GalleryPage.Matite,
       description: "Galleria", 
     });
   }

   if(searchData == GalleryFolderName.Squosh || searchData == GalleryPage.Squosh){
     const folderPath = `${baseGalleryPath}${GalleryFolderName.Squosh}`
     return new Gallery({
       id: GalleryFolderName.Squosh,
       paintings: getPaintings(folderPath),
       title: "Squosh", 
       folderName: GalleryFolderName.Squosh,
       folderPath: folderPath,
       pageName: GalleryPage.Squosh,
       description: "Galleria", 
     });
   }


   if(searchData == GalleryFolderName.Torri || searchData == GalleryPage.Torri){
     const folderPath = `${baseGalleryPath}${GalleryFolderName.Torri}`
     return new Gallery({
       id: GalleryFolderName.Torri,
       paintings: getPaintings(folderPath),
       title: "Torri", 
       folderName: GalleryFolderName.Torri,
       folderPath: folderPath,
       pageName: GalleryPage.Torri,
       description: "Galleria", 
     });
   }

   if(searchData == GalleryFolderName.IncontriDeserto || searchData == GalleryPage.IncontriDeserto){
     const folderPath = `${baseGalleryPath}${GalleryFolderName.IncontriDeserto}`
     return new Gallery({
       id: GalleryFolderName.IncontriDeserto,
       paintings: getPaintings(folderPath),
       title: "Incontri nel deserto", 
       folderName: GalleryFolderName.IncontriDeserto,
       folderPath: folderPath,
       pageName: GalleryPage.IncontriDeserto,
       description: "Galleria", 
     });
   }

   return new Gallery({
     id: GalleryFolderName.None,
     paintings: [],
     title: "none", 
     folderName: GalleryFolderName.None,
     folderPath:  `${GalleryFolderName.None}`,
     pageName: GalleryPage.None,
     description: "Galleria", 
   });
}


/**
 * Recupera tutte le gallerie disponibili nella directory delle gallerie.
 * @returns Array di oggetti Gallery.
 */
export function getAllGalleries() {
 const galleriesFolder = `public/static/galleries`;
 const excludedGalleries: string[] = 
   [
    GalleryFolderName.Torri,
    GalleryFolderName.DiecimilaMondi,
    GalleryFolderName.Croste,
    GalleryFolderName.Matite,
    GalleryFolderName.Squosh,
    // GalleryFolderName.GiardinoImpermanenza,
    // GalleryFolderName.Butterfly,
    // GalleryFolderName.EsiliSegni,
   ]

 const galleryNames = fs.readdirSync(galleriesFolder)
 .filter((folderName) => !excludedGalleries.includes(folderName))
 .filter((folderName) => {
   const folderPath = path.join(galleriesFolder, folderName);
   const stats = fs.lstatSync(folderPath);
   return stats.isDirectory();
 });

 return JSON.stringify(galleryNames.map((galleryName) => getGallery(galleryName)));
}

