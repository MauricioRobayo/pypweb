import { CategoryName, IHourData, Scheme } from "@mauriciorobayo/pyptron";
import Hours from "components/hours";
import Icon from "components/icon";
import LicensePlate from "components/license-plate";
import { ALL_DIGITS, NA, pypNumbersToString } from "lib/utils";
import Link from "next/link";
import { FcAlarmClock } from "react-icons/fc";
import styled from "styled-components";
import {
  camouflageLink,
  flexCenter,
  flexHorizontalCenterVerticalEnd,
} from "styles/mixins";

const isPublicLicense = (group: string) => ["taxis", "tpc"].includes(group);

const Wrapper = styled.article`
  border-radius: 0.5rem;
  text-align: center;
`;

const Title = styled.h4`
  background: ${({ theme }) => theme.colors.activeBackgroundColor};
  border-radius: 5px 5px 0 0;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem;
  ${camouflageLink}
`;

const Body = styled.div`
  background-color: white;
  border-left: 1px solid ${({ theme }) => theme.colors.activeBackgroundColor};
  border-right: 1px solid ${({ theme }) => theme.colors.activeBackgroundColor};
  padding: 1rem;
`;

const Footer = styled.footer`
  border-bottom: 1px solid ${({ theme }) => theme.colors.activeBackgroundColor};
  border-left: 1px solid ${({ theme }) => theme.colors.activeBackgroundColor};
  border-radius: 0 0 5px 5px;
  border-right: 1px solid ${({ theme }) => theme.colors.activeBackgroundColor};
  padding: 1rem;
`;

const HoursWrapper = styled.div`
  margin-top: 1rem;
`;

const HoursTitle = styled.div`
  ${flexCenter}
`;

const LicenseNumbers = styled.div``;

const SeeMore = styled.a`
  ${flexHorizontalCenterVerticalEnd}
`;

const StyledIcon = styled(Icon)`
  margin-right: 0.5rem;
`;

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
      <Title hasRestriction={hasRestriction}>
        <Link href={`${categoryPath}`}>
          <a>
            <StyledIcon iconName={categoryName} />
            {categoryName}
          </a>
        </Link>
      </Title>
      <Body>
        {isAllDigits || !hasRestriction ? null : (
          <div>No circulan placas {schemeString} en</div>
        )}
        <LicenseNumbers>
          <LicensePlate isPublic={isPublicLicense(categorySlug)}>
            {numbersString}
          </LicensePlate>
        </LicenseNumbers>
        {hasRestriction ? (
          <HoursWrapper>
            <HoursTitle>
              <FcAlarmClock /> Horario
            </HoursTitle>
            <Hours date={date} hours={hours} interactive />
          </HoursWrapper>
        ) : null}
      </Body>
      <Footer>
        <Link href={`${categoryPath}`} passHref>
          <SeeMore>Ver próximos 7 días</SeeMore>
        </Link>
      </Footer>
    </Wrapper>
  );
}
