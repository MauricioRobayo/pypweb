import { BelowArticleThumbnails } from "components/Ads";
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

type PageProps = {
  title: string;
  description: string;
  main: ReactNode;
  aside: ReactNode;
  date: Date;
};
export default function Page({
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
        <StyledHeader date={date} title={title} />
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
