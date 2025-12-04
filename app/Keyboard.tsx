import styles from "./Keyboard.module.css";

interface Props {
  addGuess: (letter: string) => void;
  guessed: string[];
  wrong: string[];
  word: string;
}

export default function Keyboard({ addGuess, guessed, wrong, word }: Props) {
  const rows = [
    ["Q","W","E","R","T","Y","U","I","O","P","Å"],
    ["A","S","D","F","G","H","J","K","L","Ö","Ä"],
    ["Z","X","C","V","B","N","M"]
  ];

  return (
    <>
      <div
        className={[
          styles.keyboard,
          wrong.length >= 3 ? styles.veins : "",
          wrong.length >= 4 ? styles.rattle : "",
        ].join(" ")}
      >
        {rows.map((row, rowIndex) => {
          const rowStyle: React.CSSProperties = {
            ["--row" as string]: rowIndex,
          };

          return (
            <div key={rowIndex} className={styles.row} style={rowStyle}>
              {row.map(letter => {
                const isUsed = guessed.includes(letter);
                const isWrong = wrong.includes(letter);

                return (
                  <button
                    key={letter}
                    className={[
                      styles.key,
                      isUsed ? styles.used : "",
                      isWrong ? styles.wrong : ""
                    ].join(" ")}
                    onClick={() => addGuess(letter)}
                    disabled={isUsed}
                    style={{
                      ["--tilt" as string]: `${(Math.random() * 6 - 3).toFixed(1)}deg`,
                      ["--wiggle-delay" as string]: `${(Math.random() * 2).toFixed(2)}s`,
                    }}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Shadow Creature (appears only in panic mode) */}
      {wrong.length >= 4 && (
        <div className={styles.shadowCreature}></div>
      )}
    </>
  );
}
