import HangmanGame from "./HangmanGame";

export default function Page() {
  return (
    <>
      <div className="burton-fog-layer">
        <HangmanGame />
      </div>

      <div className="burton-flicker" />
      <div className="burton-vignette" />
    </>
  );
}
