import { Clock } from "components/Clock";
import { Footer } from "components/Footer";
import { Navbar } from "components/Navbar";
import { ReactNode } from "react";
import styled from "styled-components";

export const StyledLayout = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const FixedHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.warningLighter};
  font-size: 0.85rem;
  margin: 0;
  padding: 0.25em;
  position: sticky;
  text-align: center;
  top: -1px;
  width: 100%;
  z-index: 1000;
`;

type LayoutProps = {
  children: ReactNode;
};
export default function Layout({ children }: LayoutProps) {
  return (
    <StyledLayout>
      <Navbar />
      <FixedHeader>
        <Clock />
      </FixedHeader>
      {children}
      <Footer />
    </StyledLayout>
  );
}
