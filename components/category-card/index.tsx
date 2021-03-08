import { CategoryName, IHourData, Scheme } from "@mauriciorobayo/pyptron";
import Button from "components/button";
import Hours from "components/hours";
import Icon from "components/icon";
import LicensePlate from "components/license-plate";
import { ALL_DIGITS, NA, pypNumbersToString } from "lib/utils";
import Link from "next/link";
import styled from "styled-components";

const isPublicLicense = (group: string) => ["taxis", "tpc"].includes(group);

const Card = styled.div`
  background-color: #f5f5f5;
  border: 2px solid #444;
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;

  a:hover {
    color: inherit;
  }
`;
const Title = styled.h4`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;
const LicenseNumbers = styled.div`
  margin: 1rem 0;
`;

type CategoryCardProps = {
  categoryName: CategoryName;
  categorySlug: string;
  citySlug: string;
  date: Date;
  numbers: number[];
  hours: IHourData[];
  scheme: Scheme;
};

export default function CategoryCard({
  categoryName,
  categorySlug,
  citySlug,
  date,
  numbers,
  hours,
  scheme,
}: CategoryCardProps) {
  const numbersString = pypNumbersToString(numbers);
  const isAllDigits = numbersString === ALL_DIGITS;
  const hasRestriction = numbersString !== NA;
  const schemeString = scheme === "first" ? "iniciadas" : "terminadas";
  const categoryPath = `${citySlug}/${categorySlug}`;

  return (
    <article key={categoryName}>
      <Card>
        <Title>
          <Link href={`${categoryPath}`}>
            <a>
              <Icon iconName={categoryName} />
              {categoryName}
            </a>
          </Link>
        </Title>
        {hasRestriction ? (
          <div>
            <div>No circulan en el siguiente horario</div>
            <Hours date={date} hours={hours} interactive />
          </div>
        ) : null}

        {isAllDigits || !hasRestriction ? null : (
          <div>Placas {schemeString} en</div>
        )}
        <LicenseNumbers>
          <LicensePlate isPublic={isPublicLicense(categorySlug)}>
            {numbersString}
          </LicensePlate>
        </LicenseNumbers>
        <footer>
          <Link href={`${categoryPath}`}>
            <a>
              <Button>Ver próximos 7 días →</Button>
            </a>
          </Link>
        </footer>
      </Card>
    </article>
  );
}
