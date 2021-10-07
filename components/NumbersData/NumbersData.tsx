import type { ICategoryData } from "@mauriciorobayo/pyptron";
import { Card } from "components/Card";
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
  Description,
  StyledList,
  StyledVidverto,
  Title,
  Wrapper,
} from "./NumbersData.styles";

type NumbersPageProps = {
  number: string;
  schemeString: string;
  categoryData: ICategoryData;
  date: Date;
};
export default function NumbersData({
  number,
  schemeString,
  categoryData,
  date,
}: NumbersPageProps) {
  const { query } = useRouter();
  const citySlug = query.city as string;
  const categorySlug = query.category as string;
  const { data } = categoryData;
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

  const header = (
    <Title>
      <strong>
        {hasRestriction ? (
          <>
            <LicensePlate>{number}</LicensePlate> tiene restricción hoy
          </>
        ) : (
          `${number} no tiene restricción hoy`
        )}
      </strong>
    </Title>
  );

  const footer = (
    <>
      <Description>Hoy no circulan placas {schemeString} en</Description>
      {currentNumberLicense}
    </>
  );

  const body = hasRestriction ? (
    <>
      <Hours date={date} hours={hours} interactive />
    </>
  ) : (
    todaysRestriction
  );

  return (
    <Wrapper>
      <Card header={header} body={body} footer={footer} />
      <StyledVidverto />
      <Title>Prográmese</Title>
      {forthcomingRestrictions.length === 0 ? (
        <div>No tiene restricciones en los próximos 30 días.</div>
      ) : (
        <div>
          <LicensePlate>{number}</LicensePlate> tiene pico y placa el próximo:
          <StyledList
            rows={forthcomingRestrictions.map((data) => {
              const dataDate = cotDateFromParts({
                year: data.year,
                month: data.month,
                day: data.day,
              });
              return {
                key: dataDate.toISOString(),
                content: (
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
                ),
              };
            })}
          />
        </div>
      )}
      <NumberLinks selectedNumber={number} />
    </Wrapper>
  );
}
