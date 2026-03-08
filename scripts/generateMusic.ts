import fs from "fs";
import path from "path";
import { getSongs } from "./getSongs";

type ExistingSong = {
  title: string;
  artist?: string;
  origin?: string;
  url?: string;
  originUrl?: string;
  // compat: vecchio nome del campo
  providerUrl?: string;
};

const musicFolderPath = path.join(process.cwd(), "public/static/music");
const songs = getSongs(musicFolderPath);

// Percorso del JSON delle tracce musicali
const musicJsonPath = path.join(process.cwd(), "src/json/music.json");

let existingSongs: ExistingSong[] = [];

// Se esiste già il file, lo leggiamo per preservare i campi modificabili a mano (es. originUrl)
if (fs.existsSync(musicJsonPath)) {
  try {
    const raw = fs.readFileSync(musicJsonPath, "utf-8");
    existingSongs = JSON.parse(raw) as ExistingSong[];
  } catch (error) {
    console.warn("Could not read existing music.json, regenerating from scratch.", error);
  }
}

// Merge tra nuove tracce e dati esistenti, usando l'URL come chiave
const mergedSongs = songs.map((song) => {
  const existing = existingSongs.find((s) => s.url === song.url);

  return {
    ...song,
    // originUrl può essere aggiunto/modificato a mano nel JSON
    // e non verrà sovrascritto al regen
    originUrl: existing?.originUrl ?? existing?.providerUrl ?? "",
  };
});

fs.writeFileSync(musicJsonPath, JSON.stringify(mergedSongs, null, "\t"));

console.log(`Generated music.json with ${mergedSongs.length} songs.`);
