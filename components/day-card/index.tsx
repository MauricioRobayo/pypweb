import { CategoryName, IPypDataResult } from "@mauriciorobayo/pyptron";
import Icon from "components/icon";
import { format } from "date-fns";
import { ALL_DIGITS, isPublicLicense, NA, pypNumbersToString } from "lib/utils";
import Link from "next/link";
import styled, { css } from "styled-components";
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

const BaseCard = styled.div<StyleProps>`
  padding: 1rem;
`;

const RegularCard = styled(BaseCard)`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  ${({ isInactive }) => isInactive && inactiveStyle}
`;

const SelectedCard = styled(BaseCard)`
  background-color: ${({ theme }) => theme.colors.activeBackgroundColor};
  border-radius: 5px;
  box-shadow: 0 0 10px 0 #7a7a7a;
  color: white;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  ${({ isInactive }) => isInactive && inactiveStyle}
`;

const Title = styled.div<StyleProps>`
  align-items: flex-end;
  border-bottom: 1px solid white;
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
  ${({ isInactive }) =>
    isInactive &&
    css`
      align-items: center;
      border-bottom: none;
      padding-bottom: 0;
    `}
`;

const Description = styled.div`
  font-size: 1rem;
  padding-top: 0.5rem;
`;

const StyledPypDate = styled(PypDate)<StyleProps>`
  span {
    ${({ isSelected, isInactive }) =>
      isSelected &&
      !isInactive &&
      css`
        color: white;
      `};
  }
  .date {
    font-size: 0.85rem;
    text-transform: uppercase;
  }
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

export default function DayCard({
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

  const formattedDate = (
    <Link href={`/${citySlug}/${categorySlug}?d=${format(date, "yyyy-MM-dd")}`}>
      <a>
        {isSelected ? <StyledIcon iconName={categoryName} /> : null}
        <StyledPypDate
          date={date}
          isInactive={isInactive}
          isSelected={isSelected}
          type="short"
        />
      </a>
    </Link>
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
        <Title isInactive={isInactive}>
          <div>
            {formattedDate}
            {isInactive ? null : (
              <Description>
                {isAllDigits ? null : (
                  <div>
                    No circulan placas
                    {schemeString} en
                  </div>
                )}
              </Description>
            )}
          </div>
          {licensePlate}
        </Title>
        {isInactive ? null : (
          <StyledHours date={date} hours={hours} interactive />
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
      {formattedDate}
      {licensePlate}
    </RegularCard>
  );
}
