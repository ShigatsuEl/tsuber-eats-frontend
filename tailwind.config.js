const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lime: colors.lime,
      },
      width: {
        "space-1/2": "49%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
