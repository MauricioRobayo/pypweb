import type { ICategoryData } from "@mauriciorobayo/pyptron";
import { Hours } from "components/Hours";
import { LicensePlate } from "components/LicensePlate";
import { NumberLinks } from "components/NumberMenu";
import { PypDate } from "components/PypDate";
import { cotDateFromParts, cotFormatShortDate } from "lib/dateUtils";
import { DEFAULT_DAYS_TO_SHOW, NA, pypNumbersToString } from "lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  Anchor,
  ListItem,
  ListWrapper,
  StyledBreadcrumbs,
  StyledVidverto,
  Title,
  Wrapper,
} from "./NumbersData.styles";

type NumbersPageProps = {
  number: string;
  schemeString: string;
  categoryData: ICategoryData;
  cityName: string;
  date: Date;
};
export default function NumbersData({
  number,
  schemeString,
  categoryData,
  cityName,
  date,
}: NumbersPageProps) {
  const { query } = useRouter();
  const citySlug = query.city as string;
  const categorySlug = query.category as string;
  const { data, name: categoryName } = categoryData;
  const [{ numbers, hours }, ...remainingData] = data;
  const numbersString = pypNumbersToString(numbers);
  const hasRestriction = numbers.includes(Number(number));

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

  const forthcomingRestrictions = remainingData.filter(({ numbers }) =>
    numbers.includes(Number(number))
  );

  return (
    <Wrapper>
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
      <Title>Prográmese</Title>
      {forthcomingRestrictions.length === 0 ? (
        <div>No tiene restricciones en los próximos 30 días.</div>
      ) : (
        <div>
          <LicensePlate>{number}</LicensePlate> tiene pico y placa el próximo:
          <ListWrapper>
            {forthcomingRestrictions.map((data) => {
              const dataDate = cotDateFromParts({
                year: data.year,
                month: data.month,
                day: data.day,
              });
              return (
                <ListItem key={dataDate.toISOString()}>
                  <Link
                    href={{
                      pathname: "/[city]/[category]",
                      query: {
                        city: citySlug,
                        category: categorySlug,
                        fecha: cotFormatShortDate(dataDate),
                        dias: DEFAULT_DAYS_TO_SHOW,
                      },
                    }}
                    passHref
                  >
                    <Anchor>
                      <PypDate date={dataDate} />
                    </Anchor>
                  </Link>
                </ListItem>
              );
            })}
          </ListWrapper>
        </div>
      )}
      <NumberLinks selectedNumber={number} />
    </Wrapper>
  );
}
