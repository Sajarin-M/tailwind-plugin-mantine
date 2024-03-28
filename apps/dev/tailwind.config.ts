import type { Config } from "tailwindcss";
import { pluginMantineV2 } from "../../packages/tailwind-plugin-mantine/src/index";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  plugins: [pluginMantineV2()],
};
export default config;
