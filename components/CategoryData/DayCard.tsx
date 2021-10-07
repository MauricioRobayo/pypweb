import type { CategoryName, IPypDataResult } from "@mauriciorobayo/pyptron";
import { categoryIcon } from "components/CityData/utils";
import { IconLeft } from "components/Icon";
import { cotDateFromParts, cotIsToday } from "lib/dateUtils";
import { ALL_DIGITS, isPublicLicense, NA, pypNumbersToString } from "lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";
import {
  DateWrapper,
  Description,
  Footer,
  Header,
  StyledCard,
  StyledHours,
  StyledLicensePlate,
  StyledPypDate,
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

  const formattedDate = <StyledPypDate date={date} type="short" />;

  const licensePlate = (
    <StyledLicensePlate
      isPublic={isPublic}
      size={isSelected ? "large" : "medium"}
    >
      {numbersString}
    </StyledLicensePlate>
  );

  const hasDescription = !isInactive && !isAllDigits;

  const header = (
    <Header hasDescription={hasDescription}>
      <DateWrapper>
        <IconLeft name={categoryIcon[categoryName]} />
        {formattedDate}
      </DateWrapper>
      {hasDescription ? (
        <Description>No circulan placas {schemeString} en</Description>
      ) : null}
      {licensePlate}
    </Header>
  );

  const body = isInactive ? null : (
    <StyledHours date={date} hours={hours} interactive={cotIsToday(date)} />
  );

  const footer = cotIsToday(date) ? null : (
    <Footer>
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
    </Footer>
  );

  return (
    <StyledCard
      className={className}
      header={header}
      body={body}
      footer={footer}
    />
  );
}

export default memo(DayCard);
