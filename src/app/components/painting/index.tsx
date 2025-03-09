"use client";

import { Painting as PaintingType } from "@/app/types/galleries";
import Image from "next/image"

import styles from "./painting.module.css"

enum FrameParts{
  Up="up",
  Right="right",
  Bottom="bot",
  Left="left"
}

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
  frameColor?: {up?: string, right?: string, bot?: string, left?: string } | string;
}

const Painting = (props: PaintingProps) => {
  const stdFrameTickness: string = ".5rem";
  const stdFrameBackground: string = "rgb(150, 111, 51)";


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

  const imageStyle: React.CSSProperties = {
        width: "auto",
        height: "fit-content",
        objectFit: (props.objectFit ? props.objectFit : "contain")
      };

   const frameContainerStyle: React.CSSProperties = {
          height: (props.frameHeight ?? "100%"),
          width: (props.frameWidth ?? "fit-content"),
          padding: (props.frameTickness ?? stdFrameTickness),
   }

   const imageContainerStyle: React.CSSProperties = {
     padding: props.framePadding ?? "0",
   }
 

  const frameUpWrapperStyle: React.CSSProperties = {
    width: "100%", 
    height: props.frameTickness ?? stdFrameTickness,
    clipPath: clipFramePart(FrameParts.Up, props.frameTickness ?? stdFrameTickness),
  }
  const frameRightWrapperStyle: React.CSSProperties = {
    width: props.frameTickness ?? stdFrameTickness, 
    height: "100%",
    clipPath: clipFramePart(FrameParts.Right, props.frameTickness ?? stdFrameTickness),
  }
  const frameBottomWrapperStyle: React.CSSProperties = {
    width: "100%", 
    height: props.frameTickness ?? stdFrameTickness,
    clipPath: clipFramePart(FrameParts.Bottom, props.frameTickness ?? stdFrameTickness),
  }
  const frameLeftWrapperStyle: React.CSSProperties = {
    width: props.frameTickness ?? stdFrameTickness, 
    height: "100%",
    clipPath: clipFramePart(FrameParts.Left, props.frameTickness ?? stdFrameTickness),
  }


  const frameUpStyle: React.CSSProperties = {
    backgroundColor: calcColor(stdFrameBackground, FrameParts.Up, props.frameColor),
    clipPath: clipFramePart(FrameParts.Up, props.frameTickness ?? stdFrameTickness)
  }
  const frameRightStyle: React.CSSProperties = {
    backgroundColor: calcColor(stdFrameBackground, FrameParts.Right, props.frameColor),
    clipPath: clipFramePart(FrameParts.Right, props.frameTickness ?? stdFrameTickness)
  }
  const frameBottomStyle: React.CSSProperties = {
    backgroundColor: calcColor(stdFrameBackground, FrameParts.Bottom, props.frameColor),
    clipPath: clipFramePart(FrameParts.Bottom, props.frameTickness ?? stdFrameTickness)
  }
  const frameLeftStyle: React.CSSProperties = {
    backgroundColor: calcColor(stdFrameBackground, FrameParts.Left, props.frameColor),
    clipPath: clipFramePart(FrameParts.Left, props.frameTickness ?? stdFrameTickness)
  }
  


  return (
    <>
      <div className={styles.container} style={containerStyle}>
        <div className={styles.frameContainer} style ={frameContainerStyle}>
          <div className={styles.frameUpWrapper}     style={frameUpWrapperStyle}>
            <div className={styles.frameUp}     style={frameUpStyle}>
            </div>
          </div>
          <div className={styles.frameBottomWrapper}     style={frameBottomWrapperStyle}>
            <div className={styles.frameBottom}     style={frameBottomStyle}>
            </div>
          </div>
          <div className={styles.frameLeftWrapper}     style={frameLeftWrapperStyle}>
            <div className={styles.frameLeft}     style={frameLeftStyle}>
            </div>
          </div>
          <div className={styles.frameRightWrapper}     style={frameRightWrapperStyle}>
            <div className={styles.frameRight}     style={frameRightStyle}>
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
                height= { props.painting.dimensions ? (props.painting.dimensions.height ?? 500) : 500}
                width= { props.painting.dimensions ? (props.painting.dimensions.width ?? 500) : 500}
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


function clipFramePart(type: FrameParts, tickness: string){
  switch(type){
    case FrameParts.Up:
      return `polygon( calc(${tickness} - .1rem) ${tickness}, calc(100% - ${tickness} + .1rem) ${tickness}, calc(100% + .1rem) 0, -.1rem 0)`
    case FrameParts.Right:
      return `polygon(calc(100% - ${tickness}) calc(100% - ${tickness}), calc(100% - ${tickness}) ${tickness}, 100% 0, 100% 100%)`
    case FrameParts.Bottom:
      return `polygon( calc(${tickness} - .4rem) 0, calc(100% - ${tickness} + .4rem) 0, 100% 100%, 0 100%)`     
    case FrameParts.Left:
      return `polygon( 0 0, ${tickness} ${tickness}, ${tickness} calc(100% - ${tickness}),0 100%)`
  }
}

function calcColor(stdColor: string, pos?: FrameParts, frameColor?: {up?: string, right?: string, bot?: string, left?: string } | string) {
    if(frameColor){
      if(typeof frameColor == 'string'){
        return frameColor;
      }
      if(pos){
        switch(pos){
          case FrameParts.Up:
            if(frameColor.up){
              return frameColor.up;
            }
            break;
          case FrameParts.Right:
            if(frameColor.right){
              return frameColor.right;
            }
            break;
          case FrameParts.Bottom:
            if(frameColor.bot){
              return frameColor.bot;
            }
            break;
          case FrameParts.Left:
            if(frameColor.left){
              return frameColor.left;
            }
            break;
        }
      }
    }
    return stdColor;
  }



export default Painting;

