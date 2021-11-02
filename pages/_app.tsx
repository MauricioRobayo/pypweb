import { AdSense, ConsentBanner } from "components/Ads";
import { Taboola } from "components/Ads/Taboola";
import { NextPage } from "next";
import { DefaultSeo } from "next-seo";
import { AppProps, NextWebVitalsMetric } from "next/app";
import { event, GoogleAnalytics, usePagesViews } from "nextjs-google-analytics";
import NextNprogress from "nextjs-progressbar";
import React, { ReactElement, ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";
import GlobalStyle from "styles/global";
import { defaultTheme } from "styles/theme";
import { defaultConfig } from "../next-seo.config";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement, pageProps: any) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
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

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  usePagesViews();

  return (
    <>
      <GoogleAnalytics />
      <ConsentBanner />
      <AdSense />
      <Taboola />
      <DefaultSeo {...defaultConfig} />
      <ThemeProvider theme={defaultTheme}>
        <Normalize />
        <GlobalStyle />
        <NextNprogress
          color={defaultTheme.colors.main}
          startPosition={0.4}
          stopDelayMs={200}
          height={4}
          showOnShallow={true}
        />
        {getLayout(<Component {...pageProps} />, pageProps)}
      </ThemeProvider>
    </>
  );
};

export default App;
