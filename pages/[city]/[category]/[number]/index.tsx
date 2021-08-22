import cities, { ICategoryData } from "@mauriciorobayo/pyptron";
import { NumbersData } from "components/NumbersData";
import { Page } from "components/Page";
import { Post } from "components/Post";
import getPostBySlugs from "lib/posts";
import { AMERICA_BOGOTA, dateParts, isCity } from "lib/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { baseTitle, description } from "next-seo.config";

type CategoryProps = {
  categoryData: ICategoryData;
  categoryName: string;
  cityName: string;
  citySlug: string;
  currentDate: number;
  number: string;
  mdxSource: MDXRemoteSerializeResult;
};

export default function Category({
  categoryData,
  categoryName,
  cityName,
  citySlug,
  currentDate,
  number,
  mdxSource,
}: CategoryProps) {
  const {
    data: [{ scheme }],
  } = categoryData;
  const date = new Date(currentDate);
  const schemeString = scheme === "first" ? "iniciadas" : "terminadas";
  const title = `${categoryName.toLowerCase()} en ${cityName} placas ${schemeString} en ${number}`;
  const pageTitle = `${baseTitle} ${title}`;
  const pageDescription = `${description} ${title}`;
  const main = (
    <NumbersData
      categoryData={categoryData}
      categoryName={categoryName}
      cityName={cityName}
      citySlug={citySlug}
      date={date}
      number={number}
      schemeString={schemeString}
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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.values(cities)
    .map(({ slug: citySlug, categories }) =>
      Object.values(categories)
        .map(({ slug: categorySlug }) =>
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => ({
            params: {
              category: categorySlug,
              city: citySlug,
              number: String(number),
            },
          }))
        )
        .flat()
    )
    .flat();
  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const citySlug = params?.city;
  if (!isCity(citySlug)) {
    throw new Error("That's not a city");
  }
  const categorySlug = params?.category;
  if (typeof categorySlug !== "string") {
    throw new Error("That's not a category");
  }
  const {
    categories: {
      [categorySlug]: { getCategoryData, name: categoryName },
    },
    name: cityName,
  } = cities[citySlug];

  const postMarkdown = getPostBySlugs(`${citySlug}/${categorySlug}`);
  const mdxSource = await serialize(postMarkdown);
  const date = new Date();
  const { year, month, day } = dateParts(date, AMERICA_BOGOTA);

  return {
    props: {
      categoryData: getCategoryData({
        day,
        days: 30,
        month,
        year,
      }),
      categoryName,
      cityName,
      citySlug,
      currentDate: date.getTime(),
      mdxSource,
      number: params?.number,
    },
  };
};
