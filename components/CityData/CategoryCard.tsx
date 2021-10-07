import type { IHourData, Scheme } from "@mauriciorobayo/pyptron";
import { CategoryName } from "@mauriciorobayo/pyptron";
import { Card } from "components/Card";
import { Hours } from "components/Hours";
import { Icon } from "components/Icon";
import { LicensePlate } from "components/LicensePlate";
import { ALL_DIGITS, NA, pypNumbersToString } from "lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
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
        <LicensePlate isPublic={isPublicLicense(categorySlug)} size="large">
          {numbersString}
        </LicensePlate>
      </div>
      {hasRestriction ? (
        <HoursWrapper>
          <Hours date={date} hours={hours} interactive />
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
