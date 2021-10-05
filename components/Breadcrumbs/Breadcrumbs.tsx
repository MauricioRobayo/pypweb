import { Select } from "components/Select";
import { CitiesList } from "lib/cities";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { responsiveWidth } from "styles/mixins";

const StyledSelect = styled(Select)`
  select {
    padding-bottom: 0.15em;
    padding-right: 1.5em;
    padding-top: 0.1em;
  }
`;
const Wrapper = styled.nav`
  ${responsiveWidth}

  align-items: flex-start;
  display: flex;
  font-size: ${({ theme }) => theme.font.size.small};
  a {
    text-decoration: none;
  }
`;
const BreadcrumbItem = styled.div`
  max-width: 22ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

type Props = {
  className?: string;
  cities: CitiesList;
};

function Breadcrumbs({ cities, className = "" }: Props) {
  const {
    query: { city, category, number },
  } = useRouter();

  // We need to be at least at a category page to show the breadcrumbs
  if (!(typeof city === "string" && typeof category === "string")) {
    return null;
  }

  const cityPath = cities.find(({ slug }) => slug === city);

  if (!cityPath) {
    return null;
  }

  if (typeof number !== "string") {
    return (
      <Wrapper className={className}>
        <BreadcrumbItem>
          <Link href={`/${cityPath.slug}`}>
            <a>{cityPath.name}</a>
          </Link>
        </BreadcrumbItem>
        <span> &gt; </span>
        <StyledSelect
          name="categoría"
          options={cityPath.categories.map(({ name, slug }) => ({
            name,
            path: `/${cityPath.slug}/${slug}`,
          }))}
          selected={category}
        />
      </Wrapper>
    );
  }

  const categoryPath = cityPath.categories.find(
    ({ slug }) => slug === category
  );

  if (!categoryPath) {
    return null;
  }

  return (
    <Wrapper className={className}>
      <BreadcrumbItem>
        <Link href={`/${cityPath.slug}`}>
          <a>{cityPath.name}</a>
        </Link>
      </BreadcrumbItem>
      <span> &gt; </span>
      <BreadcrumbItem>
        <Link href={`/${cityPath.slug}/${categoryPath.slug}`}>
          <a>{categoryPath.name}</a>
        </Link>
      </BreadcrumbItem>
      <span> &gt; </span>
      <StyledSelect
        name="placa número"
        options={Array.from({ length: 10 }, (_, i) => ({
          name: String(i),
          path: `/${cityPath.slug}/${categoryPath.slug}/${i}`,
        }))}
        selected={category}
      />
    </Wrapper>
  );
}

export default Breadcrumbs;
