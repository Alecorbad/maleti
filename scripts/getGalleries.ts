import { Gallery, Painting } from '@/app/types/galleries';
import {getPaintings} from './getPaintings'
import * as path from 'path';
import * as fs from 'fs';


 const galleriesMapPath = path.join(process.cwd(), "src", "json", "galleries.json");
 const jsonData = fs.readFileSync(galleriesMapPath, "utf8");
 const jsonParsedGalleries = JSON.parse(jsonData) as Gallery[];


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
  TorriPreziose = 'torri_preziose',
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
  IncontriDeserto = 'incontriDeserto',
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
  TorriPreziose = 'torriPreziose',
  // IL RESTO è IN PIù
  Butterfly = 'butterfly',
  DiecimilaMondi = 'diecimila_mondi',
  EsiliSegni = 'esili_segni',
  Matite = 'matite',
  Squosh = 'squosh',
  Torri = 'torri',
  None = 'none'
}


 function galleryFactory(galleriesPath: string, title: string, galleryFolder: GalleryFolderName, galleryPage: GalleryPage): Gallery{
     const folderPath = `${galleriesPath}${galleryFolder}`
     const parsedJsonGallery: Gallery | undefined = jsonParsedGalleries.find(g => g.id == galleryFolder);
     const paintings: Painting [] =  getPaintings(folderPath, parsedJsonGallery) ?? [];
     const gallery = new Gallery({
       id: galleryFolder,
       title: title, 
       paintings: paintings,
       folderName: galleryFolder,
       folderPath: folderPath,
       pageName: galleryPage,
       description: "Galleria", 
     });
     gallery.paintings 
     return gallery;
}

export  function getGallery(searchData: string): Gallery{
 const baseGalleryPath: string = `public/static/galleries/`;

   if(searchData == GalleryFolderName.FrammentiInconscio || searchData == GalleryPage.FrammentiInconscio){
    return  galleryFactory(baseGalleryPath, "Frammenti dell'Inconscio",GalleryFolderName.FrammentiInconscio, GalleryPage.FrammentiInconscio);
   }

   if(searchData == GalleryFolderName.FormeArchetipiche || searchData == GalleryPage.FormeArchetipiche){
    return  galleryFactory(baseGalleryPath, "Forme Archetipiche",GalleryFolderName.FormeArchetipiche, GalleryPage.FormeArchetipiche);
   }

   if(searchData == GalleryFolderName.Cartoni || searchData == GalleryPage.Cartoni){
    return  galleryFactory(baseGalleryPath, "Cartoni",GalleryFolderName.Cartoni, GalleryPage.Cartoni);
   }

   if(searchData == GalleryFolderName.LettereNuovoMondo || searchData == GalleryPage.LettereNuovoMondo){
    return  galleryFactory(baseGalleryPath, "Lettere dal Nuovo Mondo",GalleryFolderName.LettereNuovoMondo, GalleryPage.LettereNuovoMondo);
   }

   if(searchData == GalleryFolderName.AgiliFragili || searchData == GalleryPage.AgiliFragili){
    return  galleryFactory(baseGalleryPath, "Agili Fragili",GalleryFolderName.AgiliFragili, GalleryPage.AgiliFragili);
   }

   if(searchData == GalleryFolderName.Floras || searchData == GalleryPage.Floras){
    return  galleryFactory(baseGalleryPath, "Floras",GalleryFolderName.Floras, GalleryPage.Floras);
   }
  
   if(searchData == GalleryFolderName.Ikebana || searchData == GalleryPage.Ikebana){
    return  galleryFactory(baseGalleryPath, "Ikebana",GalleryFolderName.Ikebana, GalleryPage.Ikebana);
   }

   if(searchData == GalleryFolderName.Frammenti || searchData == GalleryPage.Frammenti){
    return  galleryFactory(baseGalleryPath, "Frammenti",GalleryFolderName.Frammenti, GalleryPage.Frammenti);
   }

   if(searchData == GalleryFolderName.Butterfly || searchData == GalleryPage.Butterfly){
    return  galleryFactory(baseGalleryPath, "Butterfly",GalleryFolderName.Butterfly, GalleryPage.Butterfly);
   }

   if(searchData == GalleryFolderName.Croste || searchData == GalleryPage.Croste){
    return  galleryFactory(baseGalleryPath, "Croste",GalleryFolderName.Croste, GalleryPage.Croste);
   }

   if(searchData == GalleryFolderName.DiecimilaMondi || searchData == GalleryPage.DiecimilaMondi){
    return  galleryFactory(baseGalleryPath, "Diecimila Mondi",GalleryFolderName.DiecimilaMondi, GalleryPage.DiecimilaMondi);
   }

   if(searchData == GalleryFolderName.EsiliSegni || searchData == GalleryPage.EsiliSegni){
    return  galleryFactory(baseGalleryPath, "Esili Segni",GalleryFolderName.EsiliSegni, GalleryPage.EsiliSegni);
   }

   if(searchData == GalleryFolderName.GiardinoImpermanenza || searchData == GalleryPage.GiardinoImpermanenza){
    return  galleryFactory(baseGalleryPath, "Giardino dell'Impermanenza",GalleryFolderName.GiardinoImpermanenza, GalleryPage.GiardinoImpermanenza);
   }

   if(searchData == GalleryFolderName.Matite || searchData == GalleryPage.Matite){
    return  galleryFactory(baseGalleryPath, "Matite",GalleryFolderName.Matite, GalleryPage.Matite);
   }

   if(searchData == GalleryFolderName.Squosh || searchData == GalleryPage.Squosh){
    return  galleryFactory(baseGalleryPath, "Squosh",GalleryFolderName.Squosh, GalleryPage.Squosh);
   }

   if(searchData == GalleryFolderName.Torri || searchData == GalleryPage.Torri){
    return  galleryFactory(baseGalleryPath, "Torri",GalleryFolderName.Torri, GalleryPage.Torri);
   }

   if(searchData == GalleryFolderName.IncontriDeserto || searchData == GalleryPage.IncontriDeserto){
    return  galleryFactory(baseGalleryPath, "Incontri nel Deserto",GalleryFolderName.IncontriDeserto, GalleryPage.IncontriDeserto);
   }

   if(searchData == GalleryFolderName.TorriPreziose || searchData == GalleryPage.TorriPreziose){
    return  galleryFactory(baseGalleryPath, "Torri Preziose",GalleryFolderName.TorriPreziose, GalleryPage.TorriPreziose);
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
  GalleryFolderName.TorriPreziose ,
  ] 

  return order.map(o => {
    return galleries.find(g => g.folderName == o);
  })
}

/**
 * Recupera tutte le gallerie disponibili nella directory delle gallerie.
 * @returns Array di oggetti Gallery.
 */
export  function getAllGalleries() {
 const galleriesFolder = `public/static/galleries`;
 const excludedGalleries: string[] = []

 const galleryNames = fs.readdirSync(galleriesFolder)
 .filter((folderName) => !excludedGalleries.includes(folderName))
 .filter((folderName) => {
   const folderPath = path.join(galleriesFolder, folderName);
   const stats = fs.lstatSync(folderPath);
   return stats.isDirectory();
 });

  const galleries = galleryNames.map(galleryName => {
    const gallery: Gallery = getGallery(galleryName)
    return gallery;
  });

 const orderedGalleries = orderGalleries(galleries)
 return orderedGalleries
}

