const ShowWord = ({ toGuessChars, guessedChars }) => {
  // Creates the SecretWord elements to be displayed.
  // Each letter or underscore will be a styled span.
  const secretWordElements = toGuessChars.map((letter, index) => {
    const isGuessed = guessedChars.includes(letter);
    return (
      <span
        key={index}
        className={`
          inline-block text-2xl sm:text-3xl font-medium text-on-surface dark:text-white
          min-w-[20px] sm:min-w-[28px] h-8 sm:h-10 md:min-w-[32px] md:h-12
          flex items-center justify-center
          border-b-2
          ${isGuessed ? 'border-transparent' : 'border-primary dark:border-secondary'}
          uppercase
          mx-0.5 sm:mx-1
        `}
      >
        {isGuessed ? letter : '_'}
      </span>
    );
  });

  return (
    // Container for the word display, styled as a Material surface/card
    <div
      className="bg-surface dark:bg-neutral-700 p-3 sm:p-4 rounded-lg shadow-md-1 mb-4 sm:mb-6 text-center"
      // The key helps React efficiently re-render when the word fundamentally changes (e.g., new game)
      // For per-letter updates, the internal mapping handles it.
      key={toGuessChars.join('')}
    >
      <p className="mb-1 text-xs sm:text-sm text-on-surface/70 dark:text-white/70 uppercase tracking-wider">Guess the word:</p>
      {/* Flex container for the letters/underscores */}
      <div className="flex justify-center items-center flex-wrap">
        {secretWordElements}
      </div>
    </div>
  );
};

export default ShowWord;