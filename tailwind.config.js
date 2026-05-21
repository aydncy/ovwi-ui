/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg))",
        panel: "rgb(var(--panel))",
        muted: "rgb(var(--muted))",
        primary: "rgb(var(--primary))",
        secondary: "rgb(var(--secondary))",
        accent: "rgb(var(--accent))",
      },
      boxShadow: {
        glow: "0 0 60px rgba(34,211,238,0.15)",
        premium: "0 20px 80px rgba(0,0,0,0.6)",
      },
      borderColor: {
        soft: "rgba(255,255,255,0.08)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
