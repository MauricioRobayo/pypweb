import { Hours } from "components/Hours";
import Icon from "components/icon";
import { PypDate } from "components/PypDate";
import { RiErrorWarningFill } from "react-icons/ri";
import styled, { css } from "styled-components";
import {
  boxShadow,
  camouflageLink,
  flexCenter,
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
  }
  a:hover {
    ${boxShadow()}

    z-index: 1000;
  }
`;

export const SelectedCard = styled.div<StyleProps>`
  ${boxShadow()}

  border-radius: 5px;
  margin-bottom: 1rem;
  overflow: hidden;
  ${({ isInactive }) => isInactive && inactiveStyle}
`;

export const Header = styled.div<StyleProps>`
  align-items: flex-end;
  background-color: ${({ theme }) => theme.colors.main};
  color: ${({ theme }) => theme.colors.mainComplement};
  display: flex;
  justify-content: space-between;
  ${responsivePaddingAround}
  ${({ isInactive }) =>
    isInactive &&
    css`
      align-items: center;
      font-weight: normal;
      ${inactiveStyle}
    `}
`;

export const Body = styled.div<StyleProps>`
  padding: 1rem;
`;

export const Description = styled.div`
  padding-top: 0.5rem;
`;

export const StyledPypDate = styled(PypDate)<StyleProps>`
  .day,
  .date {
    ${({ isSelected, isInactive }) =>
      isSelected &&
      !isInactive &&
      css`
        color: ${({ theme }) => theme.colors.mainComplement};
      `};
  }
  .day {
    ${({ isSelected, isInactive }) =>
      isSelected &&
      !isInactive &&
      css`
        font-weight: bold;
      `};
  }
  .date {
    font-size: 0.85rem;
    text-transform: uppercase;
  }
`;

export const Warning = styled.div`
  background-color: ${({ theme }) => theme.colors.warningLighter};
  padding: 1rem;
  text-align: center;
  a {
    ${flexCenter}
  }
`;

export const WarningIcon = styled(inlineIconLeft(RiErrorWarningFill))`
  color: ${({ theme }) => theme.colors.warning};
  font-size: 1.25rem;
`;

export const StyledHours = styled(Hours)`
  font-size: 1rem;
  text-align: center;
`;

export const VehicleIcon = inlineIconLeft(Icon);
