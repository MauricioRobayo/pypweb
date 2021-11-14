import { Placeholder } from "components/Ads";
import { shouldShowAds } from "lib/utils";
import Script from "next/script";
import styled from "styled-components";
import { responsiveWidth } from "styles/mixins";

const Wrapper = styled.div`
  ${responsiveWidth()}

  margin: -1rem auto 1rem;
`;

const StyledPlaceholder = styled(Placeholder)`
  aspect-ratio: 16/9;
  border-radius: 0.5rem;
  overflow: hidden;
`;

function AdPlayer() {
  return (
    <Wrapper>
      {shouldShowAds ? (
        <Script data-playerPro="current" id="ad-player-pro">
          {`(function(){var s=document.querySelector('script[data-playerPro="current"]');s.removeAttribute("data-playerPro");(playerPro=window.playerPro||[]).push({id:"c4NYNo6LcvPZ",after:s});})();`}
        </Script>
      ) : (
        <StyledPlaceholder name="Ad Player Pro" />
      )}
    </Wrapper>
  );
}

export default AdPlayer;
