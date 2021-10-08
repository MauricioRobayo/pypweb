import { ReactNode } from "react";
import styled from "styled-components";

const StyledAside = styled.aside`
  max-width: ${({ theme }) => theme.width.wide};
  padding: 0.5rem 1rem;
  width: 100%;
  h4 {
    font-weight: bold;
    margin: 1rem 0 0.5rem;
  }
  p {
    padding: 0.25rem 0;
  }
`;

type AsideProps = {
  children?: ReactNode;
};
export default function Aside({ children }: AsideProps) {
  return <StyledAside>{children}</StyledAside>;
}
