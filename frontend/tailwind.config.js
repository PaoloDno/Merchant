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
        style4: ['0.625rem', '0.875rem'],  // 10px font-size with 14px line-height
        style3: ['1.25rem', '1.75rem'],    // 20px font-size with 28px line-height
        style2: ['2.1875rem', '2.75rem'],  // 35px font-size with 44px line-height
        style1: ['4.6875rem', '5.5rem'],   // 75px font-size with 88px line-height
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
    },
  },
  plugins: [],
}
