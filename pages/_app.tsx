import { Layout } from "components/Layout";
import { NextPage } from "next";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import { GoogleAnalytics, usePagesViews } from "nextjs-google-analytics";
import NextNprogress from "nextjs-progressbar";
import React, { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";
import GlobalStyle from "styles/global";
import { defaultTheme } from "styles/theme";
import { defaultConfig } from "../next-seo.config";

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type CustomAppProps = AppProps & {
  Component: Page;
};

const App = ({ Component, pageProps }: CustomAppProps) => {
  const getLayout =
    Component.getLayout ?? ((page: ReactNode) => <Layout>{page}</Layout>);

  usePagesViews();

  return (
    <>
      <GoogleAnalytics />
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
