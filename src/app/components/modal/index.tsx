"use client";

import { Painting as PaintingType } from "@/app/types/galleries";
// import PaintingComponent from "@/app/components/painting";
// import Image from "next/image"
// import { useState } from "react";
//
import styles from "./modal.module.css";
// import ImageLoading from "@/app/animations/ImageLoading";

interface ModalConfig {
  title?: string;
  size?: "sm" | "md" | "lg" | "full";
  closeOnOutside?: boolean;
  preventClose?: boolean;
  customStyles?: React.CSSProperties;
}

const Modal = () => {
  return (
    <div className={styles.modalContainer}>
      <div className="modal-container"></div>
    </div>
  );
};

export default Modal;
