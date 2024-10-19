/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        tiny: '0.625rem',  // 10px
        '20px': '1.25rem',  // 20px
        '35px': '2.1875rem', // 35px
        '75px': '4.6875rem', // 75px
      },
      textColor: {
        skin: {
          primary: 'var(--color-text-primary)',    // Primary text color
          secondary: 'var(--color-text-secondary)', // Secondary text color
          button: 'var(--color-text-button)',       // Button text color
        },
      },
      backgroundColor: {
        skin: {
          primary: 'var(--color-fill-primary)',    // Primary background color
          secondary: 'var(--color-fill-secondary)', // Secondary background color
          high: 'var(--color-fill-high)',           // High emphasis background color
          'button-primary': 'var(--color-button-primary)',   // Primary button background
          'button-secondary': 'var(--color-button-secondary)', // Secondary button background
        },
      },
      borderColor: {
        skin: {
          primary: 'var(--color-fill-primary)',    // Primary border color
          secondary: 'var(--color-fill-secondary)', // Secondary border color
        },
      },
      gradientColorStops: {
        skin: {
          start: 'var(--color-fill-primary)',     // Gradient start color
          end: 'var(--color-fill-high)',         // Gradient end color
        },
      },
      fontFamily: {
        Afacad: ['Afacad Flux', 'sans-serif'],     // Afacad font
        Londrina: ['Londrina Shadow', 'sans-serif'], // Londrina font
      },
    },
  },
  plugins: [],
}
