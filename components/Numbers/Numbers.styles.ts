import Vidverto from "components/ads/vidverto";
import Breadcrumbs from "components/breadcrumbs";
import styled from "styled-components";
import { camouflageLink } from "styles/mixins";

export const Title = styled.h4`
  font-size: 1.25rem;
  font-weight: normal;
  margin: 1rem 0;
`;

export const ListWrapper = styled.ol`
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  list-style: none;
  margin: 1rem 0;
  padding: 0;
`;

export const ListItem = styled.li`
  border-bottom: 1px solid #dbdbdb;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.main};
    color: white;
  }
  ${camouflageLink}
`;

export const Anchor = styled.a`
  display: block;
  padding: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

export const StyledBreadcrumbs = styled(Breadcrumbs)`
  margin: 1.5rem 0 2rem;
  text-align: center;
`;

export const StyledVidverto = styled(Vidverto)`
  margin: 1rem auto 0;
`;
