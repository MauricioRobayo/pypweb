import Breadcrumbs from "components/breadcrumbs";
import Button from "components/button";
import { HiOutlinePlusCircle } from "react-icons/hi";
import styled from "styled-components";
import { flexHorizontalCenterVerticalEnd } from "styles/mixins";

export const StyledBreadcrumbs = styled(Breadcrumbs)`
  margin: 1.5rem 0 2rem;
  text-align: center;
`;

export const ListWrapper = styled.div`
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  margin: 1rem 0;
  & > div {
    border-bottom: 1px solid #dbdbdb;
  }
  & > div:last-child {
    border-bottom: none;
  }
`;

export const Article = styled.article`
  margin: 1rem auto;
  max-width: ${({ theme }) => theme.maxWidth};
`;

export const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: normal;
  text-align: center;
`;

export const MoreButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const MoreButton = styled(Button)`
  && {
    align-items: center;
    display: flex;
    justify-content: center;
  }
`;

export const MoreIcon = styled(HiOutlinePlusCircle)`
  margin-right: 0.25rem;
`;

export const ErrorMessage = styled.div`
  ${flexHorizontalCenterVerticalEnd}
`;
