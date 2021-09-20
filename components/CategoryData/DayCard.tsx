import { CategoryName, IPypDataResult } from "@mauriciorobayo/pyptron";
import { LicensePlate } from "components/LicensePlate";
import { format, isToday as isDateToday } from "date-fns";
import { ALL_DIGITS, isPublicLicense, NA, pypNumbersToString } from "lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";
import {
  Body,
  Description,
  EmojiLeft,
  Header,
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
  const date = new Date(year, month - 1, day);
  const numbersString = pypNumbersToString(numbers);
  const isPublic = isPublicLicense(categoryName);
  const schemeString = scheme === "first" ? "iniciadas" : "terminadas";
  const isAllDigits = numbersString === ALL_DIGITS;
  const isInactive = numbersString === NA;
  const isToday = isDateToday(date);
  const router = useRouter();

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
            {isSelected ? <VehicleIcon iconName={categoryName} /> : null}
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
            <StyledHours date={date} hours={hours} interactive={isToday} />
          </Body>
        )}
        {isToday ? null : (
          <Warning>
            <p>
              <Link
                href={{
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                    fecha: format(new Date(), "yyyy-MM-dd"),
                    dias: 8,
                  },
                }}
                prefetch={false}
                scroll={false}
                shallow
              >
                <a>
                  <EmojiLeft emoji="⚠" />
                  Para ver la información de hoy haga click acá
                </a>
              </Link>
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
        href={{
          pathname: router.pathname,
          query: {
            ...router.query,
            fecha: format(date, "yyyy-MM-dd"),
            dias: 8,
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
