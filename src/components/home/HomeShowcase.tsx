"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./HomeShowcase.module.scss";

const sourceLines = [
  "const portfolio = {",
  '  name: "Preetham S",',
  '  focus: ["Unity", "Blender", "C", "Python"],',
  '  status: "learning in public",',
  "};",
  "",
  "portfolio.build();",
  "portfolio.keepExploring();",
];

export function HomeShowcase() {
  const [visibleLines, setVisibleLines] = useState(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setVisibleLines((current) => (current >= sourceLines.length ? 1 : current + 1));
    }, 620);

    return () => window.clearInterval(interval);
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, index) => ({
        left: `${8 + ((index * 37) % 84)}%`,
        delay: `${(index * 0.43) % 5}s`,
        duration: `${5 + (index % 5)}s`,
        size: `${2 + (index % 4)}px`,
      })),
    [],
  );

  const copySource = async () => {
    try {
      await navigator.clipboard.writeText(sourceLines.join("\n"));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className={styles.showcase} aria-label="Interactive portfolio preview">
      <div className={styles.terminalColumn}>
        <div className={styles.terminal} aria-label="Animated source code preview">
          <div className={styles.terminalHeader}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.terminalTitle}>powershell — portfolio</span>
          </div>
          <pre className={styles.code} aria-live="polite">
            <code>
              <span className={styles.prompt}>PS C:\portfolio&gt; </span>
              {sourceLines.slice(0, visibleLines).map((line, index) => (
                <span className={styles.codeLine} key={`${line}-${index}`}>
                  {line || "\u00a0"}
                  {"\n"}
                </span>
              ))}
              <span className={styles.cursor} aria-hidden="true" />
            </code>
          </pre>
        </div>
        <button className={styles.copyButton} type="button" onClick={copySource}>
          {copied ? "Source copied" : "Copy source code"}
        </button>
      </div>
      <div className={styles.particlePanel} aria-hidden="true">
        <div className={styles.particleLabel}>PREMIUM TECH</div>
        <div className={styles.particleStream}>
          {particles.map((particle, index) => (
            <span
              className={styles.particle}
              key={index}
              style={{
                left: particle.left,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
                width: particle.size,
                height: particle.size,
              }}
            />
          ))}
        </div>
        <div className={styles.streamCaption}>ideas → experiments → systems</div>
      </div>
    </section>
  );
}
