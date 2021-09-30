import type { ICategoryData } from "@mauriciorobayo/pyptron";
import { Vidverto } from "components/Ads";
import styled from "styled-components";
import { responsiveWidth } from "styles/mixins";
import CategoryCard from "./CategoryCard";

const StyledVidverto = styled(Vidverto)`
  margin-top: 1rem;
`;

const List = styled.div`
  display: grid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${responsiveWidth}
  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

type CategoryListProps = {
  categories: ICategoryData[];
  date: Date;
  className?: string;
};

export default function CityData({
  categories,
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
