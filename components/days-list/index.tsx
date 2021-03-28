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
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  margin-top: 1rem;
  & > div {
    border-bottom: 1px solid #dbdbdb;
  }
  & > div:last-child {
    border-bottom: none;
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
};
export default function DaysList({
  cityName,
  citySlug,
  categoryData,
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
        Se restringe la circulación de vehículos <strong>{categoryName}</strong>{" "}
        según el <strong>{schemeMessage} dígito del número de la placa</strong>
      </Title>
      <StyledBreadcrumbs
        paths={[
          { name: cityName, slug: citySlug },
          { name: categoryName, slug: "" },
        ]}
      />
      <DayCard
        categoryName={categoryName}
        categorySlug={categorySlug}
        citySlug={citySlug}
        isSelected
        pypData={currentPypData}
      />
      <Vidverto />
      <ListWrapper>
        {nextPypData.map((pypData) => (
          <DayCard
            key={JSON.stringify(pypData)}
            categoryName={categoryName}
            categorySlug={categorySlug}
            citySlug={citySlug}
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
