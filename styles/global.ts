import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-display: swap;
    font-family: "LicensePlate";
    font-style: normal;
    font-weight: normal;
    src: local("License Plate"),
      url("/fonts/LicensePlate.woff2") format("woff2"),
      url("/fonts/LicensePlate.woff") format("woff"),
      url("/fonts/LicensePlate.ttf") format("truetype"),
      url("/fonts/LicensePlate.eot") format("embedded-opentype") ;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
  html {
    scroll-behavior: smooth;
  }
  body {
    color: ${({ theme }) => theme.colors.secondaryDark};
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    line-height: normal
  }
`;

export default GlobalStyle;
