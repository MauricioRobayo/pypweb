import { createGlobalStyle } from "styled-components";
import { size } from "./constants";
import reset from "./reset";

const GlobalStyle = createGlobalStyle`
  ${reset};
  @font-face {
    font-family: "LicensePlate";
    font-style: normal;
    font-weight: normal;
    src: url("/fonts/LicensePlate.eot");
    src: url("/fonts/LicensePlate.eot?#iefix") format("embedded-opentype"),
      url("/fonts/LicensePlate.otf") format("opentype"),
      url("/fonts/LicensePlate.svg") format("svg"),
      url("/fonts/LicensePlate.ttf") format("truetype"),
      url("/fonts/LicensePlate.woff") format("woff"),
      url("/fonts/LicensePlate.woff2") format("woff2");
  }
  * {
    box-sizing: border-box;
  }
  html {
    font-size: 14px;
    @media only screen and (min-width: ${size.sm}) {
      font-size: 16px;
    }
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    line-height: normal;
  }
  strong {
    font-weight: bold;
  }
`;

export default GlobalStyle;
