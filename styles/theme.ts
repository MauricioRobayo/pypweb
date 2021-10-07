import { DefaultTheme } from "styled-components";

export const defaultTheme: DefaultTheme = {
  colors: {
    danger: "hsl(360 97% 38%)",
    main: "#125596",
    mainComplement: "#FFFFFF",
    mainDark: "#0052a3",
    mainLight: "#F0F8FF",
    secondary: "#55595c",
    secondaryDark: "#495057",
    secondaryLight: "#DEE2E6",
    secondaryLighter: "#F8F9FA",
    success: "hsl(127, 97%, 24%)",
    warning: "#f7c000",
    warningLighter: "#FFF3CD",
    white: "white",
  },
  border: {
    radius: "0.25em",
  },
  width: {
    narrow: "320px",
    normal: "570px",
    wide: "720px",
  },
  font: {
    size: {
      small: "0.85rem",
      large: "1.25rem",
    },
  },
};
