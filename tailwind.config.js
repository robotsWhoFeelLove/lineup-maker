/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        anta: ['"Anta"', "sans"],
        start: ['"Press Start 2P"', "system-ui"],
      },
    },
  },
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
  },
  plugins: [require("daisyui"), require("tailwindcss-animated")],

  // use below if you need animation package.
  // run this in terminal: npm install -D tailwindcss-animated
  //uncomment below plugins, comment out above plugins
  //There is also a nice configurator for it here: https://www.tailwindcss-animated.com/configurator.html
  // plugins: [require("tailwindcss-animated")],
};
