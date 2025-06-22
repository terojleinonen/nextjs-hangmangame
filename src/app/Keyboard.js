// Reference for virtual keyboard implementation: https://www.geeksforgeeks.org/virtual-keyboard-using-react/

import React, { useState } from 'react';
import './Keyboard.css';

// Keyboard component responsible for rendering the virtual keyboard and handling user input.
// It receives `CharacterPressed` function as a prop to notify the parent component about key presses.
const Keyboard = ({CharacterPressed}) => {
    // State variable to store the text input by the user via the virtual keyboard.
    const [inputText, setInputText] = useState('');
    // State variables for isCaps and isShift are no longer needed.

    // Main handler for key clicks.
    const handleKeyClick = (key) => {
        // Directly handles regular character keys as no other types of keys exist anymore.
        handleRegularKey(key);
    };

    // Handles regular character key presses (letters).
    // Assumes keys are single lowercase letters (a-z, å, ä, ö).
    const handleRegularKey = (key) => {
        const character = key.toLowerCase(); // Ensure it's lowercase
        const newContent = inputText + character;
        CharacterPressed(character); // Notifies parent component with the lowercase character.
        setInputText(newContent);
    };

    // JSX structure for rendering the virtual keyboard.
    return (
        <div className='keyboard'>
            {/* Container for the keyboard layout. */}
            <div className="keyboardcontainer">
                <div className="container">
                    {/* First row of keys */}
                    <div className="row">
                        {['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'å']
                        .map((keyvalue) => (
                            <div key={keyvalue} className='key' 
                                 onClick={() => handleKeyClick(keyvalue)}>
                                <span>{keyvalue}</span>
                            </div>
                        ))}
                    </div>
                    {/* Second row of keys */}
                    <div className="row">
                        {['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä']
                            .map((keyvalue) => (
                            <div key={keyvalue} className='key' 
                                 onClick={() => handleKeyClick(keyvalue)}>
                                <span>{keyvalue}</span>
                            </div>
                        ))}
                    </div>
                    {/* Third row of keys */}
                    <div className="row">
                        {['z', 'x', 'c', 'v', 'b', 'n', 'm']
                        .map((keyvalue) => (
                            <div key={keyvalue} className='key'
                                 onClick={() => handleKeyClick(keyvalue)}>
                                <span>{keyvalue}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Keyboard;