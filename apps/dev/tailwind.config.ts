import type { Config } from "tailwindcss";
import pluginMantineV2 from "../../packages/tailwind-plugin-mantine/src/index";
import { theme } from "./lib/mantine-theme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [pluginMantineV2(theme)],
};
export default config;
