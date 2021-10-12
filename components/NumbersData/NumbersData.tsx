import type { ICategoryData, Scheme } from "@mauriciorobayo/pyptron";
import { Hours } from "components/Hours";
import { LicensePlate } from "components/LicensePlate";
import { NumberLinks } from "components/NumberMenu";
import { PypDate } from "components/PypDate";
import { cotDateFromParts, cotFormatShortDate } from "lib/dateUtils";
import {
  ALL_DIGITS,
  DEFAULT_DAYS_TO_SHOW,
  NA,
  pypNumbersToString,
} from "lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  Anchor,
  StyledCard,
  StyledDescription,
  StyledList,
  Title,
  Wrapper,
} from "./NumbersData.styles";

type NumbersPageProps = {
  number: string;
  scheme: Scheme;
  categoryData: ICategoryData;
  date: Date;
};
export default function NumbersData({
  number,
  scheme,
  categoryData,
  date,
}: NumbersPageProps) {
  const { query } = useRouter();
  const citySlug = query.city as string;
  const categorySlug = query.category as string;
  const { data } = categoryData;
  const [{ numbers, hours }, ...remainingData] = data;
  const numbersString = pypNumbersToString(numbers);
  const isAllDigits = numbersString === ALL_DIGITS;
  const hasRestriction = numbersString !== NA;
  const isNumberActive = numbers.includes(Number(number));

  const forthcomingRestrictions = remainingData.filter(({ numbers }) =>
    numbers.includes(Number(number))
  );

  const header = (
    <Title>
      <strong>
        {isNumberActive ? (
          <>
            <LicensePlate>{number}</LicensePlate> hoy tiene restricción
          </>
        ) : (
          <>
            <LicensePlate>{number}</LicensePlate> hoy no tiene restricción
          </>
        )}
      </strong>
    </Title>
  );

  const body = isNumberActive ? (
    <Hours date={date} hours={hours} interactive />
  ) : null;

  const footer = (
    <>
      <StyledDescription
        hasRestriction={hasRestriction}
        isAllDigits={isAllDigits}
        scheme={scheme}
        preText="Hoy"
      />
      <LicensePlate>{numbersString}</LicensePlate>
    </>
  );

  return (
    <Wrapper>
      <StyledCard
        header={header}
        body={body}
        footer={footer}
        isNumberActive={isNumberActive}
      />
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
