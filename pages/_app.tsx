import * as gtag from "lib/gtag";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
// organize-imports-ignore
import "../styles/globals.scss";

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

  return <Component {...pageProps} />;
};

export default App;
