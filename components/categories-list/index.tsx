import { ICategoryData } from "@mauriciorobayo/pyptron";
import styled from "styled-components";
import CategoryCard from "../category-card";

type CategoryListProps = {
  categories: ICategoryData[];
  date: Date;
};

const List = styled.div`
  display: grid;
  gap: 1rem;
  justify-content: center;
  max-width: ${({ theme }) => theme.maxWidth};
`;

export default function CategoriesList({
  categories,
  date,
}: CategoryListProps) {
  return (
    <List>
      {categories.map(
        ({ path, group, name, data: [{ numbers, scheme, hours }] }) => (
          <CategoryCard
            key={path}
            date={date}
            group={group}
            hours={hours}
            name={name}
            numbers={numbers}
            path={path}
            scheme={scheme}
          />
        )
      )}
    </List>
  );
}
