"use client";
import galleryFacetStyles from "./galleryFacet.module.css";
import { Gallery, Painting, JustifyContent } from "@/app/types/galleries";
import Link from "next/link";
import Image from "next/image";
import { motion, useDragControls, useMotionValue } from "framer-motion";
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

  const transAB = {
    x: ["20%", "100%"],
    transition: {
      duration: isMobile ? 50 : 100,
      ease: "linear",
      repeat: Infinity,
      repeatType: "alternate",
    },
  };

  const transBA = {
    x: ["-20%", "-100%"],
    transition: {
      duration: isMobile ? 50 : 100,
      ease: "linear",
      repeat: Infinity,
      repeatType: "alternate",
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

  const x = useMotionValue(0);

  // Gestire l'animazione
  const costraint =
    randomPaintings.reduce(
      (acc, item) => acc + (item.dimensions?.width ?? 500),
      0,
    ) / 7;

  return (
    <>
      <div className={`${galleryFacetStyles.GalleryContainer}`}>
        <div className={`${galleryFacetStyles.GalleryName} unmovable`}>
          <Link href={`/${props.gallery.pageName}`}>
            <h1
              onPointerDown={(event) => dragControls.start(event)}
              style={{ touchAction: "none" }}
            >
              {" "}
              {props.gallery.title}{" "}
            </h1>
          </Link>
        </div>
        <div className={`${galleryFacetStyles.GalleryWrapper}`}>
          <motion.div
            drag={isMobile ? "x" : false}
            dragConstraints={{
              left: -costraint,
              right: costraint,
            }}
            dragControls={dragControls}
            dragListener={false}
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
              //return <PaintingComponent
              //key={paint.id}
              //painting={paint}
              //objectFit="contain"
              //height="100%"
              //width="auto"
              //margin=".5rem"
              //displayText={false}
              ///>
              //
            })}
          </motion.div>
        </div>
      </div>
    </>
  );
};

//  <motion.div className={`${galleryFacetStyles.defaultGalleryName}`}
//          initial={{ opacity: 0 }}
//          whileInView={{ opacity: 1, 'backdrop-filter': 'blur(.7px)' }}
//          transition={{ duration: 0.7 }}
//          >
//            <Link href={`/${gallery.pageName}`}>
//              <h2> {gallery.title} </h2>
//            </Link>
//        </motion.div>

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

// function generateRandomNumber(min: number, max: number, jump: number = 10){
//    const ran = Math.random() * (max - min) + min;
//   return Math.round(ran / jump) * jump;
// }

export default GalleryFacet;
