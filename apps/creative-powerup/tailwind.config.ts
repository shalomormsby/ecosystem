import type { Config } from "tailwindcss";
import path from "path";

const config: Config = {
  presets: [require("@sage/config/tailwind")],
  content: [
    path.join(__dirname, "../../packages/ui/src/**/*.{js,ts,jsx,tsx}"),
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
