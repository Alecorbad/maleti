import fs from "fs";
import path from "path";

type Song = {
  title: string;
  artist: string;
  origin: string;
  url: string;
};

// Funzione helper per parsare il nome del file
// Formato atteso: "Provenienza - Artista - Titolo.mp3"
function parseFileName(fileName: string): {
  title: string;
  artist: string;
  origin: string;
} {
  const nameWithoutExt = path.parse(fileName).name;
  const parts = nameWithoutExt.split(" - ");

  if (parts.length >= 3) {
    return {
      origin: parts[0].trim(),
      artist: parts[1].trim(),
      title: parts.slice(2).join(" - ").trim(),
    };
  } else if (parts.length === 2) {
    return {
      origin: "Unknown",
      artist: parts[0].trim(),
      title: parts[1].trim(),
    };
  } else {
    return {
      origin: "Unknown",
      artist: "Unknown",
      title: nameWithoutExt.trim(),
    };
  }
}

export function getSongs(musicFolderPath: string): Song[] {
  if (!fs.existsSync(musicFolderPath)) {
    console.warn(`Music folder not found: ${musicFolderPath}`);
    return [];
  }

  const list = fs.readdirSync(musicFolderPath);

  // Filtra solo file audio supportati
  const audioFiles = list.filter((file) => /\.(mp3|wav|ogg|m4a)$/i.test(file));

  return audioFiles.map((file) => {
    // Path relativo per il frontend
    let filePath = path.join(musicFolderPath, file);
    // filePath assoluto -> relativo al progetto -> url pubblico
    const publicUrl = `/maleti/${path.relative(process.cwd(), filePath).replace("public/", "")}`;

    const metadata = parseFileName(file);

    return {
      title: metadata.title,
      artist: metadata.artist,
      origin: metadata.origin,
      url: publicUrl,
    };
  });
}
