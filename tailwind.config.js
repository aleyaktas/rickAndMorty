/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        card: "0 8px 16px rgba(0, 0, 0, 0.5)",
        cardImage: "0 4px 8px rgba(0, 0, 0, 0.5)",
      },
      backgroundColor: {
        cardBackground: "#1a1a1aba",
        cardInfo: "#302f2f",
      },
      colors: {
        cardImageBorder: "#ffffffd4",
        cardInfo: "#cccccc",
      },
      gridTemplateColumns: {
        card: "repeat(auto-fill, minmax(200px, 1fr))",
      },
    },
  },
  plugins: [],
};
