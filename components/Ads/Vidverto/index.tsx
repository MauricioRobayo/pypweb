/* eslint-disable react/no-danger */

import { Placeholder } from "components/Ads";
import useDeviceDetect from "hooks/useDeviceDetect";
import useScript from "hooks/useScript";
import { useRef } from "react";
import styled from "styled-components";
import { responsiveWidth } from "styles/mixins";

const isProduction = process.env.NODE_ENV === "production";
const scriptUrl = "https://ad.vidverto.io/vidverto/js/aries/v1/invocation.js";
const mobileId = "abf94b632c49d15ca7ced7d51dcb9cfc";
const desktopId = "981cceae08e42e6301d86ae909b97156";

const mobileScript = `(() => {
  window.aries = window.aries || {};
  window.aries.v1 = window.aries.v1 || {commands: []};

  const aries = window.aries.v1;

  aries.commands.push(() => {
    const zoneId = '6668';
    const anchor = document.getElementById('_vidverto-${mobileId}');

    anchor.removeAttribute('id');

    aries.mount(zoneId, anchor, {
      width: 400,
      height: 300,
    });
  });
})();`;

const desktopScript = `
(() => {
  window.aries = window.aries || {};
  window.aries.v1 = window.aries.v1 || {commands: []};

  const aries = window.aries.v1;

  aries.commands.push(() => {
    const zoneId = '6552';
    const anchor = document.getElementById('_vidverto-${desktopId}');

    anchor.removeAttribute('id');

    aries.mount(zoneId, anchor, {
      width: 720,
      height: 405,
    });
  });
})();
`;

const Wrapper = styled.div`
  ${responsiveWidth}
`;
const StyledPlaceholder = styled(Placeholder)`
  height: 320px;
  ${responsiveWidth}
`;

type VidvertoProps = {
  className?: string;
};
export function Vidverto({ className = "" }: VidvertoProps) {
  const { isMobile } = useDeviceDetect();
  const script =
    // eslint-disable-next-line no-nested-ternary
    isMobile === null ? "" : isMobile ? mobileScript : desktopScript;
  const id = isMobile ? mobileId : desktopId;
  const divRef = useRef<HTMLDivElement>(null);

  useScript({
    async: true,
    id: "vidverto-async-script-1",
    ref: divRef,
    src: scriptUrl,
  });

  useScript({
    id: "vidverto-async-script-2",
    innerHTML: script,
    ref: divRef,
  });

  if (isProduction) {
    return (
      <Wrapper ref={divRef} className={className}>
        <div id={`_vidverto-${id}`} />
      </Wrapper>
    );
  }

  return <StyledPlaceholder className={className} name="Vidverto" />;
}
