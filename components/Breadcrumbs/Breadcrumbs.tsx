import Link from "next/link";
import React from "react";
import styled from "styled-components";
import PathSelect, { Path, PathSelectProps } from "./Select";

const isPathOptions = (path: any): path is PathSelectProps => "title" in path;

const Wrapper = styled.nav``;

type Props = {
  className?: string;
  paths: (Path | PathSelectProps)[];
};

const Breadcrumbs = ({ paths, className = "" }: Props) => (
  <Wrapper className={className}>
    {paths.map((path) => {
      if (isPathOptions(path)) {
        const { options, selected, title } = path;
        return (
          <PathSelect
            key={title}
            options={options}
            selected={selected}
            title={title}
          />
        );
      }
      const { name, path: slug } = path;
      const key = `${name}/${slug}`;
      return (
        <React.Fragment key={key}>
          <span>
            <Link href={`/${slug}`}>
              <a>{name}</a>
            </Link>
          </span>
          <span> / </span>
        </React.Fragment>
      );
    })}
  </Wrapper>
);

export default Breadcrumbs;
