import cities from "@mauriciorobayo/pyptron";
import { isValidDateString } from "components/date/utils";
import DaysList from "components/days-list";
import Layout from "components/layout";
import Post from "components/post";
import markdownToHtml from "lib/markdownToHtml";
import getPostBySlugs from "lib/posts";
import { CityType, getPypOptions, isCity } from "lib/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { PypOption } from "types";

type CategoryProps = {
  categories: { name: string; slug: string }[];
  categorySlug: string;
  cityName: string;
  citySlug: CityType;
  currentDate: number;
  post: string;
  pypOptions: PypOption[];
};

export default function Category({
  categories,
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
  const categoryName = data.name.toLowerCase();

  const aside = (
    <Post body={post} editPath={`${citySlug}/${categorySlug}.md`} />
  );

  const title = `Pico y placa ${categoryName} en ${cityName}`;

  return (
    <Layout aside={aside} date={date} pypOptions={pypOptions} title={title}>
      <DaysList
        categories={categories}
        categoryData={data}
        cityName={cityName}
        citySlug={citySlug}
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
      categories: Object.values(categories).map(({ name, slug }) => ({
        name,
        slug,
      })),
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
