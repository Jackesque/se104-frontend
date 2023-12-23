const typography = require("@tailwindcss/typography");
const forms = require("@tailwindcss/forms");

/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        tprim: '#64829d',
        bgprim: '#dcf4ff',
        bluebtn: '#2a93fc',
        bluebtnhover: '#2d74bb',
        authenbtnhover: '#bfd4e8',
        backbtn: '#f87171',
        backbtnhover: '#d10808',
      },
    },
  },
  plugins: [forms, typography],
};

module.exports = config;
