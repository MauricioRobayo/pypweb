import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.nav``;

type Path = {
  name: string;
  slug: string;
};

type Props = {
  className?: string;
  paths: Path[];
};

const Anchor = styled.a`
  color: ${({ theme }) => theme.colors.linkColor};
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const Breadcrumbs = ({ paths, className }: Props) => (
  <Wrapper className={className}>
    {paths.map(({ name, slug }) => {
      const key = `${name}/${slug}`;
      if (slug === "") {
        return <span key={key}>{name}</span>;
      }
      return (
        <React.Fragment key={key}>
          <span>
            <Link href={`/${slug}`} passHref>
              <Anchor>{name}</Anchor>
            </Link>
          </span>
          <span> / </span>
        </React.Fragment>
      );
    })}
  </Wrapper>
);

Breadcrumbs.defaultProps = {
  className: "",
};

export default Breadcrumbs;
