/* eslint-disable react/no-danger */

import AdPlaceholder from "components/ads/placeholder";
import useScript from "hooks/useScript";
import { useRef } from "react";

const isProduction = process.env.NODE_ENV === "production";
const id = "981cceae08e42e6301d86ae909b97156";
const scriptUrl = "https://ad.vidverto.io/vidverto/js/aries/v1/invocation.js";

type VidvertoProps = {
  className?: string;
};
const Vidverto = ({ className = "" }: VidvertoProps) => {
  const divRef = useRef(null);
  useScript(divRef, scriptUrl, true);

  if (isProduction) {
    return (
      // we need this initial wrapper as vidverto adds a sibling to the
      // inner div. To add spacing around it we wrap it in another div.
      <div className={className}>
        <div ref={divRef} id={`_vidverto-${id}`}>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (() => {
                window.aries = window.aries || {};
                window.aries.v1 = window.aries.v1 || {commands: []};

                const aries = window.aries.v1;

                aries.commands.push(() => {
                  const zoneId = '6552';
                  const anchor = document.getElementById('_vidverto-${id}');

                  anchor.removeAttribute('id');

                  aries.mount(zoneId, anchor, {
                    width: 720,
                    height: 405,
                  });
                });
              })();
            `,
            }}
          />
        </div>
      </div>
    );
  }

  return <AdPlaceholder className={className} height="320px" name="Vidverto" />;
};

export default Vidverto;
