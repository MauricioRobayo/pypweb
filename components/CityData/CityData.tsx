import type { ICategoryData } from "@mauriciorobayo/pyptron";
import { AdPlayer, Vidverto } from "components/Ads";
import { useRouter } from "next/router";
import styled from "styled-components";
import { responsiveWidth } from "styles/mixins";
import CategoryCard from "./CategoryCard";

const StyledVidverto = styled(Vidverto)`
  margin: 1rem auto 0;
`;

const StyledAdPlayer = styled(AdPlayer)`
  margin: -1rem auto 1rem;
`;

const List = styled.div`
  ${responsiveWidth()}

  display: grid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

type CategoryListProps = {
  categories: ICategoryData[];
  className?: string;
};

export default function CityData({
  categories,
  className = "",
}: CategoryListProps) {
  const {
    query: { city: citySlug },
  } = useRouter();

  return (
    <>
      <StyledVidverto />
      <List className={className}>
        {categories.map((category) => (
          <CategoryCard
            key={category.slug}
            category={category}
            citySlug={citySlug as string}
          />
        ))}
      </List>
      <StyledAdPlayer />
    </>
  );
}
