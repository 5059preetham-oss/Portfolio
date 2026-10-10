"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./HomeShowcase.module.scss";

const sourceLines = `// Representative source view: safe visual preview, not executable code
import { useEffect, useMemo, useState } from "react";
import { Heading, Button, Column, Row, Text } from "@once-ui-system/core";
import styles from "./HomeShowcase.module.scss";

const person = {
  name: "Preetham S",
  role: "Student",
  university: "PES University",
  year: 2,
  interests: ["Unity", "Blender", "C", "Python"],
};

const links = {
  github: "github.com/5059preetham-oss",
  linkedin: "linkedin.com/in/preetham-s-3a7947367",
  email: "5059preetham@gmail.com",
};

export default function Home() {
  return (
    <Column className={styles.home} maxWidth="m">
      <Header />
      <main>
        <Heading className={styles.portfolioTitle}>PORTFOLIO</Heading>
        <Text>
          I'm Preetham S, a second-year student at PES University
          exploring game development, 3D modeling, and programming.
        </Text>
        <ContactLinks links={links} />
        <HomeShowcase />
      </main>
      <Footer />
    </Column>
  );
}

function HomeShowcase() {
  const [visibleLines, setVisibleLines] = useState(1);
  const source = [
    "const portfolio = createPortfolio(person);",
    "portfolio.addFocus('Unity game development');",
    "portfolio.addFocus('Blender 3D modeling');",
    "portfolio.addFocus('Programming with C and Python');",
    "portfolio.publish({ static: true, honest: true });",
  ];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setVisibleLines((line) => line >= source.length ? 1 : line + 1);
    }, 680);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className={styles.showcase}>
      <Terminal lines={source.slice(0, visibleLines)} />
      <PremiumTechStream />
    </section>
  );
}

function Terminal({ lines }: { lines: string[] }) {
  return (
    <pre className={styles.code}>
      <code>
        <span className={styles.prompt}>PS C:\\portfolio&gt; </span>
        {lines.join("\\n")}
      </code>
    </pre>
  );
}

function PremiumTechStream() {
  return <aside aria-label="Premium Tech particle stream">ideas → experiments → systems</aside>;
}

// Shared layout keeps navigation, content, and project routes static.
export const build = () => "next build";
export const deploy = () => "github pages";
export const keepLearning = () => ["Unity", "Blender", "C", "Python"];`.split("\n");

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
            <span className={styles.terminalTitle}>code 👎</span>
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
