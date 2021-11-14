import { shouldShowAds } from "lib/utils";
import Script from "next/script";

function AdPlayerPro() {
  if (!shouldShowAds) {
    return null;
  }

  return (
    <Script
      src="https://serving.stat-rock.com/player.js"
      strategy="lazyOnload"
    />
  );
}

export default AdPlayerPro;
