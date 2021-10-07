import { ReactNode } from "react";
import styled, { css } from "styled-components";
import { boxShadow, camouflageLink } from "styles/mixins";

const StyledCard = styled.div`
  ${boxShadow}

  border-radius: 5px;
  overflow: hidden;
`;

const shared = css`
  & > div {
    padding: 1rem;
  }
`;
const Header = styled.div`
  ${shared}
  ${camouflageLink}

  background: ${({ theme }) => theme.colors.main};
  color: ${({ theme }) => theme.colors.white};
`;

const Body = styled.div`
  ${shared}

  background-color: ${({ theme }) => theme.colors.white};
`;

const Footer = styled.div`
  ${shared}

  background-color: ${({ theme }) => theme.colors.mainLight};
`;

interface Props {
  className?: string;
  header: ReactNode;
  body: ReactNode;
  footer?: ReactNode;
}
export default function Card({ header, body, footer, className }: Props) {
  return (
    <StyledCard className={className}>
      <Header>
        <div>{header}</div>
      </Header>
      <Body>
        <div>{body}</div>
      </Body>
      {footer ? (
        <Footer>
          <div>{footer}</div>
        </Footer>
      ) : null}
    </StyledCard>
  );
}
