"use client";
import ShowDrawing from './ShowDrawing'
import ShowWord from './ShowWord'
import Keyboard from './Keyboard'
import RandomWords from './data/RandomWords.json'
import { useState, useEffect} from 'react';
import './Home.css';

export default function Home() {
   /*useStates----------------------------------------------------------*/
   const [toGuessChars,settoGuessChars] = useState([]);
   const [guessedChars,setguessedChars] = useState([]);
   const [wrongGuessCount,setwrongGuessCount] = useState(null);
   const [showDrawing,setShowDrawing] = useState(null);
   const [counter, setCounter] = useState(1); 
   const [winner, setWinner] = useState(false);
   /*variables-----------------------------------------------------------*/
   
   const InitGame = ()=>{
       settoGuessChars(Array.from(RandomWords[Math.floor(Math.random() * RandomWords.length)]));
       setShowDrawing(null);
       setWinner(false);
       setwrongGuessCount(0);
       setCounter(1);
       setguessedChars([]);
   }
   
   const CharacterPressed = (userPressedChar) => {       
       setguessedChars(guessedChars+userPressedChar); 
       CheckGuess(userPressedChar);
   }
   
   const CheckGuess = (userGuess) => {
       const characterCount = new Set(toGuessChars).size;//individual characters count from toGUessChars array
       
       if(counter===characterCount){
           setWinner(true);
       } else if(toGuessChars.includes(userGuess))/*returns true or false*/ {
           setCounter(counter+1)
       } else {
           setwrongGuessCount(wrongGuessCount+1);         
           setShowDrawing(<ShowDrawing drawingIndex={wrongGuessCount}/>);
       }        
   }    

   useEffect( () => {        
       console.log("Page has loaded");
       InitGame();
   },[]);

  return (
    <div>
      <div className='game'>
        <div className='header'>
          <h1>Hangman Word Guessing Game</h1> 
        </div>        
        <div className='gamearea'>
            {showDrawing}
            <div className='gamecontrols'> 
              <ShowWord toGuessChars={toGuessChars} guessedChars={guessedChars}/>
              {(wrongGuessCount < 5 && winner === false)?<Keyboard CharacterPressed={CharacterPressed}/>
              :<button className="resetButton" onClick={InitGame}>Play Again!</button>}          
          </div>        
        </div>
      </div>          
    </div>
  );
}
