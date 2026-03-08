"use client";

import React from "react";
import { useLoading } from "@/app/providers/loading.provider";
import styles from "./loadingOverlay.module.css";

export default function LoadingOverlay() {
  const { initialLoading, progress } = useLoading();

  if (!initialLoading) return null;

  return (
    <div className={styles.overlay} aria-label="Initial loading screen">
      <div className={styles.panel}>
        <div className={styles.title}>Simona Maleti</div>
        <div className={styles.barOuter}>
          <div
            className={styles.barInner}
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
