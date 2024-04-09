import {
  DEFAULT_THEME,
  MantineColorsTuple,
  MantineThemeOverride,
  mergeMantineTheme,
} from "@mantine/core";
import plugin from "tailwindcss/plugin";
import { RecursiveKeyValuePair, ResolvableTo } from "tailwindcss/types/config";

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

type ColorShade = Record<string, string>;

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
 * import pluginMantine from "@devoss/tailwind-plugin-mantine";
 * import { theme } from "./mantine-theme"
 *
 * const config: Config = {
 *   // ...
 *   plugins: [pluginMantine(theme)],
 *   // ...
 * };
 * export default config;
 *
 * ```
 *
 */
export default function pluginMantine(customTheme?: MantineThemeOverride) {
  const theme = mergeMantineTheme(DEFAULT_THEME, customTheme);
  const colors: ResolvableTo<RecursiveKeyValuePair<string, string>> = {};

  colors.primary = getPrimaryColorShades(theme);

  Object.entries(theme.colors).forEach(([colorName, colorTuple]) => {
    colors[colorName] = getColorShades(colorName, colorTuple);
  });

  otherColors.forEach((colorName) => {
    colors[colorName] = `var(--mantine-color-${colorName})`;
  });

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
  const concatenatedVariants = Array.prototype.concat(
    filledVariants,
    lightVariants,
    colorName === "primary" ? [] : outlineVariants,
  );

  return concatenatedVariants.reduce<ColorShade>((variantsAcc, variant) => {
    const value =
      colorName === "primary"
        ? `var(--mantine-primary-color-${variant})`
        : `var(--mantine-color-${colorName}-${variant})`;

    return {
      ...variantsAcc,
      [variant]: value,
    };
  }, {});
}

function getPrimaryColorShades(theme: MantineThemeOverride) {
  let primaryColorShades = Array.from({ length: 10 }).reduce<ColorShade>(
    (acc, _, index) => {
      const primaryColor = theme.primaryColor;
      return {
        ...acc,
        [index]: `var(--mantine-color-${primaryColor}-${index})`,
      };
    },
    {},
  );
  primaryColorShades.DEFAULT = `var(--mantine-primary-color-filled)`;
  primaryColorShades = {
    ...primaryColorShades,
    ...makeVariantColors("primary"),
  };
  return primaryColorShades;
}

function getColorShades(colorName: string, colorsTuple: MantineColorsTuple) {
  const shades = colorsTuple.reduce((shadeAcc, hexValue, index) => {
    return {
      ...shadeAcc,
      [index]: `rgb(${hexToRgb(hexValue)} / <alpha-value>)`,
    };
  }, {} as any);
  shades.DEFAULT = `var(--mantine-color-${colorName}-filled)`;

  const variants = makeVariantColors(colorName);

  return {
    ...shades,
    ...variants,
  };
}
