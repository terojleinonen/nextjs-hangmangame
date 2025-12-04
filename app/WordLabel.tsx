"use client";

import { useEffect, useState } from "react";
import styles from "./WordLabel.module.css";

export default function WordLabel({ wrongCount = 0 }: { wrongCount: number }) {
  const text = "GUESS THE WORD";
  const chars = text.split("");

  const [delays, setDelays] = useState<string[]>([]);

  // Client-only random delays (no SSR mismatch)
  useEffect(() => {
    const newDelays = chars.map(() => `${(Math.random() * 1.2).toFixed(2)}s`);
    setDelays(newDelays);
  }, []);

  return (
    <p
      className={styles.wordLabel}
      style={{
        ["--intensity" as string]: wrongCount.toString(),
      }}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          className={styles.letter}
          style={{ ["--delay" as string]: delays[i] || "0s" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </p>
  );
}