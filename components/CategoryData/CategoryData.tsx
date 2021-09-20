import { CategoryName, IPypDataResult } from "@mauriciorobayo/pyptron";
import { Vidverto } from "components/Ads";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";
import { NumberLinks } from "../NumberMenu";
import {
  Article,
  ErrorMessage,
  ListWrapper,
  MoreIcon,
  MoreLink,
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
};
function CategoryData({
  categories,
  categoryName,
  categorySlug,
  cityName,
  citySlug,
  data,
}: CategoryDataProps) {
  const router = useRouter();
  const [currentPypData, ...nextPypData] = data;

  const schemeMessage = currentPypData.scheme === "first" ? "primer" : "último";

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
        isSelected
        pypData={currentPypData}
      />
      <Vidverto />
      <ListWrapper>
        {nextPypData.map((pypData) => (
          <DayCard
            key={JSON.stringify(pypData)}
            categoryName={categoryName}
            pypData={pypData}
          />
        ))}
      </ListWrapper>
      {data.length + 30 > 365 ? (
        <ErrorMessage>
          <p>😢 No tenemos más información</p>
        </ErrorMessage>
      ) : (
        <Link
          href={{
            pathname: router.pathname,
            query: {
              ...router.query,
              dias: data.length + 30,
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
      )}
      <footer>
        <NumberLinks categorySlug={categorySlug} citySlug={citySlug} />
      </footer>
    </Article>
  );
}

export default memo(CategoryData);
