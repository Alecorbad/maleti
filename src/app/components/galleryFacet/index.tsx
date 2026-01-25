"use client";
import galleryFacetStyles from "./galleryFacet.module.css";
import { Gallery, Painting, JustifyContent } from "@/app/types/galleries";
import Link from "next/link";
import Image from "next/image";

import { motion, useDragControls, TargetAndTransition } from "framer-motion";
import MediaQuery from "@/app/hooks/useMediaQuery";

interface GalleryProps {
  gallery: Gallery;
  justifyContent?: JustifyContent;
  xRange?: { start: string; end: string };
}

const GalleryFacet: React.FC<GalleryProps> = (props: GalleryProps) => {
  const dragControls = useDragControls();

  const isMobile = MediaQuery(768);
  const justifyContent: JustifyContent = props.justifyContent ?? "flex-start";

  const transAB: TargetAndTransition = {
    x: isMobile ? ["0", "100%"] : ["20%", "100%"],
    transition: {
      duration: isMobile ? 30 : 100,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    },
  };

  const transBA: TargetAndTransition = {
    x: isMobile ? ["0", "-100%"] : ["-20%", "-100%"],
    transition: {
      duration: isMobile ? 30 : 100,
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

  const randomPaintings: Painting[] = takeRandomPaintings(props.gallery, 10);

  return (
    <>
      <div className={`${galleryFacetStyles.GalleryContainer}`}>
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
            {randomPaintings.map((paint) => {
              return (
                <Image
                  priority
                  fetchPriority="high"
                  key={paint.id ?? `paint-${Math.random()}`}
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
