import { TheMoneytizer } from "components/Ads";
import { Aside } from "components/Aside";
import { CTA } from "components/CTA";
import { Header } from "components/Header";
import { NextSeo } from "next-seo";
import React, { ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;

const Main = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  padding: 0 1rem;
`;

const MegaBanner = styled(TheMoneytizer).attrs({
  formatType: "MEGABANNER",
})`
  margin: 2rem auto 1rem;
`;

const MegaBannerBottom = styled(TheMoneytizer).attrs({
  formatType: "MEGABANNER_BOTTOM",
})`
  margin: 0 auto 2rem;
`;

const RecommendedContent = styled(TheMoneytizer).attrs({
  formatType: "RECOMMENDED_CONTENT",
})`
  margin: 2rem auto;
`;

type PageProps = {
  errMessage: string;
  title: string;
  description: string;
  main: ReactNode;
  aside: ReactNode;
  date: Date;
};
export default function Page({
  errMessage,
  title,
  description,
  main,
  aside,
  date,
}: PageProps) {
  return (
    <>
      <NextSeo description={description} title={title} />
      <Wrapper>
        {errMessage ? <p>{errMessage}</p> : null}
        <MegaBanner />
        <Header date={date} title={title} />
        <Main>{main}</Main>
        <MegaBannerBottom />
        <CTA />
      </Wrapper>
      <Aside>
        {aside}
        <RecommendedContent />
      </Aside>
    </>
  );
}
