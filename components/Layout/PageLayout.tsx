import { Clock } from "components/Clock";
import { Footer } from "components/Footer";
import { Navbar } from "components/Navbar";
import type { CitiesList } from "lib/cities";
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.warning};
  font-size: 0.85rem;
  font-weight: bold;
  margin: 0;
  padding: 0.3em 1rem 0.25em;
  position: sticky;
  text-align: center;
  top: -1px;
  width: 100%;
  z-index: 1000;
`;

type LayoutProps = {
  children: ReactNode;
  cities: CitiesList;
};
export default function Layout({ children, cities }: LayoutProps) {
  return (
    <StyledLayout>
      <Navbar cities={cities} />
      <FixedHeader>
        <Clock />
      </FixedHeader>
      {children}
      <Footer />
    </StyledLayout>
  );
}
