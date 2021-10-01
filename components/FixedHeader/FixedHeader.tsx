import { Clock } from "components/Clock";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { IoShareSocial } from "react-icons/io5";
import styled from "styled-components";

const StyledClock = styled(Clock)`
  font-size: 0.85rem;
  font-weight: bold;
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

const Wrapper = styled.div<{ hasShare: boolean }>`
  align-items: center;
  display: flex;
  justify-content: ${({ hasShare }) => (hasShare ? "space-between" : "center")};
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
  const { asPath } = useRouter();
  const [hasShare, setHasShare] = React.useState(false);

  useEffect(() => {
    if (navigator.share !== undefined) {
      setHasShare(true);
    }
  }, []);

  const share = () => {
    navigator.share({
      url: asPath,
    });
  };
  return (
    <StyledFixedHeader>
      <Wrapper hasShare={hasShare}>
        <StyledClock />
        {hasShare && (
          <ShareButton type="button" title="Compartir" onClick={share}>
            <IoShareSocial />
          </ShareButton>
        )}
      </Wrapper>
    </StyledFixedHeader>
  );
}

export default FixedHeader;
