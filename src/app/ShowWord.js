const ShowWord = ({toGuessChars,guessedChars}) => {  
    

    let SecretWord = toGuessChars.map((letter) => (guessedChars.includes(letter)? letter: "_ "));
    
    return (
        <div key={SecretWord.join("")}>
            <h1>{SecretWord}</h1>
        </div>
    );
}
export default ShowWord;