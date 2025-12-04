import styles from "./Gallows.module.css";

interface Props {
  stage: number;
  max: number;
}

export default function Gallows({ stage, max }: Props) {
  const last = stage >= max;

  return (
    <svg
      className={`${styles.gallows} ${last ? styles.last : ""}`}
      viewBox="0 0 120 160"
    >
      <g strokeWidth="2.2">
        <line x1="20" y1="150" x2="100" y2="150" />
        <line x1="32" y1="150" x2="32" y2="10" />
        <line x1="32" y1="10" x2="90" y2="10" />
        {stage > 0 && <line x1="80" y1="10" x2="80" y2="35" />}
      </g>

      {stage > 1 && (
        <g className={styles.char} strokeWidth="2">
          <circle cx="80" cy="48" r="11" fill="#f2e0b8" />
          {stage > 2 && <line x1="80" y1="59" x2="80" y2="92" />}
          {stage > 3 && (
            <>
              <line x1="80" y1="68" x2="68" y2="80" />
              <line x1="80" y1="68" x2="92" y2="80" />
            </>
          )}
          {stage > 4 && (
            <>
              <line x1="80" y1="92" x2="70" y2="118" />
              <line x1="80" y1="92" x2="90" y2="118" />
            </>
          )}
          <circle cx="76" cy="46" r="2" />
          <circle cx="84" cy="46" r="2" />
          <path d="M75 53 Q80 50 85 53" />
        </g>
      )}
    </svg>
  );
}