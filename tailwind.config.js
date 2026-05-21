/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#000",
        glass: "rgba(255,255,255,0.05)",
      },
      boxShadow: {
        glow: "0 0 80px rgba(34,211,238,0.15)",
      },
    },
  },
  plugins: [],
};
