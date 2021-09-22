import { ConsentBanner } from "components/Ads";
import { NextPage } from "next";
import { DefaultSeo } from "next-seo";
import { AppProps, NextWebVitalsMetric } from "next/app";
import { event, GoogleAnalytics, usePagesViews } from "nextjs-google-analytics";
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

export function reportWebVitals({
  id,
  name,
  label,
  value,
}: NextWebVitalsMetric) {
  event(name, {
    category: label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
    value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
    label: id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate.
  });
}

const App = ({ Component, pageProps }: CustomAppProps) => {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  usePagesViews();

  return (
    <>
      <GoogleAnalytics />
      <ConsentBanner />
      <DefaultSeo {...defaultConfig} />
      <ThemeProvider theme={defaultTheme}>
        <Normalize />
        <GlobalStyle />
        <NextNprogress
          color={defaultTheme.colors.main}
          startPosition={0.3}
          stopDelayMs={200}
          height={2}
          showOnShallow={true}
          options={{ showSpinner: false }}
        />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </>
  );
};

export default App;
