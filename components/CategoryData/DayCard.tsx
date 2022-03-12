import type { CategoryNameType, IPypDataResult } from "@mauriciorobayo/pyptron";
import { categoryIcon } from "components/CityData/utils";
import { IconLeft } from "components/Icon";
import useLandingPage from "hooks/useLandingPage";
import { cotDateFromParts, cotIsToday } from "lib/dateUtils";
import { ALL_DIGITS, isPublicLicense, NA, pypNumbersToString } from "lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";
import { StyledLicensePlate, StyledPypDate } from "./CategoryData.styles";
import {
  DateWrapper,
  Footer,
  Header,
  StyledCard,
  StyledDescription,
  StyledHours,
} from "./DayCard.styles";

type DayCardProps = {
  categoryName: CategoryNameType;
  className?: string;
  pypData: IPypDataResult;
  isSelected?: boolean;
};

function DayCard({ categoryName, className = "", pypData }: DayCardProps) {
  const { day, hours, month, numbers, scheme, year } = pypData;
  const date = cotDateFromParts({ year, month, day });
  const numbersString = pypNumbersToString(numbers);
  const isPublic = isPublicLicense(categoryName);
  const isAllDigits = numbersString === ALL_DIGITS;
  const hasRestriction = numbersString !== NA;
  const { pathname, query } = useRouter();
  const { isLandingPage } = useLandingPage();

  const header = (
    <Header hasDescription={hasRestriction}>
      <DateWrapper>
        <IconLeft name={categoryIcon[categoryName]} />
        <StyledPypDate date={date} prefix={isLandingPage ? "Hoy " : ""} />
      </DateWrapper>
      <StyledDescription
        hasRestriction={hasRestriction}
        isAllDigits={isAllDigits}
        scheme={scheme}
      />
      <StyledLicensePlate isPublic={isPublic} size="large">
        {numbersString}
      </StyledLicensePlate>
    </Header>
  );

  const body = hasRestriction ? (
    <StyledHours date={date} hours={hours} interactive={isLandingPage} />
  ) : null;

  const footer =
    isLandingPage || cotIsToday(date) ? null : (
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
