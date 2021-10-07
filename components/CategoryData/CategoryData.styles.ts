import { LicensePlate } from "components/LicensePlate";
import { PypDate } from "components/PypDate";
import { HiOutlinePlusCircle } from "react-icons/hi";
import styled from "styled-components";
import { responsiveWidth } from "styles/mixins";

export const Article = styled.article`
  margin: 0 auto 1rem;
  ${responsiveWidth}
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
  grid-area: licensePlate;
`;

export const StyledPypDate = styled(PypDate).attrs({
  type: "short",
})`
  font-size: ${({ theme }) => theme.font.size.small};
  .day {
    font-weight: bold;
    margin-right: 0.5em;
    text-transform: uppercase;
  }
  .date {
    opacity: 0.95;
    text-transform: uppercase;
  }
`;

export const Title = styled.h3`
  font-size: ${({ theme }) => theme.font.size.large};
  font-weight: normal;
  margin: 0 0 1rem;
  text-align: center;
`;
