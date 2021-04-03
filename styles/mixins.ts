import { css } from "styled-components";
import { size } from "./constants";

export const responsivePaddingAround = css`
  padding: 0.5rem;
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
