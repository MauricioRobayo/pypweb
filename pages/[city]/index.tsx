import cities, { ICategoryData } from "@mauriciorobayo/pyptron";
import CategoriesList from "components/categories-list";
import { getLocalLongDateString } from "components/date/utils";
import Layout from "components/layout";
import TheMoneytizer from "components/the-moneytizer";
import Vidverto from "components/vidverto";
import { CityType, getPypOptions, isCity } from "lib/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { PypOption } from "types";

type CityProps = {
  categories: ICategoryData[];
  cityName: string;
  citySlug: CityType;
  pypOptions: PypOption[];
  currentDate: number;
};

export default function City({
  categories,
  cityName,
  citySlug,
  currentDate,
  pypOptions,
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
      <TheMoneytizer formatType="RECOMMENDED_CONTENT" />
    </section>
  );

  return (
    <Layout aside={aside} date={date} pypOptions={pypOptions} title={title}>
      <CategoriesList categories={categories} citySlug={citySlug} date={date} />
      <Vidverto />
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
  const categoriesData = Object.values(categories).map((category) =>
    category.getCategoryData({
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    })
  );

  return {
    props: {
      categories: categoriesData,
      cityName,
      citySlug,
      currentDate: date.getTime(),
      pypOptions: getPypOptions(),
    },
  };
};
