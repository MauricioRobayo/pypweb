import { useRouter } from "next/router";
import Script from "next/script";

function AdSense() {
  const { query } = useRouter();
  if (query.adSense === "1") {
    console.log("adsense");
    return (
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7218488611142089"
        data-ad-client="ca-pub-7218488611142089"
        // strategy="beforeInteractive"
        crossOrigin="anonymous"
      />
    );
  }

  return null;
}

export default AdSense;
