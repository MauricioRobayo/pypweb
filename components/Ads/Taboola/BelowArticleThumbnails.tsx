import { shouldShowAds } from "lib/utils";
import { useRouter } from "next/router";
import Script from "next/script";

export default function BelowArticleThumbnails() {
  const { query } = useRouter();

  if (shouldShowAds || query.taboola_sim_domain) {
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

  return null;
}
