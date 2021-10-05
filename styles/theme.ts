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
    warning: "#FFC107",
    warningLighter: "#FFF3CD",
  },
  maxWidth: "570px",
  maxWidthNarrow: "320px",
  maxWidthWider: "720px",
  font: {
    size: {
      small: "0.85rem",
      large: "1.25rem",
    },
  },
};
