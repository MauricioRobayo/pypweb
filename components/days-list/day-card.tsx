import { CategoryName, IPypDataResult } from "@mauriciorobayo/pyptron";
import Icon from "components/icon";
import { format } from "date-fns";
import { ALL_DIGITS, isPublicLicense, NA, pypNumbersToString } from "lib/utils";
import Link from "next/link";
import { memo } from "react";
import { FcAlarmClock } from "react-icons/fc";
import styled, { css } from "styled-components";
import {
  camouflageLink,
  flexCenter,
  responsivePaddingAround,
} from "styles/mixins";
import PypDate from "../date";
import Hours from "../hours";
import LicensePlate from "../license-plate";

const inactiveStyle = css`
  background-color: ${({ theme }) => theme.colors.inactiveBackgroundColor};
  color: #b5b5b5;
`;

type StyleProps = {
  isSelected?: boolean;
  isInactive?: boolean;
};

const RegularCard = styled.div<StyleProps>`
  ${camouflageLink}
  a {
    align-items: center;
    display: flex;
    justify-content: space-between;
    transition: background-color 0.5s;
    ${responsivePaddingAround}
    ${({ isInactive }) => isInactive && inactiveStyle}
  }
  a:hover {
    border: 1px solid ${({ theme }) => theme.colors.linkColor};
  }
`;

const SelectedCard = styled.div<StyleProps>`
  border-radius: 5px;
  box-shadow: 0 0 10px 0 #7a7a7a;
  margin-bottom: 1rem;
  overflow: hidden;
  ${({ isInactive }) => isInactive && inactiveStyle}
`;

const Header = styled.div<StyleProps>`
  align-items: flex-end;
  background-color: tomato;
  color: white;
  display: flex;
  justify-content: space-between;
  ${responsivePaddingAround}
  ${({ isInactive }) =>
    isInactive &&
    css`
      align-items: center;
      font-weight: normal;
      ${inactiveStyle}
    `}
`;

const Body = styled.div<StyleProps>`
  padding: 0 1rem 1rem;
  h4 {
    ${flexCenter}

    font-size: 1.25rem;
    margin: 0.5rem 0;
    svg {
      margin-right: 0.5rem;
    }
  }
`;

const Description = styled.div`
  padding-top: 0.5rem;
`;

const StyledPypDate = styled(PypDate)<StyleProps>`
  .day,
  .date {
    ${({ isSelected, isInactive }) =>
      isSelected &&
      !isInactive &&
      css`
        color: white;
      `};
  }
  .day {
    ${({ isSelected, isInactive }) =>
      isSelected &&
      !isInactive &&
      css`
        font-weight: bold;
      `};
  }
  .date {
    font-size: 0.85rem;
    text-transform: uppercase;
  }
`;

const Warning = styled.div`
  background-color: hsl(48, 100%, 85%);
  color: ${({ theme }) => theme.colors.linkColor};
  padding: 1rem;
  text-align: center;
`;

const StyledHours = styled(Hours)`
  font-size: 1rem;
  text-align: center;
`;

const StyledIcon = styled(Icon)`
  margin-right: 0.5rem;
`;

type DayCardProps = {
  categoryName: CategoryName;
  categorySlug: string;
  citySlug: string;
  className?: string;
  pypData: IPypDataResult;
  isSelected?: boolean;
};

function DayCard({
  categorySlug,
  categoryName,
  citySlug,
  className = "",
  isSelected = false,
  pypData,
}: DayCardProps) {
  const { day, hours, month, numbers, scheme, year } = pypData;
  const date = new Date(year, month - 1, day);
  const numbersString = pypNumbersToString(numbers);
  const isPublic = isPublicLicense(categoryName);
  const schemeString = scheme === "first" ? "iniciadas" : "terminadas";
  const isAllDigits = numbersString === ALL_DIGITS;
  const isInactive = numbersString === NA;
  const today = new Date();
  const isToday =
    day === today.getDate() &&
    month - 1 === today.getMonth() &&
    year === today.getFullYear();

  const formattedDate = (
    <StyledPypDate
      date={date}
      isInactive={isInactive}
      isSelected={isSelected}
      type="short"
    />
  );

  const licensePlate = (
    <div>
      <LicensePlate isPublic={isPublic} size={isSelected ? "large" : "medium"}>
        {numbersString}
      </LicensePlate>
    </div>
  );

  if (isSelected) {
    return (
      <SelectedCard
        key={date.toISOString()}
        className={className}
        isInactive={isInactive}
      >
        <Header isInactive={isInactive}>
          <div>
            {isSelected ? <StyledIcon iconName={categoryName} /> : null}
            {formattedDate}
            {isInactive ? null : (
              <Description>
                {isAllDigits ? null : (
                  <div>No circulan placas {schemeString} en</div>
                )}
              </Description>
            )}
          </div>
          {licensePlate}
        </Header>
        {isInactive ? null : (
          <Body>
            <h4>
              <FcAlarmClock />
              Horario
            </h4>
            <StyledHours date={date} hours={hours} interactive />
          </Body>
        )}
        {isToday ? null : (
          <Warning>
            <p>
              <Link href={`/${citySlug}/${categorySlug}`}>
                <a>⚠️ Para ver la información de hoy haga click acá</a>
              </Link>
              .
            </p>
          </Warning>
        )}
      </SelectedCard>
    );
  }

  return (
    <RegularCard
      key={date.toISOString()}
      className={className}
      isInactive={isInactive}
    >
      <Link
        href={`/${citySlug}/${categorySlug}?d=${format(date, "yyyy-MM-dd")}`}
        passHref
      >
        <a>
          {formattedDate}
          {licensePlate}
        </a>
      </Link>
    </RegularCard>
  );
}

export default memo(DayCard);