
import { uuid }  from '@/app/utils/functions.utils';
import fs from 'fs';
import path from 'path';
import { Painting } from '@/app/types/galleries';
import { readFileSync } from 'node:fs'
import { imageSize } from 'image-size'

export function getPaintings(galleryFolderPath: string): Painting[]{
    const list = fs.readdirSync(galleryFolderPath);
    const paintings = list.map((file) => {
              let filePath = path.join(galleryFolderPath, file);
              filePath = path.relative(process.cwd(), filePath);
              const buffer = readFileSync(filePath)
              const dimensions = imageSize(buffer)
              filePath = filePath.replace('public', '');
              return new Painting({
                id: uuid(), 
                title: filePath, 
                author: 'Simona Maleti', 
                url: `/maleti${filePath}`,
                dimensions: {width: dimensions.width, height: dimensions.height}
              });
            }); 
    return paintings;
}




