import { Select } from "components/Select";
import Link from "next/link";
import React, { Fragment } from "react";
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
const Wrapper = styled.nav`
  ${responsiveWidth}

  align-items: center;
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
    <Wrapper className={className}>
      {path.map((item) => {
        if (isPathSegment(item)) {
          return (
            <Fragment key={item.path}>
              <BreadcrumbItem
                itemScope
                itemType="http://data-vocabulary.org/Breadcrumb"
              >
                <Link href={item.path}>
                  <a title={item.path} itemProp="url">
                    {item.name}
                  </a>
                </Link>
              </BreadcrumbItem>
              <ItemSeparator>&gt;</ItemSeparator>
            </Fragment>
          );
        }

        return (
          <StyledSelect
            name="select"
            key={item.selected}
            options={item.options}
            selected={item.selected}
          />
        );
      })}
    </Wrapper>
  );
}

export default Breadcrumbs;

function isPathSegment(item: PathSegment | SelectSegment): item is PathSegment {
  return "path" in item;
}
