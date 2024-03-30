"use client";

import { MantineProvider } from "@mantine/core";
import { PropsWithChildren } from "react";
import { theme } from "./mantine-theme";

export default function MantineThemeProvider({ children }: PropsWithChildren) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
