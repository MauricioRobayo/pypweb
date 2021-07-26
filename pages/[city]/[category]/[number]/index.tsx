import cities, { ICategoryData } from "@mauriciorobayo/pyptron";
import TheMoneytizer from "components/ads/the-moneytizer";
import { Aside } from "components/Aside";
import CTA from "components/call-to-action";
import { Header } from "components/Header";
import { NumbersData } from "components/NumbersData";
import Post from "components/post";
import markdownToHtml from "lib/markdownToHtml";
import getPostBySlugs from "lib/posts";
import { AMERICA_BOGOTA, dateParts, isCity } from "lib/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { baseTitle, description } from "next-seo.config";
import styled from "styled-components";

const Main = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;

const MegaBanner = styled(TheMoneytizer).attrs({
  formatType: "MEGABANNER",
})`
  margin: 2rem auto 0;
`;

const MegaBannerBottom = styled(TheMoneytizer).attrs({
  formatType: "MEGABANNER_BOTTOM",
})`
  margin: 0 auto 2rem;
`;

const RecommendedContent = styled(TheMoneytizer).attrs({
  formatType: "RECOMMENDED_CONTENT",
})`
  margin: 2rem auto;
`;

type CategoryProps = {
  categoryData: ICategoryData;
  categoryName: string;
  cityName: string;
  citySlug: string;
  currentDate: number;
  number: string;
  post: string;
};

export default function Category({
  categoryData,
  categoryName,
  cityName,
  citySlug,
  currentDate,
  number,
  post,
}: CategoryProps) {
  const {
    slug: categorySlug,
    data: [{ scheme }],
  } = categoryData;
  const date = new Date(currentDate);
  const schemeString = scheme === "first" ? "iniciadas" : "terminadas";
  const title = `${categoryName.toLowerCase()} en ${cityName} placas ${schemeString} en ${number}`;
  const pageTitle = `${baseTitle} ${title}`;
  const pageDescription = `${description} ${title}`;

  return (
    <>
      <NextSeo description={pageDescription} title={pageTitle} />
      <Page>
        <MegaBanner />
        <Header date={date} title={pageTitle} />
        <Main>
          <NumbersData
            categoryData={categoryData}
            categoryName={categoryName}
            cityName={cityName}
            citySlug={citySlug}
            date={date}
            number={number}
            schemeString={schemeString}
          />
        </Main>
        <MegaBannerBottom />
        <CTA />
      </Page>
      <Aside>
        <Post body={post} editPath={`${citySlug}/${categorySlug}.md`} />
        <RecommendedContent />
      </Aside>
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
  const postHtml = await markdownToHtml(postMarkdown);
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
      number: params?.number,
      post: postHtml,
    },
  };
};
