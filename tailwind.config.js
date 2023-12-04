/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        green_main: "#2C7A51",
        grey_main: "#9FA29E",
        light_green: "#E4F5E7",
        hide_txt: "#AFCCA6",
        sidebar_txt: "#A2B8AD",
      },
      fontFamily: {
        Ephesis: ["Ephesis"],
        Montserrat: ["Montserrat"],
        Lexend: ["Lexend"],
      },
      spacing: {
        267: "267px",
        368: "368px",
      },
      borderWidth: {
        DEFAULT: "1px",
      },
      screens: {
        laptop14inches: "1200px",
        //laptop15inches: "1083px",
      },
    },
  },
  plugins: [],
};
