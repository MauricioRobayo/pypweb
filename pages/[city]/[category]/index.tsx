import type { City, CityType, ICategoryData } from "@mauriciorobayo/pyptron";
import cities from "@mauriciorobayo/pyptron";
import { CategoryData } from "components/CategoryData";
import { Fine } from "components/Fine";
import { Layout } from "components/Layout";
import { Page } from "components/Page";
import { Post } from "components/Post";
import { TransportationDepartment } from "components/TransportationDepartment";
import { citiesList, CitiesList } from "lib/cities";
import {
  cotDateFromParts,
  cotDateParts,
  datePartsFromString,
  isValidDateString,
} from "lib/dateUtils";
import { getPostBySlug } from "lib/posts";
import { GetStaticPaths, GetStaticProps } from "next";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { baseDescription, baseTitle } from "next-seo.config";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";

const MAX_DAYS_PER_PAGE = 31;
const INITIAL_DATE = new Date();

type CategoryPageProps = {
  cityName: string;
  initialCategoryData: ICategoryData;
  mdxSource: MDXRemoteSerializeResult;
  transportationDepartment: City["transportationDepartment"];
};
export default function CategoryPage({
  cityName,
  initialCategoryData,
  mdxSource,
  transportationDepartment,
}: CategoryPageProps) {
  const [categoryData, setCategoryData] = useState(initialCategoryData);
  const [date, setDate] = useState(INITIAL_DATE);
  const { query } = useRouter();
  const {
    fecha: requestedDateString,
    city: citySlug,
    category: categorySlug,
  } = query;
  const isLandingPage = query.fecha === undefined;

  useEffect(() => {
    async function updateData() {
      try {
        const { year, month, day } = isValidDateString(requestedDateString)
          ? datePartsFromString(requestedDateString)
          : cotDateParts(INITIAL_DATE);

        const category = await import(
          `@mauriciorobayo/pyptron/dist/cities/${citySlug}/${categorySlug}/index.js`
        );
        const {
          default: { getCategoryData },
        } = category;

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
  const pageDescription = `${baseDescription} ${title}`;
  const main = (
    <CategoryData categoryData={categoryData} maxDays={MAX_DAYS_PER_PAGE} />
  );
  const aside = (
    <Post
      mdxSource={isLandingPage ? mdxSource : null}
      sections={[
        {
          title: "Secretaría de Tránsito",
          content: (
            <TransportationDepartment
              city={cityName}
              transportationDepartment={transportationDepartment}
            />
          ),
          position: "top",
        },
        { title: "Sanciones", content: <Fine /> },
      ]}
    />
  );

  return (
    <Page
      aside={aside}
      date={new Date(date)}
      seoDescription={pageDescription}
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
  const {
    categories,
    name: cityName,
    transportationDepartment,
  } = cities[citySlug];
  const { mdxSource } = await getPostBySlug(`${citySlug}/${categorySlug}.mdx`);
  const { getCategoryData } = categories[categorySlug];
  const categoryData = getCategoryData({
    ...cotDateParts(INITIAL_DATE),
    days: MAX_DAYS_PER_PAGE,
  });

  return {
    props: {
      cities: citiesList(),
      cityName,
      initialCategoryData: categoryData,
      mdxSource,
      transportationDepartment,
    },
  };
};

CategoryPage.getLayout = function getLayout(
  page: ReactElement,
  props: { cities: CitiesList }
) {
  return <Layout cities={props.cities}>{page}</Layout>;
};
