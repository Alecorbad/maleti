import fs from 'fs';
import path from 'path';
import { getSongs } from "./getSongs";

const musicFolderPath = path.join(process.cwd(), 'public/static/music');
const songs = getSongs(musicFolderPath);

fs.writeFileSync(
  path.join(process.cwd(), 'src/json/music.json'),
  JSON.stringify(songs, null, "\t")
);

console.log(`Generated music.json with ${songs.length} songs.`);
