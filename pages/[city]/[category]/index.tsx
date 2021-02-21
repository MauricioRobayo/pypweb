import {
  getCitiesMap,
  getCityData,
  ICategoryData,
  ICategoryMap,
  ICityMap,
} from "@mauriciorobayo/pyptron";
import CategoryInfo from "components/category-info";
import { isValidDateString } from "components/date/utils";
import DaysList from "components/days-list";
import Layout from "components/layout";
import MegaBanner from "components/the-moneytizer/mega-banner";
import { getInfoFromSlug, getPypOptions } from "lib/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import { PypOption } from "types";

type CategoryProps = {
  cityKey: string;
  categoryKey: string;
  categoryData: ICategoryData;
  cityName: string;
  currentDate: number;
  pypOptions: PypOption[];
};

const StyledMegaBanner = styled(MegaBanner)`
  margin-bottom: 1rem;
`;

export default function Category({
  cityKey,
  categoryKey,
  categoryData,
  cityName,
  currentDate,
  pypOptions,
}: CategoryProps) {
  const router = useRouter();
  const { d: requestedDate, category: categorySlug } = router.query;

  let date: Date;

  if (isValidDateString(requestedDate)) {
    const localRequestedDate = requestedDate.replace(/-/, "/").substr(0, 10);
    date = new Date(localRequestedDate);
  } else {
    date = new Date(currentDate);
  }

  const data = getInfoFromSlug<ICategoryData>(
    categorySlug as string,
    getCityData(cityKey, {
      categoryKey: [categoryKey],
      date,
      days: 8,
    }).categories
  );

  const title = `Pico y placa ${data.name.toLowerCase()} en ${cityName}`;

  const aside = <CategoryInfo categoryData={categoryData} />;

  return (
    <Layout aside={aside} date={date} pypOptions={pypOptions} title={title}>
      <StyledMegaBanner />
      <DaysList categoryData={data} cityName={cityName} currentDate={date} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const citiesMap = getCitiesMap();
  return {
    fallback: false,
    paths: citiesMap
      .map(({ slug: citySlug, categories }) =>
        categories.map(({ slug: categorySlug }) => ({
          params: { category: categorySlug, city: citySlug },
        }))
      )
      .flat(),
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const citySlug = params?.city as string;
  const categorySlug = params?.category as string;
  const citiesMap = getCitiesMap();
  const {
    key: cityKey,
    name: cityName,
    categories: categoriesMap,
  } = getInfoFromSlug<ICityMap>(citySlug, citiesMap);
  const { key: categoryKey } = getInfoFromSlug<ICategoryMap>(
    categorySlug,
    categoriesMap
  );
  const categoryData = getInfoFromSlug<ICategoryData>(
    categorySlug,
    getCityData(cityKey, {
      categoryKey: [categoryKey],
      days: 8,
    }).categories
  );
  return {
    props: {
      categoryData,
      categoryKey,
      citiesMap,
      cityKey,
      cityName,
      currentDate: Date.now(),
      pypOptions: getPypOptions(),
    },
  };
};
