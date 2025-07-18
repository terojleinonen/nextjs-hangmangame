"use client";
import ShowDrawing from './ShowDrawing'
import ShowWord from './ShowWord'
import Keyboard from './Keyboard'
import words from './data/words.json'
import { useState, useEffect} from 'react';
// import './Home.css'; // Styles are now handled by Tailwind utility classes

// Default export for the Home component.
export default function Home() {
   /*useStates----------------------------------------------------------*/
   // State variable to store the characters of the word to be guessed.
   const [toGuessChars,settoGuessChars] = useState([]);
   // State variable to store the characters guessed by the user.
   const [guessedChars,setguessedChars] = useState([]);
   // State variable to store the count of wrong guesses made by the user.
   const [wrongGuessCount,setwrongGuessCount] = useState(null);
   // State variable to control the display of the hangman drawing.
   const [showDrawing,setShowDrawing] = useState(null);
   // State variable to keep track of the number of correctly guessed unique characters.
   const [counter, setCounter] = useState(1); 
   // State variable to indicate whether the user has won the game.
   const [winner, setWinner] = useState(false);
   /*variables-----------------------------------------------------------*/
   
   // Function to initialize or reset the game.
   const InitGame = ()=>{
       // Selects a random word from words.json and converts it into an array of characters.
       settoGuessChars(Array.from(words[Math.floor(Math.random() * words.length)]));
       // Resets the hangman drawing.
       setShowDrawing(null);
       // Resets the winner status.
       setWinner(false);
       // Resets the wrong guess count.
       setwrongGuessCount(0);
       // Resets the counter for correctly guessed unique characters.
       setCounter(1);
       // Clears the list of guessed characters.
       setguessedChars([]);
   }
   
   // Function called when a character key is pressed by the user.
   const CharacterPressed = (userPressedChar) => {       
       // Adds the pressed character to the list of guessed characters.
       setguessedChars(guessedChars+userPressedChar); 
       // Checks if the guessed character is correct.
       CheckGuess(userPressedChar);
   }
   
   // Function to check if the guessed character is part of the word to be guessed.
   const CheckGuess = (userGuess) => {
       // Calculates the number of unique characters in the word to be guessed.
       const characterCount = new Set(toGuessChars).size;//individual characters count from toGUessChars array
       console.log('userGuess: ',userGuess);
       
       // Checks if the user has guessed all unique characters.
       if(counter===characterCount){
           setWinner(true);
       // Checks if the guessed character is present in the word to be guessed.
       } else if(toGuessChars.includes(userGuess))/*returns true or false*/ {
           // Increments the counter for correctly guessed unique characters.
           setCounter(counter+1)
       } else {
           // Increments the wrong guess count.
           setwrongGuessCount(wrongGuessCount+1);         
           // Updates the hangman drawing based on the number of wrong guesses.
           setShowDrawing(<ShowDrawing drawingIndex={wrongGuessCount}/>);
       }        
   }    

   // useEffect hook to initialize the game when the component mounts.
   // The empty dependency array [] ensures that this effect runs only once after the initial render.
   useEffect( () => {        
       console.log("Page has loaded");
       // Calls InitGame to set up the initial state of the game.
       InitGame();
   },[]);

  // JSX structure for rendering the Hangman game UI.
  return (
    // Main container for the page.
    <div className="min-h-screen flex flex-col items-center justify-start p-2 bg-background text-on-background">
      {/* Game layout container. Flex column, centered items. Responsive padding. */}
      <div className='game w-full max-w-screen-md flex flex-col items-center px-2 pb-48 md:pb-6'> {/* Adjusted max-width and padding */}
        {/* Header section with the game title. Responsive text size and margin. */}
        <div className='header mb-3 sm:mb-4 flex items-center justify-center text-center'>
          <span className="material-symbols-outlined text-3xl sm:text-4xl mr-1 sm:mr-2 text-primary dark:text-primary-dark">joystick</span>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold'>Hangman</h1> {/* Simplified title */}
        </div>
        
        {/* Game area: flex container for drawing and controls. 
            Always column layout for simplicity on mobile, with responsive gap.
            lg:flex-row can be added back if specific large screen layout is needed.
        */}
        <div className='gamearea w-full flex flex-col items-center gap-3 sm:gap-4'>
            {/* Displays the hangman drawing. */}
            {showDrawing}
            
            {/* Container for game controls: word display and keyboard/play again button. */}
            <div className='gamecontrols flex flex-col items-center justify-start w-full'>
              {/* Component to display the word to be guessed. */}
              <ShowWord toGuessChars={toGuessChars} guessedChars={guessedChars}/>
              {/* Keyboard or "Play Again!" button. */}
              {(wrongGuessCount < 5 && winner === false) ? <Keyboard CharacterPressed={CharacterPressed}/>
              : <button
                  onClick={InitGame} 
                  className="mt-6 bg-secondary text-on-secondary font-medium uppercase text-md sm:text-lg px-6 py-2.5 sm:px-8 sm:py-3 rounded shadow-md-2 hover:bg-secondary-variant hover:shadow-md-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-variant transition-all duration-150 ease-in-out"
                >
                  Play Again!
                </button>}
          </div>        
        </div>
      </div>          
    </div>
  );
}