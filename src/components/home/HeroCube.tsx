"use client";

import { useEffect, useState } from "react";
import { Autoplay, EffectCube } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cube";
import styles from "./HomeShowcase.module.scss";

const labels = ["PORTFOLIO", "CODE", "DEV"];

export function HeroCube() {
  const [motionAllowed, setMotionAllowed] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setMotionAllowed(!mediaQuery.matches);
    updateMotion();
    mediaQuery.addEventListener("change", updateMotion);
    return () => mediaQuery.removeEventListener("change", updateMotion);
  }, []);

  return (
    <div className={styles.heroBox} aria-label="Portfolio cube carousel" role="region">
      <Swiper
        className={styles.heroCube}
        modules={[EffectCube, Autoplay]}
        effect="cube"
        direction="horizontal"
        grabCursor
        allowTouchMove
        loop
        autoplay={motionAllowed ? { delay: 2600, disableOnInteraction: false } : false}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 18,
          shadowScale: 0.86,
        }}
        aria-label="Rotating portfolio labels"
      >
        {labels.map((label) => (
          <SwiperSlide className={styles.heroSlide} key={label}>
            <span>{label}</span>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
