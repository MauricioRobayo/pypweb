import type { ICategoryData } from "@mauriciorobayo/pyptron";
import cities from "@mauriciorobayo/pyptron";
import PageLayout from "components/Layout/PageLayout";
import { NumbersData } from "components/NumbersData";
import { Page } from "components/Page";
import { Post } from "components/Post";
import { dateParts } from "lib/dateUtils";
import getPostBySlugs from "lib/posts";
import { isCity } from "lib/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { baseTitle, description } from "next-seo.config";
import React, { ReactElement } from "react";

type NumberPageProps = {
  categoryData: ICategoryData;
  categoryName: string;
  cityName: string;
  citySlug: string;
  currentDate: number;
  number: string;
  mdxSource: MDXRemoteSerializeResult;
};

export default function NumberPage({
  categoryData,
  categoryName,
  cityName,
  citySlug,
  currentDate,
  number,
  mdxSource,
}: NumberPageProps) {
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

  const postMarkdown = await getPostBySlugs(`${citySlug}/${categorySlug}`);
  const mdxSource = await serialize(postMarkdown);
  const date = new Date();
  const { year, month, day } = dateParts(date);

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

NumberPage.getLayout = function Layout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};
