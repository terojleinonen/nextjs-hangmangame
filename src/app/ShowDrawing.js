import React from 'react';
import './ShowDrawing.css';

const ShowDrawing = ({drawingIndex}) => {

    return (
        <div className="drawing">
            <div className='drawingcontainer'>
                <div className='container'>
                    {(drawingIndex === 0)? <img src="images/hangman01.png" alt="Hangman Drawing 1"/>
                    :(drawingIndex === 1)? <img src="images/hangman02.png" alt="Hangman Drawing 2"/>
                    :(drawingIndex === 2)? <img src="images/hangman03.png" alt="Hangman Drawing 3"/>
                    :(drawingIndex === 3)? <img src="images/hangman04.png" alt="Hangman Drawing 4"/>
                    :(drawingIndex === 4)? <img src="images/hangman05.png" alt="Hangman Drawing 5"/>
                    :""} 
                </div>                
            </div>
        </div>
    )
}
export default ShowDrawing;