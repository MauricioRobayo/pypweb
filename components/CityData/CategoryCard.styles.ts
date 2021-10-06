import { Icon } from "components/Icon";
import styled from "styled-components";
import {
  boxShadow,
  camouflageLink,
  flexHorizontalCenterVerticalEnd,
  inlineIconLeft,
} from "styles/mixins";

export const Wrapper = styled.article`
  ${boxShadow()}

  border-radius: 0.5rem;
  margin: 1rem 0 0;
  text-align: center;
`;

export const Title = styled.h3`
  background: ${({ theme }) => theme.colors.main};
  border-radius: 5px 5px 0 0;
  color: white;
  font-size: ${({ theme }) => theme.font.size.large};
  font-weight: bold;
  margin: 0;
  padding: 1rem;
  ${camouflageLink}
`;

export const Body = styled.div`
  background-color: white;
  padding: 1rem;
`;

export const Footer = styled.footer`
  background-color: ${({ theme }) => theme.colors.mainLight};
  border-radius: 0 0 5px 5px;
  padding: 1rem;
`;

export const HoursWrapper = styled.div`
  margin-top: 1rem;
`;

export const LicenseNumbers = styled.div``;

export const SeeMore = styled.a`
  ${flexHorizontalCenterVerticalEnd}
`;

export const Description = styled.div`
  margin-bottom: 1rem;
`;

export const IconLeft = inlineIconLeft(Icon);
