import cities, { ICategoryData } from "@mauriciorobayo/pyptron";
import CategoryInfo from "components/category-info";
import { isValidDateString } from "components/date/utils";
import DaysList from "components/days-list";
import Layout from "components/layout";
import MegaBanner from "components/the-moneytizer/mega-banner";
import { CityType, getPypOptions, isCity } from "lib/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import { PypOption } from "types";

type CategoryProps = {
  categoryData: ICategoryData;
  categorySlug: string;
  cityName: string;
  citySlug: CityType;
  currentDate: number;
  pypOptions: PypOption[];
};

const StyledMegaBanner = styled(MegaBanner)`
  margin-bottom: 1rem;
`;

export default function Category({
  categoryData,
  categorySlug,
  cityName,
  citySlug,
  currentDate,
  pypOptions,
}: CategoryProps) {
  const router = useRouter();
  const { d: requestedDate } = router.query;

  let date: Date;

  if (isValidDateString(requestedDate)) {
    const localRequestedDate = requestedDate.replace(/-/, "/").substr(0, 10);
    date = new Date(localRequestedDate);
  } else {
    date = new Date(currentDate);
  }

  const data = cities[citySlug].categories[categorySlug].getCategoryData({
    date,
    days: 8,
  });

  const title = `Pico y placa ${data.name.toLowerCase()} en ${cityName}`;

  const aside = <CategoryInfo categoryData={categoryData} />;

  return (
    <Layout aside={aside} date={date} pypOptions={pypOptions} title={title}>
      <StyledMegaBanner />
      <DaysList categoryData={data} citySlug={citySlug} currentDate={date} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  fallback: false,
  paths: Object.values(cities)
    .map(({ categories, slug: citySlug }) =>
      Object.values(categories).map(({ slug: categorySlug }) => ({
        params: { category: categorySlug, city: citySlug },
      }))
    )
    .flat(),
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const citySlug = params?.city;
  if (!isCity(citySlug)) {
    throw new Error("That's not a city");
  }
  const { categories, name: cityName } = cities[citySlug];

  const categorySlug = params?.category;
  if (typeof categorySlug !== "string" || !(categorySlug in categories)) {
    throw new Error("That's not a category");
  }

  const { getCategoryData } = categories[categorySlug];

  return {
    props: {
      categoryData: getCategoryData({ days: 8 }),
      categorySlug,
      cityName,
      citySlug,
      currentDate: Date.now(),
      pypOptions: getPypOptions(),
    },
  };
};
