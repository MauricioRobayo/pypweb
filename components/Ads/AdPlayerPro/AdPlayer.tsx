import { Placeholder } from "components/Ads/Placeholder";
import { shouldShowAds } from "lib/utils";
import { useEffect } from "react";
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
  useEffect(() => {
    if (!shouldShowAds) {
      return;
    }

    const scriptElement = document.querySelector<HTMLScriptElement>(
      'script[data-player-pro="current"]'
    );

    if (scriptElement) {
      scriptElement.removeAttribute("data-player-pro");
      // @ts-ignore
      const pp = window.playerPro || [];
      pp.push({ id: "c4NYNo6LcvPZ", after: scriptElement });
    }
  }, []);

  return (
    <Wrapper className={className}>
      {shouldShowAds ? (
        <script data-player-pro="current" />
      ) : (
        <StyledPlaceholder name="Ad Player Pro" />
      )}
    </Wrapper>
  );
}

export default AdPlayer;
