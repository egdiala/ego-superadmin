/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-green": "#EFFFE1",
        "light-red": "#FFF4F4",
        green: {
          0: "#11240E",
          1: "#55b648",
          2: "#aadba3",
          3: "#ddf0da",
          4: "#f6fbf6",
          base: "#4EA507"
        },
        "dark-green": {
          0: "#041401",
          1: "#136207",
          2: "#89b083",
          3: "#d0e0cd",
          4: "#f3f7f3"
        },
        yellow: {
          0: "#323007",
          1: "#fcee21",
          2: "#fdf790",
          3: "#fefcd3",
          4: "#fffef4"
        },
        grey: {
          0: "#04242D",
          dark: {
            1: "#021C2F",
            2: "#354959",
            3: "#808D97",
            4: "#F2F4F5"
          }
        },
        semantics: {
          error: "#dd2418",
          amber: "#df9900",
          success: "#24c790"
        },
        "portal-bg": "#f8f9fa",
        "input-filled": "#dadcdd"
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
