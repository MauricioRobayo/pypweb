import { CategoryName, IHourData, Scheme } from "@mauriciorobayo/pyptron";
import Hours from "components/hours";
import LicensePlate from "components/license-plate";
import { ALL_DIGITS, NA, pypNumbersToString } from "lib/utils";
import Link from "next/link";
import {
  Body,
  Description,
  Footer,
  HoursWrapper,
  InfoIcon,
  LicenseNumbers,
  SeeMore,
  StyledIcon,
  Title,
  Wrapper,
} from "./CategoryCard.styles";

const isPublicLicense = (group: string) => ["taxis", "tpc"].includes(group);

type CategoryCardProps = {
  categoryName: CategoryName;
  categorySlug: string;
  citySlug: string;
  date: Date;
  numbers: number[];
  hours: IHourData[];
  scheme: Scheme;
};

export default function CategoryCard({
  categoryName,
  categorySlug,
  citySlug,
  date,
  numbers,
  hours,
  scheme,
}: CategoryCardProps) {
  const numbersString = pypNumbersToString(numbers);
  const isAllDigits = numbersString === ALL_DIGITS;
  const hasRestriction = numbersString !== NA;
  const schemeString = scheme === "first" ? "iniciadas" : "terminadas";
  const categoryPath = `${citySlug}/${categorySlug}`;

  return (
    <Wrapper>
      <Title>
        <Link href={`${categoryPath}`}>
          <a>
            <StyledIcon iconName={categoryName} />
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
        <Link href={`${categoryPath}`} passHref>
          <SeeMore>
            <InfoIcon />
            Más información
          </SeeMore>
        </Link>
      </Footer>
    </Wrapper>
  );
}
