import { shouldShowAds } from "lib/utils";
import Script from "next/script";

export default function BellowArticleThumbnails() {
  if (!shouldShowAds) {
    return null;
  }

  return (
    <>
      <div id="taboola-below-article-thumbnails" />
      <Script
        id="taboola-below-article-thumbnails-script"
        strategy="lazyOnload"
      >
        {`window._taboola = window._taboola || [];
          _taboola.push({
            mode: 'alternating-thumbnails-a',
            container: 'taboola-below-article-thumbnails',
            placement: 'Below Article Thumbnails',
            target_type: 'mix'
          });`}
      </Script>
    </>
  );
}
