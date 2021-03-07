import { ICategoryData } from "@mauriciorobayo/pyptron";
import styled from "styled-components";
import { CityType } from "../../lib/utils";
import CategoryCard from "../category-card";

const List = styled.div`
  display: grid;
  gap: 1rem;
  justify-content: center;
  max-width: ${({ theme }) => theme.maxWidth};
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
        ({ slug: categorySlug, name, data: [{ numbers, scheme, hours }] }) => (
          <CategoryCard
            key={categorySlug}
            date={date}
            hours={hours}
            name={name}
            numbers={numbers}
            path={`${citySlug}/${categorySlug}`}
            scheme={scheme}
          />
        )
      )}
    </List>
  );
}
