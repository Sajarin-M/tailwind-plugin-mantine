# Introduction

A tailwindcss plugin to bring Mantine and Tailwind CSS together with ease.

# Installation

```sh
npm install @devoss/tailwind-plugin-mantine
# or
yarn add @devoss/tailwind-plugin-mantine
```

# Usage

```tsx
// mantine-theme.ts
export const theme = createTheme({
  // Put your mantine theme override here
});
// tailwind.config.ts
import type { Config } from "tailwindcss";
import pluginMantine from "@devoss/tailwind-plugin-mantine";

import { theme } from "./mantine-theme";
const config: Config = {
  // ...
  plugins: [pluginMantine(theme)],
  // ...
};
export default config;
```
