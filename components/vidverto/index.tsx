/* eslint-disable react/no-danger */

import useScript from "hooks/useScript";
import { useRef } from "react";

const id = "981cceae08e42e6301d86ae909b97156";
const scriptUrl = "https://ad.vidverto.io/vidverto/js/aries/v1/invocation.js";

const Vidverto = () => {
  const divRef = useRef(null);
  useScript(divRef, scriptUrl, true);

  return (
    <>
      <div ref={divRef} id={`_vidverto-${id}`} />
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
    </>
  );
};

export default Vidverto;
