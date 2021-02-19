import * as gtag from "lib/gtag";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import CssReset from "styles/css-reset";

const GlobalStyle = createGlobalStyle`
  ${CssReset};
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

  :root {
    --max-width: 570px;
    --active-background-color: hsl(51, 100%, 92%);
    --active-color: hsl(51, 100%, 56%);
    --inactive-background-color: hsl(0, 0%, 96%);
    --link-color: hsl(217, 71%, 53%);
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    line-height: normal;
  }

  strong {
    font-weight: bold;
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: var(--link-color);
    }
  }
`;

const isProduction = process.env.NODE_ENV === "production";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      if (isProduction) {
        gtag.pageview(url);
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default App;
