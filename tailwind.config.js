/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  content: ["**/*.ts"],
  theme: {
    extend: {
      colors: {
        ACCENT: "#475569",
      },
    },
  },
  plugins: [],
};

