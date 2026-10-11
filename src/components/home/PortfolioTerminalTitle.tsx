"use client";

import { useEffect, useState } from "react";
import styles from "./HomeShowcase.module.scss";

const destination = "Preetham S";

export function PortfolioTerminalTitle() {
  const [text, setText] = useState(destination);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setReducedMotion(true);
      setText(destination);
      return;
    }

    let cancelled = false;
    let timeout: number | undefined;

    const schedule = (callback: () => void, delay: number) => {
      timeout = window.setTimeout(() => {
        if (!cancelled) callback();
      }, delay);
    };

    const typeText = (onComplete: () => void) => {
      let index = 0;
      const step = () => {
        if (cancelled) return;
        index += 1;
        setText(destination.slice(0, index));
        if (index < destination.length) {
          schedule(step, 185);
        } else {
          schedule(onComplete, 5200);
        }
      };
      schedule(step, 185);
    };

    const eraseText = (onComplete: () => void) => {
      let index = destination.length;
      const step = () => {
        if (cancelled) return;
        index -= 1;
        setText(destination.slice(0, index));
        if (index > 0) {
          schedule(step, 170);
        } else {
          schedule(onComplete, 900);
        }
      };
      schedule(step, 170);
    };

    const cycleToType = () => {
      typeText(cycleToErase);
    };
    const cycleToErase = () => {
      eraseText(cycleToType);
    };

    schedule(cycleToErase, 3200);

    return () => {
      cancelled = true;
      if (timeout !== undefined) window.clearTimeout(timeout);
    };
  }, []);

  return (
    <section className={styles.portfolioHero} aria-label="Portfolio title">
      <span className={styles.heroLabel}>Portfolio / 2026</span>
      <span className={`${styles.heroMarker} ${styles.heroMarkerTop}`} aria-hidden="true" />
      <span className={`${styles.heroMarker} ${styles.heroMarkerSide}`} aria-hidden="true" />
      <div className={`${styles.portfolioTerminalTitle} ${reducedMotion ? styles.staticTitle : ""}`}>
        <div className={styles.titleBody}>
          <div className={styles.titleStack}>
            <h1 aria-live="polite" data-text={text}>
              <span className={styles.titleText}>{text}</span>
            </h1>
            <p className={styles.titleStudent}>Student</p>
          </div>
          <span className={styles.titleCursor} aria-hidden="true" />
        </div>
        <div className={styles.titleFooter}>
          <span>Game development</span>
          <span>3D modeling</span>
          <span>Programming</span>
        </div>
      </div>
      <p className={styles.heroContext}>Learning in public<br />from PES University</p>
    </section>
  );
}
