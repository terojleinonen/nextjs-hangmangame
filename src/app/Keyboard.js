import React, { useState } from 'react';
// import './Keyboard.css'; // Styles are now handled by Tailwind utility classes

const Keyboard = ({ CharacterPressed }) => {
    const [inputText, setInputText] = useState('');

    const handleKeyClick = (key) => {
        const character = key.toLowerCase();
        CharacterPressed(character);
        setInputText(prevInputText => prevInputText + character);
    };

    // Define standard Tailwind classes for keys to ensure consistency
    // Material Design "Contained Button" style:
    // bg-primary, text-on-primary, px-2 sm:px-3 py-2, rounded, shadow-md-1 hover:shadow-md-2 focus:shadow-md-2,
    // uppercase, text-sm or text-base, font-medium
    // min-w-[40px] sm:min-w-[50px] h-12 sm:h-14 flex items-center justify-center m-1 transition-shadow
    const keyBaseClasses = `
      bg-primary dark:bg-primary-dark
      text-on-primary dark:text-on-primary-dark
      hover:bg-primary-variant dark:hover:bg-primary-dark-hover
      px-2 sm:px-3 py-2 rounded shadow-md-1 hover:shadow-md-2
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-variant dark:focus:ring-primary-dark
      uppercase text-sm font-medium
      min-w-[36px] h-12 sm:min-w-[48px] sm:h-14
      flex items-center justify-center m-1
      transition-all duration-150 ease-in-out
    `;

    const firstRowKeys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'å'];
    const secondRowKeys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä'];
    const thirdRowKeys = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

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
                    {/* Second row */}
                    <div className="flex justify-center mb-1">
                        {secondRowKeys.map((keyvalue) => (
                            <button
                                key={keyvalue}
                                className={`${keyBaseClasses}`}
                                onClick={() => handleKeyClick(keyvalue)}
                            >
                                {keyvalue}
                            </button>
                        ))}
                    </div>
                    {/* Third row */}
                    <div className="flex justify-center">
                        {thirdRowKeys.map((keyvalue) => (
                            <button
                                key={keyvalue}
                                className={`${keyBaseClasses}`} // Consider if any keys here need different widths
                                onClick={() => handleKeyClick(keyvalue)}
                            >
                                {keyvalue}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Keyboard;