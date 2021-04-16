import Icon from "components/icon";
import styled, { css } from "styled-components";
import {
  boxShadow,
  camouflageLink,
  flexCenter,
  responsivePaddingAround,
} from "styles/mixins";
import PypDate from "../date";
import Hours from "../hours";

const inactiveStyle = css`
  background-color: ${({ theme }) => theme.colors.inactiveBackgroundColor};
  color: #b5b5b5;
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
  background-color: ${({ theme }) => theme.colors.activeBackgroundColor};
  color: white;
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
  padding: 0 1rem 1rem;
  h4 {
    ${flexCenter}

    font-size: 1.25rem;
    margin: 0.5rem 0;
    svg {
      margin-right: 0.5rem;
    }
  }
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
        color: white;
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
  background-color: hsl(48, 100%, 85%);
  color: ${({ theme }) => theme.colors.linkColor};
  padding: 1rem;
  text-align: center;
`;

export const StyledHours = styled(Hours)`
  font-size: 1rem;
  text-align: center;
`;

export const StyledIcon = styled(Icon)`
  margin-right: 0.5rem;
`;
