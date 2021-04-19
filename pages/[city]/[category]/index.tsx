import cities from "@mauriciorobayo/pyptron";
import { isValidDateString } from "components/date/utils";
import DaysList from "components/days-list";
import Layout from "components/layout";
import Post from "components/post";
import { cityOptions, CityOptions } from "components/select/utils";
import markdownToHtml from "lib/markdownToHtml";
import getPostBySlugs from "lib/posts";
import { CityType, isCity } from "lib/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

type CategoryProps = {
  categories: { name: string; slug: string }[];
  categorySlug: string;
  cityName: string;
  citySlug: CityType;
  currentDate: number;
  post: string;
  selectOptions: CityOptions;
};

export default function Category({
  categories,
  categorySlug,
  cityName,
  citySlug,
  currentDate,
  post,
  selectOptions,
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

  const categoryName = cities[citySlug].categories[
    categorySlug
  ].name.toLowerCase();

  const { getCategoryData } = cities[citySlug].categories[categorySlug];

  const categoryData = getCategoryData({
    day: date.getDate(),
    days: 8,
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  });

  const aside = (
    <Post body={post} editPath={`${citySlug}/${categorySlug}.md`} />
  );

  const title = `Pico y placa ${categoryName} en ${cityName}`;

  return (
    <Layout
      aside={requestedDate ? null : aside}
      categoryName={categoryName}
      cityName={cityName}
      date={date}
      selectOptions={selectOptions}
      title={title}
    >
      <DaysList
        categories={categories}
        categoryData={categoryData}
        cityName={cityName}
        citySlug={citySlug}
        getCategoryData={getCategoryData}
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
      selectOptions: cityOptions(),
    },
  };
};
