/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient": "linear-gradient(135deg, #846170, #70929c)",
      },
      boxShadow: {
        custom: "0 2px 7px -1px rgba(0, 0, 0, .4)",
      },
    },
  },
  plugins: [],
};
