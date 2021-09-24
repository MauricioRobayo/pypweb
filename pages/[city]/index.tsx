import type { CityType, ICategoryData } from "@mauriciorobayo/pyptron";
import cities from "@mauriciorobayo/pyptron";
import { CityData } from "components/CityData";
import { Fine } from "components/Fine";
import PageLayout from "components/Layout/PageLayout";
import { Page } from "components/Page";
import { CitiesList, citiesList } from "lib/cities";
import { dateParts, formatLongDate } from "lib/dateUtils";
import { GetStaticPaths, GetStaticProps } from "next";
import { baseTitle, description } from "next-seo.config";
import Link from "next/link";
import React, { ReactElement } from "react";
import styled from "styled-components";

const StyledCityData = styled(CityData)`
  margin: 1rem 0 2rem;
`;

type CityPageProps = {
  categories: ICategoryData[];
  cityName: string;
  citySlug: CityType;
  currentDate: number;
};

export default function CityPage({
  categories,
  cityName,
  citySlug,
  currentDate,
}: CityPageProps) {
  const date = new Date(currentDate);
  const pageTitle = `${baseTitle} ${cityName}`;
  const pageDescription = `${description} ${cityName}`;
  const main = (
    <StyledCityData categories={categories} citySlug={citySlug} date={date} />
  );
  const aside = (
    <section>
      <h4>Pico y placa vigente en {cityName}</h4>
      <p>
        Las siguientes son las medidas de restricción vehicular vigentes para{" "}
        {cityName} durante el mes de{" "}
        {formatLongDate().split(" ").slice(3).join(" ")}, de acuerdo con lo
        establecido por la Alcaldía de {cityName}:
      </p>
      <ul>
        {categories.map(({ name: categoryName, slug: categorySlug }) => (
          <li key={categoryName}>
            <Link href={`/${citySlug}/${categorySlug}`}>
              <a>{categoryName}</a>
            </Link>
          </li>
        ))}
      </ul>
      <Fine />
    </section>
  );

  return (
    <Page
      aside={aside}
      date={date}
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
  const date = new Date();
  const citySlug = params?.city as CityType;
  const { name: cityName, categories } = cities[citySlug];
  const categoriesData = Object.values(categories).map((category) =>
    category.getCategoryData(dateParts(date))
  );

  return {
    props: {
      categories: categoriesData,
      cities: citiesList(),
      cityName,
      citySlug,
      currentDate: date.getTime(),
    },
  };
};

CityPage.getLayout = function getLayout(
  page: ReactElement,
  props: { cities: CitiesList }
) {
  return <PageLayout cities={props.cities}>{page}</PageLayout>;
};
