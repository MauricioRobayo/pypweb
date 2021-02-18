import { IHourData } from "@mauriciorobayo/pyptron";
import { ALL_DIGITS } from "lib/utils";
import Link from "next/link";
import styled, { css } from "styled-components";
import vehicleStyles from "styles/vehicles.module.scss";
import { Scheme } from "types";
import Date from "../date";
import { isSameDate } from "../date/utils";
import Hours from "../hours";
import LicensePlate from "../license-plate";

const currentCardStyle = css`
  background-color: var(--active-background-color);
  border: none;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 #7a7a7a;
  position: relative;
`;

const hasRestrictionStyle = css`
  background-color: var(--inactive-background-color);
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

type DayCardProps = {
  scheme: Scheme;
  group: string;
  date: string;
  currentDate: Date;
  numbersString: string;
  hours: IHourData[];
  path: string;
  isPublicLicense?: boolean;
  hasRestriction?: boolean;
};

export default function DayCard({
  scheme,
  group,
  currentDate,
  date,
  numbersString,
  hours,
  path,
  isPublicLicense,
  hasRestriction,
}: DayCardProps) {
  const schemeString = scheme === "first" ? "Primer" : "Último";
  const isCurrentDate = isSameDate(date, currentDate);
  const isAllDigits = numbersString === ALL_DIGITS;

  return (
    <StyledCard
      key={date}
      hasRestriction={hasRestriction || false}
      isCurrentDate={isCurrentDate}
    >
      <div>
        <Title
          className={isCurrentDate ? vehicleStyles[`vehicle-${group}`] : ""}
          isCurrentDate={isCurrentDate}
        >
          <Link href={`/${path}?d=${date.substr(0, 10)}`}>
            <a>
              <Date date={date} type="short" />
            </a>
          </Link>
        </Title>
        {hasRestriction && isCurrentDate ? (
          <div>
            <Hours date={currentDate} hours={hours} interactive />
          </div>
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
