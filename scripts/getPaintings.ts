import { uuid } from "@/app/utils/functions.utils";
import fs from "fs";
import path from "path";
import { Painting, Gallery } from "@/app/types/galleries";
import { readFileSync } from "node:fs";
import { imageSize } from "image-size";

// --- Funzione principale: raccoglie i dipinti da una cartella
export function getPaintings(
  galleryFolderPath: string,
  jsonParsedGallery?: Gallery,
): Painting[] {
  const list = fs.readdirSync(galleryFolderPath);

  const paintingsFromJson = jsonParsedGallery?.paintings ?? [];

  const paintingsFromFolder = list.map((file) => {
    // path file
    let filePath = path.join(galleryFolderPath, file);
    filePath = path.relative(process.cwd(), filePath);

    // buffer e dimensioni
    const buffer = readFileSync(filePath);
    const dimensions = imageSize(buffer);

    // url pubblico
    filePath = filePath.replace("public", "");
    filePath = `/maleti${filePath}`;

    // titolo ricavato dal nome file
    const titleFromPath = path
      .parse(file)
      .name.replace(/_/g, " ")
      .replace(/-/g, "'");

    let title: string | undefined = titleFromPath;
    let description: string | undefined;

    return new Painting({
      id: uuid(),
      title: title,
      description: description,
      author: "Simona Maleti",
      url: filePath,
      dimensions: { width: dimensions.width, height: dimensions.height },
    });
  });

  const paintingsMerge = paintingsFromJson
    .map((paintingJson) => {
      const paintingFolder = paintingsFromFolder.find(
        (p) => p.url == paintingJson.url,
      );
      if (paintingFolder) {
        let painting = paintingFolder;
        painting.title =
          paintingJson?.title != paintingFolder.title
            ? paintingJson.title
            : paintingFolder.title;

        painting.description = paintingJson.description
          ? paintingJson.description
          : "";

        return painting;
      }
    })
    .filter((p): p is Painting => p !== null);

  const paintingsNew = paintingsFromFolder
    .filter((paintingFolder) => {
      if (
        !paintingsFromJson.find(
          (paintingJson) => paintingJson.url == paintingFolder.url,
        )
      ) {
        return paintingFolder;
      }
    })
    .filter((p): p is Painting => p !== null);

  return [...paintingsMerge, ...paintingsNew];
}

// --- Helper: cerca un dipinto nel JSON per URL
export function getJsonPaintingData(
  paintingUrl: string,
  jsonParsedGallery: Gallery,
): Painting | undefined {
  try {
    const painting = jsonParsedGallery.paintings.find(
      (p) => p.url === paintingUrl,
    );
    if (painting) return painting;
    return undefined;
  } catch (error) {
    console.error("Errore durante la lettura di galleries.json:", error);
    return undefined;
  }
}
