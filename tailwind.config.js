/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
    theme: {
      extend: {
        borderRadius : {
          '4xl' : '2rem'
        },
        colors : {
          'current-col' : "#ebf1fa",
          'decent-black' : "#1a1919",
          'place-col' : '#3a4d43',
        },
        keyframes: {
          "grid-divs": {
            '0%, 25%': { backgroundColor: 'white', color : 'blue' },
            '50%': { backgroundColor: 'blue', color : 'white' },
            '100%': { backgroundColor: 'white' },
          },
        },
        animation: {
          "grid-divs": 'grid-divs 8s linear infinite',
        },
        spacing : {
          '16' : '10rem',
          '21' : '21rem',
          '18' : '18rem',
          '14' : '9rem',
          '10' : '3.75rem',
          '9' : '3em',
          '4' : '2em',
          '3' : '1em'
        },
      },
    },
    plugins: [],
  }