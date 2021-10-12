import { FixedHeader } from "components/FixedHeader";
import { Navbar } from "components/Navbar";
import type { CitiesList } from "lib/cities";
import React, { ReactNode } from "react";
import styled from "styled-components";

export const StyledLayout = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

type LayoutProps = {
  children: ReactNode;
  cities: CitiesList;
};
export default function Layout({ children, cities }: LayoutProps) {
  return (
    <>
      <StyledLayout>
        <Navbar cities={cities} />
        <FixedHeader cities={cities} />
        {children}
      </StyledLayout>
    </>
  );
}
