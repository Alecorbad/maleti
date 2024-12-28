
import fs from 'fs';
import path from 'path';
import { Painting } from '@/app/types/galleries';

export function getPaintings(galleryFolderPath: string){
    const list = fs.readdirSync(galleryFolderPath);
    return list.map((file, index) => {
      let filePath = path.join(galleryFolderPath, file);
      filePath = path.relative(process.cwd(), filePath);
      filePath = filePath.replace('public', '');
      return new Painting({
        id: index, 
        title: filePath, 
        author: 'Simona Maleti', 
        url: filePath
      });
    });
  } 



