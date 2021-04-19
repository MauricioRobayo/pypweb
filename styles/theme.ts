type ThemeType = typeof defaultTheme;

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}

const defaultTheme = {
  colors: {
    danger: "#DC3545",
    main: "#1E90FF",
    mainComplement: "#FFFFFF",
    mainDark: "#0052a3",
    mainLight: "#F0F8FF",
    secondary: "#ADB5BD",
    secondaryDark: "#495057",
    secondaryLight: "#DEE2E6",
    secondaryLighter: "#F8F9FA",
    success: "#22BB33",
    warning: "#FFC107",
    warningLighter: "#FFF3CD",
  },
  maxWidth: "570px",
  maxWidthWider: "720px",
};

export default defaultTheme;
