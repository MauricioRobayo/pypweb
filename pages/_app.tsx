import { Layout } from "components/Layout";
import { pageview } from "lib/gtag";
import { NextPage } from "next";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import { Router, useRouter } from "next/router";
import NProgress from "nprogress";
import React, { ReactElement, ReactNode, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";
import GlobalStyle from "styles/global";
import defaultTheme from "styles/theme";
import { defaultConfig } from "../next-seo.config";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const isProduction = process.env.NODE_ENV === "production";

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type CustomAppProps = AppProps & {
  Component: Page;
};

const App = ({ Component, pageProps }: CustomAppProps) => {
  const router = useRouter();
  const getLayout =
    Component.getLayout ?? ((page: ReactNode) => <Layout>{page}</Layout>);

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      if (isProduction) {
        pageview(url);
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <DefaultSeo {...defaultConfig} />
      <ThemeProvider theme={defaultTheme}>
        <Normalize />
        <GlobalStyle />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </>
  );
};

export default App;
