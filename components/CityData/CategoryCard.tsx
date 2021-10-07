import type { ICategoryData } from "@mauriciorobayo/pyptron";
import { Card } from "components/Card";
import { Hours } from "components/Hours";
import { Icon } from "components/Icon";
import { LicensePlate } from "components/LicensePlate";
import { cotDateFromParts } from "lib/dateUtils";
import { ALL_DIGITS, isPublicLicense, NA, pypNumbersToString } from "lib/utils";
import Link from "next/link";
import styled from "styled-components";
import { flexHorizontalCenterVerticalEnd, inlineIconLeft } from "styles/mixins";
import { categoryIcon } from "./utils";

const Title = styled.h3`
  font-size: ${({ theme }) => theme.font.size.large};
  font-weight: bold;
  margin: 0;
  text-align: center;
`;

const Body = styled.div`
  text-align: center;
`;

const HoursWrapper = styled.div`
  margin-top: 1rem;
`;

const SeeMore = styled.a`
  ${flexHorizontalCenterVerticalEnd}
`;

const Description = styled.div`
  margin-bottom: 1rem;
`;

const IconLeft = inlineIconLeft(Icon);

type CategoryCardProps = {
  category: ICategoryData;
  citySlug: string;
};

export default function CategoryCard({
  category,
  citySlug,
}: CategoryCardProps) {
  const {
    slug: categorySlug,
    name: categoryName,
    data: [{ year, month, day, numbers, scheme, hours }],
  } = category;
  const numbersString = pypNumbersToString(numbers);
  const isAllDigits = numbersString === ALL_DIGITS;
  const hasRestriction = numbersString !== NA;
  const schemeString = scheme === "first" ? "iniciadas" : "terminadas";
  const linkUrl = {
    pathname: "/[city]/[category]",
    query: {
      city: citySlug,
      category: categorySlug,
    },
  };

  const header = (
    <Title>
      <Link href={linkUrl}>
        <a>
          <IconLeft name={categoryIcon[categoryName]} />
          {categoryName}
        </a>
      </Link>
    </Title>
  );

  const body = (
    <Body>
      {isAllDigits || !hasRestriction ? null : (
        <Description>No circulan placas {schemeString} en</Description>
      )}
      <div>
        <LicensePlate isPublic={isPublicLicense(categoryName)} size="large">
          {numbersString}
        </LicensePlate>
      </div>
      {hasRestriction ? (
        <HoursWrapper>
          <Hours
            hours={hours}
            interactive
            date={cotDateFromParts({ year, month, day })}
          />
        </HoursWrapper>
      ) : null}
    </Body>
  );

  const footer = (
    <div>
      <Link href={linkUrl} passHref>
        <SeeMore>
          <IconLeft name="📅" />
          Ver próximos días
        </SeeMore>
      </Link>
    </div>
  );

  return <Card header={header} body={body} footer={footer} />;
}
