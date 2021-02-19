import {
  getCitiesMap2,
  getCityData2,
  ICategoryData2,
  ICategoryMap2,
  ICityMap2,
} from "@mauriciorobayo/pyptron";
import CategoryInfo from "components/category-info";
import PypDate from "components/date";
import Hours from "components/hours";
import Layout from "components/layout";
import LicensePlate from "components/license-plate";
import NumberLinks from "components/number-links";
import MegaBanner from "components/the-moneytizer/mega-banner";
import {
  getInfoFromSlug,
  getPypOptions,
  listFormat,
  NA,
  pypNumbersToString,
} from "lib/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import styled from "styled-components";
import { PypOption } from "types";

type CategoryProps = {
  categoryData: ICategoryData2;
  cityName: string;
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
  currentDate,
  number,
  pypOptions,
}: CategoryProps) {
  const {
    name: categoryName,
    path: categoryPath,
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

  const aside = <CategoryInfo categoryData={categoryData} />;

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
    <Layout aside={aside} date={date} pypOptions={pypOptions} title={title}>
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
                          href={`/${categoryData.path}?d=${data.date.substr(
                            0,
                            10
                          )}`}
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
          categoryName={categoryName}
          cityName={cityName}
          numberSelected={number}
          path={categoryPath}
        />
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const citiesMap = getCitiesMap2();
  const paths: any = [];
  citiesMap.forEach(({ slug: citySlug, categories }) => {
    categories.forEach(({ slug: categorySlug }) => {
      const numbers =
        citySlug === "manizales" &&
        categorySlug === "transporte-publico-colectivo"
          ? ["H", "I", "J", "A", "B", "C", "D", "E", "F", "G"]
          : ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      numbers.forEach((number) =>
        paths.push({
          params: {
            category: categorySlug,
            city: citySlug,
            number,
          },
        })
      );
    });
  });
  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const citySlug = params?.city as string;
  const categorySlug = params?.category as string;
  const citiesMap = getCitiesMap2();
  const {
    key: cityKey,
    name: cityName,
    categories: categoriesMap,
  } = getInfoFromSlug<ICityMap2>(citySlug, citiesMap);
  const { key: categoryKey } = getInfoFromSlug<ICategoryMap2>(
    categorySlug,
    categoriesMap
  );
  const categoryData = getInfoFromSlug<ICategoryData2>(
    categorySlug,
    getCityData2(cityKey, {
      categoryKey: [categoryKey],
      days: 30,
    }).categories
  );
  return {
    props: {
      categoryData,
      cityName,
      currentDate: Date.now(),
      number: params?.number,
      pypOptions: getPypOptions(),
    },
  };
};
