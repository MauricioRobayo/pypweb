import { createGlobalStyle } from "styled-components";
import { size } from "./constants";

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
  body {
    color: ${({ theme }) => theme.colors.secondaryDark};
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    line-height: normal
  }
  li {
    padding: 0.5em 0;
  }
  @media only screen and (min-width: ${size.sm}) {
    li {
      padding: 0;
    }
  }
`;

export default GlobalStyle;
