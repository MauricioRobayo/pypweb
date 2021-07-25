import TheMoneytizer from "components/ads/the-moneytizer";
import Vidverto from "components/ads/vidverto";
import PypDate from "components/date";
import { Footer } from "components/Footer";
import HomeLayout from "components/layout/HomeLayout";
import Select from "components/select";
import { cityOptions } from "components/select/utils";
import { InferGetStaticPropsType } from "next";
import React, { ReactNode } from "react";
import styled from "styled-components";
import { camouflageLink } from "styles/mixins";

const Header = styled.header`
  margin: auto;
  max-width: ${({ theme }) => theme.maxWidth};
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem 0 1rem;
`;

const Subtitle = styled.h2`
  font-size: 1.2rem;
  margin: 1rem 0 0;
`;

export const StyledVidverto = styled(Vidverto)`
  margin-top: 1rem;
`;

export const MegaBanner = styled(TheMoneytizer).attrs({
  formatType: "MEGABANNER",
})`
  margin: 2rem auto 0;
`;

export const MegaBannerBottom = styled(TheMoneytizer).attrs({
  formatType: "MEGABANNER_BOTTOM",
})`
  margin: 0 auto 2rem;
`;

export const RecommendedContent = styled(TheMoneytizer).attrs({
  formatType: "RECOMMENDED_CONTENT",
})`
  margin: 2rem auto;
`;

export const Page = styled.div`
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  justify-content: center;
  width: auto;
`;

export const Main = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`;

export const Aside = styled.aside`
  max-width: ${({ theme }) => theme.maxWidthWider};
  padding: 0.5rem 1rem;
  width: 100%;
  h4 {
    font-weight: bold;
    margin: 1rem 0 0.5rem;
  }
  ol {
    list-style-type: number;
  }
  li,
  p {
    padding: 0.25rem 0;
  }
`;

export const Logo = styled.h2`
  ${camouflageLink}
`;

export const getStaticProps = async () => ({
  props: {
    currentDate: Date.now(),
    selectOptions: cityOptions(),
  },
});

export default function Home({
  currentDate,
  selectOptions,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const date = new Date(currentDate);
  return (
    <>
      <Page>
        <MegaBanner />
        <div>
          <Header>
            <Title>Pico y placa hoy</Title>
            <Subtitle>
              <PypDate date={date} />
            </Subtitle>
          </Header>
        </div>
        <div>
          <Main>
            <Select
              name="ciudad"
              narrow
              options={selectOptions}
              placeholder="Ciudad"
            />
          </Main>
          <StyledVidverto />
        </div>
      </Page>
      <Footer />
    </>
  );
}

Home.getLayout = (page: ReactNode) => <HomeLayout>{page}</HomeLayout>;
