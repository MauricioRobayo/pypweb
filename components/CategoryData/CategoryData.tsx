import { CategoryName, IPypDataResult } from "@mauriciorobayo/pyptron";
import { Vidverto } from "components/Ads";
import { useRouter } from "next/router";
import { memo } from "react";
import { NumberLinks } from "../NumberMenu";
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

type CategoryDataProps = {
  categories: { name: string; slug: string }[];
  categoryName: CategoryName;
  categorySlug: string;
  cityName: string;
  citySlug: string;
  data: IPypDataResult[];
  error: boolean;
};
function CategoryData({
  categories,
  categoryName,
  categorySlug,
  cityName,
  citySlug,
  data,
  error,
}: CategoryDataProps) {
  const router = useRouter();
  const [currentPypData, ...nextPypData] = data;
  const schemeMessage = currentPypData.scheme === "first" ? "primer" : "último";

  const onClickHandler = () => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          f: data.length + 30,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
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
