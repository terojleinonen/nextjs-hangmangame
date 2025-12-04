import styles from "./WordDisplay.module.css";

interface Props {
  word: string;
  guesses: string[];
  isLose: boolean;
}

export default function WordDisplay({ word, guesses, isLose }: Props) {
  return (
    <>
      <div className={styles.slots}>
        {word.split("").map((l, i) => {
          const revealed = guesses.includes(l);

          return (
            <span
              key={i}
              className={[
                styles.slot,
                revealed ? styles.revealed : "",
                isLose ? styles.bleed : "",
                isLose ? styles.ash : "",
                isLose ? styles.fall : ""
              ].join(" ")}
              style={{
                // Randomized delay for more Burton-like chaos
                ["--delay" as string]: `${Math.random() * 0.4}s`
              }}>
              {revealed ? l : ""}
            </span>
          );
        })}
      </div>
    </>
  );
}