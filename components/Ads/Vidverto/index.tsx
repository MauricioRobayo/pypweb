import { Placeholder } from "components/Ads";
import useDeviceDetect from "hooks/useDeviceDetect";
import { shouldShowAds } from "lib/utils";
import Script from "next/script";
import React, { memo, useEffect } from "react";
import styled from "styled-components";

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

const Wrapper = styled.div<{ isMobile: boolean }>`
  aspect-ratio: 16/9;
  border-radius: 0.5rem;
  overflow: hidden;
  width: min(100%, ${({ isMobile }) => (isMobile ? "400px" : "720px")});
`;
const StyledPlaceholder = styled(Placeholder)`
  aspect-ratio: inherit;
  border-radius: inherit;
`;

type VidvertoProps = {
  className?: string;
};
function Vidverto({ className = "" }: VidvertoProps) {
  const { isMobile } = useDeviceDetect();

  useEffect(() => {
    if (shouldShowAds && isMobile !== null) {
      eval(isMobile ? mobileScript : desktopScript);
    }
  }, [isMobile]);

  if (isMobile === null) {
    return null;
  }

  return (
    <Wrapper className={className} isMobile={isMobile}>
      {shouldShowAds ? (
        <>
          <Script
            src="https://ad.vidverto.io/vidverto/js/aries/v1/invocation.js"
            id="vidverto-invocation"
            strategy="lazyOnload"
          />
          <div id={`_vidverto-${isMobile ? mobileId : desktopId}`} />
        </>
      ) : (
        <StyledPlaceholder name="Vidverto" />
      )}
    </Wrapper>
  );
}

export default memo(Vidverto);
