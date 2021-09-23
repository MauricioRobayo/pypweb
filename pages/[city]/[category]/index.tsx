import type { ICategoryData } from "@mauriciorobayo/pyptron";
import cities from "@mauriciorobayo/pyptron";
import { CategoryData } from "components/CategoryData";
import PageLayout from "components/Layout/PageLayout";
import { Page } from "components/Page";
import { Post } from "components/Post";
import { citiesList, CitiesList, isCity } from "lib/cities";
import { dateParts, isValidDateString } from "lib/dateUtils";
import getPostBySlugs from "lib/posts";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { baseTitle, description } from "next-seo.config";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";

const MAX_DAYS_PER_PAGE = 31;

type CategoryPageProps = {
  categories: { name: string; slug: string }[];
  cityName: string;
  currentDate: number;
  initialCategoryData: ICategoryData;
  mdxSource: MDXRemoteSerializeResult;
};
export default function CategoryPage({
  categories,
  cityName,
  currentDate,
  initialCategoryData,
  mdxSource,
}: CategoryPageProps) {
  const [categoryData, setCategoryData] = useState(initialCategoryData);
  const [date, setDate] = useState(currentDate);
  const { query } = useRouter();
  const {
    fecha: requestedDate,
    city: citySlug,
    category: categorySlug,
  } = query;

  useEffect(() => {
    async function updateData() {
      if (!isValidDateString(requestedDate)) {
        return;
      }

      const category = await import(
        `@mauriciorobayo/pyptron/dist/cities/${citySlug}/${categorySlug}/index.js`
      );
      const { getCategoryData } = category.default;

      const [year, month, day] = requestedDate.split("-").map(Number);

      try {
        const categoryData = getCategoryData({
          day,
          days: MAX_DAYS_PER_PAGE,
          month,
          year,
        });

        setDate(new Date(year, month - 1, day).getTime());
        setCategoryData(categoryData);
      } catch (err) {
        setDate(currentDate);
        setCategoryData(initialCategoryData);
      }
    }

    updateData();
  }, [requestedDate, citySlug, categorySlug, currentDate, initialCategoryData]);

  const title = `${categoryData.name.toLowerCase()} en ${cityName}`;
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
  const citySlug = params?.city;
  if (!isCity(citySlug)) {
    throw new Error("That's not a city");
  }
  const { categories, name: cityName } = cities[citySlug];

  const categorySlug = params?.category;
  if (typeof categorySlug !== "string" || !(categorySlug in categories)) {
    throw new Error("That's not a category");
  }

  const postMarkdown = await getPostBySlugs(`${citySlug}/${categorySlug}`);
  const mdxSource = await serialize(postMarkdown);

  const { getCategoryData } = categories[categorySlug];
  const date = new Date();
  const { year, month, day } = dateParts(date);
  const categoryData = getCategoryData({
    day,
    days: MAX_DAYS_PER_PAGE,
    month,
    year,
  });

  return {
    props: {
      categories: Object.values(categories).map(({ name, slug }) => ({
        name,
        slug,
      })),
      cities: citiesList(),
      cityName,
      currentDate: date.getTime(),
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
