import cities from "@mauriciorobayo/pyptron";
import { TheMoneytizer, Vidverto } from "components/Ads";
import { Header } from "components/Header";
import { HomeLayout } from "components/Layout";
import { Select } from "components/Select";
import { InferGetStaticPropsType } from "next";
import React, { ReactNode } from "react";
import styled from "styled-components";

const StyledVidverto = styled(Vidverto)`
  margin: 1rem auto 1.5rem;
`;

const MegaBanner = styled(TheMoneytizer).attrs({
  formatType: "MEGABANNER",
})`
  margin: 2rem auto 0;
`;

const Page = styled.div`
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  justify-content: center;
  min-width: 100%;
  padding: 0 1rem;
`;

const Main = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`;

export const getStaticProps = async () => ({
  props: {
    currentDate: Date.now(),
    cities: Object.values(cities).map(({ name: cityName, slug: citySlug }) => ({
      label: cityName,
      value: citySlug,
    })),
  },
});

export default function Home({
  currentDate,
  cities,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const date = new Date(currentDate);
  const title = "Pico y placa hoy";
  return (
    <Page>
      <MegaBanner />
      <Header date={date} title={title} />
      <Main>
        <Select name="ciudad" narrow options={cities} placeholder="Ciudad" />
      </Main>
      <StyledVidverto />
    </Page>
  );
}

Home.getLayout = function Layout(page: ReactNode) {
  return <HomeLayout>{page}</HomeLayout>;
};
