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
        // The outer 'keyboard' div might still use some styles from Keyboard.css for overall page positioning
        // We can refactor this later if needed. For now, focus on the keyboard itself.
        <div className='keyboard'>
            {/* keyboardcontainer equivalent */}
            <div className="w-full max-w-3xl mx-auto mt-4">
                {/* container equivalent: bg-surface might be good for dark mode too, or a light gray */}
                <div className="bg-surface dark:bg-neutral-800 p-2 sm:p-3 md:p-4 rounded-lg shadow-md-4">
                    {/* First row */}
                    <div className="flex justify-center mb-1">
                        {firstRowKeys.map((keyvalue) => (
                            <button
                                key={keyvalue}
                                className={`${keyBaseClasses}`}
                                onClick={() => handleKeyClick(keyvalue)}
                            >
                                {keyvalue}
                            </button>
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