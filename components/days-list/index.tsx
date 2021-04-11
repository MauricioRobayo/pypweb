import { ICategoryData } from "@mauriciorobayo/pyptron";
import Category from "@mauriciorobayo/pyptron/dist/models/category";
import Breadcrumbs from "components/breadcrumbs";
import Button from "components/button";
import { memo, useEffect, useState } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import styled from "styled-components";
import { flexHorizontalCenterVerticalEnd } from "styles/mixins";
import NumberLinks from "../number-links";
import Vidverto from "../vidverto";
import DayCard from "./day-card";

const StyledBreadcrumbs = styled(Breadcrumbs)`
  margin: 1.5rem 0 2rem;
  text-align: center;
`;

const ListWrapper = styled.div`
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  margin: 1rem 0;
  & > div {
    border-bottom: 1px solid #dbdbdb;
  }
  & > div:last-child {
    border-bottom: none;
  }
`;

const Article = styled.article`
  margin: 1rem auto;
  max-width: ${({ theme }) => theme.maxWidth};
`;

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: normal;
  text-align: center;
`;

const MoreButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const MoreButton = styled(Button)`
  && {
    align-items: center;
    display: flex;
    justify-content: center;
  }
`;

const MoreIcon = styled(HiOutlinePlusCircle)`
  margin-right: 0.25rem;
`;

const ErrorMessage = styled.div`
  ${flexHorizontalCenterVerticalEnd}
`;

type DaysListProps = {
  categories: { name: string; slug: string }[];
  cityName: string;
  citySlug: string;
  categoryData: ICategoryData;
  getCategoryData: Category["getCategoryData"];
};

function DaysList({
  categories,
  cityName,
  citySlug,
  categoryData,
  getCategoryData,
}: DaysListProps) {
  const [data, setData] = useState(categoryData.data);
  const [error, setError] = useState(null);
  const {
    name: categoryName,
    slug: categorySlug,
    data: [{ scheme }],
  } = categoryData;
  const [currentPypData, ...nextPypData] = data;
  const schemeMessage = scheme === "first" ? "primer" : "último";

  useEffect(() => {
    setData(categoryData.data);
  }, [categoryData]);

  const onClickHandler = () => {
    const { day, month, year } = data[data.length - 1];
    try {
      const newData = getCategoryData({ day: day + 1, days: 30, month, year });
      setData((d) => d.concat(newData.data));
    } catch (e) {
      setError(e);
    }
  };

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
      {error ? (
        <ErrorMessage>
          <p>😢 No tenemos más información</p>
        </ErrorMessage>
      ) : (
        <MoreButtonWrapper>
          <MoreButton onClick={onClickHandler}>
            <MoreIcon />
            Ver más días
          </MoreButton>
        </MoreButtonWrapper>
      )}
      <footer>
        <NumberLinks categorySlug={categorySlug} citySlug={citySlug} />
      </footer>
    </Article>
  );
}

export default memo(DaysList);
