/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`; // Apply opacity to RGB values
    }
    return `rgb(var(${variableName}))`; // Default RGB if no opacity value is set
  };
}

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        style4: ['0.625rem', '0.875rem'],   // 10px font-size with 14px line-height
        style4a: ['1rem', '0.875rem'],
        style3: ['1.25rem', '1.75rem'],     // 20px font-size with 28px line-height
        style3a: ['1.5rem', '2rem'],        // 24px font-size with 32px line-height
        style3b: ['1.75rem', '2.25rem'],    // 28px font-size with 36px line-height
        style2: ['2.5rem', '3rem'],         // 40px font-size with 48px line-height
        style2a: ['2.75rem', '3.25rem'],    // 44px font-size with 52px line-height
        style2b: ['3rem', '3.5rem'],        // 48px font-size with 56px line-height
        style1: ['4.5rem', '5.25rem'],      // 72px font-size with 84px line-height
      },      
      textColor: {
        skin: {
          primary: withOpacity('--color-text-primary'),  // Apply opacity to primary text color
          secondary: withOpacity('--color-text-secondary'), // Apply opacity to secondary text color
          button: withOpacity('--color-text-button'),     // Apply opacity to button text color
          'high': withOpacity('--color-fill-high')
        },
      },
      backgroundColor: {
        skin: {
          primary: withOpacity('--color-fill-primary'),    // Apply opacity to primary background color
          secondary: withOpacity('--color-fill-secondary'), // Apply opacity to secondary background color
          high: withOpacity('--color-fill-high'),           // Apply opacity to high emphasis background color
          'button-primary': withOpacity('--color-button-primary'), // Apply opacity to primary button background
          'button-secondary': withOpacity('--color-button-secondary'), // Apply opacity to secondary button background
        },
      },
      borderColor: {
        skin: {
          primary: withOpacity('--color-fill-primary'),    // Apply opacity to primary border color
          secondary: withOpacity('--color-fill-secondary'), // Apply opacity to secondary border color
        },
      },
      gradientColorStops: {
        skin: {
          start: withOpacity('--color-fill-primary'),     // Apply opacity to gradient start color
          end: withOpacity('--color-fill-high'),          // Apply opacity to gradient end color
        },
      },
      fontFamily: {
        Afacad: ['Afacad Flux', 'sans-serif'],    // Afacad font
        Londrina: ['Londrina Shadow', 'sans-serif'], // Londrina font
      },
      keyframes: {
        expandWidth: {
          '0%': { width: '0%' },
          '25%': { width: '90%' },
          '50%': { width: '95%' },
          '75%': { width: '98%' },
          '100%': { width: '100%' },
        },
        expandSpin: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '40%': { transform: 'rotate(180deg) scale(1.1)' },
          '100%': { transform: 'rotate(360deg) scale(0.9)' },
        },
        opacityAnimation: {
          '0%': {opacity: '20%'},
          '60%': {opacity: '80%'},
          '100%': {opacity: '100%'},
        }
      },
      animation: {
        expandWidth: 'expandWidth 0.75s cubic-bezier(0.2, 0.5, 0.8, 1) forwards',
        expandSpin: 'expandSpin 1.5s ease-in-out 1 forwards',
        opacityAnimation: 'opacityAnimation 0.5s ease-in-out forwards'
      }
    },
  },
  plugins: [],
}
