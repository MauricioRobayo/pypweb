import { ReactNode } from "react";
import styled, { css } from "styled-components";
import {
  boxShadow,
  camouflageLink,
  responsivePaddingAround,
} from "styles/mixins";

const StyledCard = styled.div`
  ${boxShadow}

  border-radius: ${({ theme }) => theme.border.radius};
  overflow: hidden;
`;

const shared = css`
  & > div {
    ${responsivePaddingAround}
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
  font-size: ${({ theme }) => theme.font.size.small};
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
      {header ? (
        <Header className="card-header">
          <div>{header}</div>
        </Header>
      ) : null}
      {body ? (
        <Body>
          <div>{body}</div>
        </Body>
      ) : null}
      {footer ? (
        <Footer className="card-footer">
          <div>{footer}</div>
        </Footer>
      ) : null}
    </StyledCard>
  );
}
