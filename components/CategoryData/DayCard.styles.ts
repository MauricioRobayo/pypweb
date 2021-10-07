import { Card } from "components/Card";
import { Hours } from "components/Hours";
import { LicensePlate } from "components/LicensePlate";
import { PypDate } from "components/PypDate";
import styled, { css } from "styled-components";
import { size } from "styles/constants";

export const StyledCard = styled(Card)`
  margin-bottom: 1rem;
`;

export const Header = styled.div<{ hasDescription: boolean }>`
  display: grid;
  ${({ hasDescription }) =>
    hasDescription
      ? css`
          align-items: flex-end;
          grid-gap: 0.5em;
          grid-template-areas:
            "date date"
            "description licensePlate";
          grid-template-columns: 1fr auto;
          @media screen and (min-width: ${size.sm}) {
            grid-row-gap: 0;
            grid-template-areas:
              "date licensePlate"
              "description licensePlate";
          }
        `
      : css`
          align-items: center;
          grid-row-gap: 0.5em;
          grid-template-areas: "date licensePlate";
          grid-template-columns: 1fr auto;
        `}
`;

export const StyledPypDate = styled(PypDate)`
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

export const Footer = styled.div`
  text-align: center;
`;

export const StyledHours = styled(Hours)`
  font-size: 1rem;
  text-align: center;
`;

export const Description = styled.div`
  grid-area: description;
`;

export const StyledLicensePlate = styled(LicensePlate)`
  grid-area: licensePlate;
`;

export const DateWrapper = styled.div`
  grid-area: date;
`;
