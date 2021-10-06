import { Select } from "components/Select";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { responsiveWidth } from "styles/mixins";

interface PathSegment {
  name: string;
  path: string;
}
interface SelectSegment {
  name: string;
  options: PathSegment[];
  selected: string;
}
export type Path = (PathSegment | SelectSegment)[];

const StyledSelect = styled(Select)`
  select {
    border: none;
    padding: 0 1.25em 0 0;
  }
`;
const Wrapper = styled.ol`
  ${responsiveWidth}

  align-items: center;
  display: flex;
  font-size: ${({ theme }) => theme.font.size.small};
  margin: 0;
  padding: 0;
  a {
    text-decoration: none;
  }
`;
const BreadcrumbItem = styled.li.attrs({
  itemProp: "itemListElement",
  itemScope: true,
  itemType: "https://schema.org/ListItem",
})`
  max-width: 22ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ItemSeparator = styled.span`
  margin: 0 0.25em;
`;

type Props = {
  className?: string;
  path: Path;
};

function Breadcrumbs({ path, className = "" }: Props) {
  if (path.length <= 1) {
    return null;
  }

  return (
    <Wrapper
      className={className}
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      {path.map((item, i) => {
        if (isPathSegment(item)) {
          return (
            <BreadcrumbItem key={item.path}>
              <Link href={item.path}>
                <a title={item.path} itemProp="item">
                  <span itemProp="name">{item.name}</span>
                  <meta itemProp="position" content={`${i + 1}`} />
                </a>
              </Link>
              <ItemSeparator>&gt;</ItemSeparator>
            </BreadcrumbItem>
          );
        }

        return (
          <BreadcrumbItem key={item.selected}>
            <StyledSelect
              name="select"
              options={item.options}
              selected={item.selected}
            />
            <meta
              itemProp="name"
              content={item.selected.replace(/.*\//g, "")}
            />
            <meta itemProp="position" content={`${i + 1}`} />
          </BreadcrumbItem>
        );
      })}
    </Wrapper>
  );
}

export default Breadcrumbs;

function isPathSegment(item: PathSegment | SelectSegment): item is PathSegment {
  return "path" in item;
}
