import cities from "@mauriciorobayo/pyptron";
import { CategoryData } from "components/CategoryData";
import { Page } from "components/Page";
import { Post } from "components/Post";
import { isValidDateString } from "components/PypDate/utils";
import getPostBySlugs from "lib/posts";
import { AMERICA_BOGOTA, CityType, dateParts, isCity } from "lib/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { baseTitle, description } from "next-seo.config";
import { useRouter } from "next/router";

type CategoryProps = {
  categories: { name: string; slug: string }[];
  categorySlug: string;
  cityName: string;
  citySlug: CityType;
  currentDate: number;
  mdxSource: MDXRemoteSerializeResult;
};
export default function Category({
  categories,
  categorySlug,
  cityName,
  citySlug,
  currentDate,
  mdxSource,
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

  const categoryName =
    cities[citySlug].categories[categorySlug].name.toLowerCase();

  const { getCategoryData } = cities[citySlug].categories[categorySlug];
  const { year, month, day } = dateParts(date);

  const categoryData = getCategoryData({
    day,
    days: 8,
    month,
    year,
  });

  const title = `${categoryName} en ${cityName}`;
  const pageTitle = `${baseTitle} ${title} `;
  const pageDescription = `${description} ${title}`;
  const main = (
    <CategoryData
      categories={categories}
      categoryData={categoryData}
      cityName={cityName}
      citySlug={citySlug}
      getCategoryData={getCategoryData}
    />
  );
  const aside = <Post mdxSource={mdxSource} />;

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
  const mdxSource = await serialize(postMarkdown);

  const { getCategoryData } = categories[categorySlug];

  const date = new Date();
  const { year, month, day } = dateParts(date, AMERICA_BOGOTA);

  return {
    props: {
      categories: Object.values(categories).map(({ name, slug }) => ({
        name,
        slug,
      })),
      categoryData: getCategoryData({
        day,
        days: 8,
        month,
        year,
      }),
      categorySlug,
      cityName,
      citySlug,
      currentDate: date.getTime(),
      mdxSource,
    },
  };
};
