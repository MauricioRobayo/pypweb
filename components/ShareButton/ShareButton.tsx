import { Icon } from "components/Icon";
import useShare from "hooks/useShare";
import styled, { useTheme } from "styled-components";

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
  const theme = useTheme();
  const hasShare = useShare();

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
