import { Vidverto } from "components/Ads";
import { Card } from "components/Card";
import { Description } from "components/Description";
import { List } from "components/List";
import styled from "styled-components";
import { responsiveWidth } from "styles/mixins";

export const StyledCard = styled(Card)<{ isNumberActive: boolean }>`
  margin-bottom: 1rem;
  .card-header {
    background-color: ${({ isNumberActive, theme }) =>
      isNumberActive ? theme.colors.danger : theme.colors.success};
  }
`;

export const Anchor = styled.a`
  display: block;
  padding: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

export const StyledList = styled(List)`
  margin: 1rem 0;
`;

export const Wrapper = styled.div`
  ${responsiveWidth}

  margin-top: 1rem;
  text-align: center;
`;

export const Title = styled.h3`
  font-size: ${({ theme }) => theme.font.size.large};
  font-weight: normal;
  margin: 0;
`;

export const StyledVidverto = styled(Vidverto)`
  margin: 1rem auto 2rem;
`;

export const StyledDescription = styled(Description)`
  margin-bottom: 0.5rem;
`;

export const HoursWrapper = styled.div`
  margin-top: 1rem;
`;
