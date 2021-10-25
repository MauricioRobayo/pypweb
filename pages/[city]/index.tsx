import type { City, CityType, ICategoryData } from "@mauriciorobayo/pyptron";
import cities from "@mauriciorobayo/pyptron";
import { CityData } from "components/CityData";
import { Fine } from "components/Fine";
import PageLayout from "components/Layout/PageLayout";
import { Page } from "components/Page";
import { Post } from "components/Post";
import { TransportationDepartment } from "components/TransportationDepartment";
import { CitiesList, citiesList } from "lib/cities";
import { cotDateParts, cotFormatLongDate } from "lib/dateUtils";
import { arrayToList } from "lib/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { baseTitle } from "next-seo.config";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import styled from "styled-components";

const INITIAL_DATE = new Date();

const StyledCityData = styled(CityData)`
  margin: 1rem 0 2rem;
`;

function getDescription(categories: ICategoryData[]): string {
  const activeCategories = categories.filter(
    (category) => category.data[0].numbers.length !== 0
  );

  if (activeCategories.length === 0) {
    return "no aplica restricción vehicular por pico y placa para ningún tipo de vehículo";
  }

  return activeCategories
    .map((category) => {
      return `${category.name.toLocaleLowerCase()} ${arrayToList(
        category.data[0].numbers
      )}`;
    })
    .join(", ");
}

interface CityPageProps {
  categories: ICategoryData[];
  cityName: string;
  citySlug: CityType;
  transportationDepartment: City["transportationDepartment"];
}

export default function CityPage({
  categories,
  cityName,
  transportationDepartment,
}: CityPageProps) {
  const { query } = useRouter();
  const longDate = cotFormatLongDate(INITIAL_DATE);
  const title = `${baseTitle} en ${cityName}`;
  const description = `Hoy ${longDate}, ${getDescription(categories)}`;
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
                {longDate.split(" ").slice(3).join(" ")}, de acuerdo con lo
                establecido por la Alcaldía de {cityName}:
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
          title: "Secretaría de Tránsito",
          content: (
            <TransportationDepartment
              city={cityName}
              transportationDepartment={transportationDepartment}
            />
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
    <>
      <NextSeo description={description} title={title} />
      <Page aside={aside} date={INITIAL_DATE} main={main} title={title} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  fallback: false,
  paths: Object.values(cities).map(({ slug }) => ({ params: { city: slug } })),
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const citySlug = params?.city as CityType;
  const {
    name: cityName,
    categories,
    transportationDepartment,
  } = cities[citySlug];
  const categoriesData = Object.values(categories).map((category) =>
    category.getCategoryData(cotDateParts(INITIAL_DATE))
  );

  return {
    props: {
      categories: categoriesData,
      cities: citiesList(),
      cityName,
      transportationDepartment,
    },
  };
};

CityPage.getLayout = function getLayout(
  page: ReactElement,
  props: { cities: CitiesList }
) {
  return <PageLayout cities={props.cities}>{page}</PageLayout>;
};
