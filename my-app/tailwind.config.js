const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
     "./app/**/*.{js,ts,jsx,tsx,mdx}",
     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
     "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
     // Or if using `src` directory:
     "./src/**/*.{js,ts,jsx,tsx,mdx}",
     flowbite.content(),
   ],
   theme: {
     extend: {},
   },
   plugins: [
      flowbite.plugin(),
   ],
 };

 
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
