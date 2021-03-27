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
  border-radius: 5px;
  box-shadow: 0 0 10px 0 #7a7a7a;
  color: white;
  font-size: 1.25rem;
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
  padding: 1rem;
  ${({ isCurrentDate }) => isCurrentDate && currentCardStyle};
  ${({ hasRestriction }) => !hasRestriction && isInactiveStyle};
`;
const Title = styled.div<StyleProps>`
  align-items: flex-end;
  border-bottom: 1px solid white;
  display: flex;
  justify-content: space-between;
  ${({ isCurrentDate, hasRestriction }) =>
    isCurrentDate &&
    hasRestriction &&
    css`
      padding-bottom: 1rem;
    `}
`;
const LicenseWrapper = styled.div``;
const StyledHours = styled(Hours)<StyleProps>`
  text-align: center;
  ${({ isCurrentDate, hasRestriction }) =>
    isCurrentDate &&
    hasRestriction &&
    css`
      font-size: 1rem;
    `}
`;

const Description = styled.div`
  font-size: 1rem;
  padding-top: 0.5rem;
`;

const StyledLicensePlate = styled(LicensePlate)``;

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
  const schemeString = scheme === "first" ? "iniciadas" : "terminadas";
  const isCurrentDate = isSameDate(date, currentDate);
  const isAllDigits = numbersString === ALL_DIGITS;

  return (
    <StyledCard
      key={date.toISOString()}
      className={className}
      hasRestriction={hasRestriction || false}
      isCurrentDate={isCurrentDate}
    >
      <Title hasRestriction={hasRestriction} isCurrentDate={isCurrentDate}>
        <div>
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
          <Description>
            {hasRestriction && !isAllDigits && isCurrentDate ? (
              <div>
                No circulan placas
                {schemeString} en
              </div>
            ) : null}
          </Description>
        </div>
        <LicenseWrapper>
          <StyledLicensePlate
            isPublic={isPublicLicense}
            size={isCurrentDate ? "large" : "medium"}
          >
            {numbersString}
          </StyledLicensePlate>
        </LicenseWrapper>
      </Title>
      {hasRestriction && isCurrentDate ? (
        <StyledHours
          date={currentDate}
          hasRestriction={hasRestriction}
          hours={hours}
          interactive
          isCurrentDate={isCurrentDate}
        />
      ) : null}
    </StyledCard>
  );
}

DayCard.defaultProps = {
  className: "",
  hasRestriction: true,
  isPublicLicense: false,
};
