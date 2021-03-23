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
  border-radius: 5px;
  box-shadow: 0 0 10px 0 #7a7a7a;
  color: white;
  margin-bottom: 1rem;
  position: relative;
`;

const isInactiveStyle = css`
  background-color: ${({ theme }) => theme.colors.inactiveBackgroundColor};
  color: #b5b5b5;
`;

type StyleProps = {
  isCurrentDate?: boolean;
  hasRestriction?: boolean;
};
const StyledPypDate = styled(PypDate)<StyleProps>`
  span {
    color: ${({ isCurrentDate, hasRestriction }) =>
      isCurrentDate && hasRestriction ? "white" : "inherit"};
  }
  .date {
    font-size: 0.85rem;
    text-transform: uppercase;
  }
`;
const StyledCard = styled.div<StyleProps>`
  align-items: ${({ isCurrentDate, hasRestriction }) =>
    isCurrentDate && hasRestriction ? "flex-start" : "center"};
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  ${({ isCurrentDate }) => isCurrentDate && currentCardStyle};
  ${({ hasRestriction }) => !hasRestriction && isInactiveStyle};
`;
const Title = styled.div<StyleProps>`
  font-size: ${({ isCurrentDate }) => (isCurrentDate ? "1.25rem" : "1rem")};
  margin-bottom: ${({ isCurrentDate, hasRestriction }) =>
    isCurrentDate && hasRestriction ? "1rem" : "0"};
  ${({ isCurrentDate, hasRestriction }) =>
    isCurrentDate &&
    hasRestriction &&
    css`
      a {
        color: white;
      }
      a:hover {
        color: white;
      }
    `}
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
  className?: string;
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
  className,
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
      className={className}
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
              <StyledPypDate
                date={date}
                hasRestriction={hasRestriction}
                isCurrentDate={isCurrentDate}
                type="short"
              />
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
  className: "",
  hasRestriction: true,
  isPublicLicense: false,
};
