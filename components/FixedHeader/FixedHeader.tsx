import type { Path } from "components/Breadcrumbs";
import { Breadcrumbs } from "components/Breadcrumbs";
import { Clock } from "components/Clock";
import { ShareButton } from "components/ShareButton";
import useShare from "hooks/useShare";
import { CitiesList } from "lib/cities";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StyledBreadcrumbs = styled(Breadcrumbs)<{ hasShare: boolean }>`
  justify-content: ${({ hasShare }) => (hasShare ? "flex-start" : "center")};
  select {
    background-color: ${({ theme }) => theme.colors.white};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }
`;

const StyledClock = styled(Clock)<{ hasShare: boolean }>`
  font-size: ${({ theme }) => theme.font.size.small};
  text-align: ${({ hasShare }) => (hasShare ? "left" : "center")};
`;

const StyledFixedHeader = styled.div<{ isVisible: boolean }>`
  background-color: ${({ theme, isVisible }) =>
    isVisible ? theme.colors.mainComplement : theme.colors.secondaryLighter};
  border-bottom: ${({ theme, isVisible }) =>
    isVisible ? "none" : `1px solid ${theme.colors.secondaryLight}`};
  margin: 0;
  padding: 0.25em 1rem;
  position: sticky;
  top: 0;
  transition: background-color 0.5s;
  width: 100%;
  z-index: 1000;
`;

const Wrapper = styled.div`
  margin: auto;
  max-width: ${({ theme }) => theme.maxWidth};
`;

const Row = styled.div`
  align-items: center;
  display: grid;
  grid-column-gap: 0.5em;
  grid-template-columns: 1fr auto;
  margin-block: 0.15em;
`;

interface Props {
  cities: CitiesList;
}
function FixedHeader({ cities }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const {
    query: { city, category, number },
  } = useRouter();
  const path = buildPath(cities, {
    citySlug: city as string | undefined,
    categorySlug: category as string | undefined,
    number: number as string | undefined,
  });
  const hasShare = useShare();

  useEffect(() => {
    const { current } = ref;
    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        setIsVisible(entry.isIntersecting);
      }
    );
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <>
      <div ref={ref} />
      <StyledFixedHeader isVisible={isVisible}>
        <Wrapper>
          {path.length > 1 ? (
            <>
              <Row>
                <StyledBreadcrumbs path={path} hasShare={hasShare} />
                <ShareButton />
              </Row>
              <StyledClock hasShare={hasShare} />
            </>
          ) : (
            <Row>
              <StyledClock hasShare={hasShare} />
              <ShareButton />
            </Row>
          )}
        </Wrapper>
      </StyledFixedHeader>
    </>
  );
}

export default FixedHeader;

function buildPath(
  cities: CitiesList,
  {
    citySlug,
    categorySlug,
    number,
  }: {
    citySlug?: string;
    categorySlug?: string;
    number?: string;
  }
): Path {
  const path: Path = [];

  // We need at least to be on a category page to show breadcrumbs
  if (typeof citySlug !== "string" || typeof categorySlug !== "string") {
    return path;
  }

  const cityInfo = cities.find(({ slug }) => slug === citySlug);

  if (!cityInfo) {
    return path;
  }

  path.push({
    name: cityInfo.name,
    path: `/${citySlug}`,
  });

  if (typeof number !== "string") {
    path.push({
      options: cityInfo.categories.map(({ name, slug }) => ({
        name,
        path: `/${citySlug}/${slug}`,
      })),
      name: "Categoría",
      selected: `/${citySlug}/${categorySlug}`,
    });
    return path;
  }

  const categoryInfo = cityInfo.categories.find(
    ({ slug }) => slug === categorySlug
  );

  if (!categoryInfo) {
    return path;
  }

  path.push(
    {
      name: categoryInfo.name,
      path: `/${citySlug}/${categorySlug}`,
    },
    {
      name: "Placa número",
      options: Array.from({ length: 10 }, (_, i) => ({
        name: String(i),
        path: `/${citySlug}/${categorySlug}/${i}`,
      })),
      selected: `/${citySlug}/${categorySlug}/${number}`,
    }
  );

  return path;
}
