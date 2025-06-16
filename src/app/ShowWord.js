// ShowWord component is responsible for displaying the word to be guessed.
// It receives `toGuessChars` (an array of characters of the word to guess)
// and `guessedChars` (a string of characters guessed by the user) as props.
const ShowWord = ({toGuessChars,guessedChars}) => {  
    
    // Creates the `SecretWord` to be displayed.
    // It maps through each `letter` in the `toGuessChars` array.
    // If the `letter` is included in the `guessedChars` string, the `letter` itself is displayed.
    // Otherwise, an underscore "_ " is displayed.
    let SecretWord = toGuessChars.map((letter) => (guessedChars.includes(letter)? letter: "_ "));
    
    return (
        // The key for the div is set to the current state of SecretWord.join("")
        // This ensures that the component re-renders when SecretWord changes.
        <div key={SecretWord.join("")}>
            {/* Displays the SecretWord within an h1 tag. */}
            <h1>{SecretWord}</h1>
        </div>
    );
}
export default ShowWord;