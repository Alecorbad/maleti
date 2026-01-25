"use client";

import { Painting as PaintingType } from "@/app/types/galleries";
import Image from "next/image";
import { useState } from "react";

import styles from "./painting.module.css";
import ImageLoading from "@/app/animations/ImageLoading";

enum FrameParts {
  Up = "up",
  Right = "right",
  Bottom = "bot",
  Left = "left",
}

interface PaintingProps {
  painting?: PaintingType;
  width?: string;
  height?: string;
  margin?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  position?: "absolute" | "relative" | "fixed";
  gridArea?: string;
  displayFrame?: boolean;
  displayText?: boolean;

  frame?: boolean;
  frameTickness?: string;
  framePadding?: string;
  frameWidth?: string;
  frameHeight?: string;
  frameColor?:
    | { up?: string; right?: string; bot?: string; left?: string }
    | string;
}

const Painting = (props: PaintingProps) => {
  const stdFrameTickness: string = ".5rem";
  const stdFrameBackground: string = "rgb(150, 111, 51)";
  const [isImageLoaded, setImageLoaded] = useState(false);
  const displayFrame: boolean | undefined = props.displayFrame
    ? props.displayFrame
    : false;
  const displayText: boolean | undefined = props.displayText
    ? props.displayText
    : false;
  const framePadding: string | undefined = props.framePadding ?? "1rem";

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {};

  const containerStyle: React.CSSProperties = {
    width: props.width ?? "auto",
    height: props.height ?? "auto",
    margin: props.margin ?? "2rem 1rem",
    padding: ".5rem",
    position: props.position,
    gridArea: props.gridArea,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0,
  };

  const frameUpWrapperStyle: React.CSSProperties = {
    width: "100%",
    height: props.frameTickness ?? stdFrameTickness,
    clipPath: clipFramePart(
      FrameParts.Up,
      props.frameTickness ?? stdFrameTickness,
    ),
    display: displayFrame == true ? "block" : "none",
  };
  const frameRightWrapperStyle: React.CSSProperties = {
    width: props.frameTickness ?? stdFrameTickness,
    height: "100%",
    clipPath: clipFramePart(
      FrameParts.Right,
      props.frameTickness ?? stdFrameTickness,
    ),
    display: displayFrame == true ? "block" : "none",
  };
  const frameBottomWrapperStyle: React.CSSProperties = {
    width: "100%",
    height: props.frameTickness ?? stdFrameTickness,
    clipPath: clipFramePart(
      FrameParts.Bottom,
      props.frameTickness ?? stdFrameTickness,
    ),
    display: displayFrame == true ? "block" : "none",
  };
  const frameLeftWrapperStyle: React.CSSProperties = {
    width: props.frameTickness ?? stdFrameTickness,
    height: "100%",
    clipPath: clipFramePart(
      FrameParts.Left,
      props.frameTickness ?? stdFrameTickness,
    ),
    display: displayFrame == true ? "block" : "none",
  };

  const frameUpStyle: React.CSSProperties = {
    backgroundColor: calcColor(
      stdFrameBackground,
      FrameParts.Up,
      props.frameColor,
    ),
    clipPath: clipFramePart(
      FrameParts.Up,
      props.frameTickness ?? stdFrameTickness,
    ),
    display: displayFrame == true ? "block" : "none",
  };
  const frameRightStyle: React.CSSProperties = {
    backgroundColor: calcColor(
      stdFrameBackground,
      FrameParts.Right,
      props.frameColor,
    ),
    clipPath: clipFramePart(
      FrameParts.Right,
      props.frameTickness ?? stdFrameTickness,
    ),
    display: displayFrame == true ? "block" : "none",
  };
  const frameBottomStyle: React.CSSProperties = {
    backgroundColor: calcColor(
      stdFrameBackground,
      FrameParts.Bottom,
      props.frameColor,
    ),
    clipPath: clipFramePart(
      FrameParts.Bottom,
      props.frameTickness ?? stdFrameTickness,
    ),
    display: displayFrame == true ? "block" : "none",
  };
  const frameLeftStyle: React.CSSProperties = {
    backgroundColor: calcColor(
      stdFrameBackground,
      FrameParts.Left,
      props.frameColor,
    ),
    clipPath: clipFramePart(
      FrameParts.Left,
      props.frameTickness ?? stdFrameTickness,
    ),
    display: displayFrame == true ? "block" : "none",
  };

  const frameContainerStyle: React.CSSProperties = {
    height: props.frameHeight ?? (displayText ? "auto" : "100%"),
    maxHeight: props.frameHeight ?? (displayText ? "90%" : "100%"),
    width: props.frameWidth ?? "fit-content",
    padding:
      displayFrame == true && props.frameTickness ? props.frameTickness : "0",
  };

  const imageContainerStyle: React.CSSProperties = {
    padding: displayFrame == true && framePadding ? framePadding : "0",
    background: displayFrame == true ? "rgba(var(--oldPaper), 1)" : "none",
    WebkitBoxShadow: displayFrame ? "0px 2px 8px 3px rgba(0,0,0,0.70)" : "none",
    boxShadow: displayFrame ? "0px 2px 8px 3px rgba(0,0,0,0.70)" : "none",
  };

  const imageStyle: React.CSSProperties = {
    width: "auto",
    height: "fit-content",
    objectFit: props.objectFit ? props.objectFit : "contain",
    WebkitBoxShadow: !displayFrame
      ? "0px 2px 8px 3px rgba(0,0,0,0.70)"
      : "none",
    boxShadow: !displayFrame ? "0px 2px 8px 3px rgba(0,0,0,0.70)" : "none",
  };

  return (
    <>
      <ImageLoading
        isLoaded={isImageLoaded}
        className={`${styles.container}`}
        style={containerStyle}
      >
        <div className={styles.frameContainer} style={frameContainerStyle}>
          <div className={styles.frameUpWrapper} style={frameUpWrapperStyle}>
            <div className={styles.frameUp} style={frameUpStyle}></div>
          </div>
          <div
            className={styles.frameBottomWrapper}
            style={frameBottomWrapperStyle}
          >
            <div className={styles.frameBottom} style={frameBottomStyle}></div>
          </div>
          <div
            className={styles.frameLeftWrapper}
            style={frameLeftWrapperStyle}
          >
            <div className={styles.frameLeft} style={frameLeftStyle}></div>
          </div>
          <div
            className={styles.frameRightWrapper}
            style={frameRightWrapperStyle}
          >
            <div className={styles.frameRight} style={frameRightStyle}></div>
          </div>
          <div className={styles.glass}></div>
          <div className={styles.imageContainer} style={imageContainerStyle}>
            {props.painting ? (
              <Image
                priority
                fetchPriority="high"
                onLoad={handleImageLoad}
                onError={handleImageError}
                className={styles.image}
                key={props.painting.id ?? "none"}
                src={props.painting.url ?? ""}
                height={
                  props.painting.dimensions
                    ? (props.painting.dimensions.height ?? 500)
                    : 500
                }
                width={
                  props.painting.dimensions
                    ? (props.painting.dimensions.width ?? 500)
                    : 500
                }
                alt="Dipinto non disponibile"
                style={imageStyle}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        {displayText && (
          <div className={styles.textContainer}>
            <div className={styles.titleContainer}>{props.painting?.title}</div>
            <div className={styles.descriptionContainer}>
              {props.painting?.description}
            </div>
          </div>
        )}
      </ImageLoading>
    </>
  );
};

function clipFramePart(type: FrameParts, tickness: string) {
  switch (type) {
    case FrameParts.Up:
      return `polygon( calc(${tickness} - .1rem) ${tickness}, calc(100% - ${tickness} + .1rem) ${tickness}, calc(100% + .1rem) 0, -.1rem 0)`;
    case FrameParts.Right:
      return `polygon(calc(100% - ${tickness}) calc(100% - ${tickness}), calc(100% - ${tickness}) ${tickness}, 100% 0, 100% 100%)`;
    case FrameParts.Bottom:
      return `polygon( calc(${tickness} - .4rem) 0, calc(100% - ${tickness} + .4rem) 0, 100% 100%, 0 100%)`;
    case FrameParts.Left:
      return `polygon( 0 0, ${tickness} ${tickness}, ${tickness} calc(100% - ${tickness}),0 100%)`;
  }
}

function calcColor(
  stdColor: string,
  pos?: FrameParts,
  frameColor?:
    | { up?: string; right?: string; bot?: string; left?: string }
    | string,
) {
  if (frameColor) {
    if (typeof frameColor == "string") {
      return frameColor;
    }
    if (pos) {
      switch (pos) {
        case FrameParts.Up:
          if (frameColor.up) {
            return frameColor.up;
          }
          break;
        case FrameParts.Right:
          if (frameColor.right) {
            return frameColor.right;
          }
          break;
        case FrameParts.Bottom:
          if (frameColor.bot) {
            return frameColor.bot;
          }
          break;
        case FrameParts.Left:
          if (frameColor.left) {
            return frameColor.left;
          }
          break;
      }
    }
  }
  return stdColor;
}

export default Painting;
