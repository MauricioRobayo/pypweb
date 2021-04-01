import cities, { ICategoryData } from "@mauriciorobayo/pyptron";
import Breadcrumbs from "components/breadcrumbs";
import PypDate from "components/date";
import Hours from "components/hours";
import Layout from "components/layout";
import LicensePlate from "components/license-plate";
import NumberLinks from "components/number-links";
import Post from "components/post";
import Vidverto from "components/vidverto";
import markdownToHtml from "lib/markdownToHtml";
import getPostBySlugs from "lib/posts";
import { getPypOptions, isCity, NA, pypNumbersToString } from "lib/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import styled from "styled-components";
import { PypOption } from "types";

const StyledLayout = styled(Layout)`
  text-align: center;
`;
const Title = styled.h4`
  font-size: 1.25rem;
`;
const NextDays = styled.div`
  li {
    margin-top: 0.5rem;
  }
  li:first-child {
    margin-top: 1rem;
  }
`;
const StyledBreadcrumbs = styled(Breadcrumbs)`
  margin: 1.5rem 0 2rem;
  text-align: center;
`;
type SemaphoreProps = {
  hasRestriction?: boolean;
};
const Semaphore = styled.div<SemaphoreProps>`
  align-items: center;
  background-color: ${({ hasRestriction }) =>
    hasRestriction ? "red" : "limegreen"};
  border: 4px solid #444;
  border-radius: 50%;
  color: white;
  display: inline-flex;
  font-size: 2rem;
  font-weight: bold;
  height: 4rem;
  justify-content: center;
  justify-self: center;
  margin: 0 auto 2rem;
  width: 4rem;
`;

const StyledVidverto = styled(Vidverto)`
  margin: 1rem auto;
`;

type CategoryProps = {
  categoryData: ICategoryData;
  categoryName: string;
  cityName: string;
  citySlug: string;
  currentDate: number;
  number: string;
  post: string;
  pypOptions: PypOption[];
};

export default function Category({
  categoryData,
  categoryName,
  cityName,
  citySlug,
  currentDate,
  number,
  post,
  pypOptions,
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
    numbersString !== NA ? (
      <div>
        Hoy tienen pico y placa {categoryData.name} con placas {schemeString} en{" "}
        <LicensePlate>{numbersString}</LicensePlate>.
      </div>
    ) : (
      <div>
        Hoy <strong>no tienen restricción</strong> {categoryData.name}.
      </div>
    );

  const aside = (
    <Post body={post} editPath={`${citySlug}/${categorySlug}.md`} />
  );

  return (
    <StyledLayout
      aside={aside}
      date={date}
      pypOptions={pypOptions}
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
        <Semaphore hasRestriction={hasRestriction}>{number}</Semaphore>
        <Title>
          Vehículos {categoryData.name.toLocaleLowerCase()} con placas{" "}
          {schemeString} en
          {currentNumberLicense}{" "}
          <strong>
            {hasRestriction
              ? "hoy tienen restricción en el siguiente horario:"
              : "hoy no tienen restricción."}
          </strong>
        </Title>
        {hasRestriction ? (
          <>
            <Hours date={date} hours={hours} />
          </>
        ) : (
          todaysRestriction
        )}
        <StyledVidverto />
        <div>
          <Title>Prográmese</Title>
          <div>
            <LicensePlate>{number}</LicensePlate> tiene pico y placa el próximo:
            <NextDays>
              <ol>
                {categoryData.data.slice(1).map((data) => {
                  const dataDate = new Date(
                    data.year,
                    data.month - 1,
                    data.day
                  );
                  if (data.numbers.includes(Number(number))) {
                    return (
                      <li key={dataDate.toISOString()}>
                        <Link
                          href={`/${citySlug}/${
                            categoryData.slug
                          }?d=${dataDate.toISOString().substr(0, 10)}`}
                        >
                          <a>
                            <PypDate date={dataDate} />
                          </a>
                        </Link>
                      </li>
                    );
                  }
                  return null;
                })}
              </ol>
            </NextDays>
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

  return {
    props: {
      categoryData: getCategoryData({
        day: date.getDate(),
        days: 30,
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      }),
      categoryName,
      cityName,
      citySlug,
      currentDate: date.getTime(),
      number: params?.number,
      post: postHtml,
      pypOptions: getPypOptions(),
    },
  };
};
