const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lime: colors.lime,
      },
      screen: {
        "3xl": "1900px",
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
