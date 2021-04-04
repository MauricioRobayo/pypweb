import Link from "next/link";
import { useState } from "react";
import { IoMdOpen } from "react-icons/io";
import styled, { css } from "styled-components";
import { flexHorizontalCenterVerticalEnd } from "styles/mixins";

const baseEditUrl =
  "https://github.com/MauricioRobayo/pypweb/edit/main/_posts/";

type WrapperProps = {
  hover: boolean;
};
const Wrapper = styled.div<WrapperProps>`
  border: 2px solid transparent;
  border-radius: 4px;
  padding: 1rem;
  position: relative;
  ${({ hover, theme }) =>
    hover &&
    css`
      background-color: ${theme.colors.inactiveBackgroundColor};
      border: 2px solid ${theme.colors.linkColor};
    `};
`;

const StyledOpenIcon = styled(IoMdOpen)`
  margin-left: 0.5rem;
`;

const StyledAnchor = styled.a`
  ${flexHorizontalCenterVerticalEnd}

  justify-content: flex-end;
`;

const StyledLinkWrapper = styled.div`
  margin-top: 1rem;
`;

const StyledPost = styled.div`
  text-align: left;
  img {
    max-width: 100%;
  }
`;

type PostProps = {
  editPath: string;
  body: string;
};

export default function Post({ editPath, body }: PostProps) {
  const [linkHover, setLinkHover] = useState(false);

  const handleMouseOver = () => {
    setLinkHover(true);
  };

  const handleMouseOut = () => {
    setLinkHover(false);
  };

  if (!body) {
    return null;
  }

  return (
    <>
      <Wrapper hover={linkHover}>
        <StyledPost dangerouslySetInnerHTML={{ __html: body }} />
        <StyledLinkWrapper>
          <Link href={`${baseEditUrl}${editPath}`} passHref>
            <StyledAnchor
              onBlur={handleMouseOut}
              onFocus={handleMouseOver}
              onMouseOut={handleMouseOut}
              onMouseOver={handleMouseOver}
            >
              Editar en GitHub <StyledOpenIcon />
            </StyledAnchor>
          </Link>
        </StyledLinkWrapper>
      </Wrapper>
    </>
  );
}
