import { ICategoryData } from "@mauriciorobayo/pyptron";
import Vidverto from "components/ads/vidverto";
import { CityType } from "lib/utils";
import styled from "styled-components";
import CategoryCard from "./category-card";

const StyledVidverto = styled(Vidverto)`
  margin-top: 1rem;
`;

const List = styled.div`
  display: grid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: ${({ theme }) => theme.maxWidth};
  width: 100%;
  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

type CategoryListProps = {
  citySlug: CityType;
  categories: ICategoryData[];
  date: Date;
  className?: string;
};

export default function CategoriesList({
  categories,
  citySlug,
  date,
  className = "",
}: CategoryListProps) {
  return (
    <>
      <StyledVidverto />
      <List className={className}>
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
    </>
  );
}
