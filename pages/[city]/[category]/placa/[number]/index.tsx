import cities, { ICategoryData } from "@mauriciorobayo/pyptron";
import PypDate from "components/date";
import Hours from "components/hours";
import Layout from "components/layout";
import LicensePlate from "components/license-plate";
import NumberLinks from "components/number-links";
import MegaBanner from "components/the-moneytizer/mega-banner";
import {
  getPypOptions,
  isCity,
  listFormat,
  NA,
  pypNumbersToString,
} from "lib/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import styled from "styled-components";
import { PypOption } from "types";

type CategoryProps = {
  categoryData: ICategoryData;
  cityName: string;
  citySlug: string;
  currentDate: number;
  number: string;
  pypOptions: PypOption[];
};

const StyledMegaBanner = styled(MegaBanner)`
  margin-bottom: 1rem;
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
  width: 4rem;
`;

export default function Category({
  categoryData,
  cityName,
  citySlug,
  currentDate,
  number,
  pypOptions,
}: CategoryProps) {
  const {
    slug: categorySlug,
    data: [{ numbers, scheme, vehicleClasses, hours }],
  } = categoryData;
  const title = `Pico y placa ${categoryData.name.toLowerCase()} en ${cityName} placa ${number}`;

  const date = new Date(currentDate);
  const numbersString = pypNumbersToString(numbers);
  const vehicleClassesString = listFormat(vehicleClasses);
  const hasRestriction = numbers.includes(Number(number));
  const schemeString = scheme === "first" ? "iniciadas" : "terminadas";

  const currentNumberLicense = hasRestriction ? (
    <>
      placas {schemeString} en <LicensePlate>{numbersString}</LicensePlate>
    </>
  ) : (
    <>
      placas {schemeString} en <LicensePlate>{number}</LicensePlate>
    </>
  );

  const todaysRestriction =
    numbersString !== NA ? (
      <div>
        Hoy tienen pico y placa los {vehicleClassesString} con placas{" "}
        {schemeString} en <LicensePlate>{numbersString}</LicensePlate>.
      </div>
    ) : (
      <div>
        Hoy <strong>no tienen restricción</strong> los {vehicleClassesString}.
      </div>
    );

  return (
    <Layout date={date} pypOptions={pypOptions} title={title}>
      <StyledMegaBanner />
      <div>
        <Title>
          Los {vehicleClassesString} con {currentNumberLicense}{" "}
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
        <Semaphore>{number}</Semaphore>
        <div>
          <Title>Prográmese</Title>
          <div>
            <LicensePlate>{number}</LicensePlate> tiene pico y placa el próximo:
            <NextDays>
              <ol>
                {categoryData.data.slice(1).map((data) => {
                  if (data.numbers.includes(Number(number))) {
                    return (
                      <li key={data.date}>
                        <Link
                          href={`/${citySlug}/${
                            categoryData.slug
                          }?d=${data.date.substr(0, 10)}`}
                        >
                          <a>
                            <PypDate date={data.date} />
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
    </Layout>
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
      [categorySlug]: { getCategoryData },
    },
    name: cityName,
  } = cities[citySlug];
  return {
    props: {
      categoryData: getCategoryData({ days: 30 }),
      cityName,
      citySlug,
      currentDate: Date.now(),
      number: params?.number,
      pypOptions: getPypOptions(),
    },
  };
};
