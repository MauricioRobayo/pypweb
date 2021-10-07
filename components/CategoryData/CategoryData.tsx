import type { ICategoryData } from "@mauriciorobayo/pyptron";
import { Vidverto } from "components/Ads";
import { DEFAULT_DAYS_TO_SHOW } from "lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import { NumberLinks } from "../NumberMenu";
import {
  Article,
  ListWrapper,
  MoreIcon,
  MoreLink,
  Title,
} from "./CategoryData.styles";
import DayCard from "./DayCard";

type CategoryDataProps = {
  categoryData: ICategoryData;
  maxDays: number;
};
function CategoryData({ categoryData, maxDays }: CategoryDataProps) {
  const { pathname, query } = useRouter();
  const { dias: forwardDays } = query;
  const [daysToShow, setDaysToShow] = useState(DEFAULT_DAYS_TO_SHOW);
  const { daysRemaining, data, name: categoryName } = categoryData;
  const [currentPypData, ...remainingPypData] = data;
  const schemeMessage = currentPypData.scheme === "first" ? "primer" : "último";

  useEffect(() => {
    if (forwardDays && typeof forwardDays === "string") {
      setDaysToShow(Number(forwardDays) || DEFAULT_DAYS_TO_SHOW);
    }
  }, [forwardDays]);

  const nextPypData = remainingPypData.slice(0, daysToShow - 1);

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
    daysToShow === maxDays || daysRemaining === 0 ? null : (
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
