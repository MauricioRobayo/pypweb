import type { ICategoryData } from "@mauriciorobayo/pyptron";
import { IconLeft } from "components/Icon";
import { cotDateFromParts, cotFormatShortDate } from "lib/dateUtils";
import {
  DEFAULT_DAYS_TO_SHOW,
  isPublicLicense,
  NA,
  pypNumbersToString,
} from "lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import { NumberLinks } from "../NumberMenu";
import {
  Article,
  Header,
  MoreLink,
  StyledDayCard,
  StyledLicensePlate,
  StyledLink,
  StyledList,
  StyledPypDate,
  StyledVidverto,
  Title,
} from "./CategoryData.styles";

type CategoryDataProps = {
  categoryData: ICategoryData;
  maxDays: number;
};
function CategoryData({ categoryData, maxDays }: CategoryDataProps) {
  const { pathname, query } = useRouter();
  const { dias: forwardDays } = query;
  const [daysToShow, setDaysToShow] = useState(DEFAULT_DAYS_TO_SHOW);
  const { daysRemaining, data, name: categoryName } = categoryData;
  const [currentPypData, ...remainingPypData] = data;
  const schemeMessage = currentPypData.scheme === "first" ? "primer" : "último";

  useEffect(() => {
    if (forwardDays && typeof forwardDays === "string") {
      setDaysToShow(Number(forwardDays) || DEFAULT_DAYS_TO_SHOW);
    }
  }, [forwardDays]);

  const nextPypData = remainingPypData.slice(0, daysToShow - 1);

  const nextDataList = nextPypData.map((pypData) => {
    const { year, month, day, numbers } = pypData;
    const date = cotDateFromParts({ year, month, day });
    const numbersString = pypNumbersToString(numbers);
    const isPublic = isPublicLicense(categoryName);

    return {
      key: date.toISOString(),
      content: (
        <Link
          href={{
            pathname: pathname,
            query: {
              ...query,
              fecha: cotFormatShortDate(date),
              dias: DEFAULT_DAYS_TO_SHOW,
            },
          }}
          prefetch={false}
          passHref
          shallow
          scroll
        >
          <StyledLink dim={numbersString === NA}>
            <StyledPypDate date={date} />
            <StyledLicensePlate isPublic={isPublic}>
              {numbersString}
            </StyledLicensePlate>
          </StyledLink>
        </Link>
      ),
    };
  });

  const nextDataButton =
    daysToShow === maxDays || daysRemaining === 0 ? null : (
      <Link
        href={{
          pathname,
          query: {
            ...query,
            dias: Math.min(maxDays, daysRemaining),
          },
        }}
        prefetch={false}
        scroll={false}
        shallow
        passHref
      >
        <MoreLink>
          <IconLeft name="plus" />
          Ver más días
        </MoreLink>
      </Link>
    );

  return (
    <Article>
      <Header>
        <Title>
          Se restringe la circulación de vehículos{" "}
          <strong>{categoryName.toLowerCase()}</strong> según el{" "}
          <strong>{schemeMessage} dígito del número de la placa</strong>
        </Title>
      </Header>
      <StyledDayCard
        categoryName={categoryName}
        isSelected
        pypData={currentPypData}
      />
      <StyledVidverto />
      <StyledList rows={nextDataList} />
      {nextDataButton}
      <NumberLinks />
    </Article>
  );
}

export default memo(CategoryData);
