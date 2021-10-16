import { css, DefaultTheme } from "styled-components";
import { size } from "./constants";

export const secondaryText = css`
  font-size: ${({ theme }) => theme.font.size.small};
  opacity: ${({ theme }) => theme.opacity};
`;

export const boxShadow = css`
  box-shadow: rgb(122 122 122) 0 0 10px 0;
`;

export const responsivePaddingAround = css`
  padding: 0.75rem;
  @media only screen and (min-width: ${size.sm}) {
    padding: 1rem;
  }
`;

export const camouflageLink = css`
  a,
  a:hover {
    color: inherit;
    text-decoration: none;
  }
`;

export const flexHorizontalCenterVerticalEnd = css`
  align-items: flex-end;
  display: flex;
  justify-content: center;
`;

export const flexCenter = css`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export function responsiveWidth(width: keyof DefaultTheme["width"] = "normal") {
  return css`
    width: min(${({ theme }) => theme.width[width]}, 100%);
  `;
}

export const subtitle = css`
  font-size: ${({ theme }) => theme.font.size.large};
  font-weight: normal;
  margin: 0 0 1rem;
`;
