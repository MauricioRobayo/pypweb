import { Footer } from "components/Footer";
import { ReactNode } from "react";
import styled from "styled-components";

export const StyledLayout = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

type LayoutProps = {
  children: ReactNode;
};
export default function Layout({ children }: LayoutProps) {
  return (
    <StyledLayout>
      {children}
      <Footer />
    </StyledLayout>
  );
}
