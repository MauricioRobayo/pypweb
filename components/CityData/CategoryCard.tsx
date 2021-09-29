import type { IHourData, Scheme } from "@mauriciorobayo/pyptron";
import { CategoryName } from "@mauriciorobayo/pyptron";
import { IconLeft } from "components/CategoryData/DayCard.styles";
import { Hours } from "components/Hours";
import { LicensePlate } from "components/LicensePlate";
import { ALL_DIGITS, NA, pypNumbersToString } from "lib/utils";
import Link from "next/link";
import {
  Body,
  Description,
  Footer,
  HoursWrapper,
  LicenseNumbers,
  SeeMore,
  Title,
  Wrapper,
} from "./CategoryCard.styles";

const isPublicLicense = (group: string) => ["taxis", "tpc"].includes(group);

const categoryIcon = {
  [CategoryName.CARGA_MAS_DE_20_ANOS_DE_EDAD]: "🚛",
  [CategoryName.CARGA_PESO_MAX_SUPERIOR_A_3500KG]: "🚛",
  [CategoryName.CARGA_PESO_MAX_SUPERIOR_A_8500KG]: "🚛",
  [CategoryName.MOTOCARROS]: "🛵",
  [CategoryName.MOTOS]: "🛵",
  [CategoryName.PARTICULARES]: "🚗",
  [CategoryName.SERVICIO_DE_TRANSPORTE_ESPECIAL]: "🚐",
  [CategoryName.TAXIS]: "🚕",
  [CategoryName.TRANSPORTE_DE_CARGA_MENOR_A_1500KG]: "🚛",
  [CategoryName.TRANSPORTE_DE_CARGA]: "🚛",
  [CategoryName.TRANSPORTE_PUBLICO_COLECTIVO]: "🚌",
} as const;

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
    <Wrapper>
      <Title>
        <Link href={`${categoryPath}`}>
          <a>
            <IconLeft name={categoryIcon[categoryName]} />
            {categoryName}
          </a>
        </Link>
      </Title>
      <Body>
        {isAllDigits || !hasRestriction ? null : (
          <Description>No circulan placas {schemeString} en</Description>
        )}
        <LicenseNumbers>
          <LicensePlate isPublic={isPublicLicense(categorySlug)} size="large">
            {numbersString}
          </LicensePlate>
        </LicenseNumbers>
        {hasRestriction ? (
          <HoursWrapper>
            <Hours date={date} hours={hours} interactive />
          </HoursWrapper>
        ) : null}
      </Body>
      <Footer>
        <Link href={`${categoryPath}`} passHref>
          <SeeMore>
            <IconLeft name="ℹ" />
            Más información
          </SeeMore>
        </Link>
      </Footer>
    </Wrapper>
  );
}
