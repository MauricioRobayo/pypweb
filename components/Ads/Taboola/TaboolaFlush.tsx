import { shouldShowAds } from "lib/utils";
import Script from "next/script";

export default function TaboolaFlush() {
  if (!shouldShowAds && Math.random() > 1) {
    return null;
  }

  return (
    <Script id="taboola-flush">
      {`window._taboola = window._taboola || [];
      _taboola.push({flush: true});`}
    </Script>
  );
}
