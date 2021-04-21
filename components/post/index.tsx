import Link from "next/link";
import { IoMdOpen } from "react-icons/io";
import styled from "styled-components";
import {
  flexHorizontalCenterVerticalEnd,
  inlineIconRight,
} from "styles/mixins";

const baseEditUrl =
  "https://github.com/MauricioRobayo/pypweb/edit/main/_posts/";

const Wrapper = styled.div`
  border-radius: 4px;
  padding: 1rem;
  position: relative;
`;

const OpenIcon = inlineIconRight(IoMdOpen);

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
  if (!body) {
    return null;
  }

  return (
    <>
      <Wrapper>
        <StyledPost dangerouslySetInnerHTML={{ __html: body }} />
        <StyledLinkWrapper>
          <Link href={`${baseEditUrl}${editPath}`} passHref>
            <StyledAnchor>
              Editar en GitHub <OpenIcon />
            </StyledAnchor>
          </Link>
        </StyledLinkWrapper>
      </Wrapper>
    </>
  );
}
