import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Tim Burton Hangman",
  description: "A dark whimsical hangman puzzle game",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}