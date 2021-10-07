import { Card } from "components/Card";
import { Hours } from "components/Hours";
import { Icon } from "components/Icon";
import { LicensePlate } from "components/LicensePlate";
import { PypDate } from "components/PypDate";
import styled, { css } from "styled-components";
import { size } from "styles/constants";
import {
  boxShadow,
  camouflageLink,
  inlineIconLeft,
  responsivePaddingAround,
} from "styles/mixins";

const inactiveStyle = css`
  background-color: ${({ theme }) => theme.colors.secondaryLighter};
  color: ${({ theme }) => theme.colors.secondary};
`;

type StyleProps = {
  isSelected?: boolean;
  isInactive?: boolean;
};

export const StyledCard = styled(Card)`
  margin-bottom: 1rem;
`;

export const RegularCard = styled.div<StyleProps>`
  ${camouflageLink}

  a {
    align-items: center;
    display: flex;
    justify-content: space-between;
    position: relative;
    transition: background-color 0.5s;
    ${responsivePaddingAround}
    ${({ isInactive }) => isInactive && inactiveStyle}
    &:first-child {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    &:last-child {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
  a:hover {
    ${boxShadow}

    z-index: 1;
  }
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

export const IconLeft = inlineIconLeft(Icon);

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
