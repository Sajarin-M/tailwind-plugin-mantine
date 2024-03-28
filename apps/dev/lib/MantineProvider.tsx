"use client";

import { MantineProvider, createTheme } from "@mantine/core";
import { PropsWithChildren } from "react";

const theme = createTheme({});

export default function MantineThemeProvider({ children }: PropsWithChildren) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
