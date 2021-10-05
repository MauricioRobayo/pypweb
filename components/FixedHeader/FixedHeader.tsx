import { Breadcrumbs } from "components/Breadcrumbs";
import { Clock } from "components/Clock";
import { CitiesList } from "lib/cities";
import React, { useEffect } from "react";
import { IoShareSocial } from "react-icons/io5";
import styled, { useTheme } from "styled-components";

const StyledBreadcrumbs = styled(Breadcrumbs)<{ hasShare: boolean }>`
  justify-content: ${({ hasShare }) => (hasShare ? "flex-start" : "center")};
`;

const StyledClock = styled(Clock)<{ hasShare: boolean }>`
  font-size: 0.75rem;
  justify-self: ${({ hasShare }) => (hasShare ? "start" : "center")};
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
  align-items: center;
  display: grid;
  grid-template-columns: 1fr auto;
  justify-content: space-between;
  margin: auto;
  max-width: ${({ theme }) => theme.maxWidth};
`;

const InfoColumn = styled.div`
  display: grid;
  grid-row-gap: 0.25em;
  grid-template-columns: 1fr;
`;

const ShareButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  line-height: 0;
  margin: 0;
  padding: 0;
`;

interface Props {
  cities: CitiesList;
}
function FixedHeader({ cities }: Props) {
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
        <InfoColumn>
          <StyledBreadcrumbs cities={cities} hasShare={hasShare} />
          <StyledClock hasShare={hasShare} />
        </InfoColumn>
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
