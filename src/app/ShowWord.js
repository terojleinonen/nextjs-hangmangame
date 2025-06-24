const ShowWord = ({ toGuessChars, guessedChars }) => {
  // Creates the SecretWord elements to be displayed.
  // Each letter or underscore will be a styled span.
  const secretWordElements = toGuessChars.map((letter, index) => {
    const isGuessed = guessedChars.includes(letter);
    return (
      <span
        key={index}
        className={`
          inline-block text-3xl sm:text-4xl font-medium text-on-surface dark:text-white
          min-w-[24px] sm:min-w-[32px] h-10 sm:h-12
          flex items-center justify-center
          border-b-2
          ${isGuessed ? 'border-transparent' : 'border-primary dark:border-secondary'}
          uppercase
          mx-1
        `}
      >
        {isGuessed ? letter : '_'}
      </span>
    );
  });

  return (
    // Container for the word display, styled as a Material surface/card
    <div
      className="bg-surface dark:bg-neutral-700 p-4 sm:p-6 rounded-lg shadow-md-1 mb-6 text-center"
      // The key helps React efficiently re-render when the word fundamentally changes (e.g., new game)
      // For per-letter updates, the internal mapping handles it.
      key={toGuessChars.join('')}
    >
      <p className="mb-2 text-sm text-on-surface/70 dark:text-white/70 uppercase tracking-wider">Guess the word:</p>
      {/* Flex container for the letters/underscores */}
      <div className="flex justify-center items-center flex-wrap">
        {secretWordElements}
      </div>
    </div>
  );
};

export default ShowWord;