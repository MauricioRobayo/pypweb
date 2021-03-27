import { ICategoryData } from "@mauriciorobayo/pyptron";
import Breadcrumbs from "components/breadcrumbs";
import styled from "styled-components";
import DayCard from "../day-card";
import NumberLinks from "../number-links";
import Vidverto from "../vidverto";

const StyledBreadcrumbs = styled(Breadcrumbs)`
  margin: 1rem 0;
  text-align: center;
`;

const ListWrapper = styled.div`
  & > div {
    border-bottom: 1px solid #dbdbdb;
    border-left: 1px solid #dbdbdb;
    border-right: 1px solid #dbdbdb;
  }
  & > div:first-child {
    border: none;
  }
  & > div:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  & > div:nth-child(2) {
    border-top: 1px solid #dbdbdb;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
`;

const Article = styled.article`
  margin: auto;
  max-width: ${({ theme }) => theme.maxWidth};
`;

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: normal;
  margin-bottom: 1rem;
  text-align: center;
`;

type DaysListProps = {
  cityName: string;
  citySlug: string;
  categoryData: ICategoryData;
  currentDate: Date;
};
export default function DaysList({
  cityName,
  citySlug,
  categoryData,
  currentDate,
}: DaysListProps) {
  const {
    name: categoryName,
    slug: categorySlug,
    data: [{ scheme }],
  } = categoryData;
  const [currentPypData, ...nextPypData] = categoryData.data;
  const schemeMessage = scheme === "first" ? "primer" : "último";
  return (
    <Article>
      <Title>
        Se restringe la circulación de vehículos 
        {' '}
        <strong>{categoryName}</strong>
        {" "}
        según el 
        {' '}
        <strong>
          {schemeMessage}
          {' '}
          dígito del número de la placa
        </strong>
      </Title>
      <StyledBreadcrumbs
        paths={[
          { name: cityName, slug: citySlug },
          { name: categoryName, slug: "" },
        ]}
      />
      <ListWrapper>
        <DayCard
          categoryName={categoryName}
          categorySlug={categorySlug}
          citySlug={citySlug}
          currentDate={currentDate}
          pypData={currentPypData}
        />
        <Vidverto />
        {nextPypData.map((pypData) => (
          <DayCard
            key={JSON.stringify(pypData)}
            categoryName={categoryName}
            categorySlug={categorySlug}
            citySlug={citySlug}
            currentDate={currentDate}
            pypData={pypData}
          />
        ))}
      </ListWrapper>
      <footer>
        <NumberLinks categorySlug={categorySlug} citySlug={citySlug} />
      </footer>
    </Article>
  );
}
