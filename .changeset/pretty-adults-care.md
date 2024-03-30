---
"@devoss/tailwind-plugin-mantine": major
---

Allow passing custom theme to the plugin.

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
