import type { CityType, ICategoryData } from "@mauriciorobayo/pyptron";
import cities from "@mauriciorobayo/pyptron";
import PageLayout from "components/Layout/PageLayout";
import { NumbersData } from "components/NumbersData";
import { Page } from "components/Page";
import { Post } from "components/Post";
import { citiesList, CitiesList } from "lib/cities";
import { cotDateParts } from "lib/dateUtils";
import getPostBySlugs from "lib/posts";
import { GetStaticPaths, GetStaticProps } from "next";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { baseTitle, description } from "next-seo.config";
import React, { ReactElement } from "react";

const INITIAL_DATE = new Date();

type NumberPageProps = {
  categoryData: ICategoryData;
  categoryName: string;
  cityName: string;
  number: string;
  mdxSource: MDXRemoteSerializeResult;
};

export default function NumberPage({
  categoryData,
  cityName,
  number,
  mdxSource,
}: NumberPageProps) {
  const {
    data: [{ scheme }],
  } = categoryData;
  const schemeString = scheme === "first" ? "iniciadas" : "terminadas";
  const title = `${categoryData.name.toLowerCase()} ${cityName} placas ${schemeString} en ${number}`;
  const pageTitle = `${baseTitle} ${title}`;
  const pageDescription = `${description} ${title}`;
  const main = (
    <NumbersData
      data={categoryData.data}
      categoryName={categoryData.name}
      cityName={cityName}
      date={INITIAL_DATE}
      number={number}
      schemeString={schemeString}
    />
  );
  const aside = <Post mdxSource={mdxSource} />;

  return (
    <Page
      aside={aside}
      date={INITIAL_DATE}
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
  const citySlug = params?.city as CityType;
  const categorySlug = params?.category as string;
  const {
    categories: {
      [categorySlug]: { getCategoryData },
    },
    name: cityName,
  } = cities[citySlug];
  const postMarkdown = await getPostBySlugs(`${citySlug}/${categorySlug}`);
  const mdxSource = await serialize(postMarkdown);

  return {
    props: {
      categoryData: getCategoryData({
        ...cotDateParts(INITIAL_DATE),
        days: 30,
      }),
      cities: citiesList(),
      cityName,
      mdxSource,
      number: params?.number,
    },
  };
};

NumberPage.getLayout = function getLayout(
  page: ReactElement,
  props: { cities: CitiesList }
) {
  return <PageLayout cities={props.cities}>{page}</PageLayout>;
};
