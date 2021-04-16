import * as gtag from "lib/gtag";
import { AppProps } from "next/app";
import { Router, useRouter } from "next/router";
import NProgress from "nprogress";
import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";
import GlobalStyle from "styles/global";
import defaultTheme from "styles/theme";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

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
    <ThemeProvider theme={defaultTheme}>
      <Normalize />
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
