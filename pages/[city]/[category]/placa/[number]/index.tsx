import {
  getCitiesMap2,
  getCityData2,
  ICategoryData2,
  ICategoryMap2,
  ICityMap2,
} from "@mauriciorobayo/pyptron";
import cn from "classnames";
import CategoryInfo from "components/category-info/category-info";
import PypDate from "components/date/date";
import Hours from "components/hours/hours";
import Layout from "components/layout/layout";
import LicensePlate from "components/license-plate/license-plate";
import NumberLinks from "components/number-links/number-links";
import MegaBanner from "components/the-moneytizer/mega-banner";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import styled from "styled-components";
import utilStyles from "styles/utils.module.scss";
import { PypOption } from "types";
import {
  getInfoFromSlug,
  getPypOptions,
  listFormat,
  NA,
  pypNumbersToString,
  Scheme,
} from "utils/utils";
import styles from "./index.module.scss";

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
  const schemeString =
    scheme === Scheme.FirstNumber ? "terminadas" : "iniciadas";

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
      <div className={utilStyles.textCenter}>
        <div className={styles.title}>
          Los {vehicleClassesString} con {currentNumberLicense}{" "}
          <strong>
            {hasRestriction
              ? "hoy tienen restricción en el siguiente horario:"
              : "hoy no tienen restricción."}
          </strong>
        </div>
        {hasRestriction ? (
          <>
            <Hours date={date} hours={hours} />
          </>
        ) : (
          todaysRestriction
        )}
        <div
          className={cn(styles.semaphore, {
            [styles.hasRestriction]: hasRestriction,
          })}
        >
          {number}
        </div>
        <div>
          <h4 className={styles.title}>Prográmese</h4>
          <div>
            <LicensePlate>{number}</LicensePlate> tiene pico y placa el próximo:
            <ol className={styles.nextDays}>
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
