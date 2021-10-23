import { BelowArticleThumbnails } from "components/Ads/Taboola";
import { Aside } from "components/Aside";
import { CTA } from "components/CTA";
import { Header } from "components/Header";
import useLandingPage from "hooks/useLandingPage";
import { NextSeo } from "next-seo";
import React, { ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;

const StyledHeader = styled(Header)`
  margin-top: 1rem;
`;

const Main = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  padding: 0 1rem;
`;

interface Props {
  aside: ReactNode;
  date: Date;
  main: ReactNode;
  seoDescription: string;
  seoTitle?: string;
  title: string;
}
export default function Page({
  aside,
  date,
  main,
  seoDescription,
  seoTitle,
  title,
}: Props) {
  const { isLandingPage } = useLandingPage();
  return (
    <>
      <NextSeo description={seoDescription} title={seoTitle || title} />
      <Wrapper>
        <StyledHeader
          date={date}
          title={title}
          prefix={isLandingPage ? "Hoy " : ""}
        />
        <Main>{main}</Main>
        <CTA />
      </Wrapper>
      <Aside>
        {aside}
        <BelowArticleThumbnails />
      </Aside>
    </>
  );
}
