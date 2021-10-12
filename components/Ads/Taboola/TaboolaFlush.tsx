import { shouldShowAds } from "lib/utils";
import { useRouter } from "next/router";
import Script from "next/script";

export default function TaboolaFlush() {
  const { query } = useRouter();

  if (shouldShowAds || query.taboola_sim_domain) {
    return (
      <Script id="taboola-flush" strategy="lazyOnload">
        {`window._taboola = window._taboola || [];
        _taboola.push({flush: true});`}
      </Script>
    );
  }

  return null;
}
