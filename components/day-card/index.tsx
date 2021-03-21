import { CategoryName, IHourData, Scheme } from "@mauriciorobayo/pyptron";
import Icon from "components/icon";
import { format } from "date-fns";
import { ALL_DIGITS } from "lib/utils";
import Link from "next/link";
import styled, { css } from "styled-components";
import PypDate from "../date";
import { isSameDate } from "../date/utils";
import Hours from "../hours";
import LicensePlate from "../license-plate";

const currentCardStyle = css`
  background-color: ${({ theme }) => theme.colors.activeBackgroundColor};
  border: none;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 #7a7a7a;
  position: relative;
`;

const hasRestrictionStyle = css`
  background-color: ${({ theme }) => theme.colors.inactiveBackgroundColor};
  color: #b5b5b5;
`;

type StyleProps = {
  isCurrentDate?: boolean;
  hasRestriction?: boolean;
};
const StyledCard = styled.div<StyleProps>`
  ${({ isCurrentDate }) => isCurrentDate && currentCardStyle};
  ${({ hasRestriction }) => !hasRestriction && hasRestrictionStyle};

  align-items: center;
  border: 1px solid #dbdbdb;
  border-top: none;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;
const Title = styled.div<StyleProps>`
  font-size: ${({ isCurrentDate }) => (isCurrentDate ? "1.25rem" : "1rem")};
  margin-bottom: ${({ isCurrentDate }) => (isCurrentDate ? "1rem" : "0")};
`;
const LicenseWrapper = styled.div`
  text-align: right;
`;
const StyledHours = styled(Hours)`
  text-align: left;
`;

type DayCardProps = {
  categoryName: CategoryName;
  categorySlug: string;
  citySlug: string;
  currentDate: Date;
  date: Date;
  hasRestriction?: boolean;
  hours: IHourData[];
  isPublicLicense?: boolean;
  numbersString: string;
  scheme: Scheme;
};

export default function DayCard({
  categorySlug,
  categoryName,
  citySlug,
  currentDate,
  date,
  numbersString,
  hours,
  isPublicLicense,
  hasRestriction,
  scheme,
}: DayCardProps) {
  const schemeString = scheme === "first" ? "Primer" : "Último";
  const isCurrentDate = isSameDate(date, currentDate);
  const isAllDigits = numbersString === ALL_DIGITS;

  return (
    <StyledCard
      key={date.toISOString()}
      hasRestriction={hasRestriction || false}
      isCurrentDate={isCurrentDate}
    >
      <div>
        <Title isCurrentDate={isCurrentDate}>
          <Link
            href={`/${citySlug}/${categorySlug}?d=${format(
              date,
              "yyyy-MM-dd"
            )}`}
          >
            <a>
              {isCurrentDate ? <Icon iconName={categoryName} /> : null}{" "}
              <PypDate date={date} type="short" />
            </a>
          </Link>
        </Title>
        {hasRestriction && isCurrentDate ? (
          <StyledHours date={currentDate} hours={hours} interactive />
        ) : null}
      </div>
      <LicenseWrapper>
        {hasRestriction && isCurrentDate ? <div>No circulan</div> : null}
        <LicensePlate
          isPublic={isPublicLicense}
          size={isCurrentDate ? "large" : "medium"}
        >
          {numbersString}
        </LicensePlate>
        {hasRestriction && !isAllDigits && isCurrentDate ? (
          <div>{schemeString} dígito de la placa</div>
        ) : null}
      </LicenseWrapper>
    </StyledCard>
  );
}

DayCard.defaultProps = {
  hasRestriction: true,
  isPublicLicense: false,
};
