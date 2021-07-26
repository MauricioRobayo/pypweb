import { Layout } from "components/Layout";
import { pageview } from "lib/gtag";
import { NextPage } from "next";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import { Router, useRouter } from "next/router";
import NProgress from "nprogress";
import { ReactElement, ReactNode, useEffect } from "react";
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

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type CustomAppProps = AppProps & {
  Component: Page;
};

const App = ({ Component, pageProps }: CustomAppProps) => {
  const title = "Pico y placa hoy";
  const description = `Horario, días, fechas, placas, números, decretos, sanciones y toda la información vigente del pico y placa`;
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
    <ThemeProvider theme={defaultTheme}>
      <Normalize />
      <GlobalStyle />
      <DefaultSeo
        additionalLinkTags={[
          {
            href: "/favicon-32x32.png",
            rel: "icon",
            sizes: "32x32",
            type: "image/png",
          },
          {
            href: "/favicon-16x16.png",
            rel: "icon",
            sizes: "16x16",
            type: "image/png",
          },
          {
            href: "/favicon.ico",
            rel: "icon",
          },
          {
            href: "/apple-touch-icon.png",
            rel: "apple-touch-icon",
            sizes: "180x180",
          },
          {
            href: "/site.webmanifest",
            rel: "manifest",
          },
          {
            href: "/safari-pinned-tab.svg",
            rel: "mask-icon",
          },
          {
            color: "#f7c100",
            href: "/safari-pinned-tab.svg",
            rel: "mask-icon",
          },
        ]}
        additionalMetaTags={[
          {
            content: "#ffc40d",
            name: "msapplication-TileColor",
          },
          {
            content: "#f7c100",
            name: "theme-color",
          },
        ]}
        description={description}
        openGraph={{
          description,
          images: [
            {
              alt: "Pico y placa hoy",
              height: 512,
              url: "/android-chrome-512x512.png",
              width: 512,
            },
          ],
          locale: "es_CO",
          site_name: title,
          title,
          type: "website",
          url: "https://www.pyphoy.com/",
        }}
        title={title}
      />
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
};

export default App;
