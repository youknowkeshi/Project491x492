const plugin = require("flowbite/plugin");
const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./src/**/*.{html,js}",
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [plugin,flowbite.plugin(),],
};
