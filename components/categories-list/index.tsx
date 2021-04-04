import { ICategoryData } from "@mauriciorobayo/pyptron";
import styled from "styled-components";
import { CityType } from "../../lib/utils";
import CategoryCard from "../category-card";

const List = styled.div`
  display: grid;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  max-width: ${({ theme }) => theme.maxWidth};
  width: 100%;
`;

type CategoryListProps = {
  citySlug: CityType;
  categories: ICategoryData[];
  date: Date;
};

export default function CategoriesList({
  categories,
  citySlug,
  date,
}: CategoryListProps) {
  return (
    <List>
      {categories.map(
        ({
          slug: categorySlug,
          name: categoryName,
          data: [{ numbers, scheme, hours }],
        }) => (
          <CategoryCard
            key={categorySlug}
            categoryName={categoryName}
            categorySlug={categorySlug}
            citySlug={citySlug}
            date={date}
            hours={hours}
            numbers={numbers}
            scheme={scheme}
          />
        )
      )}
    </List>
  );
}
