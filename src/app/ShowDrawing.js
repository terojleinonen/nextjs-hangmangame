import React from 'react';
import './ShowDrawing.css';

// ShowDrawing component is responsible for displaying the hangman drawing.
// It receives `drawingIndex` as a prop, which determines which stage of the hangman drawing to display.
const ShowDrawing = ({drawingIndex}) => {

    return (
        // Main container for the drawing.
        <div className="drawing">
            {/* Inner container for layout purposes. */}
            <div className='drawingcontainer'>
                {/* Container for the hangman image. */}
                <div className='container'>
                    {/* Conditionally renders the hangman image based on the drawingIndex. */}
                    {/* Each drawingIndex corresponds to a different stage of the hangman. */}
                    {(drawingIndex === 0)? <img src="images/hangman01.png" alt="Hangman Drawing 1"/>
                    :(drawingIndex === 1)? <img src="images/hangman02.png" alt="Hangman Drawing 2"/>
                    :(drawingIndex === 2)? <img src="images/hangman03.png" alt="Hangman Drawing 3"/>
                    :(drawingIndex === 3)? <img src="images/hangman04.png" alt="Hangman Drawing 4"/>
                    :(drawingIndex === 4)? <img src="images/hangman05.png" alt="Hangman Drawing 5"/>
                    :""} 
                    {/* If drawingIndex does not match any of the above conditions, nothing is rendered. */}
                </div>                
            </div>
        </div>
    )
}
export default ShowDrawing;