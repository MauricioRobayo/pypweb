import type { CityType, ICategoryData } from "@mauriciorobayo/pyptron";
import cities from "@mauriciorobayo/pyptron";
import { CategoryData } from "components/CategoryData";
import PageLayout from "components/Layout/PageLayout";
import { Page } from "components/Page";
import { Post } from "components/Post";
import { citiesList, CitiesList } from "lib/cities";
import {
  cotDateFromParts,
  cotDateParts,
  isValidDateString,
} from "lib/dateUtils";
import getPostBySlugs from "lib/posts";
import { GetStaticPaths, GetStaticProps } from "next";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { baseTitle, description } from "next-seo.config";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";

const MAX_DAYS_PER_PAGE = 31;
const INITIAL_DATE = new Date();

type CategoryPageProps = {
  categories: { name: string; slug: string }[];
  cityName: string;
  initialCategoryData: ICategoryData;
  mdxSource: MDXRemoteSerializeResult;
};
export default function CategoryPage({
  categories,
  cityName,
  initialCategoryData,
  mdxSource,
}: CategoryPageProps) {
  const [categoryData, setCategoryData] = useState(initialCategoryData);
  const [date, setDate] = useState(INITIAL_DATE);
  const { query } = useRouter();
  const {
    fecha: requestedDateString,
    city: citySlug,
    category: categorySlug,
  } = query;

  useEffect(() => {
    async function updateData() {
      if (!isValidDateString(requestedDateString)) {
        setCategoryData(initialCategoryData);
        setDate(INITIAL_DATE);
        return;
      }

      const category = await import(
        `@mauriciorobayo/pyptron/dist/cities/${citySlug}/${categorySlug}/index.js`
      );
      const {
        default: { getCategoryData },
      } = category;
      const [year, month, day] = requestedDateString.split("-").map(Number);

      try {
        const categoryData = getCategoryData({
          year,
          month,
          day,
          days: MAX_DAYS_PER_PAGE,
        });

        setDate(cotDateFromParts({ year, month, day }));
        setCategoryData(categoryData);
      } catch (err) {
        setCategoryData(initialCategoryData);
        setDate(INITIAL_DATE);
      }
    }

    updateData();
  }, [requestedDateString, citySlug, categorySlug, initialCategoryData]);

  const title = `${categoryData.name.toLowerCase()} ${cityName}`;
  const pageTitle = `${baseTitle} ${title} `;
  const pageDescription = `${description} ${title}`;
  const main = (
    <CategoryData
      categories={categories}
      cityName={cityName}
      categoryData={categoryData}
      maxDays={MAX_DAYS_PER_PAGE}
    />
  );
  const aside = <Post mdxSource={mdxSource} />;

  return (
    <Page
      aside={aside}
      date={new Date(date)}
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
  const citySlug = params?.city as CityType;
  const categorySlug = params?.category as string;
  const { categories, name: cityName } = cities[citySlug];
  const postMarkdown = await getPostBySlugs(`${citySlug}/${categorySlug}`);
  const mdxSource = await serialize(postMarkdown);
  const { getCategoryData } = categories[categorySlug];
  const categoryData = getCategoryData({
    ...cotDateParts(INITIAL_DATE),
    days: MAX_DAYS_PER_PAGE,
  });

  return {
    props: {
      categories: Object.values(categories).map(({ name, slug }) => ({
        name,
        slug,
      })),
      cities: citiesList(),
      cityName,
      initialCategoryData: categoryData,
      mdxSource,
    },
  };
};

CategoryPage.getLayout = function getLayout(
  page: ReactElement,
  props: { cities: CitiesList }
) {
  return <PageLayout cities={props.cities}>{page}</PageLayout>;
};
