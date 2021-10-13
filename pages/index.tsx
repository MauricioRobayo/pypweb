import { Footer } from "components/Footer";
import { Header } from "components/Header";
import { Select } from "components/Select";
import type { CitiesList } from "lib/cities";
import { citiesList } from "lib/cities";
import { GetStaticPropsResult, InferGetStaticPropsType } from "next";
import React from "react";
import styled from "styled-components";

const StyledSelect = styled(Select)`
  margin: 0.5rem 0;
  width: min(100%, ${({ theme }) => theme.width.narrow});
`;

const Wrapper = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  justify-content: center;
  min-height: 100vh;
`;

const Main = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`;

const HeaderWrapper = styled.div`
  margin-inline: auto;
`;

export default function Home({
  cities,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const date = new Date();
  const pageTitle = "Pico y placa hoy";
  return (
    <Wrapper>
      <HeaderWrapper>
        <Header date={date} title={pageTitle} showTodaysPrefix={false} />
        <Main>
          <StyledSelect
            name="ciudad"
            options={cities.map(({ name, slug }) => ({
              name,
              path: `/${slug}`,
            }))}
            placeholder="Ciudad"
          />
        </Main>
      </HeaderWrapper>
      <Footer />
    </Wrapper>
  );
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<{ cities: CitiesList }>
> {
  return {
    props: {
      cities: citiesList(),
    },
  };
}
