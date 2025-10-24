
import { uuid }  from '@/app/utils/functions.utils';
import fs from 'fs';
import path from 'path';
import { Painting, Gallery } from '@/app/types/galleries';
import { readFileSync } from 'node:fs'
import { imageSize } from 'image-size'

export function getPaintings(galleryFolderPath: string, jsonParsedGallery?: Gallery): Painting[]{
    const list = fs.readdirSync(galleryFolderPath);
    const paintings = list.map((file) => {
              let filePath = path.join(galleryFolderPath, file);
              filePath = path.relative(process.cwd(), filePath);
              const buffer = readFileSync(filePath);
              const dimensions = imageSize(buffer);

              filePath = filePath.replace('public', '');
              filePath = `/maleti${filePath}`;

              const titleFromPath = path.parse(file).name
              .replace(/_/g, ' ')  
              .replace(/-/g, "'");

              let title: string | undefined;
              let description: string | undefined;
              if(jsonParsedGallery){
                const jsonParsedPainting = getJsonPaintingData(filePath, jsonParsedGallery);
                title = (jsonParsedPainting && (jsonParsedPainting?.title != titleFromPath)) ? (jsonParsedPainting?.title ?? undefined) : titleFromPath
                description = (jsonParsedPainting && jsonParsedPainting?.description) ? jsonParsedPainting?.description : undefined;
              }
              else{
                title =  titleFromPath;
              }

              return new Painting({
                id: uuid(), 
                title: title, 
                description: description,
                author: 'Simona Maleti', 
                url: filePath,
                dimensions: {width: dimensions.width, height: dimensions.height}
              });
            }); 
    return paintings;
}


/**
 * Legge il file galleries.json e restituisce un dipinto in base al suo URL;
 .
 */
export function getJsonPaintingData(paintingUrl: string, jsonParsedGallery: Gallery): Painting | undefined {
  try {
    const painting = jsonParsedGallery.paintings.find((p) => p.url === paintingUrl);
    if (painting) return painting;
    return undefined; 
  } catch (error) {
    console.error("Errore durante la lettura di galleries.json:", error);
    return undefined;
  }
}

