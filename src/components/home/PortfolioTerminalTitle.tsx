"use client";

import { useEffect, useState } from "react";
import styles from "./HomeShowcase.module.scss";

const intro = "HELLO, Welcome";
const destination = "PORTFOLIO";

export function PortfolioTerminalTitle() {
  const [text, setText] = useState(intro);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setReducedMotion(true);
      setText(destination);
      return;
    }

    let phase: "pause" | "erase" | "type" = "pause";
    let index = intro.length;
    const timer = window.setInterval(() => {
      if (phase === "pause") {
        phase = "erase";
        return;
      }

      if (phase === "erase") {
        index -= 1;
        setText(intro.slice(0, index));
        if (index === 0) phase = "type";
        return;
      }

      index += 1;
      setText(destination.slice(0, index));
      if (index === destination.length) window.clearInterval(timer);
    }, 105);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className={styles.portfolioHero} aria-label="Portfolio title">
      <div className={`${styles.portfolioTerminalTitle} ${reducedMotion ? styles.staticTitle : ""}`}>
        <h1>{text}</h1>
        <span className={styles.titleCursor} aria-hidden="true">_</span>
      </div>
    </section>
  );
}
