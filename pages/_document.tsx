/* eslint-disable react/no-danger */

import { ConsentBanner } from "components/Ads";
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { ServerStyleSheet } from "styled-components";

const GA_MEASUREMENT_ID = "G-B3CL561Q2J";
const isProduction = process.env.NODE_ENV === "production";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="es">
        <Head>
          <GoogleAnalytics gaMeasurementId={GA_MEASUREMENT_ID} />
          <ConsentBanner />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
