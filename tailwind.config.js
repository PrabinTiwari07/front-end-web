module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animationDelay: {
        150: "150ms",
      },
    },
  },
  plugins: [require("daisyui")],
};