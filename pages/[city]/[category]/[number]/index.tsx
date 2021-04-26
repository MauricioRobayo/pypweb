import cities, { ICategoryData } from "@mauriciorobayo/pyptron";
import Vidverto from "components/ads/vidverto";
import Breadcrumbs from "components/breadcrumbs";
import PypDate from "components/date";
import Hours from "components/hours";
import Layout from "components/layout";
import LicensePlate from "components/license-plate";
import NumberLinks from "components/number-links";
import Post from "components/post";
import { cityOptions, CityOptions } from "components/select/utils";
import { format } from "date-fns";
import markdownToHtml from "lib/markdownToHtml";
import getPostBySlugs from "lib/posts";
import {
  AMERICA_BOGOTA,
  dateParts,
  isCity,
  NA,
  pypNumbersToString,
} from "lib/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import styled from "styled-components";
import { camouflageLink } from "styles/mixins";

const StyledLayout = styled(Layout)`
  text-align: center;
`;

const Title = styled.h4`
  font-size: 1.25rem;
  font-weight: normal;
  margin: 1rem 0;
`;

const ListWrapper = styled.ol`
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  list-style: none;
  margin: 1rem 0;
  padding: 0;
`;

const ListItem = styled.li`
  border-bottom: 1px solid #dbdbdb;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.main};
    color: white;
  }
  ${camouflageLink}
`;

const Anchor = styled.a`
  display: block;
  padding: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledBreadcrumbs = styled(Breadcrumbs)`
  margin: 1.5rem 0 2rem;
  text-align: center;
`;

const StyledVidverto = styled(Vidverto)`
  margin: 1rem auto 0;
`;

type CategoryProps = {
  categoryData: ICategoryData;
  categoryName: string;
  cityName: string;
  citySlug: string;
  currentDate: number;
  number: string;
  post: string;
  selectOptions: CityOptions;
};

export default function Category({
  categoryData,
  categoryName,
  cityName,
  citySlug,
  currentDate,
  number,
  post,
  selectOptions,
}: CategoryProps) {
  const {
    slug: categorySlug,
    data: [{ numbers, scheme, hours }],
  } = categoryData;
  const title = `Pico y placa ${categoryData.name.toLowerCase()} en ${cityName} placa ${number}`;

  const date = new Date(currentDate);
  const numbersString = pypNumbersToString(numbers);
  const hasRestriction = numbers.includes(Number(number));
  const schemeString = scheme === "first" ? "iniciadas" : "terminadas";

  const currentNumberLicense = hasRestriction ? (
    <>
      <LicensePlate>{numbersString}</LicensePlate>
    </>
  ) : (
    <>
      <LicensePlate>{number}</LicensePlate>
    </>
  );

  const todaysRestriction =
    numbersString === NA ? null : (
      <div>
        Hoy tienen pico y placa placas {schemeString} en{" "}
        <LicensePlate>{numbersString}</LicensePlate>.
      </div>
    );

  const aside = (
    <Post body={post} editPath={`${citySlug}/${categorySlug}.md`} />
  );

  return (
    <StyledLayout
      aside={aside}
      categoryName={categoryName}
      cityName={cityName}
      date={date}
      selectOptions={selectOptions}
      title={title}
    >
      <div>
        <StyledBreadcrumbs
          paths={[
            { name: cityName, path: citySlug },
            { name: categoryName, path: `${citySlug}/${categorySlug}` },
            {
              options: Array.from({ length: 10 }, (_, i) => ({
                name: String(i),
                path: String(i),
              })),
              selected: number,
              title: "Número",
            },
          ]}
        />
        <Title>
          Placas {schemeString} en {currentNumberLicense}{" "}
          <strong>
            {hasRestriction
              ? "hoy tienen restricción."
              : "hoy no tienen restricción."}
          </strong>
        </Title>
        {hasRestriction ? (
          <>
            <Hours date={date} hours={hours} interactive />
          </>
        ) : (
          todaysRestriction
        )}
        <StyledVidverto />
        <div>
          <Title>Prográmese</Title>
          <div>
            <LicensePlate>{number}</LicensePlate> tiene pico y placa el próximo:
            <ListWrapper>
              {categoryData.data.slice(1).map((data) => {
                const dataDate = new Date(data.year, data.month - 1, data.day);
                if (data.numbers.includes(Number(number))) {
                  return (
                    <ListItem key={dataDate.toISOString()}>
                      <Link
                        href={`/${citySlug}/${categoryData.slug}?d=${format(
                          dataDate,
                          "yyyy-MM-dd"
                        )}`}
                        passHref
                      >
                        <Anchor>
                          <PypDate date={dataDate} />
                        </Anchor>
                      </Link>
                    </ListItem>
                  );
                }
                return null;
              })}
            </ListWrapper>
          </div>
        </div>
        <NumberLinks
          categorySlug={categorySlug}
          citySlug={citySlug}
          numberSelected={number}
        />
      </div>
    </StyledLayout>
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
      selectOptions: cityOptions(),
    },
  };
};
