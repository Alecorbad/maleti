import { Gallery } from '@/app/types/galleries';
import {getPaintings} from './getPaintings'
import * as path from 'path';
import * as fs from 'fs';


export enum GalleryFolderName{
  IncontriDeserto = 'incontri_nel_deserto',
  Frammenti = 'frammenti',
  Floras = 'floras',
  Ikebana = 'ikebana',
  AgiliFragili = 'agili_fragili',
  LettereNuovoMondo = 'lettere_nuovo_mondo',
  Cartoni = 'cartoni',
  GiardinoImpermanenza = 'giardino_impermanenza',
  FormeArchetipiche = 'forme_archetipiche',
  Croste = 'croste',
  FrammentiInconscio = 'frammenti_inconscio',
  // IL RESTO è IN PIù
  Butterfly = 'butterfly',
  DiecimilaMondi = 'diecimila_mondi',
  EsiliSegni = 'esili_segni',
  Matite = 'matite',
  Squosh = 'squosh',
  Torri = 'torri',
  None = 'none',
}


export enum GalleryPage{
  IncontriDeserto = 'incontri_nel_deserto',
  Frammenti = 'frammenti',
  Floras = 'floras',
  Ikebana = 'ikebana',
  AgiliFragili = 'agiliFragili',
  LettereNuovoMondo = 'lettereNuovoMondo',
  Cartoni = 'cartoni',
  GiardinoImpermanenza = 'giardinoImpermanenza',
  FormeArchetipiche = 'formeArchetipiche',
  Croste = 'croste',
  FrammentiInconscio = 'frammentiInconscio',
  // IL RESTO è IN PIù
  Butterfly = 'butterfly',
  DiecimilaMondi = 'diecimila_mondi',
  EsiliSegni = 'esili_segni',
  Matite = 'matite',
  Squosh = 'squosh',
  Torri = 'torri',
  None = 'none'
}

export function getGallery(searchData: string): Gallery{
 const baseGalleryPath: string = `public/static/galleries/`;

   if(searchData == GalleryFolderName.FrammentiInconscio || searchData == GalleryPage.FrammentiInconscio){
     const folderPath = `${baseGalleryPath}${GalleryFolderName.FrammentiInconscio}`
     const gallery = new Gallery({
       id: GalleryFolderName.FrammentiInconscio,
       paintings: getPaintings(folderPath),
       title: "Frammenti dell'Inconscio", 
       folderName: GalleryFolderName.FrammentiInconscio,
       folderPath: folderPath,
       pageName: GalleryPage.FrammentiInconscio,
       description: "Galleria", 
     });
     return gallery;
   }

   if(searchData == GalleryFolderName.FormeArchetipiche || searchData == GalleryPage.FormeArchetipiche){
     const folderPath = `${baseGalleryPath}${GalleryFolderName.FormeArchetipiche}`
     const gallery = new Gallery({
       id: GalleryFolderName.FormeArchetipiche,
       paintings: getPaintings(folderPath),
       title: "Forme Archetipiche", 
       folderName: GalleryFolderName.FormeArchetipiche,
       folderPath: folderPath,
       pageName: GalleryPage.FormeArchetipiche,
       description: "Galleria", 
     });
     return gallery;
   }

   if(searchData == GalleryFolderName.Cartoni || searchData == GalleryPage.Cartoni){
     const folderPath = `${baseGalleryPath}${GalleryFolderName.Cartoni}`
     const gallery = new Gallery({
       id: GalleryFolderName.Cartoni,
       paintings: getPaintings(folderPath),
       title: "Cartoni", 
       folderName: GalleryFolderName.Cartoni,
       folderPath: folderPath,
       pageName: GalleryPage.Cartoni,
       description: "Galleria", 
     });
     return gallery;
   }

   if(searchData == GalleryFolderName.LettereNuovoMondo || searchData == GalleryPage.LettereNuovoMondo){
     const folderPath = `${baseGalleryPath}${GalleryFolderName.LettereNuovoMondo}`
     const gallery = new Gallery({
       id: GalleryFolderName.LettereNuovoMondo,
       paintings: getPaintings(folderPath),
       title: "Lettere del Nuovo Mondo", 
       folderName: GalleryFolderName.LettereNuovoMondo,
       folderPath: folderPath,
       pageName: GalleryPage.LettereNuovoMondo,
       description: "Galleria", 
     });
     return gallery;
   }


   if(searchData == GalleryFolderName.AgiliFragili || searchData == GalleryPage.AgiliFragili){
     const folderPath = `${baseGalleryPath}${GalleryFolderName.AgiliFragili}`
     const gallery = new Gallery({
       id: GalleryFolderName.AgiliFragili,
       paintings: getPaintings(folderPath),
       title: "Agili Fragili", 
       folderName: GalleryFolderName.AgiliFragili,
       folderPath: folderPath,
       pageName: GalleryPage.AgiliFragili,
       description: "Galleria", 
     });
     return gallery;
   }
  
   if(searchData == GalleryFolderName.Floras || searchData == GalleryPage.Floras){
     const folderPath = `${baseGalleryPath}${GalleryFolderName.Floras}`
     const gallery = new Gallery({
       id: GalleryFolderName.Floras,
       paintings: getPaintings(folderPath),
       title: "Floras", 
       folderName: GalleryFolderName.Floras,
       folderPath: folderPath,
       pageName: GalleryPage.Floras,
       description: "Galleria", 
     });
     return gallery;
   }


   if(searchData == GalleryFolderName.Ikebana || searchData == GalleryPage.Ikebana){
     const folderPath = `${baseGalleryPath}${GalleryFolderName.Ikebana}`
     const gallery = new Gallery({
       id: GalleryFolderName.Ikebana,
       paintings: getPaintings(folderPath),
       title: "Ikebana", 
       folderName: GalleryFolderName.Ikebana,
       folderPath: folderPath,
       pageName: GalleryPage.Ikebana,
       description: "Galleria", 
     });
     return gallery;
   }

   if(searchData == GalleryFolderName.Frammenti || searchData == GalleryPage.Frammenti){
     const folderPath = `${baseGalleryPath}${GalleryFolderName.Frammenti}`
     const gallery = new Gallery({
       id: GalleryFolderName.Frammenti,
       paintings: getPaintings(folderPath),
       title: "Frammenti", 
       folderName: GalleryFolderName.Frammenti,
       folderPath: folderPath,
       pageName: GalleryPage.Frammenti,
       description: "Galleria", 
     });
     return gallery;
   }

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
     const folderPath = `${baseGalleryPath}${GalleryFolderName.Croste}`
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



function orderGalleries(galleries: Gallery[]){
  const order: GalleryFolderName[] = [
  GalleryFolderName.IncontriDeserto,
  GalleryFolderName.Frammenti ,
  GalleryFolderName.Floras ,
  GalleryFolderName.Ikebana ,
  GalleryFolderName.AgiliFragili ,
  GalleryFolderName.LettereNuovoMondo ,
  GalleryFolderName.Cartoni ,
  GalleryFolderName.GiardinoImpermanenza ,
  GalleryFolderName.FormeArchetipiche ,
  GalleryFolderName.Croste ,
  GalleryFolderName.FrammentiInconscio ,
  ] 

  return order.map(o => {
    return galleries.find(g => g.folderName == o);
  })
}

/**
 * Recupera tutte le gallerie disponibili nella directory delle gallerie.
 * @returns Array di oggetti Gallery.
 */
export function getAllGalleries() {
 const galleriesFolder = `public/static/galleries`;
 const excludedGalleries: string[] = []

 const galleryNames = fs.readdirSync(galleriesFolder)
 .filter((folderName) => !excludedGalleries.includes(folderName))
 .filter((folderName) => {
   const folderPath = path.join(galleriesFolder, folderName);
   const stats = fs.lstatSync(folderPath);
   return stats.isDirectory();
 });

 const orderedGalleries = orderGalleries(galleryNames.map(galleryName => getGallery(galleryName)))
 return orderedGalleries
}

