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
        
      },
    },
  },
  plugins: [forms, typography],
};

module.exports = config;
