import { ICategoryData } from "@mauriciorobayo/pyptron";
import { isPublicLicense, NA, pypNumbersToString } from "lib/utils";
import styled from "styled-components";
import DayCard from "../day-card";
import NumberLinks from "../number-links";

type DaysListProps = {
  citySlug: string;
  categoryData: ICategoryData;
  currentDate: Date;
};

const Article = styled.article`
  margin: auto;
  max-width: ${({ theme }) => theme.maxWidth};
`;

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: normal;
  margin-bottom: 2rem;
  text-align: center;
`;

export default function DaysList({
  citySlug,
  categoryData,
  currentDate,
}: DaysListProps) {
  const {
    name: categoryName,
    slug: categorySlug,
    data: [{ scheme }],
  } = categoryData;
  const schemeMessage = scheme === "first" ? "primer" : "último";
  return (
    <Article>
      <Title>
        Se restringe la circulación de vehículos <strong>{categoryName}</strong>{" "}
        según el <strong>{schemeMessage} dígito del número de la placa</strong>
      </Title>
      <div>
        {categoryData.data.map(({ year, month, day, numbers, hours }) => {
          const numbersString = pypNumbersToString(numbers);
          const date = new Date(year, month + 1, day);
          return (
            <DayCard
              key={date.toISOString()}
              categoryName={categoryName}
              categorySlug={categorySlug}
              citySlug={citySlug}
              currentDate={currentDate}
              date={date.toISOString()}
              hasRestriction={numbersString !== NA}
              hours={hours}
              isPublicLicense={isPublicLicense(categoryName)}
              numbersString={numbersString}
              scheme={scheme}
            />
          );
        })}
      </div>
      <footer>
        <NumberLinks categorySlug={categorySlug} citySlug={citySlug} />
      </footer>
    </Article>
  );
}
