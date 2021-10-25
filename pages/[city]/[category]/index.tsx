import type { City, CityType, ICategoryData } from "@mauriciorobayo/pyptron";
import cities from "@mauriciorobayo/pyptron";
import { CategoryData } from "components/CategoryData";
import { Fine } from "components/Fine";
import { Layout } from "components/Layout";
import { Page } from "components/Page";
import { Post } from "components/Post";
import { TransportationDepartment } from "components/TransportationDepartment";
import useLandingPage from "hooks/useLandingPage";
import { citiesList, CitiesList } from "lib/cities";
import {
  cotDateFromParts,
  cotDateParts,
  cotFormatLongDate,
  datePartsFromString,
  getActiveHoursString,
  isValidDateString,
} from "lib/dateUtils";
import { getPostBySlug } from "lib/posts";
import { arrayToList, getSchemeString } from "lib/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { NextSeo } from "next-seo";
import { baseTitle } from "next-seo.config";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";

const MAX_DAYS_PER_PAGE = 31;
const INITIAL_DATE = new Date();

function getSeoDescription(
  category: ICategoryData,
  date: Date,
  isLandingPage: boolean
): string {
  const {
    name,
    data: [currentData],
  } = category;
  const { numbers, scheme, hours } = currentData;
  const prefix = isLandingPage ? "Hoy no" : "No";

  if (numbers.length === 0) {
    return `${prefix} aplica restricción vehicular por pico y placa para ${name}`;
  }

  const hoursString = getActiveHoursString(hours, date);

  return `${prefix} circulan placas ${getSchemeString(scheme)} en ${arrayToList(
    numbers
  )} horario ${hoursString}`;
}

interface CategoryPageProps {
  cityName: string;
  initialCategoryData: ICategoryData;
  mdxSource: MDXRemoteSerializeResult;
  transportationDepartment: City["transportationDepartment"];
}

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
  const { isLandingPage } = useLandingPage();

  const title = `${baseTitle} ${categoryData.name.toLowerCase()} en ${cityName}`;
  const longDate = cotFormatLongDate(date);
  const seoTitle = `${title}${isLandingPage ? " hoy " : " "}${longDate}`;
  const seoDescription = getSeoDescription(categoryData, date, isLandingPage);

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
    <>
      <NextSeo description={seoDescription} title={seoTitle} />
      <Page aside={aside} date={new Date(date)} main={main} title={title} />
    </>
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
