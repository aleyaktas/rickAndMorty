/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        card: "0 8px 16px rgba(0, 0, 0, 0.5)",
        cardImage: "0 4px 8px rgba(0, 0, 0, 0.5)",
        cardDetailImage: "0px 0px 10px #B2DF27",
      },
      backgroundColor: {
        cardBackground: "#1a1a1aba",
        cardInfo: "#302f2f",
        green: "#008001",
        red: "#FF0008",
        gray: "#808080",
      },
      colors: {
        cardImageBorder: "#ffffffd4",
        cardInfo: "#cccccc",
        primaryText: "#B2DF27",
      },
      gridTemplateColumns: {
        card: "repeat(auto-fill, minmax(200px, 1fr))",
      },
      minWidth: {
        filter: "10rem",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
