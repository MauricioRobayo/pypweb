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

export default function Home({
  cities,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const date = new Date();
  const pageTitle = "Pico y placa hoy";
  return (
    <StyledLayout>
      <Page>
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
      </Page>
    </StyledLayout>
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
