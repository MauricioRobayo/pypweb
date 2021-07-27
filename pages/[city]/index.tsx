import cities, { ICategoryData } from "@mauriciorobayo/pyptron";
import { CityData } from "components/CityData";
import { Page } from "components/Page";
import { getLocalLongDateString } from "components/PypDate/utils";
import { AMERICA_BOGOTA, CityType, dateParts, isCity } from "lib/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import { baseTitle, description } from "next-seo.config";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const StyledCityData = styled(CityData)`
  margin: 1rem 0 2rem;
`;

type CityProps = {
  categories: ICategoryData[];
  cityName: string;
  citySlug: CityType;
  currentDate: number;
};

export default function City({
  categories,
  cityName,
  citySlug,
  currentDate,
}: CityProps) {
  const date = new Date(currentDate);
  const pageTitle = `${baseTitle} ${cityName}`;
  const pageDescription = `${description} ${cityName}`;
  const main = (
    <StyledCityData categories={categories} citySlug={citySlug} date={date} />
  );
  const aside = (
    <section>
      <h4>
        Pico y placa vigente en
        {cityName}
      </h4>
      <p>
        Las siguientes son las medidas de restricción vehicular vigentes para{" "}
        {cityName} durante el mes de{" "}
        {getLocalLongDateString().split(" ").slice(3).join(" ")}, de acuerdo con
        lo establecido por la Alcaldía de
        {cityName}:
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
  const citySlug = params?.city;
  if (!isCity(citySlug)) {
    throw new Error("That city don't exists");
  }

  const { name: cityName, categories } = cities[citySlug];
  const date = new Date();
  const { year, month, day } = dateParts(date, AMERICA_BOGOTA);

  const categoriesData = Object.values(categories).map((category) =>
    category.getCategoryData({
      day,
      month,
      year,
    })
  );

  return {
    props: {
      categories: categoriesData,
      cityName,
      citySlug,
      currentDate: date.getTime(),
    },
  };
};
