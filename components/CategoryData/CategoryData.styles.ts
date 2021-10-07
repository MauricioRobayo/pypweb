import { Breadcrumbs } from "components/Breadcrumbs";
import { HiOutlinePlusCircle } from "react-icons/hi";
import styled from "styled-components";
import {
  flexHorizontalCenterVerticalEnd,
  responsiveWidth,
} from "styles/mixins";

export const StyledBreadcrumbs = styled(Breadcrumbs)`
  margin: 1.5rem 0 2rem;
  text-align: center;
`;

export const ListWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.secondaryLight};
  border-radius: 5px;
  margin: 1rem 0;
  & > div:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryLight};
  }
`;

export const Article = styled.article`
  margin: 0 auto 1rem;
  ${responsiveWidth}
`;

export const Title = styled.h3`
  font-size: ${({ theme }) => theme.font.size.large};
  font-weight: normal;
  margin: 0 0 1rem;
  text-align: center;
`;

export const MoreIcon = styled(HiOutlinePlusCircle)`
  margin-right: 0.25rem;
`;

export const ErrorMessage = styled.div`
  ${flexHorizontalCenterVerticalEnd}
`;

export const MoreLink = styled.a`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;
