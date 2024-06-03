/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#15C1A2",
        secondary: "#14C2A3",
        "custom-yellow": "#FFBF1C", // Adding custom color
      },
      fontFamily: {
        elephantmen: ['"CCElephantmenTall Regular"', "sans-serif"], // Backup font
        poppins: ['"Poppins"', "sans-serif"], // Backup font
      },
    },
  },
  plugins: [],
};
