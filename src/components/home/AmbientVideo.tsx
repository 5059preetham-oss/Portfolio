"use client";

import { useEffect, useRef } from "react";
import styles from "./HomeShowcase.module.scss";

export function AmbientVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoPath = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/media/portfolio-background.mp4`;
  const posterPath = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/og/home.jpg`;

  useEffect(() => {
    const video = videoRef.current;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => {
      if (mediaQuery.matches) {
        video?.pause();
      } else if (video) {
        void video.play().catch(() => undefined);
      }
    };

    updateMotion();
    mediaQuery.addEventListener("change", updateMotion);
    return () => mediaQuery.removeEventListener("change", updateMotion);
  }, []);

  return (
    <div className={styles.ambientBackground} aria-hidden="true">
      <video
        ref={videoRef}
        className={styles.ambientVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={posterPath}
      >
        <source src={videoPath} type="video/mp4" />
      </video>
      <div className={styles.ambientOverlay} />
    </div>
  );
}
