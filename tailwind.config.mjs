/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'media', // or 'class' if you prefer manual toggling
  theme: {
    extend: {
      colors: {
        primary: '#6200EE',
        'primary-variant': '#3700B3',
        'primary-dark': '#BB86FC', // For dark mode
        'on-primary-dark': '#000000', // Text on dark primary
        'primary-dark-hover': '#A074E8', // Slightly darker/modified hover for primary-dark

        secondary: '#03DAC6',
        'secondary-variant': '#018786',
        // Secondary colors often remain vibrant in dark mode or are slightly adjusted
        // 'secondary-dark': '#03DAC6',
        // 'on-secondary-dark': '#000000',

        background: '#FFFFFF', // Light theme background
        'background-dark': '#121212', // Dark theme background

        surface: '#FFFFFF',    // Light theme surface
        'surface-dark': '#1E1E1E',    // Dark theme surface base (e.g. for cards)
                                      // We've also used neutral-700 and neutral-800 for specific darker surfaces

        error: '#B00020',
        'error-dark': '#CF6679', // Dark theme error

        'on-primary': '#FFFFFF',
        'on-secondary': '#000000',
        'on-background': '#000000',
        'on-background-dark': '#FFFFFF',
        'on-surface': '#000000',
        'on-surface-dark': '#FFFFFF',
        'on-error': '#FFFFFF',
        'on-error-dark': '#000000',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        'md-1': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md-2': '0 3px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'md-4': '0 6px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 18px 0 rgba(0, 0, 0, 0.06)',
        'md-6': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // Similar to Tailwind's lg
        'md-8': '0 12px 17px 2px rgba(0,0,0,0.14), 0 5px 22px 4px rgba(0,0,0,0.12), 0 7px 8px -4px rgba(0,0,0,0.2)',
        'md-12': '0 19px 28px 5px rgba(0,0,0,0.14), 0 7px 45px 10px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.2)',
        'md-16': '0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.2)',
        'md-24': '0 30px 50px 10px rgba(0,0,0,0.14), 0 15px 70px 15px rgba(0,0,0,0.12), 0 20px 30px -10px rgba(0,0,0,0.2)',
      },
    },
  },
  plugins: [],
};
