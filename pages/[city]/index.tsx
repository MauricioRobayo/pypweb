import type { CityType, ICategoryData } from "@mauriciorobayo/pyptron";
import cities from "@mauriciorobayo/pyptron";
import { CityData } from "components/CityData";
import { Fine } from "components/Fine";
import PageLayout from "components/Layout/PageLayout";
import { Page } from "components/Page";
import { Post } from "components/Post";
import { CitiesList, citiesList } from "lib/cities";
import { cotDateParts, cotFormatLongDate } from "lib/dateUtils";
import { GetStaticPaths, GetStaticProps } from "next";
import { baseDescription, baseTitle } from "next-seo.config";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import styled from "styled-components";

const INITIAL_DATE = new Date();

const StyledCityData = styled(CityData)`
  margin: 1rem 0;
`;

type CityPageProps = {
  categories: ICategoryData[];
  cityName: string;
  citySlug: CityType;
};

export default function CityPage({ categories, cityName }: CityPageProps) {
  const { query } = useRouter();
  const pageTitle = `${baseTitle} ${cityName}`;
  const pageDescription = `${baseDescription} ${cityName}`;
  const main = <StyledCityData categories={categories} />;
  const aside = (
    <Post
      sections={[
        {
          title: `Pico y placa vigente en ${cityName}`,
          content: (
            <>
              <p>
                Las siguientes son las medidas de restricción vehicular vigentes
                para {cityName} durante el mes de{" "}
                {cotFormatLongDate().split(" ").slice(3).join(" ")}, de acuerdo
                con lo establecido por la Alcaldía de {cityName}:
              </p>
              <ul>
                {categories.map(
                  ({ name: categoryName, slug: categorySlug }) => (
                    <li key={categoryName}>
                      <Link
                        href={{
                          pathname: "/[city]/[category]",
                          query: {
                            city: query.city,
                            category: categorySlug,
                          },
                        }}
                      >
                        <a>{categoryName}</a>
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </>
          ),
        },
        {
          title: "Sanciones",
          content: <Fine />,
        },
      ]}
    ></Post>
  );

  return (
    <Page
      aside={aside}
      date={INITIAL_DATE}
      description={pageDescription}
      main={main}
      title={pageTitle}
    />
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  fallback: false,
  paths: Object.values(cities).map(({ slug }) => ({ params: { city: slug } })),
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const citySlug = params?.city as CityType;
  const { name: cityName, categories } = cities[citySlug];
  const categoriesData = Object.values(categories).map((category) =>
    category.getCategoryData(cotDateParts(INITIAL_DATE))
  );

  return {
    props: {
      categories: categoriesData,
      cities: citiesList(),
      cityName,
    },
  };
};

CityPage.getLayout = function getLayout(
  page: ReactElement,
  props: { cities: CitiesList }
) {
  return <PageLayout cities={props.cities}>{page}</PageLayout>;
};
