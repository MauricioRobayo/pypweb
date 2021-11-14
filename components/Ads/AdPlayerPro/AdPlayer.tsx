import { Placeholder } from "components/Ads/Placeholder";
import { shouldShowAds } from "lib/utils";
import Script from "next/script";
import styled from "styled-components";
import { responsiveWidth } from "styles/mixins";

const Wrapper = styled.div`
  ${responsiveWidth()}
`;

const StyledPlaceholder = styled(Placeholder)`
  aspect-ratio: 16/9;
  border-radius: 0.5rem;
  overflow: hidden;
`;

interface Props {
  className?: string;
}
function AdPlayer({ className = "" }: Props) {
  return (
    <Wrapper className={className}>
      {shouldShowAds ? (
        <Script
          data-playerPro="current"
          id="ad-player-pro"
          strategy="lazyOnload"
        >
          {`(function(){var s=document.querySelector('script[data-playerPro="current"]');s.removeAttribute("data-playerPro");(playerPro=window.playerPro||[]).push({id:"c4NYNo6LcvPZ",after:s});})();`}
        </Script>
      ) : (
        <StyledPlaceholder name="Ad Player Pro" />
      )}
    </Wrapper>
  );
}

export default AdPlayer;
