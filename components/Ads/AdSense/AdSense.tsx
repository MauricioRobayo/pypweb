import { shouldShowAds } from "lib/utils";
import Script from "next/script";

function AdSense() {
  if (shouldShowAds) {
    return (
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7218488611142089"
        data-ad-client="ca-pub-7218488611142089"
        crossOrigin="anonymous"
        strategy="beforeInteractive"
      />
    );
  }

  return null;
}

export default AdSense;
