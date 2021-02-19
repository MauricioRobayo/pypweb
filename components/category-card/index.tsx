import { IHourData } from "@mauriciorobayo/pyptron";
import { ALL_DIGITS, NA, pypNumbersToString } from "lib/utils";
import Link from "next/link";
import styled from "styled-components";
import utilStyles from "styles/utils.module.scss";
import vehicleStyles from "styles/vehicles.module.scss";
import { Scheme } from "types";
import Hours from "../hours";
import LicensePlate from "../license-plate";

type CategoryCardProps = {
  date: Date;
  path: string;
  numbers: number[];
  hours: IHourData[];
  name: string;
  group: string;
  scheme: Scheme;
};

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

export default function CategoryCard({
  date,
  numbers,
  path,
  name,
  group,
  hours,
  scheme,
}: CategoryCardProps) {
  const numbersString = pypNumbersToString(numbers);
  const isAllDigits = numbersString === ALL_DIGITS;
  const hasRestriction = numbersString !== NA;
  const schemeString = scheme === "first" ? "iniciadas" : "terminadas";

  return (
    <article key={name}>
      <Card>
        <Title className={vehicleStyles[`vehicle-${group}`]}>
          <Link href={path}>
            <a>{name}</a>
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
          <LicensePlate
            isPublic={isPublicLicense(group)}
            size={hasRestriction ? "large" : "medium"}
          >
            {numbersString}
          </LicensePlate>
        </LicenseNumbers>
        <footer>
          <Link href={path}>
            <a className={utilStyles.button}>Ver próximos 7 días →</a>
          </Link>
        </footer>
      </Card>
    </article>
  );
}
