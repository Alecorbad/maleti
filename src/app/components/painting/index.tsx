"use client";

import { Painting as PaintingType } from "@/app/types/galleries";
import Image from "next/image"

import styles from "./painting.module.css"

interface PaintingProps{
  painting?: PaintingType;
  width?: string;
  height?: string;
  margin?: string,
  objectFit?: ("contain" | "cover" | "fill" | "none" | "scale-down");
  position?: ('absolute' | 'relative' | 'fixed');
  gridArea?: string;

  frameTickness?: string;
  framePadding?: string;
  frameWidth?: string;
  frameHeight?: string;
}

const Painting = (props: PaintingProps) => {
  const stdFrameTickness: string = ".5rem";

  const imageStyle: React.CSSProperties = {
        width: "auto",
        height: "fit-content",
        objectFit: (props.objectFit ? props.objectFit : "contain")
      };

  const containerStyle: React.CSSProperties = {
        width: (props.width ?? '100%'),
        height: (props.height ?? '100%'),
        margin: (props.margin ?? "0"),
        position: props.position,
        gridArea: props.gridArea,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      };


   const frameContainerStyle: React.CSSProperties = {
          height: (props.frameHeight ?? "100%"),
          width: (props.frameWidth ?? "fit-content"),
          padding: (props.frameTickness ?? stdFrameTickness),
   }

   const imageContainerStyle: React.CSSProperties = {
     padding: props.framePadding ?? "0",
   }
  
  const frameUpStyle: React.CSSProperties = {
    width: "100%", 
    height: props.frameTickness ?? stdFrameTickness,
    clipPath: clipFramePart("up", props.frameTickness ?? stdFrameTickness)
  }

  const frameBottomStyle: React.CSSProperties = {
    width: "100%", 
    height: props.frameTickness ?? stdFrameTickness,
    clipPath: clipFramePart("bottom", props.frameTickness ?? stdFrameTickness)
  }
  const frameLeftStyle: React.CSSProperties = {
    width: props.frameTickness ?? stdFrameTickness, 
    height: "100%",
    clipPath: clipFramePart("left", props.frameTickness ?? stdFrameTickness)
  }
  const frameRightStyle: React.CSSProperties = {
    width: props.frameTickness ?? stdFrameTickness, 
    height: "100%",
    clipPath: clipFramePart("right", props.frameTickness ?? stdFrameTickness)
  }
  


  return (
    <>
      <div className={styles.container} style={containerStyle}>
        <div className={styles.frameContainer} style ={frameContainerStyle}>
          <div className={styles.frameUpWrapper}     style={frameUpStyle}>
            <div className={styles.frameUp}     style={{clipPath: frameUpStyle.clipPath}}>
            </div>
          </div>
          <div className={styles.frameBottomWrapper}     style={frameBottomStyle}>
            <div className={styles.frameBottom}     style={{clipPath: frameBottomStyle.clipPath}}>
            </div>
          </div>
          <div className={styles.frameLeftWrapper}     style={frameLeftStyle}>
            <div className={styles.frameLeft}     style={{clipPath: frameLeftStyle.clipPath}}>
            </div>
          </div>
          <div className={styles.frameRightWrapper}     style={frameRightStyle}>
            <div className={styles.frameRight}     style={{clipPath: frameRightStyle.clipPath}}>
            </div>
          </div>
          <div className={styles.glass}></div>
          <div className={styles.imageContainer} style={imageContainerStyle}>
            {
              props.painting ? 
                <Image 
                className={styles.image}
                key={props.painting.id ?? "none"}
                src={props.painting.url ?? ""}
                height= {1000}
                width= {1000}
                alt="Dipinto non disponibile"
                style={imageStyle}
              />
              : <></>
            }
          </div>
        </div>
      </div>
    </>
  )
};


function clipFramePart(type: ("up" | "left" | "right" | "bottom"), tickness: string){
  switch(type){
    case "up":
      return `polygon( calc(${tickness} - .1rem) ${tickness}, calc(100% - ${tickness} + .1rem) ${tickness}, calc(100% + .1rem) 0, -.1rem 0)`
    case "bottom":
      return `polygon( calc(${tickness} - .4rem) 0, calc(100% - ${tickness} + .4rem) 0, 100% 100%, 0 100%)`     
    case "left":
      return `polygon( 0 0, ${tickness} ${tickness}, ${tickness} calc(100% - ${tickness}),0 100%)`
    case "right":
      return `polygon(calc(100% - ${tickness}) calc(100% - ${tickness}), calc(100% - ${tickness}) ${tickness}, 100% 0, 100% 100%)`
  }
}


export default Painting;

