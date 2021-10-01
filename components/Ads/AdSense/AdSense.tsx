import { shouldShowAds } from "lib/utils";
import Script from "next/script";

function AdSense() {
  if (shouldShowAds) {
    return (
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        data-ad-client="ca-pub-7218488611142089"
      />
    );
  }

  return null;
}

export default AdSense;
