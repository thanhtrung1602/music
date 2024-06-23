/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(135deg, rgb(108, 129, 132) 0%, rgb(162, 86, 77) 100%)",
      },
    },
  },
  plugins: [],
};
