"use client";
import { useState, useEffect } from "react";
import galleryFacetStyles from "./galleryFacet.module.css";
import { Gallery, Painting, JustifyContent } from "@/app/types/galleries";
import Link from "next/link";
import Image from "next/image";

import { motion, TargetAndTransition } from "framer-motion";
import MediaQuery from "@/app/hooks/useMediaQuery";

interface GalleryProps {
  gallery: Gallery;
  justifyContent?: JustifyContent;
  xRange?: { start: string; end: string };
}

const GalleryFacet: React.FC<GalleryProps> = (props: GalleryProps) => {
  const isMobile = MediaQuery(768);
  const justifyContent: JustifyContent = props.justifyContent ?? "flex-start";
  const [paintings, setPaintings] = useState<Painting[]>([]);

  useEffect(() => {
    // 1. Prendiamo un set iniziale di dipinti (tutti quelli disponibili o fino a 20 unici)
    let baseList = takeRandomPaintings(props.gallery, 10);

    // 2. Se la lista è vuota, usciamo
    if (baseList.length === 0) return;

    // 3. Moltiplichiamo la lista finché non abbiamo abbastanza elementi da coprire schermi grandi (es. 4K)
    // Una media di 300px per immagine * 15 immagini = 4500px, sufficiente per la maggior parte degli schermi.
    const MIN_ITEMS_TO_FILL_SCREEN = 20;

    while (baseList.length < MIN_ITEMS_TO_FILL_SCREEN) {
      baseList = [...baseList, ...baseList];
    }

    // 4. Creiamo il loop perfetto duplicando l'intera lista "sicura"
    // La struttura finale sarà [A, A]. L'animazione muove esattamente del 50% (la lunghezza di A).
    setPaintings([...baseList, ...baseList]);
  }, [props.gallery]);

  // Calcoliamo una durata basata sul numero di elementi per mantenere la velocità costante
  // Più elementi = striscia più lunga = serve più tempo per percorrerla alla stessa velocità visiva
  const baseDuration = isMobile ? 20000 : 15000;
  // Fattore di correzione se abbiamo aggiunto tantissime immagini (opzionale, ma aiuta la fluidità)
  const durationModifier = paintings.length > 0 ? paintings.length / 20 : 1;

  const galleryWidth = paintings.reduce(
    (sum, painting) => sum + painting.dimensions!.width,
    0,
  );

  const transAB: TargetAndTransition = {
    x: ["0%", `${galleryWidth.toString()}px`],
    transition: {
      duration: baseDuration * Math.max(0.3, durationModifier * 0.2),
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    },
  };

  const transBA: TargetAndTransition = {
    x: ["0%", `-${galleryWidth.toString()}px`],
    transition: {
      duration: baseDuration * Math.max(0.3, durationModifier * 0.2),
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    },
  };

  let selectedTransaction;
  switch (justifyContent) {
    case "flex-end":
      selectedTransaction = transAB;
      break;
    case "flex-start":
      selectedTransaction = transBA;
      break;
  }

  return (
    <>
      <div
        className={`${galleryFacetStyles.GalleryContainer}`}
        key={isMobile ? "mobile-anim" : "desktop-anim"}
      >
        <div className={`${galleryFacetStyles.GalleryName} unmovable`}>
          <Link href={`/${props.gallery.pageName}`}>
            <h1 style={{ fontWeight: "bold" }}> {props.gallery.title} </h1>
          </Link>
        </div>
        <div className={`${galleryFacetStyles.GalleryWrapper}`}>
          <motion.div
            className={`${galleryFacetStyles.ImagesContainer}`}
            animate={selectedTransaction}
            style={{
              justifyContent: isMobile ? "center" : justifyContent,
              touchAction: "pan-y",
            }}
          >
            {paintings.map((paint, index) => {
              return (
                <Image
                  priority
                  fetchPriority="high"
                  key={`${paint.id ?? "paint"}-${index}`}
                  src={paint.url ?? ""}
                  height={
                    paint.dimensions ? (paint.dimensions.height ?? 500) : 500
                  }
                  width={
                    paint.dimensions ? (paint.dimensions.width ?? 500) : 500
                  }
                  alt={
                    paint.title
                      ? `Dipinto: ${paint.title}`
                      : "Dipinto non disponibile"
                  }
                />
              );
            })}
          </motion.div>
        </div>
      </div>
    </>
  );
};

function takeRandomPaintings(
  gallery: Gallery,
  paintNum: number = 5,
): Painting[] {
  const result: Painting[] = [];
  const usedIndices = new Set<number>();
  if (paintNum > gallery.paintings.length) {
    paintNum = gallery.paintings.length;
  }

  while (result.length < paintNum) {
    const randomIndex = Math.floor(Math.random() * gallery.paintings.length);
    if (!usedIndices.has(randomIndex)) {
      result.push(gallery.paintings[randomIndex]);
      usedIndices.add(randomIndex);
    }
  }
  return result;
}

export default GalleryFacet;
