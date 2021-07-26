import { ICategoryData } from "@mauriciorobayo/pyptron";
import Category from "@mauriciorobayo/pyptron/dist/models/category";
import { Vidverto } from "components/Ads";
import { memo, useEffect, useState } from "react";
import NumberLinks from "../number-links";
import {
  Article,
  ErrorMessage,
  ListWrapper,
  MoreButton,
  MoreButtonWrapper,
  MoreIcon,
  StyledBreadcrumbs,
  Title,
} from "./CategoryData.styles";
import DayCard from "./DayCard";

type DaysListProps = {
  categories: { name: string; slug: string }[];
  cityName: string;
  citySlug: string;
  categoryData: ICategoryData;
  getCategoryData: Category["getCategoryData"];
};

function CategoryData({
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

export default memo(CategoryData);
