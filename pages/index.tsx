import { Footer } from "components/CityData/CategoryCard.styles";
import { Header } from "components/Header";
import { Select } from "components/Select";
import { citiesList } from "lib/utils";
import { InferGetStaticPropsType } from "next";
import React from "react";
import styled from "styled-components";

const StyledLayout = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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
    cities: citiesList(),
  },
});

export default function Home({
  currentDate,
  cities,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const date = new Date(currentDate);
  const title = "Pico y placa hoy";
  return (
    <StyledLayout>
      <Page>
        <Header date={date} title={title} />
        <Main>
          <Select name="ciudad" narrow options={cities} placeholder="Ciudad" />
        </Main>
      </Page>
      <Footer />
    </StyledLayout>
  );
}
