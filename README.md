# Next.js Hangman Game

A classic Hangman word guessing game built with Next.js, React, and Tailwind CSS.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
- [Project Structure](#project-structure)
- [How to Play](#how-to-play)
- [Available Scripts](#available-scripts)

## Features

- Classic Hangman gameplay.
- Random word selection from a predefined list.
- Visual feedback for incorrect guesses (Hangman drawing).
- On-screen keyboard for letter input.
- Clear win/loss conditions.
- "Play Again" option to restart the game.

## Technologies Used

- **Next.js:** A React framework for server-side rendering and static site generation.
- **React:** A JavaScript library for building user interfaces.
- **JavaScript (ES6+):** The primary programming language.
- **Tailwind CSS:** A utility-first CSS framework for styling.
- **HTML5 & CSS3:** Standard web technologies.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed:

- Node.js (which includes npm) - You can download it from [nodejs.org](https://nodejs.org/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url> # Replace <repository_url> with the actual URL of this repo
    cd nextjs-hangmangame
    ```

2.  **Install dependencies:**
    Open your terminal in the project directory and run:
    ```bash
    npm install
    ```

### Running the Development Server

To start the development server and view the application in your browser:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal) to view it in the browser.

## Project Structure

Here's an overview of the key directories and files:

```
nextjs-hangmangame/
├── public/                     # Static assets (images, fonts, etc.)
│   └── images/                 # Hangman images
├── src/
│   └── app/                    # Core application files for Next.js App Router
│       ├── data/
│       │   └── RandomWords.json # JSON file containing words for the game
│       ├── Home.css            # Styles specific to the Home page
│       ├── Keyboard.css        # Styles specific to the Keyboard component
│       ├── Keyboard.js         # React component for the on-screen keyboard
│       ├── ShowDrawing.css     # Styles specific to the ShowDrawing component
│       ├── ShowDrawing.js      # React component to display the hangman drawing
│       ├── ShowWord.js         # React component to display the word being guessed
│       ├── globals.css         # Global styles
│       ├── layout.js           # Main layout component for Next.js
│       └── page.js             # Main React component for the Hangman game page
├── .gitignore                  # Specifies intentionally untracked files that Git should ignore
├── next.config.mjs             # Configuration file for Next.js
├── package-lock.json           # Records exact versions of dependencies
├── package.json                # Lists project dependencies and scripts
├── postcss.config.mjs          # Configuration for PostCSS (used by Tailwind CSS)
└── tailwind.config.mjs         # Configuration file for Tailwind CSS
```

-   **`src/app/`**: Contains the core application logic and UI components.
    -   **`page.js`**: The main entry point for the Hangman game page, housing the primary game logic.
    -   **`Keyboard.js`**, **`ShowDrawing.js`**, **`ShowWord.js`**: Reusable React components for different parts of the game UI.
    -   **`data/RandomWords.json`**: A JSON file storing the list of words that can be used in the game.
-   **`public/`**: Stores static assets like the Hangman images.
-   **`package.json`**: Defines project metadata, dependencies, and scripts.
-   **`next.config.mjs`**: Configuration for Next.js.
-   **`tailwind.config.mjs`**: Configuration for Tailwind CSS.

## How to Play

1.  Once the game loads, a random word will be selected, represented by a series of underscores.
2.  Use the on-screen keyboard to guess letters you think are in the word.
3.  If you guess a correct letter, it will be revealed in its correct position(s) in the word.
4.  If you guess an incorrect letter, a part of the hangman drawing will appear.
5.  You win the game if you guess all the letters in the word before the hangman is fully drawn (5 incorrect guesses).
6.  You lose the game if the hangman is fully drawn before you complete the word.
7.  After a win or loss, you can click the "Play Again!" button to start a new game.

## Available Scripts

In the project directory, you can run the following scripts:

-   **`npm run dev`**
    Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes.

-   **`npm run build`**
    Builds the app for production to the `.next` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

-   **`npm run start`**
    Starts the production server. This command should be run after building the app with `npm run build`.

-   **`npm run lint`**
    Runs ESLint to statically analyze your code for potential errors and style issues.

---

_This README was generated by an AI assistant._
