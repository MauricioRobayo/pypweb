import { ICategoryData } from "@mauriciorobayo/pyptron";
import { isPublicLicense, listFormat, NA, pypNumbersToString } from "lib/utils";
import styled from "styled-components";
import DayCard from "../day-card";
import NumberLinks from "../number-links";

type DaysListProps = {
  cityName: string;
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
  cityName,
  categoryData,
  currentDate,
}: DaysListProps) {
  const {
    name: categoryName,
    group: categoryGroup,
    path: categoryPath,
    data: [{ vehicleClasses, scheme }],
  } = categoryData;
  const vehicleClassesList = listFormat(vehicleClasses);
  const schemeMessage = scheme === "first" ? "primer" : "último";
  return (
    <Article>
      <Title>
        Se restringe la circulación de <strong>{vehicleClassesList}</strong>{" "}
        según el <strong>{schemeMessage} dígito del número de la placa</strong>
      </Title>
      <div>
        {categoryData.data.map(({ date, numbers, hours }) => {
          const numbersString = pypNumbersToString(numbers);
          return (
            <DayCard
              key={date}
              currentDate={currentDate}
              date={date}
              group={categoryGroup}
              hasRestriction={numbersString !== NA}
              hours={hours}
              isPublicLicense={isPublicLicense(categoryName)}
              numbersString={numbersString}
              path={categoryPath}
              scheme={scheme}
            />
          );
        })}
      </div>
      <footer>
        <NumberLinks
          categoryName={categoryName}
          cityName={cityName}
          path={categoryPath}
        />
      </footer>
    </Article>
  );
}
