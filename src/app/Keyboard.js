// Reference for virtual keyboard implementation: https://www.geeksforgeeks.org/virtual-keyboard-using-react/

import React, { useState } from 'react';
import './Keyboard.css';

// Keyboard component responsible for rendering the virtual keyboard and handling user input.
// It receives `CharacterPressed` function as a prop to notify the parent component about key presses.
const Keyboard = ({CharacterPressed}) => {
    // State variable to store the text input by the user via the virtual keyboard.
    const [inputText, setInputText] = useState('');
    // State variable to track whether Caps Lock is active.
    const [isCaps, setIsCaps] = useState(false);
    // State variable to track whether Shift key is active.
    const [isShift, setIsShift] = useState(false);

    // Main handler for key clicks. It determines the type of key pressed and calls the appropriate handler.
    const handleKeyClick = (key) => {
        if (key === 'Enter') {
            handleEnterKey();
        } 
        // Ignores Ctrl, Alt, and angle bracket keys if they are standalone (not part of a multi-character key).
        else if(key === "Ctrl" || key === "Alt" || key === '<' || key === '>')
        {
            // No action for these keys.
        }else if (key === ' ') {
            handleSpaceKey();
        } else if (key === 'Caps Lock') {
            handleCapsLock();
        } else if (key === 'delete') {
            handleDeleteKey();
        } else if (key === 'Shift') {
            handleShiftKey();
        } else if (key === 'Tab') {
            handleTabKey();
        } else {
            // Handles regular character keys.
            handleRegularKey(key);
        }
    };

    // Handles the Space key press.
    const handleSpaceKey = () => {
        const newContent = inputText + '\u00A0'; // Adds a non-breaking space.
        CharacterPressed('\u00A0'); // Notifies parent component.
        setInputText(newContent);
    };

    // Handles the Enter key press.
    const handleEnterKey = () => {
        const newContent = inputText + '\n'; // Adds a newline character.
        CharacterPressed('\n'); // Notifies parent component.
        setInputText(newContent);
    };

    // Handles the Caps Lock key press.
    const handleCapsLock = () => {
        const updatedCaps = !isCaps;
        setIsCaps(updatedCaps);
        // Updates the appearance of keys based on Caps Lock state.
        const keys = document.querySelectorAll('.key');
        keys.forEach((key) => {
            const firstSpanElement = key.querySelector('span:first-child');
            if (firstSpanElement) {
                const keyText = firstSpanElement.innerText.toLowerCase();
                // Excludes special keys from case toggling.
                if (!['shift', 'alt', 'ctrl', 'enter', 'caps lock', 'tab']
                    .includes(keyText)) {
                    // Toggles case based on Caps Lock and Shift states.
                    firstSpanElement.innerText = 
                    ((updatedCaps && isShift) || (!updatedCaps && !isShift)) 
                    ? keyText.toLowerCase() : keyText.toUpperCase();
                }
                // Changes the background color of the Caps Lock key to indicate its state.
                if (keyText === 'caps lock') {
                    firstSpanElement.parentElement.style.backgroundColor = 
                    (updatedCaps) ? 'blue' : '#445760';
                }
            }
        });
    };

    // Handles the Tab key press.
    const handleTabKey = () => {
        const newContent = inputText + '    '; // Adds four spaces for a tab.
        CharacterPressed('    '); // Notifies parent component.
        setInputText(newContent);
    };

    // Handles the Delete key press.
    const handleDeleteKey = () => {
        if (inputText.length === 0) {
            return; // No action if there is no text to delete.
        }
        const newContent = inputText.slice(0, inputText.length - 1); // Removes the last character.
        setInputText(newContent);
    };

    // Handles the Shift key press.
    const handleShiftKey = () => {
        const updatedShift = !isShift;
        setIsShift(updatedShift);
        // Updates the appearance of keys based on Shift state.
        const keys = document.querySelectorAll('.key');
        keys.forEach((key) => {
            const firstSpanElement = key.querySelector('span:first-child');
            if (firstSpanElement) {
                const keyText = firstSpanElement.innerText.toLowerCase();
                // Excludes special keys from case toggling.
                if (!['shift', 'alt', 'ctrl', 'enter', 'caps lock', 'tab'].
                    includes(keyText)) {
                    // Toggles case based on Shift and Caps Lock states.
                    firstSpanElement.innerText = 
                    ((updatedShift && isCaps) || (!updatedShift && !isCaps)) 
                    ? keyText.toLowerCase() : keyText.toUpperCase();
                }
                // Changes the background color of the Shift key to indicate its state.
                if (keyText === 'shift') {
                    firstSpanElement.parentElement.style.backgroundColor = 
                    (updatedShift) ? 'blue' : '#445760';
                }
            }
        });
    }

    // Handles regular character key presses (letters, numbers, symbols).
    const handleRegularKey = (key) => {
        // Splits keys that have multiple characters (e.g., "a.A" or "1.!")
        const keys = key.split(/[._]/);
        let newContent;
        if (keys.length > 1) { // Handles keys with shifted/unshifted values.
            if (isShift) {
                if (keys.length === 3) { // Handles special cases like '>', '_'
                    if (keys[0] === '>') {
                        newContent = inputText + '>';
                        CharacterPressed('>');
                    }
                    else {
                        newContent = inputText + '_';
                        CharacterPressed('_');
                    }
                }
                else { // Uses the first part of the key string (shifted value).
                    newContent = inputText + keys[0];
                    CharacterPressed(keys[0]);
                }
            } else { // Uses the second part of the key string (unshifted value).
                if (keys.length === 3) { // Handles special cases like '.', '-'
                    if (keys[0] === '>') {
                        newContent = inputText + '.';
                        CharacterPressed('.');
                    }
                    else {
                        newContent = inputText + '-';
                        CharacterPressed('-');
                    }
                }
                else {
                    newContent = inputText + keys[1];
                    CharacterPressed(keys[1]);
                }
            }
        } else { // Handles single character keys (alphabets).
            // Determines character case based on Shift and Caps Lock states.
            let character = ((isShift && isCaps) || (!isShift && !isCaps)) 
            ? key.toLowerCase() : key.toUpperCase();
            newContent = inputText + character;
            CharacterPressed(character);
        }
        setInputText(newContent);
    };

    // JSX structure for rendering the virtual keyboard.
    return (
        <div className='keyboard'>
            {/* Container to display the text input by the user. */}
            <div className="textcontainer">
                <pre>{inputText}</pre>
            </div>
            {/* Container for the keyboard layout. */}
            <div className="keyboardcontainer">
                <div className="container">
                    {/* First row of keys (numbers and symbols). */}
                    <div className="row">
                        {['~.`', '!.1', '@.2', '#.3', '$.4', '%.5', 
                        '^.6', '&.7', '*.8', '(.9', ').0', '_.-', '+.=', 
                        'delete']
                        .map((keyvalue) => 
                        (
                            // Each key is a div with an onClick handler.
                            <div key={keyvalue} className='key' 
                                 onClick={() => handleKeyClick(keyvalue)}>
                                {/* Renders keys with multiple characters (e.g., shifted and unshifted). */}
                                {keyvalue.includes('.') ? (
                                    keyvalue.split('.').map((part, index) => (
                                        <span key={index}>{part}</span>
                                    ))
                                ) : (
                                    // Renders single character keys or special keys like 'Delete'.
                                    keyvalue === 
                                      'delete' 
                                     ? (
                                        'Delete'
                                    ) : (
                                        <span>{keyvalue}</span>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                    {/* Second row of keys (qwerty layout). */}
                    <div className="row">
                        {['Tab', 'q', 'w', 'e', 'r', 't', 'y',
                        'u', 'i', 'o', 'p', '{_[', '}_]', '|_\\']
                        .map((keyvalue) => (
                            <div key={keyvalue} className='key' 
                                 onClick={() => handleKeyClick(keyvalue)}>
                                {/* Renders keys with multiple characters (e.g., shifted and unshifted). */}
                                {keyvalue.includes('_') ? (
                                    keyvalue.split('_').map((part, index) => (
                                        <span key={index}>{part}</span>
                                    ))
                                ) : (
                                    <span>{keyvalue}</span>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* Third row of keys (asdfgh layout). */}
                    <div className="row">
                        {['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 
                        'j', 'k', 'l', ':_;', `"_'`, 'Enter']
                            .map((keyvalue) => (
                            <div key={keyvalue} className='key' 
                                 onClick={() => handleKeyClick(keyvalue)}>
                                {/* Renders keys with multiple characters (e.g., shifted and unshifted). */}
                                {keyvalue.includes('_') ? (
                                    keyvalue.split('_').map((part, index) => (
                                        <span key={index}>{part}</span>
                                    ))
                                ) : (
                                    <span>{keyvalue}</span>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* Fourth row of keys (zxcvbn layout). */}
                    <div className="row">
                        {['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm',
                        '<_,', '>_.', '?_/', 'Shift'].map((keyvalue, index) => (
                            // Uses index as key for Shift keys as keyvalue is not unique.
                            <div key={index} className='key' 
                                 onClick={() => handleKeyClick(keyvalue)}>
                                {/* Renders keys with multiple characters (e.g., shifted and unshifted). */}
                                {keyvalue.includes('_') ? (
                                    keyvalue.split('_').map((part, index) => (
                                        <span key={index}>{part}</span>
                                    ))
                                ) : (
                                    <span>{keyvalue}</span>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* Fifth row of keys (Ctrl, Alt, Space, etc.). */}
                    <div className="row">
                        {['Ctrl', 'Alt', ' ', 'Ctrl', 'Alt', '<', '>']
                            .map((keyvalue, index) => (
                            // Uses index as key as keyvalue is not unique.
                            <div key={index} className='key' 
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