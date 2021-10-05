import { FixedHeader } from "components/FixedHeader";
import { Footer } from "components/Footer";
import { Navbar } from "components/Navbar";
import type { CitiesList } from "lib/cities";
import { useRouter } from "next/router";
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
  const { asPath } = useRouter();

  const pathSegments = asPath.split("/");

  return (
    <StyledLayout>
      <Navbar cities={cities} />
      <FixedHeader />
      {pathSegments.length > 1 ? asPath : null}
      {children}
      <Footer />
    </StyledLayout>
  );
}
