import type { City, CityType, ICategoryData } from "@mauriciorobayo/pyptron";
import cities from "@mauriciorobayo/pyptron";
import { Fine } from "components/Fine";
import PageLayout from "components/Layout/PageLayout";
import { NumbersData } from "components/NumbersData";
import { Page } from "components/Page";
import { Post } from "components/Post";
import { TransportationDepartment } from "components/TransportationDepartment";
import { citiesList, CitiesList } from "lib/cities";
import {
  cotDateParts,
  cotFormatLongDate,
  getActiveHoursString,
} from "lib/dateUtils";
import { getPostBySlug } from "lib/posts";
import { arrayToList, getSchemeString } from "lib/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { NextSeo } from "next-seo";
import { baseTitle } from "next-seo.config";
import React, { ReactElement } from "react";

const INITIAL_DATE = new Date();

function getDescription(
  { name, data: [currentData] }: ICategoryData,
  number: string
): string {
  const { numbers, hours } = currentData;
  const numbersString = arrayToList(numbers);
  const isNumberActive = numbers.includes(Number(number));
  const hoursString = getActiveHoursString(hours, INITIAL_DATE);

  if (isNumberActive) {
    return `${number} tiene pico y placa horario ${hoursString.toLocaleLowerCase()}`;
  }

  if (numbers.length === 0) {
    return `${number} no tiene pico y placa. Hoy no aplica restricción por pico y placa`;
  }

  return `${number} no tiene pico y placa. Hoy tienen pico y placa las pacas terminadas en ${numbersString.toLocaleLowerCase()}`;
}

interface NumberPageProps {
  categoryData: ICategoryData;
  categoryName: string;
  cityName: string;
  number: string;
  mdxSource: MDXRemoteSerializeResult;
  transportationDepartment: City["transportationDepartment"];
}

export default function NumberPage({
  categoryData,
  cityName,
  number,
  mdxSource,
  transportationDepartment,
}: NumberPageProps) {
  const {
    data: [{ scheme }],
  } = categoryData;
  const schemeString = getSchemeString(scheme);
  const longDate = cotFormatLongDate(INITIAL_DATE);
  const title = `${baseTitle} ${categoryData.name.toLowerCase()} en ${cityName} placas ${schemeString} en ${number}`;
  const description = `Hoy ${longDate}, ${getDescription(
    categoryData,
    number
  )}`;

  const main = (
    <NumbersData
      categoryData={categoryData}
      date={INITIAL_DATE}
      number={number}
      scheme={scheme}
    />
  );
  const aside = (
    <Post
      mdxSource={mdxSource}
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
      <NextSeo description={description} title={title} />
      <Page aside={aside} date={INITIAL_DATE} main={main} title={title} />
    </>
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
    transportationDepartment,
  } = cities[citySlug];
  const { mdxSource } = await getPostBySlug(`${citySlug}/${categorySlug}.mdx`);

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
      transportationDepartment,
    },
  };
};

NumberPage.getLayout = function getLayout(
  page: ReactElement,
  props: { cities: CitiesList }
) {
  return <PageLayout cities={props.cities}>{page}</PageLayout>;
};
