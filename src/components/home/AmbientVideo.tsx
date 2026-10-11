"use client";

import { useEffect, useRef } from "react";
import { useState } from "react";
import styles from "./HomeShowcase.module.scss";

export function AmbientVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const darkVideoPath = `${basePath}/media/portfolio-background.mp4`;
  const lightVideoPath = darkVideoPath;
  const posterPath = `${basePath}/images/og/portfolio.svg`;
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [videoPath, setVideoPath] = useState(darkVideoPath);

  useEffect(() => {
    const video = videoRef.current;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateTheme = () => {
      const nextTheme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
      setTheme(nextTheme);
      setVideoPath(nextTheme === "light" ? lightVideoPath : darkVideoPath);
    };
    const updateMotion = () => {
      if (mediaQuery.matches) {
        video?.pause();
      } else if (video) {
        void video.play().catch(() => undefined);
      }
    };

    updateMotion();
    updateTheme();
    mediaQuery.addEventListener("change", updateMotion);
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => {
      mediaQuery.removeEventListener("change", updateMotion);
      observer.disconnect();
    };
  }, [darkVideoPath, lightVideoPath]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      void video.play().catch(() => undefined);
    }
  }, [videoPath]);

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
        onError={() => {
          if (theme === "light" && videoPath !== darkVideoPath) setVideoPath(darkVideoPath);
        }}
      >
        <source src={videoPath} type="video/mp4" />
      </video>
      <div className={styles.ambientOverlay} />
    </div>
  );
}
