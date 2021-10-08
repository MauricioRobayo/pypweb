import { Card } from "components/Card";
import { Description } from "components/Description";
import { Hours } from "components/Hours";
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
          align-items: end;
          grid-row-gap: 0.5em;
          grid-template-areas:
            "date licensePlate"
            "description licensePlate";
          grid-template-columns: 1fr auto;

          @media screen and (min-width: ${size.sm}) {
            grid-row-gap: 0;
          }
        `
      : css`
          align-items: center;
          grid-row-gap: 0.5em;
          grid-template-areas: "date licensePlate";
          grid-template-columns: 1fr auto;
        `}
`;

export const Footer = styled.div`
  text-align: center;
`;

export const StyledHours = styled(Hours)`
  font-size: 1rem;
  text-align: center;
`;

export const StyledDescription = styled(Description)`
  grid-area: description;
`;

export const DateWrapper = styled.div`
  grid-area: date;
`;
