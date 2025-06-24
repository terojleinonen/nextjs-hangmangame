import "./globals.css"; // Ensures Roboto import and other global styles are loaded

export const metadata = {
  title: "Hangman Game", // Updated title
  description: "A Hangman game built with Next.js and Material Design styling.", // Updated description
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      {/*
        The `font-sans` class from Tailwind will apply Roboto due to our tailwind.config.mjs.
        `bg-background dark:bg-background-dark` will apply the appropriate background colors.
        `text-on-background dark:text-on-background-dark` will apply appropriate text colors.
        `antialiased` is good for font rendering.
      */}
      <body className="font-sans bg-background dark:bg-background-dark text-on-background dark:text-on-background-dark antialiased">
        {children}
      </body>
    </html>
  );
}
