import cities, { ICategoryData } from "@mauriciorobayo/pyptron";
import Vidverto from "components/ads/vidverto";
import CategoriesList from "components/categories-list";
import { getLocalLongDateString } from "components/date/utils";
import { Layout } from "components/Layout";
import { cityOptions, CityOptions } from "components/select/utils";
import { AMERICA_BOGOTA, CityType, dateParts, isCity } from "lib/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import styled from "styled-components";

const StyledVidverto = styled(Vidverto)`
  margin: 1rem 0 0;
`;

const StyledCategoriesList = styled(CategoriesList)`
  margin: 1rem 0 2rem;
`;

type CityProps = {
  categories: ICategoryData[];
  cityName: string;
  citySlug: CityType;
  selectOptions: CityOptions;
  currentDate: number;
};

export default function City({
  categories,
  cityName,
  citySlug,
  currentDate,
  selectOptions,
}: CityProps) {
  const title = `Pico y placa ${cityName}`;
  const date = new Date(currentDate);

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
    <Layout
      aside={aside}
      cityName={cityName}
      date={date}
      selectOptions={selectOptions}
      title={title}
    >
      <StyledVidverto />
      <StyledCategoriesList
        categories={categories}
        citySlug={citySlug}
        date={date}
      />
    </Layout>
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
      selectOptions: cityOptions(),
    },
  };
};
