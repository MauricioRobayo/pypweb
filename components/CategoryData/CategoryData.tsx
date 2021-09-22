import { ICategoryData } from "@mauriciorobayo/pyptron";
import { Vidverto } from "components/Ads";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";
import { NumberLinks } from "../NumberMenu";
import {
  Article,
  ListWrapper,
  MoreIcon,
  MoreLink,
  StyledBreadcrumbs,
  Title,
} from "./CategoryData.styles";
import DayCard from "./DayCard";

type CategoryDataProps = {
  categories: { name: string; slug: string }[];
  categoryData: ICategoryData;
  cityName: string;
  maxDays: number;
};
function CategoryData({
  categories,
  categoryData,
  cityName,
  maxDays,
}: CategoryDataProps) {
  const { pathname, query } = useRouter();
  const { daysRemaining, data, name: categoryName } = categoryData;
  const [currentPypData, ...nextPypData] = data;
  const { category: categorySlug, city: citySlug } = query;
  const schemeMessage = currentPypData.scheme === "first" ? "primer" : "último";

  const nextDataList =
    nextPypData.length === 0 ? null : (
      <ListWrapper>
        {nextPypData.map((pypData) => (
          <DayCard
            key={JSON.stringify(pypData)}
            categoryName={categoryName}
            pypData={pypData}
          />
        ))}
      </ListWrapper>
    );

  const nextDataButton =
    data.length === maxDays || daysRemaining === 0 ? null : (
      <Link
        href={{
          pathname,
          query: {
            ...query,
            dias: Math.min(maxDays, daysRemaining),
          },
        }}
        prefetch={false}
        scroll={false}
        shallow
        passHref
      >
        <MoreLink>
          <MoreIcon />
          Ver más días
        </MoreLink>
      </Link>
    );

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
            { name: cityName, path: citySlug as string },
            {
              options: categories.map(({ name, slug }) => ({
                name,
                path: slug,
              })),
              selected: categorySlug as string,
              title: "Categoría",
            },
          ]}
        />
      </header>
      <DayCard
        categoryName={categoryName}
        isSelected
        pypData={currentPypData}
      />
      <Vidverto />
      {nextDataList}
      {nextDataButton}
      <footer>
        <NumberLinks />
      </footer>
    </Article>
  );
}

export default memo(CategoryData);
