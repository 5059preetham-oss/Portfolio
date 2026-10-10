"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./HomeShowcase.module.scss";

const sourceLines = [
  "# Display-only source preview: this text is never executed.",
  "from tkinter import Tk, Label",
  "import time",
  "",
  "def show_learning_portfolio():",
  "    # A visual Python sketch for the terminal, not an automation script.",
  "    window = Tk()",
  "    Label(window, text='Preetham S | PORTFOLIO').pack()",
  "    Label(window, text='Unity | Blender | C | Python').pack()",
  "    window.mainloop()",
  "",
  "person = {",
  "    'name': 'Preetham S',",
  "    'role': 'Student',",
  "    'university': 'PES University',",
  "    'year': 2,",
  "}",
  "",
  "interests = ['game development', '3D modeling', 'programming']",
  "skills = ['Unity', 'Blender', 'C', 'Python']",
  "",
  "def describe_progress():",
  "    return 'learning in public'",
  "",
  "links = {",
  "    'github': 'github.com/5059preetham-oss',",
  "    'linkedin': 'linkedin.com/in/preetham-s-3a7947367',",
  "    'email': '5059preetham@gmail.com',",
  "}",
  "",
  "# The real page is a static Next.js export for GitHub Pages.",
  "build_target = 'out/'",
  "deployment = 'GitHub Actions -> GitHub Pages'",
  "",
  "for idea in interests:",
  "    print('explore:', idea)",
  "    time.sleep(0.1)",
  "",
  "# End of the safe visual transcript.",
].join("\n");

export function HomeShowcase() {
  const [activeLine, setActiveLine] = useState(0);
  const [copied, setCopied] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const lines = useMemo(() => sourceLines.split("\n"), []);
  const activeLineRef = useRef<HTMLSpanElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) return;

    const interval = window.setInterval(() => {
      setActiveLine((current) => (current + 1) % lines.length);
    }, 420);

    return () => window.clearInterval(interval);
  }, [lines.length]);

  useEffect(() => {
    if (!reducedMotion) {
      const viewport = viewportRef.current;
      const activeLine = activeLineRef.current;
      if (viewport && activeLine) {
        const targetTop = activeLine.offsetTop - viewport.clientHeight / 2 + activeLine.offsetHeight / 2;
        viewport.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
      }
    }
  }, [activeLine, reducedMotion]);

  const copySource = async () => {
    try {
      await navigator.clipboard.writeText(sourceLines);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className={styles.showcase} aria-label="Interactive source preview">
      <div className={styles.terminalColumn}>
        <div className={styles.terminal} aria-label="Animated source code preview">
          <div className={styles.terminalHeader}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.terminalTitle}>code 👎</span>
          </div>
          <div ref={viewportRef} className={styles.codeViewport} aria-live="polite">
            <pre className={styles.code}>
              <code>
                <span className={styles.prompt}>PS C:\portfolio&gt; </span>
                {lines.map((line, index) => (
                  <span
                    className={`${styles.codeLine} ${index === activeLine ? styles.activeLine : ""}`}
                    key={`${index}-${line}`}
                    ref={index === activeLine ? activeLineRef : undefined}
                  >
                    {line || "\u00a0"}
                    {"\n"}
                  </span>
                ))}
                <span className={styles.cursor} aria-hidden="true" />
              </code>
            </pre>
          </div>
        </div>
        <button className={styles.copyButton} type="button" onClick={copySource}>
          {copied ? "Source copied" : "Copy source code"}
        </button>
      </div>
    </section>
  );
}
