"use client";

import { useEffect, useState } from "react";
import styles from "./HangmanGame.module.css";

import Gallows from "./Gallows";
import WordDisplay from "./WordDisplay";
import Keyboard from "./Keyboard";
import WordLabel from "./WordLabel";
import WORDS from "./words.json"; // Import words from JSON file

//const WORDS = ["BAT", "GHOST", "RAVEN", "SPIDER", "CROW", "SHADOW"];

export default function HangmanGame() {
  const [word, setWord] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [wrong, setWrong] = useState(0);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    // Select a word only on the client-side to prevent hydration mismatch
    const newWord = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
    setWord(newWord);
  }, []);

  const max = 6;
  const isWin = word ? word.split("").every((l) => guesses.includes(l)) : false;
  const isLose = wrong >= max;

  useEffect(() => {
    if (word) {
      console.log("Current word:", word);
    }
  }, [word]);

  useEffect(() => {
  if (isLose) {
    // Remove the ink overlay AFTER the blackout animation finishes
    const timer = setTimeout(() => {
      document.body.classList.add("hide-ink");
    }, 2600); // duration must match the ink animation time

    return () => clearTimeout(timer);
    } else {
     // If user restarts — show ink effects again on next loss
      document.body.classList.remove("hide-ink");
    }
  }, [isLose]);


  useEffect(() => {
    document.documentElement.classList.add("stopmotion");
    return () => document.documentElement.classList.remove("stopmotion");
  }, []);

  const onGuess = (letter: string) => {
    if (guesses.includes(letter) || !word) return;
    setGuesses((g) => [...g, letter]);

    if (!word.includes(letter)) {
      setWrong((x) => x + 1);
      setShake(true);
      setTimeout(() => setShake(false), 250);
    }
  };

  const reset = () => {
    document.body.classList.remove("hide-ink");
    const newWord = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
    setWord(newWord);
    setGuesses([]);
    setWrong(0);
    console.log("New word:", newWord);
  };

  // Render a loading state while the word is being selected to avoid layout shift
  if (!word) {
    return (
      <div className={styles.frameWrap}>
        <div className="burton-paper-texture" />
        <header className={styles.header}>
            <h1 className={styles.title}>HANGMAN</h1>
        </header>
        {/* You could add a more explicit loading indicator here */}
      </div>
    );
  }

  return (
    <div className={styles.frameWrap}>
      <div className="burton-paper-texture" />

      <div
        className={[
          styles.sheet,
          shake ? styles.shake : "",
          isLose ? styles.inkDrip : ""
        ].join(" ")}
      >
        <header className={styles.header}>
          <h1 className={styles.title}>HANGMAN</h1>
          <div className={styles.meta}>
            <span>Category: FINNISH WORDS</span><br />
            <span>Mistakes: {wrong} / {max}</span>
          </div>
        </header>

        <main className={styles.main}>
          <Gallows stage={wrong} max={max} />

        <section className={`${styles.gameSection} centerColumn`}>
  
          {/* NEW: Burton Stop-Motion Title */}
          <WordLabel wrongCount={wrong} />

        <WordDisplay word={word} guesses={guesses} isLose={isLose} />

        {isWin ? (
          <button className={styles.reset} onClick={reset}>
            "You survived! Play again"
          </button>
        ) : null}

        {!isWin && !isLose && (
          <Keyboard
          word={word}
          addGuess={onGuess}
          guessed={guesses}
          wrong={guesses.filter((g) => !word.includes(g))}
          />
      )}  
     </section>
     
        </main>

        {isLose && <div className="ink-drip-overlay" />}
          {isLose && (
          <div className="death-end-screen">
            <div className="death-title">
              <span className="theend-back">THE END</span>
              <span className="theend-front">THE END</span>
            </div>
            <div className="spider-restart" onClick={reset} role="button">
              <div className="spider-thread"></div>
              <div className="spider-body">
              <div className="spider-eye left"></div>
              <div className="spider-eye right"></div>
              <div className="spider-leg leg1"></div>
              <div className="spider-leg leg2"></div>
              <div className="spider-leg leg3"></div>
             <div className="spider-leg leg4"></div>
            </div>
          <div className="restart-label">Play Again</div>
        </div>
        </div>
        )}
      </div>

      {/* frame corner decorations */}
      <div className="burton-frame-decoration top-left" />
      <div className="burton-frame-decoration top-right" />
      <div className="burton-frame-decoration bottom-left" />
      <div className="burton-frame-decoration bottom-right" />
    </div>
  );
}
