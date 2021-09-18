import cities, { CategoryName, IPypDataResult } from "@mauriciorobayo/pyptron";
import { CategoryData } from "components/CategoryData";
import { Page } from "components/Page";
import { Post } from "components/Post";
import { dateParts, isValidDateString } from "lib/dateUtils";
import getPostBySlugs from "lib/posts";
import { CityType, isCity } from "lib/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { baseTitle, description } from "next-seo.config";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type CategoryProps = {
  categories: { name: string; slug: string }[];
  categorySlug: string;
  categoryName: CategoryName;
  cityName: string;
  citySlug: CityType;
  currentDate: number;
  initialData: IPypDataResult[];
  mdxSource: MDXRemoteSerializeResult;
};
export default function Category({
  categories,
  categorySlug,
  categoryName,
  cityName,
  citySlug,
  currentDate,
  initialData,
  mdxSource,
}: CategoryProps) {
  const [data, setData] = useState(initialData);
  const [date, setDate] = useState(currentDate);
  const { query } = useRouter();
  const { d: requestedDate, f: forwardDays } = query;

  const { getCategoryData } = cities[citySlug].categories[categorySlug];

  useEffect(() => {
    if (!isValidDateString(requestedDate)) {
      return;
    }

    const [year, month, day] = requestedDate
      .slice(0, 10)
      .split("-")
      .map(Number);
    const categoryData = getCategoryData({
      day,
      days: 8,
      month,
      year,
    });

    setDate(Date.parse(requestedDate));
    setData(categoryData.data);
  }, [requestedDate, getCategoryData]);

  useEffect(() => {
    const days = Number(forwardDays);
    if (Number.isNaN(days) || days <= 0) {
      return;
    }

    setData((previousData) => {
      const [{ year, month, day }] = previousData;
      const categoryData = getCategoryData({
        day,
        days,
        month,
        year,
      });
      return categoryData.data;
    });
  }, [forwardDays, getCategoryData]);

  const title = `${categoryName.toLowerCase()} en ${cityName}`;
  const pageTitle = `${baseTitle} ${title} `;
  const pageDescription = `${description} ${title}`;
  const main = (
    <CategoryData
      categories={categories}
      categoryName={categoryName}
      categorySlug={categorySlug}
      cityName={cityName}
      citySlug={citySlug}
      data={data}
      error={false}
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

  const categoryName = cities[citySlug].categories[categorySlug].name;

  const { getCategoryData } = categories[categorySlug];

  const date = new Date();
  const { year, month, day } = dateParts(date);

  return {
    props: {
      categories: Object.values(categories).map(({ name, slug }) => ({
        name,
        slug,
      })),
      initialData: getCategoryData({
        day,
        days: 8,
        month,
        year,
      }).data,
      categorySlug,
      categoryName,
      cityName,
      citySlug,
      currentDate: date.getTime(),
      mdxSource,
    },
  };
};
