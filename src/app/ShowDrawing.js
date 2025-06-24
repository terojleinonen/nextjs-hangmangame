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
        p-3 sm:p-4
        rounded-lg
        shadow-md-1
        mb-4 sm:mb-6
        flex justify-center items-center
        w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto
        h-56 sm:h-64 md:h-80 lg:h-96
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
        <div className="text-on-surface/50 dark:text-white/50">
          Waiting to start...
        </div>
      )}
    </div>
  );
};

export default ShowDrawing;