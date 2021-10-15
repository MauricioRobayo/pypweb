import { TaboolaFlush } from "components/Ads";
import { FixedHeader } from "components/FixedHeader";
import { Footer } from "components/Footer";
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

interface Props {
  children: ReactNode;
  cities: CitiesList;
  showFixedHeader?: boolean;
}
export default function Layout({
  children,
  cities,
  showFixedHeader = true,
}: Props) {
  return (
    <>
      <StyledLayout>
        <Navbar cities={cities} />
        {showFixedHeader ? <FixedHeader cities={cities} /> : null}
        {children}
        <Footer />
      </StyledLayout>
      <TaboolaFlush />
    </>
  );
}
