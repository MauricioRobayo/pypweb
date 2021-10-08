import { shouldShowAds } from "lib/utils";
import Script from "next/script";

export default function Taboola() {
  if (!shouldShowAds) {
    return null;
  }

  return (
    <Script id="taboola" strategy="beforeInteractive">
      {`window._taboola = window._taboola || [];
      _taboola.push({article:'auto'});
      !function (e, f, u, i) {
        if (!document.getElementById(i)){
          e.async = 1;
          e.src = u;
          e.id = i;
          f.parentNode.insertBefore(e, f);
        }
      }(document.createElement('script'),
      document.getElementsByTagName('script')[0],
      '//cdn.taboola.com/libtrc/picoyplaca-network/loader.js',
      'tb_loader_script');
      if(window.performance && typeof window.performance.mark == 'function')
        {window.performance.mark('tbl_ic');}`}
    </Script>
  );
}
