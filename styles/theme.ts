type ThemeType = typeof defaultTheme;

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}

const defaultTheme = {
  colors: {
    ad: {
      backgroundColor: "#F0F8FF",
      color: "#1E90FF",
    },
    danger: "#DC3545",
    lightMain: "#F0F8FF",
    lightSecondary: "#F8F9FA",
    link: "#0D6EFD",
    main: "#1E90FF",
    secondary: "#444444",
    success: "#198754",
  },
  maxWidth: "570px",
};

export default defaultTheme;
