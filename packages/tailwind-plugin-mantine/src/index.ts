import { DEFAULT_THEME, MantineTheme, mergeMantineTheme } from "@mantine/core";
import plugin from "tailwindcss/plugin";

export type PresetMantineOptions = {
  theme?: MantineTheme;
};

function hexToRgb(hex: string) {
  hex = hex.replace("#", "");
  const red = parseInt(hex.substring(0, 2), 16);
  const green = parseInt(hex.substring(2, 4), 16);
  const blue = parseInt(hex.substring(4, 6), 16);
  return `${red} ${green} ${blue}`;
}

const mantineTheme = mergeMantineTheme(DEFAULT_THEME);

const extraColors = [
  "filled",
  "filled-hover",
  "light",
  "light-hover",
  "light-color",
  "outline",
  "outline-hover",
];

const mantineColors = Object.entries(mantineTheme.colors).reduce(
  (acc, [key, value]) => {
    acc[key] = {};
    for (let i = 0; i < 10; i++) {
      acc[key][i] = `rgb(${hexToRgb(value[i])} / <alpha-value>)`;
    }
    acc[key]["DEFAULT"] = `var(--mantine-color-${key}-filled)`;
    extraColors.forEach((extraKey) => {
      acc[key][extraKey] = `var(--mantine-color-${key}-${extraKey})`;
    });
    return acc;
  },
  {} as any
);

[
  "text",
  "body",
  "error",
  "placeholder",
  "anchor",
  "default",
  "default-hover",
  "default-color",
  "default-border",
  "dimmed",
].forEach((key) => {
  mantineColors[key] = `var(--mantine-color-${key})`;
});

mantineColors["primary"] = `var(--mantine-primary-color-filled)`;
mantineColors["primary-filled"] = `var(--mantine-primary-color-filled)`;
mantineColors["primary-filled-hover"] =
  `var(--mantine-primary-color-filled-hover)`;
mantineColors["primary-light"] = `var(--mantine-primary-color-light)`;
mantineColors["primary-light-hover"] =
  `var(--mantine-primary-color-light-hover)`;
mantineColors["primary-light-color"] =
  `var(--mantine-primary-color-light-color)`;

const pluginMantine = plugin(
  function ({ addUtilities }) {
    addUtilities({
      ".outline-mantine-default": {
        outline:
          "calc(0.125rem * var(--mantine-scale)) solid var(--mantine-primary-color-filled)",
        "outline-offset": "calc(0.125rem * var(--mantine-scale))",
      },
    });
  },
  {
    darkMode: ["class", '[data-mantine-color-scheme="dark"]'],
    corePlugins: {
      preflight: false,
    },
    theme: {
      colors: {
        ...mantineColors,
        white: "#fff",
        black: "#000",
        current: "currentColor",
        transparent: "transparent",
      },
      extend: {
        spacing: mantineTheme.spacing,
        lineHeight: mantineTheme.lineHeights,
        borderRadius: {
          ...mantineTheme.radius,
          DEFAULT: "var(--mantine-radius-default)",
        },
        boxShadow: {
          ...mantineTheme.shadows,
          DEFAULT: mantineTheme.shadows.xs,
        },
      },
      fontSize: mantineTheme.fontSizes,
      breakpoints: mantineTheme.breakpoints,
    },
  }
);

export default pluginMantine;

export function pluginMantineV2(customTheme?: MantineTheme) {
  const theme = mergeMantineTheme(DEFAULT_THEME, customTheme);

  return plugin(() => {}, {
    darkMode: ["class", '[data-mantine-color-scheme="dark"]'],
    theme: {
      extend: {
        fontSize: theme.fontSizes,
        boxShadow: theme.shadows,
        borderRadius: theme.radius,
        spacing: theme.spacing,
        zIndex: {
          // TODO no docs
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
