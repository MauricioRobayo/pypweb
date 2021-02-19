type ThemeType = typeof defaultTheme;

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}

const defaultTheme = {
  colors: {
    activeBackgroundColor: "hsl(51, 100%, 92%)",
    activeColor: "hsl(51, 100%, 56%)",
    inactiveBackgroundColor: "hsl(0, 0%, 96%)",
    linkColor: "hsl(217, 71%, 53%)",
  },
  maxWidth: "570px",
};

export default defaultTheme;
