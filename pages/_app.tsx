import { Layout } from "components/Layout";
import { pageview } from "lib/gtag";
import { NextPage } from "next";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import NextNprogress from "nextjs-progressbar";
import React, { ReactNode, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";
import GlobalStyle from "styles/global";
import defaultTheme from "styles/theme";
import { defaultConfig } from "../next-seo.config";

const isProduction = process.env.NODE_ENV === "production";

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
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
        <NextNprogress
          color={defaultTheme.colors.main}
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </>
  );
};

export default App;
