type ThemeType = typeof defaultTheme;

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}

const defaultTheme = {
  colors: {
    activeBackgroundColor: "dodgerBlue",
    activeColor: "hsl(51, 100%, 56%)",
    ad: {
      backgroundColor: "AliceBlue",
      color: "DodgerBlue",
    },
    danger: "tomato",
    inactiveBackgroundColor: "hsl(0, 0%, 96%)",
    linkColor: "hsl(217, 71%, 53%)",
    success: "limeGreen",
  },
  maxWidth: "570px",
};

export default defaultTheme;
