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
          'modal-col' : 'rgba(0,0,0,0.4)'
        },
        keyframes: {
          "grid-divs": {
            '0%, 25%': { backgroundColor: 'white', color : 'blue' },
            '50%': { backgroundColor: 'blue', color : 'white' },
            '100%': { backgroundColor: 'white' },
          },
          "color-skip-1" : {
            '0%': { backgroundColor: '#a2a3a2'},
            '25%': { backgroundColor: 'white'},
          },
          "color-skip-2" : {
            '0%': { backgroundColor: '#a2a3a2'},
            '60%': { backgroundColor: 'white'},
          },
          "color-skip-3" : {
            '0%': { backgroundColor: '#a2a3a2'},
            '80%': { backgroundColor: 'white'},
          },
          bounceHigh: {
            '0%, 100%': { transform: 'translateY(0)' },
            '25%': { transform: 'translateY(-15px)' },
          },
          bounceHigher: {
            '0%, 100%': { transform: 'translateY(0)' },
            '60%': { transform: 'translateY(-15px)' },
          },
          bounceHighest: {
            '0%, 100%': { transform: 'translateY(0)' },
            '80%': { transform: 'translateY(-15px)' },
          }
        },
        animation: {
          "grid-divs": 'grid-divs 8s linear infinite',
          "bounce-high": "bounceHigh 1.5s infinite",
          "bounce-higher": "bounceHigher 1.5s infinite",
          "bounce-highest": "bounceHighest 1.5s infinite",

          "color-skip-1" : "color-skip-1 1.5s infinite",
          "color-skip-2" : "color-skip-2 1.5s infinite",
          "color-skip-3" : "color-skip-3 1.5s infinite",
        },
        spacing : {
          '16' : '10rem',
          '100' : '100%',
          '2.6' : '0.8rem',
          '16.5' : '15rem',
          '21' : '21rem',
          '21.5' : '23rem',
          '10.5' : '5rem',
          '21.6' : '415px',
          '18' : '18rem',
          '14' : '9rem',
          '13.5' : '7rem',
          '10' : '3.75rem',
          '9' : '3em',
          '4.5' : '2.6rem',
          '4' : '2em',
          '3' : '1em',
          '3.5' : '1.5em',
          '0.5' : '0.5em',
          '0.4' : '0.4em',
        },
      },
    },
    plugins: [],
  }