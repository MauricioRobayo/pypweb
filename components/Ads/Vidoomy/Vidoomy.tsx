import { shouldShowAds } from "lib/utils";
import Script from "next/script";

export default function Vidoomy() {
  if (shouldShowAds) {
    return (
      <Script
        src="https://ads.vidoomy.com/pyphoycom_18006.js"
        strategy="beforeInteractive"
      />
    );
  }

  return null;
}
