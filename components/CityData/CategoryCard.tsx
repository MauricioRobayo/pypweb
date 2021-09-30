import type { IHourData, Scheme } from "@mauriciorobayo/pyptron";
import { CategoryName } from "@mauriciorobayo/pyptron";
import { IconLeft } from "components/CategoryData/DayCard.styles";
import { Hours } from "components/Hours";
import { LicensePlate } from "components/LicensePlate";
import { ALL_DIGITS, NA, pypNumbersToString } from "lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Body,
  Description,
  Footer,
  HoursWrapper,
  LicenseNumbers,
  SeeMore,
  Title,
  Wrapper,
} from "./CategoryCard.styles";
import { categoryIcon } from "./utils";

const isPublicLicense = (group: string) => ["taxis", "tpc"].includes(group);

type CategoryCardProps = {
  categoryName: CategoryName;
  categorySlug: string;
  date: Date;
  numbers: number[];
  hours: IHourData[];
  scheme: Scheme;
};

export default function CategoryCard({
  categoryName,
  categorySlug,
  date,
  numbers,
  hours,
  scheme,
}: CategoryCardProps) {
  const { query } = useRouter();
  const numbersString = pypNumbersToString(numbers);
  const isAllDigits = numbersString === ALL_DIGITS;
  const hasRestriction = numbersString !== NA;
  const schemeString = scheme === "first" ? "iniciadas" : "terminadas";
  const linkUrl = {
    pathname: "/[city]/[category]",
    query: {
      city: query.city,
      category: categorySlug,
    },
  };

  return (
    <Wrapper>
      <Title>
        <Link href={linkUrl}>
          <a>
            <IconLeft name={categoryIcon[categoryName]} />
            {categoryName}
          </a>
        </Link>
      </Title>
      <Body>
        {isAllDigits || !hasRestriction ? null : (
          <Description>No circulan placas {schemeString} en</Description>
        )}
        <LicenseNumbers>
          <LicensePlate isPublic={isPublicLicense(categorySlug)} size="large">
            {numbersString}
          </LicensePlate>
        </LicenseNumbers>
        {hasRestriction ? (
          <HoursWrapper>
            <Hours date={date} hours={hours} interactive />
          </HoursWrapper>
        ) : null}
      </Body>
      <Footer>
        <Link href={linkUrl} passHref>
          <SeeMore>
            <IconLeft name="📅" />
            Ver próximos días
          </SeeMore>
        </Link>
      </Footer>
    </Wrapper>
  );
}
