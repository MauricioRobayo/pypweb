import cities from "@mauriciorobayo/pyptron";
import { isValidDateString } from "components/date/utils";
import DaysList from "components/days-list";
import Layout from "components/layout";
import Post from "components/post";
import MegaBanner from "components/the-moneytizer/mega-banner";
import markdownToHtml from "lib/markdownToHtml";
import getPostBySlugs from "lib/posts";
import { CityType, getPypOptions, isCity } from "lib/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import { PypOption } from "types";

type CategoryProps = {
  categorySlug: string;
  cityName: string;
  citySlug: CityType;
  currentDate: number;
  post: string;
  pypOptions: PypOption[];
};

const StyledMegaBanner = styled(MegaBanner)`
  margin-bottom: 1rem;
`;

export default function Category({
  categorySlug,
  cityName,
  citySlug,
  currentDate,
  post,
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
    day: date.getDate(),
    days: 8,
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  });

  const aside = <Post body={post} />;

  const title = `Pico y placa ${data.name.toLowerCase()} en ${cityName}`;

  return (
    <Layout aside={aside} date={date} pypOptions={pypOptions} title={title}>
      <StyledMegaBanner />
      <DaysList
        categoryData={data}
        cityName={cityName}
        citySlug={citySlug}
        currentDate={date}
      />
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

  const postMarkdown = getPostBySlugs(`${citySlug}/${categorySlug}`);
  const postHtml = await markdownToHtml(postMarkdown);

  const { getCategoryData } = categories[categorySlug];

  const date = new Date();

  return {
    props: {
      categoryData: getCategoryData({
        day: date.getDate(),
        days: 8,
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      }),
      categorySlug,
      cityName,
      citySlug,
      currentDate: date.getTime(),
      post: postHtml,
      pypOptions: getPypOptions(),
    },
  };
};
