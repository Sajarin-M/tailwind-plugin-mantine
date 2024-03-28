import type { Config } from "tailwindcss";
import pluginMantine from "@devoss/tailwind-plugin-mantine";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  plugins: [pluginMantine],
};
export default config;
