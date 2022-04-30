import { Icon } from "components/Icon";
import useHasShare from "hooks/useHasShare";
import styled from "styled-components";

const StyledShareButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.secondaryDark};
  cursor: pointer;
  line-height: 0;
  margin: 0;
  padding: 0;
`;

export default function ShareButton() {
  const hasShare = useHasShare();

  const share = () => {
    navigator.share({
      url: window.location.href,
    });
  };

  if (hasShare) {
    return (
      <StyledShareButton type="button" title="Compartir" onClick={share}>
        <Icon name="share" />
      </StyledShareButton>
    );
  }

  return null;
}
