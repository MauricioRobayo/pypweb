import { ICategoryData } from "@mauriciorobayo/pyptron";
import Breadcrumbs from "components/breadcrumbs";
import styled from "styled-components";
import DayCard from "../day-card";
import NumberLinks from "../number-links";
import Vidverto from "../vidverto";

const StyledBreadcrumbs = styled(Breadcrumbs)`
  margin: 1.5rem 0 2rem;
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
  text-align: center;
`;

type DaysListProps = {
  categories: { name: string; slug: string }[];
  cityName: string;
  citySlug: string;
  categoryData: ICategoryData;
};
export default function DaysList({
  categories,
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
      <header>
        <Title>
          Se restringe la circulación de vehículos{" "}
          <strong>{categoryName.toLowerCase()}</strong> según el{" "}
          <strong>{schemeMessage} dígito del número de la placa</strong>
        </Title>
        <StyledBreadcrumbs
          paths={[
            { name: cityName, path: citySlug },
            {
              options: categories.map(({ name, slug }) => ({
                name,
                path: slug,
              })),
              selected: categorySlug,
              title: "Categoría",
            },
          ]}
        />
      </header>
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
