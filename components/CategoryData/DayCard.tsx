import type { CategoryName, IPypDataResult } from "@mauriciorobayo/pyptron";
import { categoryIcon } from "components/CityData/utils";
import { LicensePlate } from "components/LicensePlate";
import {
  cotDateFromParts,
  cotFormatShortDate,
  cotIsToday,
} from "lib/dateUtils";
import {
  ALL_DIGITS,
  DEFAULT_DAYS_TO_SHOW,
  isPublicLicense,
  NA,
  pypNumbersToString,
} from "lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";
import {
  Body,
  Description,
  Header,
  IconLeft,
  RegularCard,
  SelectedCard,
  StyledHours,
  StyledPypDate,
  VehicleIcon,
  Warning,
} from "./DayCard.styles";

type DayCardProps = {
  categoryName: CategoryName;
  className?: string;
  pypData: IPypDataResult;
  isSelected?: boolean;
};

function DayCard({
  categoryName,
  className = "",
  isSelected = false,
  pypData,
}: DayCardProps) {
  const { day, hours, month, numbers, scheme, year } = pypData;
  const date = cotDateFromParts({ year, month, day });
  const numbersString = pypNumbersToString(numbers);
  const isPublic = isPublicLicense(categoryName);
  const schemeString = scheme === "first" ? "iniciadas" : "terminadas";
  const isAllDigits = numbersString === ALL_DIGITS;
  const isInactive = numbersString === NA;
  const { pathname, query } = useRouter();

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
      <SelectedCard className={className} isInactive={isInactive}>
        <Header isInactive={isInactive}>
          <div>
            {isSelected ? (
              <VehicleIcon name={categoryIcon[categoryName]} />
            ) : null}
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
            <StyledHours
              date={date}
              hours={hours}
              interactive={cotIsToday(date)}
            />
          </Body>
        )}
        {cotIsToday(date) ? null : (
          <Warning>
            <Link
              href={{
                pathname,
                query: {
                  city: query.city,
                  category: query.category,
                },
              }}
              prefetch={false}
              scroll={false}
              shallow
            >
              <a>
                <IconLeft name="⚠" />
                Para ver la información de hoy haga click acá
              </a>
            </Link>
          </Warning>
        )}
      </SelectedCard>
    );
  }

  return (
    <RegularCard className={className} isInactive={isInactive}>
      <Link
        href={{
          pathname: pathname,
          query: {
            ...query,
            fecha: cotFormatShortDate(date),
            dias: DEFAULT_DAYS_TO_SHOW,
          },
        }}
        prefetch={false}
        passHref
        shallow
        scroll
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
