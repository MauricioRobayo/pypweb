import { Vidverto } from "components/Ads";
import { List } from "components/List";
import styled from "styled-components";

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
  text-align: center;
`;

export const Title = styled.h3`
  font-size: ${({ theme }) => theme.font.size.large};
  font-weight: normal;
  margin: 1rem 0;
`;

export const StyledVidverto = styled(Vidverto)`
  margin: 1rem auto 0;
`;

export const Description = styled.p`
  margin: 0 0 0.5em;
`;
