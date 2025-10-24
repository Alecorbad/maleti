"use client";

import { Painting as PaintingType } from "@/app/types/galleries";
// import PaintingComponent from "@/app/components/painting";
// import Image from "next/image"
// import { useState } from "react";
// 
// import styles from "./painting.module.css"
// import ImageLoading from "@/app/animations/ImageLoading";


interface PaintingProps{
  painting?: PaintingType;
  width?: string;
  height?: string;
  margin?: string,
  objectFit?: ("contain" | "cover" | "fill" | "none" | "scale-down");
  position?: ('absolute' | 'relative' | 'fixed');
  gridArea?: string;
  displayFrame?: boolean; 
  displayTitle?: boolean; 

  frame?: boolean;
  frameTickness?: string;
  framePadding?: string;
  frameWidth?: string;
  frameHeight?: string;
  frameColor?: {up?: string, right?: string, bot?: string, left?: string } | string;
}

const PaintingModal = (props: PaintingProps) => {
  console.log(props);
  return <></> 
};

export default PaintingModal

