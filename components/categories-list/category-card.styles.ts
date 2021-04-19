import Icon from "components/icon";
import { FcCalendar } from "react-icons/fc";
import styled from "styled-components";
import {
  boxShadow,
  camouflageLink,
  flexHorizontalCenterVerticalEnd,
  inlineIcon,
} from "styles/mixins";

export const Wrapper = styled.article`
  ${boxShadow()}

  border-radius: 0.5rem;
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
  background-color: ${({ theme }) => theme.colors.lightMain};
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

export const StyledIcon = inlineIcon(Icon);
export const StyledFcCalendar = inlineIcon(FcCalendar);
