import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      danger: string;
      main: string;
      mainComplement: string;
      mainDark: string;
      mainLight: string;
      secondary: string;
      secondaryDark: string;
      secondaryLight: string;
      secondaryLighter: string;
      success: string;
      warning: string;
      warningLighter: string;
      white: string;
    };
    border: {
      radius: string;
    };
    opacity: number;
    width: {
      narrow: string;
      normal: string;
      wide: string;
    };
    font: {
      size: {
        small: string;
        large: string;
      };
    };
  }
}
