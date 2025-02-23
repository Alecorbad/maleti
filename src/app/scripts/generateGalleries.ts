import fs from 'fs';
import path from 'path';
import { getAllGalleries } from "./getGalleries"

const galleries = getAllGalleries();

fs.writeFileSync(
  path.join(process.cwd(), 'src/json/galleries.json'),
  JSON.stringify(galleries, null, "\t")
);


