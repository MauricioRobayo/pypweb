import { Clock } from "components/Clock";
import React, { useEffect } from "react";
import { IoShareSocial } from "react-icons/io5";
import styled, { useTheme } from "styled-components";

const StyledClock = styled(Clock)<{ hasShare: boolean }>`
  font-size: ${({ theme }) => theme.font.size.small};
  font-weight: bold;
  margin-left: ${({ hasShare }) => (hasShare ? "1rem" : 0)};
`;

const StyledFixedHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.warningLighter};
  border-bottom: 1px solid ${({ theme }) => theme.colors.warning};
  margin: 0;
  padding: 0.25em 1rem;
  position: sticky;
  text-align: center;
  top: -1px;
  width: 100%;
  z-index: 1000;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  margin: auto;
  max-width: ${({ theme }) => theme.maxWidth};
`;

const ShareButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  line-height: 0;
  margin: 0;
  padding: 0;
`;

function FixedHeader() {
  const theme = useTheme();
  const [hasShare, setHasShare] = React.useState(false);

  useEffect(() => {
    if ("share" in navigator) {
      setHasShare(true);
    }
  }, []);

  const share = () => {
    navigator.share({
      url: window.location.href,
    });
  };
  return (
    <StyledFixedHeader>
      <Wrapper>
        <StyledClock hasShare={hasShare} />
        {hasShare && (
          <ShareButton type="button" title="Compartir" onClick={share}>
            <IoShareSocial color={theme.colors.secondaryDark} />
          </ShareButton>
        )}
      </Wrapper>
    </StyledFixedHeader>
  );
}

export default FixedHeader;
