import {
  getCitiesMap2,
  getCityData2,
  ICityData2,
} from "@mauriciorobayo/pyptron";
import CategoriesList from "components/categories-list";
import { getLocalLongDateString } from "components/date/utils";
import Layout from "components/layout";
import MegaBanner from "components/the-moneytizer/mega-banner";
import { getInfoFromSlug, getPypOptions } from "lib/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import styled from "styled-components";
import { PypOption } from "types";

type CityProps = {
  cityData: ICityData2;
  pypOptions: PypOption[];
  currentDate: number;
};

const StyledMegaBanner = styled(MegaBanner)`
  margin-bottom: 1rem;
`;

export default function City({ cityData, currentDate, pypOptions }: CityProps) {
  const { name: cityName, categories: cityCategories } = cityData;
  const title = `Pico y placa ${cityName}`;
  const date = new Date(currentDate);

  const aside = (
    <section>
      <h4>Pico y placa vigente en {cityName}</h4>
      <p>
        Las siguientes son las medidas de restricción vehicular vigentes para{" "}
        {cityName} durante el mes de{" "}
        {getLocalLongDateString().split(" ").slice(3).join(" ")}, de acuerdo con
        lo establecido por la Alcaldía de {cityName}:
      </p>
      <ul>
        {cityCategories.map(({ name: categoryName, path: categoryPath }) => (
          <li key={categoryName}>
            <Link href={categoryPath}>
              <a>{categoryName}</a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );

  return (
    <Layout aside={aside} date={date} pypOptions={pypOptions} title={title}>
      <StyledMegaBanner />
      <CategoriesList categories={cityData.categories} date={date} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const citiesMap = getCitiesMap2();
  return {
    fallback: false,
    paths: citiesMap.map(({ slug }) => ({ params: { city: slug } })),
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const citySlug = params?.city as string;
  const { key: cityKey } = getInfoFromSlug(citySlug, getCitiesMap2());
  const cityData = getCityData2(cityKey);
  return {
    props: {
      cityData,
      currentDate: Date.now(),
      pypOptions: getPypOptions(),
    },
  };
};
