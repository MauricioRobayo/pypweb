import useShare from "hooks/useShare";
import { IoShareSocial } from "react-icons/io5";
import styled, { useTheme } from "styled-components";

const StyledShareButton = styled.button`
  background-color: transparent;
  border: none;
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
        <IoShareSocial color={theme.colors.secondaryDark} />
      </StyledShareButton>
    );
  }

  return null;
}
