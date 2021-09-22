import { ICategoryData } from "@mauriciorobayo/pyptron";
import { Hours } from "components/Hours";
import { LicensePlate } from "components/LicensePlate";
import { NumberLinks } from "components/NumberMenu";
import { PypDate } from "components/PypDate";
import { format } from "date-fns";
import { NA, pypNumbersToString } from "lib/utils";
import Link from "next/link";
import React from "react";
import {
  Anchor,
  ListItem,
  ListWrapper,
  StyledBreadcrumbs,
  StyledVidverto,
  Title,
  Wrapper,
} from "./Numbers.styles";

type NumbersPageProps = {
  number: string;
  schemeString: string;
  citySlug: string;
  categoryName: string;
  cityName: string;
  categoryData: ICategoryData;
  date: Date;
};
export default function NumbersPage({
  number,
  schemeString,
  citySlug,
  categoryName,
  cityName,
  categoryData,
  date,
}: NumbersPageProps) {
  const {
    data: [{ numbers, hours }],
    slug: categorySlug,
  } = categoryData;
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

  const forthcomingRestrictions = categoryData.data
    .slice(1)
    .filter(({ numbers }) => numbers.includes(Number(number)));

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
              const dataDate = new Date(data.year, data.month - 1, data.day);
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
            })}
          </ListWrapper>
        </div>
      )}
      <NumberLinks selectedNumber={number} />
    </Wrapper>
  );
}
