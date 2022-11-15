import { Placeholder } from "components/Ads/Placeholder";
import useDeviceDetect from "hooks/useDeviceDetect";
import { shouldShowAds } from "lib/utils";
import Script from "next/script";
import { memo } from "react";
import styled, { css } from "styled-components";

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

const containerStyle = css`
  aspect-ratio: 16/9;
  border-radius: 0.5rem;
  overflow: hidden;
`;
const Wrapper = styled.div<{ isMobile: boolean | null }>`
  ${containerStyle}

  margin: auto;
  width: min(
    100%,
    ${({ theme, isMobile }) => (isMobile ? "400px" : theme.width.normal)}
  );
`;
const StyledPlaceholder = styled(Placeholder)`
  ${containerStyle}

  width: 100%;
`;

type VidvertoProps = {
  className?: string;
};
function Vidverto({ className = "" }: VidvertoProps) {
  const { isMobile } = useDeviceDetect();

  if (isMobile === null) {
    return null;
  }

  return (
    <Wrapper className={className} isMobile={isMobile}>
      {shouldShowAds || Math.random() > 0 ? (
        <>
          <Script
            src="https://ad.vidverto.io/vidverto/js/aries/v1/invocation.js"
            id="vidverto-invocation"
            strategy="lazyOnload"
          />
          <div id={`_vidverto-${isMobile ? mobileId : desktopId}`} />
          <Script id="vidverto-inline" strategy="lazyOnload">
            {isMobile ? mobileScript : desktopScript}
          </Script>
        </>
      ) : (
        <StyledPlaceholder name="Vidverto" />
      )}
    </Wrapper>
  );
}

export default memo(Vidverto);
