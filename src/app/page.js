"use client";
import ShowDrawing from './ShowDrawing'
import ShowWord from './ShowWord'
import Keyboard from './Keyboard'
import RandomWords from './data/RandomWords.json'
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
       // Selects a random word from RandomWords.json and converts it into an array of characters.
       settoGuessChars(Array.from(RandomWords[Math.floor(Math.random() * RandomWords.length)]));
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
    // Main container for the page. Reduced top/overall padding for more full-window feel.
    <div className="min-h-screen flex flex-col items-center justify-start p-2 sm:p-4 bg-background text-on-background">
      {/* Game layout container. Flex column, centered items. Increased max-width.
          Padding-bottom for mobile to account for fixed keyboard, md:pb-6 for normal spacing on larger screens.
      */}
      <div className='game w-full max-w-screen-lg flex flex-col items-center pb-56 md:pb-6'>
        {/* Header section with the game title. */}
        <div className='header mb-4 sm:mb-6 flex items-center justify-center text-center'>
          <span className="material-symbols-outlined text-4xl sm:text-5xl mr-2 sm:mr-3 text-primary dark:text-primary-dark">joystick</span>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold'>Hangman Game</h1> {/* Simplified title, Tailwind handles color via body */}
        </div>        

        {/* Game area: flex container for drawing and controls.
            On large screens (lg, 1024px) and up, it's a row. On smaller screens, it's a column.
            Order for smaller screens (<lg): Title -> Drawing -> Word -> Keyboard.
        */}
        <div className='gamearea w-full flex flex-col lg:flex-row lg:justify-around items-center lg:items-start gap-4 sm:gap-6'>
            {/* Displays the hangman drawing based on wrong guesses.
                The ShowDrawing component now has its own width/max-width and height.
            */}
            {showDrawing} {/* This will be the first item in flex-col for <lg, and first in flex-row for lg+ */}

            {/* Container for game controls: word display and keyboard/play again button. */}
            {/* This whole block will be second in flex-col for <lg, and second in flex-row for lg+ */}
            <div className='gamecontrols flex flex-col items-center justify-start w-full lg:w-auto'>
              {/* Component to display the word to be guessed, showing correctly guessed characters. */}
              <ShowWord toGuessChars={toGuessChars} guessedChars={guessedChars}/>
              {/* Conditionally renders the Keyboard component or the "Play Again!" button. */}
              {/* Keyboard is shown if the wrong guess count is less than 5 and the user has not won. */}
              {/* "Play Again!" button is shown if the game is over (either won or lost). */}
              {(wrongGuessCount < 5 && winner === false)?<Keyboard CharacterPressed={CharacterPressed}/>
              :<button
                  onClick={InitGame}
                  className="mt-8 bg-secondary text-on-secondary font-medium uppercase text-lg px-8 py-3 rounded shadow-md-2 hover:bg-secondary-variant hover:shadow-md-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-variant transition-all duration-150 ease-in-out"
                >
                  Play Again!
                </button>}
          </div>        
        </div>
      </div>          
    </div>
  );
}
