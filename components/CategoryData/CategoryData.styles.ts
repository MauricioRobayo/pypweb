import { Vidverto } from "components/Ads";
import { LicensePlate } from "components/LicensePlate";
import { List } from "components/List";
import { PypDate } from "components/PypDate";
import { HiOutlinePlusCircle } from "react-icons/hi";
import styled from "styled-components";
import { size } from "styles/constants";
import { responsiveWidth } from "styles/mixins";
import DayCard from "./DayCard";

export const Article = styled.article`
  margin: 0 auto 1rem;
  ${responsiveWidth()}
`;

export const MoreIcon = styled(HiOutlinePlusCircle)`
  margin-right: 0.25rem;
`;

export const MoreLink = styled.a`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

export const StyledLicensePlate = styled(LicensePlate)`
  font-size: 1em;
  grid-area: licensePlate;
  @media screen and (min-width: ${size.sm}) {
    font-size: 1.25em;
  }
`;

export const StyledPypDate = styled(PypDate).attrs({
  style: "short",
})`
  font-size: ${({ theme }) => theme.font.size.small};
  .day {
    font-weight: bold;
    margin-right: 0.5em;
    text-transform: uppercase;
  }
  .date {
    opacity: ${({ theme }) => theme.opacity};
    text-transform: uppercase;
  }
`;

export const Title = styled.h3`
  font-size: ${({ theme }) => theme.font.size.large};
  font-weight: normal;
  margin: 0 0 1rem;
  text-align: center;
`;

export const StyledVidverto = styled(Vidverto)`
  margin: 2rem auto;
`;

export const StyledList = styled(List)`
  margin: 1rem 0;
`;

export const StyledLink = styled.a`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const StyledDayCard = styled(DayCard)`
  margin-top: 2rem;
`;
