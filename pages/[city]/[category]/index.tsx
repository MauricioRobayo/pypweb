import cities from "@mauriciorobayo/pyptron";
import TheMoneytizer from "components/ads/the-moneytizer";
import { Aside } from "components/Aside";
import CTA from "components/call-to-action";
import { isValidDateString } from "components/date/utils";
import DaysList from "components/days-list";
import { Header } from "components/Header";
import Post from "components/post";
import markdownToHtml from "lib/markdownToHtml";
import getPostBySlugs from "lib/posts";
import { AMERICA_BOGOTA, CityType, dateParts, isCity } from "lib/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { baseTitle, description } from "next-seo.config";
import { useRouter } from "next/router";
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
  categories: { name: string; slug: string }[];
  categorySlug: string;
  cityName: string;
  citySlug: CityType;
  currentDate: number;
  post: string;
};
export default function Category({
  categories,
  categorySlug,
  cityName,
  citySlug,
  currentDate,
  post,
}: CategoryProps) {
  const router = useRouter();
  const { d: requestedDate } = router.query;

  let date: Date;

  if (isValidDateString(requestedDate)) {
    const localRequestedDate = requestedDate.replace(/-/, "/").substr(0, 10);
    date = new Date(localRequestedDate);
  } else {
    date = new Date(currentDate);
  }

  const categoryName =
    cities[citySlug].categories[categorySlug].name.toLowerCase();

  const { getCategoryData } = cities[citySlug].categories[categorySlug];
  const { year, month, day } = dateParts(date);

  const categoryData = getCategoryData({
    day,
    days: 8,
    month,
    year,
  });

  const title = `${categoryName} en ${cityName}`;
  const pageTitle = `${baseTitle} ${title} `;
  const pageDescription = `${description} ${title}`;

  return (
    <>
      <NextSeo description={pageDescription} title={pageTitle} />
      <Page>
        <MegaBanner />
        <Header date={date} title={pageTitle} />
        <Main>
          <DaysList
            categories={categories}
            categoryData={categoryData}
            cityName={cityName}
            citySlug={citySlug}
            getCategoryData={getCategoryData}
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

  const postMarkdown = getPostBySlugs(`${citySlug}/${categorySlug}`);
  const postHtml = await markdownToHtml(postMarkdown);

  const { getCategoryData } = categories[categorySlug];

  const date = new Date();
  const { year, month, day } = dateParts(date, AMERICA_BOGOTA);

  return {
    props: {
      categories: Object.values(categories).map(({ name, slug }) => ({
        name,
        slug,
      })),
      categoryData: getCategoryData({
        day,
        days: 8,
        month,
        year,
      }),
      categorySlug,
      cityName,
      citySlug,
      currentDate: date.getTime(),
      post: postHtml,
    },
  };
};
