/** @type {import('tailwindcss').Config} */
import clientData from "./src/data/config";
import animations from "@midudev/tailwind-animations";
const { colors } = clientData;
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: colors,
    },
  },
  plugins: [animations, require("flowbite/plugin")],
};
