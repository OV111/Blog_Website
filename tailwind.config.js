/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // adjust paths according to your project
  ],
  theme: {
    extend: {
      fontFamily: {
        // elms: ['"Elms Sans"', 'sans-serif'], // this allows font-elms class
         sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
