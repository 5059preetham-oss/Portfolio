"use client";

import { useEffect, useState } from "react";
import styles from "./HomeShowcase.module.scss";

const destination = "PORTFOLIO";

export function PortfolioTerminalTitle() {
  const [text, setText] = useState("");
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

    // Let the terminal chrome establish itself before the first deliberate edit.
    schedule(cycleToType, 3200);

    return () => {
      cancelled = true;
      if (timeout !== undefined) window.clearTimeout(timeout);
    };
  }, []);

  return (
    <section className={styles.portfolioHero} aria-label="Portfolio title">
      <div className={`${styles.portfolioTerminalTitle} ${reducedMotion ? styles.staticTitle : ""}`}>
        <div className={styles.titleBar} aria-hidden="true">
          <span className={`${styles.titleDot} ${styles.titleDotRed}`} />
          <span className={`${styles.titleDot} ${styles.titleDotYellow}`} />
          <span className={`${styles.titleDot} ${styles.titleDotGreen}`} />
          <span className={styles.titlePath}>preetham@portfolio:~</span>
          <span className={styles.titleStatus}>● online</span>
        </div>
        <div className={styles.titleBody}>
          <span className={styles.titlePrompt} aria-hidden="true">&gt;</span>
          <h1 aria-live="polite">{text}</h1>
          <span className={styles.titleCursor} aria-hidden="true" />
        </div>
        <div className={styles.titleFooter} aria-hidden="true">
          <span>SESSION: LOCAL</span>
          <span>UTF-8</span>
          <span>READY</span>
        </div>
      </div>
    </section>
  );
}
