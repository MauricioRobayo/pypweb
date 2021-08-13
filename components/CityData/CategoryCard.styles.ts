import { Icon } from "components/Icon";
import { ReEmoji } from "components/ReEmoji";
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

export const Title = styled.h4`
  background: ${({ theme }) => theme.colors.main};
  border-radius: 5px 5px 0 0;
  color: white;
  font-size: 1.2rem;
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

export const StyledIcon = inlineIconLeft(Icon);
export const InfoIcon = inlineIconLeft(ReEmoji);
