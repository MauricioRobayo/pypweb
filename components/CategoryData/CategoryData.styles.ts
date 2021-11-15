import { AdPlayer, Vidverto } from "components/Ads";
import { LicensePlate } from "components/LicensePlate";
import { List } from "components/List";
import { PypDate } from "components/PypDate";
import styled from "styled-components";
import { size } from "styles/constants";
import { responsiveWidth, subtitle } from "styles/mixins";
import DayCard from "./DayCard";

export const Article = styled.article`
  margin: 0 auto 1rem;
  ${responsiveWidth()}
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

export const Header = styled.header`
  text-align: center;
`;

export const Title = styled.div`
  ${subtitle}
`;

export const StyledList = styled(List)`
  margin: 1rem 0;
`;

export const StyledLink = styled.a<{ dim: boolean }>`
  align-items: center;
  background-color: ${({ dim, theme }) =>
    dim ? theme.colors.secondaryLighter : theme.colors.mainComplement};
  display: flex;
  justify-content: space-between;
`;

export const StyledDayCard = styled(DayCard)`
  margin-top: 2rem;
`;

export const StyledVidverto = styled(Vidverto)`
  margin: 1rem auto;
`;

export const StyledAdPlayer = styled(AdPlayer)`
  margin: 1rem auto;
`;
