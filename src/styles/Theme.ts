import type { StyleFunctionProps } from "@chakra-ui/react";
import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

import { accordionAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(accordionAnatomy.keys);

// Get rid of accordion border so that it look better in the sidebar
const baseStyle = definePartsStyle({
  container: {
    borderStyle: "none",
  },
});

export const accordionTheme = defineMultiStyleConfig({ baseStyle });
//NOTE: Create palettes here: https://hihayk.github.io/scale/#4/6/50/80/-51/67/20/14/1D9A6C/29/154/108/white

const greenPalette = {
  100: "#DDFFBB",
  200: "#e1fcd4", //Button bg and icon color in dark mode
  300: "#DDFFBB",
  400: "#C7E9B0",
  500: "#0fa824", //button bg in light mode, some headings
  600: "#2a8800", // Icons, buttons and menu text in light mode, only icons in dark mode
  700: "#475740", // Outline and dividers
  800: "#212e1b",
  900: "#212e1b",
};
const purplePalette = {
  200: "#9FC2FF", //Button bg and icon color in dark mode
  300: "#8599FF",
  400: "#6F6CFF",
  500: "#7854FE", //button bg in light mode, some headings
  600: "#883DFB", // Icons, buttons and menu text in light mode, only icons in dark mode
  700: "#9B33DF", // Outline and dividers
  800: "#A629BF",
  100: "#9F209F",
  900: "#80186A",
};
const pinkPalette = {
  200: "#A788FF", //Button bg and icon color in dark mode
  300: "#AE66FF",
  400: "#C144FF",
  500: "#A788FF", //button bg in light mode, some headings
  600: "#AE66FF", // Icons, buttons and menu text in light mode, only icons in dark mode
  700: "#DF00AB", // Outline and dividers
  800: "#BF0069",
  100: "#9F0032",
  900: "#800008",
};

export const theme = extendTheme(
  {
    config: {
      initialColorMode: "dark",
      useSystemColorMode: true,
    },
    colors: {
      brand: pinkPalette,
      hyperlink: "#007cc1",
    },
    components: {
      Accordion: pinkPalette,

      Button: {
        variants: {},
        defaultProps: {},
      },
    },

    styles: {
      global: (props: StyleFunctionProps) => ({
        body: {
          fontFamily: "body",

          bg: mode("white", "gray.800")(props),
          lineHeight: "base",
        },
      }),
    },
  },
  withDefaultColorScheme({ colorScheme: "brand" }),
);
