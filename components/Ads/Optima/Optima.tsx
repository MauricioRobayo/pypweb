import { shouldShowAds } from "lib/utils";
import Script from "next/script";

function Optima() {
  if (!shouldShowAds) {
    return null;
  }

  return (
    <Script
      src="https://ad-adserver.com?uid=616821de6b6a5524b84b52f1&w=300&h=250"
      strategy="lazyOnload"
      data-adscript
    />
  );
}

export default Optima;
