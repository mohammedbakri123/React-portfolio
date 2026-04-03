module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#ff6b00",
        "secondary-color": "#f5f5f5",
      },
    },
  },
  fontFamily: {
    mono: ["Roboto Mono", "monospace"],
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("tailwind-scrollbar-hide"),
    require("tailwindcss-animated"),
  ],
};
