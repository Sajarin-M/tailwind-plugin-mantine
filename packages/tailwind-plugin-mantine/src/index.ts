import {
  DEFAULT_THEME,
  MantineThemeOverride,
  mergeMantineTheme,
} from "@mantine/core";
import plugin from "tailwindcss/plugin";

const filledVariants = ["filled", "filled-hover"];
const lightVariants = ["light", "light-hover", "light-color"];
const outlineVariants = ["outline", "outline-hover"];
const otherColors = [
  "text",
  "body",
  "error",
  "placeholder",
  "dimmed",
  "bright",
  "anchor",
  "default",
  "default-hover",
  "default-color",
  "default-border",
];
/**
 *
 * @usage
 * ```tsx
 * // mantine-theme.ts
 * export const theme = createTheme({
 *   // Put your mantine theme override here
 * })
 *
 * // tailwind.config.ts
 * import type { Config } from "tailwindcss";
 * import pluginMantineV2 from "@devoss/tailwind-plugin-mantine";
 * import { theme } from "./mantine-theme"
 *
 * const config: Config = {
 *   // ...
 *   plugins: [pluginMantineV2(theme)],
 *   // ...
 * };
 * export default config;
 *
 * ```
 *
 */
export default function pluginMantine(customTheme?: MantineThemeOverride) {
  const theme = mergeMantineTheme(DEFAULT_THEME, customTheme);

  const primaryColorShades = Array.from({ length: 10 }).reduce(
    (acc, _, index) => {
      const primaryColor = theme.primaryColor;
      return {
        ...(acc as any),
        [`primary-${index}`]: `var(--mantine-color-${primaryColor}-${index})`,
      };
    },
    {},
  ) as any;

  const colors = Object.entries(theme.colors).reduce(
    (colorsAcc, [colorName, colorTuple]) => {
      const shades = colorTuple.reduce((shadeAcc, hexValue, i) => {
        return {
          ...shadeAcc,
          [`${colorName}-${i}`]: `rgb(${hexToRgb(hexValue)} / <alpha-value>)`,
        };
      }, {} as any);

      const variants = makeVariantColors(colorName);

      const others = otherColors.reduce((othersAcc, otherColor) => {
        return {
          ...othersAcc,
          [otherColor]: `var(--mantine-color-${otherColor})`,
        };
      }, {});

      return {
        ...colorsAcc,
        ...shades,
        ...variants,
        ...others,
      };
    },
    {
      ...makeVariantColors("primary"),
      ...primaryColorShades,
    } as any,
  );

  return plugin(() => {}, {
    darkMode: ["class", '[data-mantine-color-scheme="dark"]'],
    theme: {
      extend: {
        colors,
        fontSize: theme.fontSizes,
        lineHeight: theme.lineHeights,
        boxShadow: {
          ...theme.shadows,
          DEFAULT: theme.shadows.xs,
        },
        borderRadius: {
          ...theme.radius,
          DEFAULT: "var(--mantine-radius-default)",
        },
        spacing: theme.spacing,
        zIndex: {
          app: "var(--mantine-z-index-app)",
          modal: "var(--mantine-z-index-modal)",
          popover: "var(--mantine-z-index-popover)",
          overlay: "var(--mantine-z-index-overlay)",
          max: "var(--mantine-z-index-max)",
        },
      },
    },
  });
}

function hexToRgb(hex: string) {
  hex = hex.replace("#", "");
  const red = parseInt(hex.substring(0, 2), 16);
  const green = parseInt(hex.substring(2, 4), 16);
  const blue = parseInt(hex.substring(4, 6), 16);
  return `${red} ${green} ${blue}`;
}

function makeVariantColors(colorName: string) {
  const concatedVariants = Array.prototype.concat(
    filledVariants,
    lightVariants,
    colorName === "primary" ? [] : outlineVariants,
  );

  return concatedVariants.reduce((variantsAcc, variant) => {
    const value =
      colorName === "primary"
        ? `var(--mantine-primary-color-${variant})`
        : `var(--mantine-color-${colorName}-${variant})`;

    return {
      ...variantsAcc,
      [`${colorName}-${variant}`]: value,
    };
  }, {} as any);
}
