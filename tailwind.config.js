/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        marromclaro: "#998A74",
        brancofundo: "#fbfaf9",
      },
    },
    screens: {
      sm: "300px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
      notebook: "1336px",
      // => @media (min-width: 1536px) { ... }
    },

    fontFamily: {
      sans: ["Poppins"],
      // Add other font families if needed
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
