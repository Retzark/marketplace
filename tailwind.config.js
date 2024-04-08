/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#15C1A2",
        // You can also add variations if needed
        // 'primary-dark': '#...',
        // 'primary-light': '#...',
      },
    },
  },
  plugins: [],
};
