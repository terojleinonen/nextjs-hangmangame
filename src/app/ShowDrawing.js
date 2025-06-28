import React from 'react';
// import './ShowDrawing.css'; // Styles are now handled by Tailwind utility classes

const ShowDrawing = ({ drawingIndex }) => {
  const images = [
    "images/hangman01.png",
    "images/hangman02.png",
    "images/hangman03.png",
    "images/hangman04.png",
    "images/hangman05.png",
  ];

  // Determine the image source based on drawingIndex.
  // drawingIndex is 0-based for array access, game logic seems to be 0-4 for 5 stages.
  const currentImage = (drawingIndex >= 0 && drawingIndex < images.length)
    ? images[drawingIndex]
    : null; // Or a placeholder/empty state image if drawingIndex is out of bounds initially

  return (
    // Simplified main container, styled as a Material surface
    // Added flex-grow to allow it to take space in a flex column layout if needed.
    // Added min-h-[200px] or similar to ensure it doesn't collapse when no image.
    <div
      className="
        bg-surface dark:bg-neutral-700
        p-2 sm:p-3
        rounded-lg
        shadow-md-1
        mb-3 sm:mb-4
        flex justify-center items-center
        w-full max-w-[280px] sm:max-w-xs md:max-w-sm mx-auto
        h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80
        overflow-hidden
      "
    >
      {currentImage ? (
        <img
          src={currentImage}
          alt={`Hangman Drawing ${drawingIndex + 1}`}
          className="object-contain max-h-full max-w-full"
        />
      ) : (
        // Optional: Placeholder content if no image is to be shown (e.g., initial state)
        <div className="text-on-surface/50 dark:text-white/50 text-sm sm:text-base">
          Waiting to start...
        </div>
      )}
    </div>
  );
};

export default ShowDrawing;